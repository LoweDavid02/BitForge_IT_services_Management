<?php

namespace Database\Seeders;

use App\Models\PortfolioProject;
use Illuminate\Database\Seeder;

class PortfolioProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'name'        => 'E-Commerce Platform',
                'description' => 'Full-stack online shopping solution with payment integration',
                'tags'        => ['React', 'Node.js', 'MongoDB'],
                'image_url'   => 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
                'is_active'   => true,
            ],
            [
                'name'        => 'Healthcare Management System',
                'description' => 'Patient management and appointment scheduling application',
                'tags'        => ['Vue.js', 'Laravel', 'MySQL'],
                'image_url'   => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
                'is_active'   => true,
            ],
            [
                'name'        => 'Real Estate Portal',
                'description' => 'Property listing and virtual tour platform',
                'tags'        => ['Next.js', 'PostgreSQL', 'AWS'],
                'image_url'   => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
                'is_active'   => true,
            ],
            [
                'name'        => 'Financial Dashboard',
                'description' => 'Analytics and reporting tool for financial data',
                'tags'        => ['React', 'D3.js', 'Python'],
                'image_url'   => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                'is_active'   => true,
            ],
            [
                'name'        => 'Social Media App',
                'description' => 'Mobile-first social networking platform',
                'tags'        => ['React Native', 'Firebase', 'Redux'],
                'image_url'   => 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
                'is_active'   => true,
            ],
            [
                'name'        => 'Learning Management System',
                'description' => 'Online education platform with video streaming',
                'tags'        => ['Angular', 'Express', 'MongoDB'],
                'image_url'   => 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
                'is_active'   => true,
            ],
        ];

        foreach ($projects as $project) {
            PortfolioProject::firstOrCreate(
                ['name' => $project['name']],
                $project
            );
        }
    }
}
