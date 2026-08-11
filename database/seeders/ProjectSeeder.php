<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Seed the prototype portfolio items as published projects.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'PLTD Pangkalan Bun',
                'client' => 'PT. PLN (Persero) Wilayah Kalselteng',
                'category' => 'Diesel Rental',
                'location' => 'Pangkalan Bun, Kalimantan',
                'year' => 2024,
                'summary' => 'Penyewaan diesel engine (PLTD) untuk mendukung kebutuhan daya PT. PLN (Persero) Wilayah Kalselteng — salah satu portofolio sektor publik PGL.',
                'sort_order' => 0,
            ],
            [
                'title' => 'Water Treatment Plant',
                'client' => null,
                'category' => 'Water Treatment',
                'location' => null,
                'year' => 2024,
                'summary' => 'Pengadaan & instalasi — tahap dokumentasi.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Waste Water Treatment',
                'client' => null,
                'category' => 'Water Treatment',
                'location' => null,
                'year' => 2024,
                'summary' => 'Operasi & pemeliharaan — tahap dokumentasi.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Sugar & Cooling Chemicals',
                'client' => null,
                'category' => 'Bahan Kimia',
                'location' => null,
                'year' => 2023,
                'summary' => 'Pasokan bahan kimia proses — tahap dokumentasi.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Waterproofing & Grouting',
                'client' => null,
                'category' => 'Proteksi Struktur',
                'location' => null,
                'year' => 2023,
                'summary' => 'Proteksi struktur beton — tahap dokumentasi.',
                'sort_order' => 4,
            ],
            [
                'title' => 'Epoxy Flooring & Lining',
                'client' => null,
                'category' => 'Proteksi Struktur',
                'location' => null,
                'year' => 2023,
                'summary' => 'Lantai & lining industri — tahap dokumentasi.',
                'sort_order' => 5,
            ],
            [
                'title' => 'Diesel Engine Rental',
                'client' => null,
                'category' => 'Diesel Rental',
                'location' => null,
                'year' => 2023,
                'summary' => 'Dukungan daya — tahap dokumentasi.',
                'sort_order' => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['slug' => Str::slug($project['title'])],
                [
                    'title' => $project['title'],
                    'client' => $project['client'],
                    'category' => $project['category'],
                    'location' => $project['location'],
                    'year' => $project['year'],
                    'summary' => $project['summary'],
                    'status' => ContentStatus::Published,
                    'sort_order' => $project['sort_order'],
                ],
            );
        }
    }
}
