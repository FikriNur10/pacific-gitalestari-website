<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ContactStatus;
use App\Models\ContactSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactSubmission>
 */
class ContactSubmissionFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'company' => fake()->company(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->optional()->phoneNumber(),
            'service' => fake()->randomElement([
                'Water Treatment & WWTP',
                'Industrial Chemicals',
                'Power & Diesel Rental',
                'Protection Systems',
            ]),
            'message' => fake()->optional()->paragraph(),
            'status' => ContactStatus::New,
            'ip_hash' => hash('sha256', fake()->ipv4()),
            'user_agent' => fake()->userAgent(),
        ];
    }

    /**
     * A submission already actioned by the team.
     */
    public function handled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ContactStatus::Handled,
            'handled_at' => now(),
        ]);
    }
}
