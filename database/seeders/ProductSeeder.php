<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Seed the six prototype catalog items as published products. Each spec-list entry
     * from the prototype becomes a {label, value} spec row.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Cooling Water Treatment',
                'category' => 'Water Treatment',
                'summary' => 'Menjaga sistem cooling water dari korosi, kerak, dan pertumbuhan mikroba.',
                'specs' => ['Corrosion Inhibitor', 'Scale Inhibitor', 'Microbiocide'],
            ],
            [
                'name' => 'Boiler Water Treatment',
                'category' => 'Water Treatment',
                'summary' => 'Proteksi boiler dari korosi, kerak, dan oksigen terlarut untuk efisiensi uap.',
                'specs' => ['Corrosion Inhibitor', 'Scale Inhibitor', 'Oxygen Scavenger', 'Dispersant'],
            ],
            [
                'name' => 'Sugar Processing',
                'category' => 'Process Chemical',
                'summary' => 'Bahan kimia untuk berbagai aplikasi di pabrik gula.',
                'specs' => ['Anti Scalant', 'Microbiocide', 'Viscosity Reducer', 'Flocculants', 'Antifoam', 'Caustic Boilout'],
            ],
            [
                'name' => 'Reverse Osmosis & Pretreatment',
                'category' => 'Membrane',
                'summary' => 'Menjaga membran RO dan proses pretreatment tetap optimal.',
                'specs' => ['Antiscalant', 'Microbiocide', 'SDI Reducer', 'Flocculants (Anionic / Cationic / Non-Ionic)'],
            ],
            [
                'name' => 'Waste Water Treatment',
                'category' => 'Water Treatment',
                'summary' => 'Produk untuk pengendapan, penjernihan, dan penanganan air limbah.',
                'specs' => ['Coagulants', 'Flocculants', 'Color Removal', 'Antifoam'],
            ],
            [
                'name' => 'Demin Plant Resin',
                'category' => 'Resin',
                'summary' => 'Resin penukar ion untuk sistem demineralisasi air.',
                'specs' => ['Anionic Resin', 'Cation Resin'],
            ],
        ];

        foreach ($products as $index => $product) {
            Product::updateOrCreate(
                ['slug' => Str::slug($product['name'])],
                [
                    'name' => $product['name'],
                    'category' => $product['category'],
                    'summary' => $product['summary'],
                    'specs' => array_map(
                        fn (string $line): array => ['label' => 'Produk', 'value' => $line],
                        $product['specs'],
                    ),
                    'status' => ContentStatus::Published,
                    'sort_order' => $index,
                ],
            );
        }
    }
}
