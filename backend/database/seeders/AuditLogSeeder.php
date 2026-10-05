<?php 
namespace Database\Seeders;

// backend/database/seeders/AuditLogSeeder.php
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class AuditLogSeeder extends Seeder
{
    public function run(): void
    {
        // Skip if table doesn't exist yet or already has data
        if (!Schema::hasTable('audit_logs') || AuditLog::count() > 0) return;

        $admin = User::where('role', 'admin')->first();
        if (!$admin) return;

        $logs = [
            ['Access Level Changed', 'Changed Ceejay Santos to DEVELOPER'],
            ['New Member Added',     'Added Vincent Duriga as DEVELOPER'],
            ['Access Level Changed', 'Changed Lei Ann Dico to QA'],
            ['Permission Updated',   'Updated booking permissions for QA team'],
            ['Access Level Changed', 'Changed Rasheed Esponga to DEVELOPER'],
            ['New Member Added',     'Added Jorilyn Pantallano as QA'],
            ['Settings Updated',     'Brand name changed to BitForge IT Suite'],
            ['Access Level Changed', 'Changed Ma. Hermosa Malapit to DEVELOPER'],
        ];

        foreach ($logs as $i => [$action, $details]) {
            AuditLog::create([
                'action'       => $action,
                'performed_by' => $admin->name,
                'user_id'      => $admin->id,
                'details'      => $details,
                'timestamp'    => now()->subDays($i)->subHours(rand(1, 8)),
            ]);
        }
    }
}
