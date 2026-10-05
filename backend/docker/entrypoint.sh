#!/bin/sh
set -e

echo "========================================"
echo " BitForge API — Container Starting"
echo "========================================"

# Wait for PostgreSQL (Supabase) to be ready
echo "==> Waiting for database connection..."
MAX_TRIES=30
TRIES=0
until php -r "
    try {
        \$dsn = 'pgsql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: '5432') . ';dbname=' . getenv('DB_DATABASE');
        new PDO(\$dsn, getenv('DB_USERNAME'), getenv('DB_PASSWORD'), [PDO::ATTR_TIMEOUT => 3]);
        exit(0);
    } catch (Exception \$e) {
        exit(1);
    }
" 2>/dev/null; do
    TRIES=$((TRIES + 1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
        echo "    Database did not become ready in time. Exiting."
        exit 1
    fi
    echo "    Not ready yet (attempt $TRIES/$MAX_TRIES), retrying in 3s..."
    sleep 3
done
echo "    Database is ready."

echo "==> Caching configuration..."
php artisan config:cache

echo "==> Caching routes..."
php artisan route:cache

echo "==> Caching views..."
php artisan view:cache

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Seeding database..."
# All seeders use firstOrCreate or count() guards — idempotent on every boot
php artisan db:seed --force

echo "==> Starting Nginx + PHP-FPM via Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
