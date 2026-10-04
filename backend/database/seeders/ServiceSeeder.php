<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            // Public booking-form services
            ['title' => 'Web Development',            'category' => 'Development', 'icon' => '🌐', 'pricing' => 'Starting at $5,000',  'timeline' => '6-12 weeks'],
            ['title' => 'Mobile App Development',     'category' => 'Development', 'icon' => '📱', 'pricing' => 'Starting at $8,000',  'timeline' => '8-16 weeks'],
            ['title' => 'UI/UX Design',               'category' => 'Design',       'icon' => '🎨', 'pricing' => 'Starting at $3,000',  'timeline' => '3-6 weeks'],
            ['title' => 'IT Consulting',               'category' => 'Consulting',   'icon' => '💼', 'pricing' => 'Starting at $2,000',  'timeline' => '1-4 weeks'],
            ['title' => 'E-Commerce Solutions',        'category' => 'Development', 'icon' => '🛒', 'pricing' => 'Starting at $6,000',  'timeline' => '8-12 weeks'],
            ['title' => 'Custom Software Development', 'category' => 'Development', 'icon' => '⚙️', 'pricing' => 'Starting at $10,000', 'timeline' => '12-24 weeks'],
            // Admin-panel additional services
            ['title' => 'AI Infrastructure Audit',    'category' => 'Consulting',      'icon' => '🤖', 'pricing' => 'Starting at $4,000',  'timeline' => '2-4 weeks'],
            ['title' => 'Web3 Integration',           'category' => 'Development',     'icon' => '⛓️', 'pricing' => 'Starting at $7,000',  'timeline' => '6-10 weeks'],
            ['title' => 'Custom SaaS Dev',            'category' => 'Development',     'icon' => '☁️', 'pricing' => 'Starting at $15,000', 'timeline' => '16-24 weeks'],
            ['title' => 'Cybersecurity Audit',        'category' => 'Infrastructure',  'icon' => '🔒', 'pricing' => 'Starting at $5,000',  'timeline' => '2-4 weeks'],
            ['title' => 'Mobile App Migration',       'category' => 'Development',     'icon' => '🔄', 'pricing' => 'Starting at $6,000',  'timeline' => '6-10 weeks'],
            ['title' => 'Cloud Infrastructure',       'category' => 'Infrastructure',  'icon' => '🖥️', 'pricing' => 'Starting at $4,000',  'timeline' => '4-8 weeks'],
            ['title' => 'DevOps Consultation',        'category' => 'Consulting',      'icon' => '🚀', 'pricing' => 'Starting at $3,000',  'timeline' => '2-4 weeks'],
            ['title' => 'Network Security Audit',     'category' => 'Infrastructure',  'icon' => '🛡️', 'pricing' => 'Starting at $3,500',  'timeline' => '1-3 weeks'],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['title' => $service['title']],
                array_merge($service, ['is_active' => true])
            );
        }
    }
}
