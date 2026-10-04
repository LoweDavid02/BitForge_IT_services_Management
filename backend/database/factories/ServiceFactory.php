<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title'     => $this->faker->unique()->words(3, true),
            'category'  => $this->faker->randomElement(['Development', 'Design', 'Infrastructure', 'Consulting']),
            'is_active' => true,
        ];
    }
}
