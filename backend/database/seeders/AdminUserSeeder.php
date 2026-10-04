<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@bitforge.io'],
            [
                'name'       => 'Admin User',
                'email'      => 'admin@bitforge.io',
                'password'   => Hash::make('BitForge2026!'),
                'role'       => 'admin',
                'department' => 'IT Management',
                'location'   => 'San Francisco, CA',
                'initials'   => 'AU',
                'join_date'  => '2024-01-01',
            ]
        );
    }
}
