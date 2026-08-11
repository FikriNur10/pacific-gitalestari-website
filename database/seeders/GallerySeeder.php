<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\GalleryItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class GallerySeeder extends Seeder
{
    /**
     * Seed the public gallery with real photos.
     *
     * The source images already ship in public/landing; we copy each into the
     * public storage disk (where GalleryItem::imageUrl() resolves them) so the
     * gallery renders actual pictures out of the box instead of broken links.
     * Copy is idempotent — only writes when the destination is missing.
     */
    public function run(): void
    {
        $items = [
            ['title' => 'Water Treatment Plant', 'category' => 'Fasilitas', 'source' => 'landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.jpg'],
            ['title' => 'Storage & Clarifier Tank', 'category' => 'Fasilitas', 'source' => 'landing/images/water-storage-tanks-dbePDzNQFec-unsplash.jpg'],
            ['title' => 'Chemical Dosing System', 'category' => 'Produk', 'source' => 'landing/images/chemical-steel-tanks-xD5SWy7hMbw-unsplash.jpg'],
            ['title' => 'Instalasi Perpipaan', 'category' => 'Proyek', 'source' => 'landing/images/steel-pipelines-4CNNH2KEjhc-unsplash.jpg'],
            ['title' => 'Proteksi Struktur Beton', 'category' => 'Proyek', 'source' => 'landing/images/concrete-structures-Ac97OqAWDvg-unsplash.jpg'],
            ['title' => 'PLTD Pangkalan Bun', 'category' => 'Proyek', 'source' => 'landing/diesel-generator.jpg'],
            ['title' => 'Unit Reverse Osmosis', 'category' => 'Produk', 'source' => 'landing/images/rephile-water-nINNu6nHH5o-unsplash.jpg'],
            ['title' => 'Water Treatment Facility', 'category' => 'Fasilitas', 'source' => 'landing/hero-water-treatment.jpg'],
        ];

        foreach ($items as $index => $item) {
            $dest = 'gallery/'.basename($item['source']);
            $sourcePath = public_path($item['source']);

            if (! Storage::disk('public')->exists($dest) && is_file($sourcePath)) {
                Storage::disk('public')->put($dest, (string) file_get_contents($sourcePath));
            }

            GalleryItem::updateOrCreate(
                ['title' => $item['title']],
                [
                    'category' => $item['category'],
                    'image_path' => $dest,
                    'status' => ContentStatus::Published,
                    'sort_order' => $index,
                ],
            );
        }
    }
}
