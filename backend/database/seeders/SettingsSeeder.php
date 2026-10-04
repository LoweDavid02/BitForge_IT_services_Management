<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        Setting::firstOrCreate(
            ['id' => 1],
            [
                'brand_name'    => 'BitForge IT Suite',
                'contact_email' => 'admin@bitforge.io',
                'timezone'      => 'UTC',
                'language'      => 'en-US',
            ]
        );
    }
}
