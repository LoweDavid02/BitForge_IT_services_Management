<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name'          => 'Isacaar L. Manlulu',
                'role'          => 'Project Manager / Proprietor',
                'department'    => 'Management',
                'is_featured'   => true,
                'image_url'     => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                'phone'         => '09471511530',
                'email'         => 'isacaarmanlulu@gmail.com',
                'portfolio_url' => null,
                'access_level'  => 'ADMIN',
            ],
            [
                'name'          => 'Numer Constantino',
                'role'          => 'Business Analyst',
                'department'    => 'Management',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
                'phone'         => '09107558135',
                'email'         => 'numerconstantino@gmail.com',
                'portfolio_url' => 'https://numer-portfolio.vercel.app/#services',
                'access_level'  => 'ADMIN',
            ],
            [
                'name'          => 'Ma. Hermosa Malapit',
                'role'          => 'Design Lead',
                'department'    => 'Design',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                'phone'         => '09156668208',
                'email'         => 'miamalapit08@gmail.com',
                'portfolio_url' => 'https://mahermosamalapit.framer.website/',
                'access_level'  => 'DEVELOPER',
            ],
            [
                'name'          => 'Rizalyne C. Asaldo',
                'role'          => 'UI/UX Designer',
                'department'    => 'Design',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                'phone'         => '09933109383',
                'email'         => 'rizalyneasaldo@student.laverdad.edu.ph',
                'portfolio_url' => 'https://rizalyneasaldo.wixsite.com/my-site-3',
                'access_level'  => 'DEVELOPER',
            ],
            [
                'name'          => 'Lowe David C. Tubat',
                'role'          => 'UI/UX Designer & Front-End',
                'department'    => 'Design',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
                'phone'         => '09934827420',
                'email'         => 'lowedavidctubat02@gmail.com',
                'portfolio_url' => 'https://lowedavid02.github.io/my-personal-portfolio2026/',
                'access_level'  => 'DEVELOPER',
            ],
            [
                'name'          => 'Ceejay S. Santos',
                'role'          => 'Lead Developer',
                'department'    => 'Development',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
                'phone'         => '09949884809',
                'email'         => '7078ceejay@gmail.com',
                'portfolio_url' => 'https://7078-cj.github.io/personal-portfolio/',
                'access_level'  => 'DEVELOPER',
            ],
            [
                'name'          => 'Vincent Lee T. Duriga',
                'role'          => 'Full Stack Developer',
                'department'    => 'Development',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
                'phone'         => '09352131488',
                'email'         => 'aujscdurigavincentlee@gmail.com',
                'portfolio_url' => 'https://portfolio-vinceaintreadin.vercel.app/',
                'access_level'  => 'DEVELOPER',
            ],
            [
                'name'          => 'Rasheed Gavin M. Esponga',
                'role'          => 'Full Stack Developer',
                'department'    => 'Development',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
                'phone'         => '09082150975',
                'email'         => 'rasheedgavinesponga@gmail.com',
                'portfolio_url' => 'https://rshdgvn.github.io/personal-portfolio/',
                'access_level'  => 'DEVELOPER',
            ],
            [
                'name'          => 'Lei Ann Judea C. Dico',
                'role'          => 'QA Lead',
                'department'    => 'QA',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
                'phone'         => '09381735200',
                'email'         => 'leiannjudeadico20@gmail.com',
                'portfolio_url' => 'https://github.com/Lei0619/qa-portfolio.git',
                'access_level'  => 'QA',
            ],
            [
                'name'          => 'Jorilyn Pantallano',
                'role'          => 'QA Tester',
                'department'    => 'QA',
                'is_featured'   => false,
                'image_url'     => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
                'phone'         => '09608198874',
                'email'         => 'pantallanojojo1994@gmail.com',
                'portfolio_url' => 'https://f4ust-03.github.io/portfolio-pantallano/',
                'access_level'  => 'QA',
            ],
        ];

        foreach ($members as $member) {
            TeamMember::firstOrCreate(
                ['email' => $member['email']],
                $member
            );
        }
    }
}
