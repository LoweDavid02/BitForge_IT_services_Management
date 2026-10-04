<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PortfolioProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'        => $this->faker->catchPhrase(),
            'description' => $this->faker->paragraph(),
            'tags'        => $this->faker->randomElements(['React', 'Laravel', 'Vue', 'Node.js', 'Tailwind', 'MySQL'], 3),
            'image_url'   => $this->faker->imageUrl(800, 600, 'technics'),
            'is_active'   => true,
        ];
    }
}
