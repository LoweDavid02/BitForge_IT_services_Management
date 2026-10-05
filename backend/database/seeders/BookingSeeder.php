<?php

namespace Database\Seeders;

// backend/database/seeders/BookingSeeder.php
use App\Models\Booking;
use App\Models\Service;
use App\Services\AvatarService;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $services = Service::all();
        $avatar   = new AvatarService();
        $statuses = ['PENDING','CONFIRMED','COMPLETED','CANCELLED','RESCHEDULED'];
        $clients  = [
            ['Nexus Tech Solutions', 'nexus@techsolutions.com'],
            ['Matrix Logistics',     'info@matrixlogistics.com'],
            ['Aether Ventures',      'contact@aether.io'],
            ['DataSphere Corp',      'hello@datasphere.com'],
            ['Zenith Fintech',       'ops@zenithfintech.com'],
            ['Quantum Systems',      'team@quantumsys.com'],
            ['Nova Enterprises',     'nova@nova.co'],
            ['Stellar Networks',     'info@stellarnet.io'],
            ['Lumina Dynamics',      'hi@luminadynamics.com'],
            ['TechNexus Corp',       'contact@technexus.com'],
        ];

        for ($i = 0; $i < 30; $i++) {
            $client  = $clients[$i % count($clients)];
            $service = $services->random();
            Booking::create([
                'client_name'    => $client[0],
                'client_email'   => $client[1],
                'service_id'     => $service->id,
                'service_name'   => $service->title,
                'scheduled_date' => now()->subDays(rand(0, 90))->toDateString(),
                'scheduled_time' => ['09:00 AM','10:00 AM','02:00 PM','03:00 PM'][rand(0,3)],
                'status'         => $statuses[array_rand($statuses)],
                'avatar_initials'=> $avatar->generateInitials($client[0]),
            ]);
        }
    }
}
