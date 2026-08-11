<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\ContentStatus;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Corrosion Inhibitor',
            'Scale Inhibitor',
            'Oxygen Scavenger',
            'Microbiocide',
            'Antiscalant',
            'Coagulant',
            'Flocculant',
            'Antifoam',
            'Dispersant',
            'Cation Resin',
        ]).' '.fake()->bothify('PGL-###');

        return [
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 100000),
            'category' => fake()->randomElement([
                'Cooling Water Treatment',
                'Boiler Water Treatment',
                'Reverse Osmosis',
                'Waste Water Treatment',
                'Demin Plant Resin',
            ]),
            'summary' => fake()->sentence(12),
            'description' => collect(fake()->paragraphs(3))
                ->map(fn (string $p): string => $p)
                ->implode("\n\n"),
            'specs' => [
                ['label' => 'Bentuk', 'value' => fake()->randomElement(['Cair', 'Serbuk', 'Granular'])],
                ['label' => 'pH', 'value' => (string) fake()->randomFloat(1, 2, 12)],
                ['label' => 'Kemasan', 'value' => fake()->randomElement(['Drum 200 L', 'Jerigen 25 L', 'Sak 25 kg'])],
            ],
            'application' => fake()->sentence(16),
            'image_path' => null,
            'datasheet_path' => null,
            'status' => ContentStatus::Published,
            'sort_order' => fake()->numberBetween(0, 50),
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
