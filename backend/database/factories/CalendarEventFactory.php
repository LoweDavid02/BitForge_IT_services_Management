<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CalendarEventFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title'       => $this->faker->sentence(4),
            'client_name' => $this->faker->optional()->company(),
            'booking_id'  => null,
            'type'        => $this->faker->randomElement(['kickoff', 'consultation', 'deadline']),
            'start_time'  => $this->faker->optional()->time('h:i A'),
            'event_date'  => $this->faker->dateTimeBetween('now', '+6 months')->format('Y-m-d'),
            'priority'    => $this->faker->optional()->randomElement(['HIGH', 'MEDIUM', 'LOW']),
            'color_class' => $this->faker->optional()->randomElement(['bg-blue-500', 'bg-green-500', 'bg-red-500']),
        ];
    }
}
