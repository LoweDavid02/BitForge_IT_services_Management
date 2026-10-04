<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class FeedbackFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->name();
        $parts = explode(' ', $name);

        return [
            'full_name'       => $name,
            'email'           => $this->faker->safeEmail(),
            'service_id'      => Service::factory(),
            'service_name'    => 'Web Development',
            'rating'          => $this->faker->numberBetween(1, 5),
            'message'         => $this->faker->paragraph(),
            'status'          => $this->faker->randomElement(['new', 'in-progress', 'resolved']),
            'avatar_initials' => strtoupper(substr($parts[0], 0, 1) . substr($parts[1] ?? $parts[0], 0, 1)),
        ];
    }
}
