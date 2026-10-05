<?php 

namespace Database\Seeders;

use App\Models\Feedback;
use App\Models\Service;
use App\Services\AvatarService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class FeedbackSeeder extends Seeder
{
    public function run(): void
    {
        // Skip if table doesn't exist yet or already has data
        if (!Schema::hasTable('feedbacks') || Feedback::count() > 0) return;

        $services  = Service::all();
        $avatar    = new AvatarService();
        $statuses  = ['new', 'in-progress', 'resolved'];
        $reviewers = [
            ['Alex Rivera',   'alex.rivera@email.com'],
            ['Sarah Chen',    'sarah.chen@email.com'],
            ['Jordan Smyth',  'jordan.smyth@email.com'],
            ['Maria Santos',  'maria.santos@email.com'],
            ['David Kim',     'david.kim@email.com'],
            ['Emily Watson',  'emily.watson@email.com'],
            ['Chris Mendoza', 'chris.mendoza@email.com'],
        ];
        $messages = [
            'Excellent work on the project. The team delivered beyond expectations.',
            'Great design work! Very intuitive and modern interface.',
            'The API integrations are precise and blazing fast.',
            'Professional team, delivered on time and within budget.',
            'Outstanding support throughout the entire development process.',
        ];

        for ($i = 0; $i < 20; $i++) {
            $reviewer = $reviewers[$i % count($reviewers)];
            $service  = $services->random();
            Feedback::create([
                'full_name'       => $reviewer[0],
                'email'           => $reviewer[1],
                'service_id'      => $service->id,
                'service_name'    => $service->title,
                'rating'          => rand(3, 5),
                'message'         => $messages[array_rand($messages)],
                'status'          => $statuses[array_rand($statuses)],
                'avatar_initials' => $avatar->generateInitials($reviewer[0]),
            ]);
        }
    }
}
