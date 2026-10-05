<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            ServiceSeeder::class,
            TeamMemberSeeder::class,
            SettingsSeeder::class,
            BookingSeeder::class,
            FeedbackSeeder::class,
            AuditLogSeeder::class, 
            PortfolioProjectSeeder::class,
        ]);
    }
}
