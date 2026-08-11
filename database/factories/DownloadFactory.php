<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Models\Download;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Download>
 */
class DownloadFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $docType = fake()->randomElement(['Katalog', 'Brosur', 'TDS', 'MSDS', 'Sertifikat']);
        $subject = fake()->randomElement([
            'Cooling Water Treatment',
            'Boiler Water Treatment',
            'Sugar Processing Chemicals',
            'Reverse Osmosis Antiscalant',
            'Waste Water Coagulant',
            'Demin Plant Resin',
            'Sistem Proteksi',
            'Water Treatment Plant',
        ]);
        $fileName = fake()->unique()->slug(4).'.pdf';

        return [
            'title' => "{$docType} {$subject}",
            'description' => fake()->sentence(12),
            'category' => fake()->randomElement([
                'Cooling Water',
                'Boiler Water',
                'Sugar Processing',
                'Reverse Osmosis',
                'Waste Water',
                'Demin Plant',
                'Sistem Proteksi',
                'Water Treatment Plant',
                'Perusahaan',
            ]),
            // Placeholder path — real uploads land under `downloads/` via the controller.
            'file_path' => 'downloads/placeholder.pdf',
            'file_name' => $fileName,
            'file_size' => fake()->numberBetween(200_000, 20_000_000),
            'mime' => 'application/pdf',
            'download_count' => fake()->numberBetween(0, 500),
            'status' => ContentStatus::Published,
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ContentStatus::Draft,
            'published_at' => null,
        ]);
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ContentStatus::Published,
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    /**
     * A future-dated published document (should NOT appear on public pages yet).
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ContentStatus::Published,
            'published_at' => now()->addWeek(),
        ]);
    }
}
