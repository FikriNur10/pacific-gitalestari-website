<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Models\LegalDocument;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<LegalDocument>
 */
class LegalDocumentFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => rtrim(fake()->sentence(3), '.'),
            'category' => fake()->randomElement(['Legalitas', 'Sertifikasi']),
            'issuer' => fake()->company(),
            'document_number' => (string) fake()->numerify('###/###/####'),
            'issued_at' => fake()->dateTimeBetween('-6 years', '-1 year'),
            'expires_at' => fake()->optional()->dateTimeBetween('now', '+3 years'),
            'file_path' => null,
            'image_path' => null,
            'status' => ContentStatus::Published,
            'sort_order' => 0,
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ContentStatus::Draft,
        ]);
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ContentStatus::Published,
        ]);
    }
}
