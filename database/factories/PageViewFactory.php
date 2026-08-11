<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\PageView;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<PageView>
 */
class PageViewFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'path' => fake()->randomElement(['/', 'tentang', 'solusi', 'proyek', 'berita', 'kontak']),
            'referrer' => fake()->optional()->url(),
            'session_hash' => hash('sha256', (string) Str::uuid()),
            'ip_hash' => hash('sha256', fake()->ipv4()),
            'user_agent' => fake()->userAgent(),
            'device' => fake()->randomElement(['mobile', 'desktop']),
            'viewed_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ];
    }

    /**
     * A hit that occurred today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'viewed_at' => fake()->dateTimeBetween('today', 'now'),
        ]);
    }
}
