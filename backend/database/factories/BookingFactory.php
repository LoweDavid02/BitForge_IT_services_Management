<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->company();

        return [
            'client_name'    => $name,
            'client_email'   => $this->faker->companyEmail(),
            'service_id'     => Service::factory(),
            'service_name'   => 'Web Development',
            'scheduled_date' => $this->faker->dateTimeBetween('+1 week', '+3 months')->format('Y-m-d'),
            'scheduled_time' => $this->faker->randomElement(['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM']),
            'status'         => $this->faker->randomElement(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']),
            'avatar_initials' => strtoupper(substr($name, 0, 1) . substr(strrchr($name, ' ') ?: $name, 1, 1)),
        ];
    }
}
