<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProdukKimiaController extends Controller
{
    /**
     * Public chemical products catalog — published items only, ordered by sort_order.
     */
    public function index(): Response
    {
        $products = Product::query()
            ->published()
            ->orderBy('sort_order')
            ->latest()
            ->paginate(12)
            ->through(fn (Product $item): array => [
                'name' => $item->name,
                'slug' => $item->slug,
                'category' => $item->category,
                'summary' => $item->summary,
                'specs' => $item->specs ?? [],
                'application' => $item->application,
                'imageUrl' => $item->imageUrl(),
                'datasheetUrl' => $item->datasheetUrl(),
            ]);

        return Inertia::render('produk-kimia', [
            'products' => $products,
            'meta' => $this->meta([
                'title' => 'Produk Kimia — Pacific Gitalestari',
                'description' => 'Katalog produk kimia industri: flokulan, anti-scalant, biosida, boiler chemical, hingga bahan pendukung water treatment.',
            ]),
        ]);
    }
}
