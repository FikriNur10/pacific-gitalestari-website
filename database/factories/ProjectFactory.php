<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->unique()->sentence(4);

        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1, 100000),
            'client' => 'PT. '.fake()->company(),
            'category' => fake()->randomElement(['Water Treatment', 'Diesel Rental', 'Proteksi Struktur', 'Bahan Kimia']),
            'location' => fake()->randomElement(['Jakarta', 'Kalimantan', 'Surabaya', 'Pangkalan Bun', 'Balikpapan']),
            'year' => fake()->numberBetween(2015, 2026),
            'summary' => fake()->sentence(14),
            'description' => collect(fake()->paragraphs(3))
                ->map(fn (string $p): string => $p)
                ->implode("\n\n"),
            'cover_path' => null,
            'gallery' => null,
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
