<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TeamMemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'          => $this->faker->name(),
            'role'          => $this->faker->jobTitle(),
            'department'    => $this->faker->randomElement(['Management', 'Design', 'Development', 'QA']),
            'is_featured'   => false,
            'image_url'     => $this->faker->imageUrl(400, 400, 'people'),
            'phone'         => $this->faker->phoneNumber(),
            'email'         => $this->faker->safeEmail(),
            'portfolio_url' => $this->faker->optional()->url(),
            'access_level'  => $this->faker->randomElement(['ADMIN', 'DEVELOPER', 'QA']),
            'last_modified' => null,
        ];
    }
}
