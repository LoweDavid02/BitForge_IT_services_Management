#!/bin/sh
set -e

echo "========================================"
echo " BitForge API — Container Starting"
echo "========================================"

# Wait for PostgreSQL (Supabase) to accept connections.
# Supports both DB_URL (single connection string) and individual DB_* vars.
echo "==> Waiting for database connection..."
MAX_TRIES=30
TRIES=0
until php -r "
    \$url = getenv('DB_URL');
    if (\$url) {
        \$parts  = parse_url(\$url);
        \$host   = \$parts['host'];
        \$port   = \$parts['port'] ?? 5432;
        \$dbname = ltrim(\$parts['path'] ?? '/postgres', '/');
        \$user   = \$parts['user'] ?? 'postgres';
        \$pass   = \$parts['pass'] ?? '';
    } else {
        \$host   = getenv('DB_HOST')     ?: '127.0.0.1';
        \$port   = getenv('DB_PORT')     ?: 5432;
        \$dbname = getenv('DB_DATABASE') ?: 'postgres';
        \$user   = getenv('DB_USERNAME') ?: 'postgres';
        \$pass   = getenv('DB_PASSWORD') ?: '';
    }
    try {
        \$dsn = \"pgsql:host={\$host};port={\$port};dbname={\$dbname};sslmode=require\";
        new PDO(\$dsn, \$user, \$pass, [PDO::ATTR_TIMEOUT => 5]);
        exit(0);
    } catch (Exception \$e) {
        fwrite(STDERR, \$e->getMessage() . PHP_EOL);
        exit(1);
    }
" 2>/dev/null; do
    TRIES=$((TRIES + 1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
        echo "    Database did not become ready after $MAX_TRIES attempts. Exiting."
        exit 1
    fi
    echo "    Not ready yet (attempt $TRIES/$MAX_TRIES), retrying in 3s..."
    sleep 3
done
echo "    Database is ready."

# Clear any stale bootstrap cache before caching fresh config
echo "==> Clearing stale cache..."
php artisan config:clear  || true
php artisan cache:clear   || true

echo "==> Caching configuration..."
php artisan config:cache

echo "==> Caching routes..."
php artisan route:cache

echo "==> Caching views..."
php artisan view:cache

echo "==> Running migrations..."
php artisan migrate:fresh --force

echo "==> Seeding database..."
php artisan db:seed --force

echo "==> Starting Nginx + PHP-FPM via Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
