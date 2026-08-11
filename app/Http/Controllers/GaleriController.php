<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GaleriController extends Controller
{
    /**
     * Public gallery — published photos only, optionally filtered by category,
     * ordered by sort_order then newest.
     */
    public function index(Request $request): Response
    {
        $category = $request->string('kategori')->toString();

        $items = GalleryItem::query()
            ->published()
            ->when($category !== '', fn ($query) => $query->where('category', $category))
            ->orderBy('sort_order')
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (GalleryItem $item): array => [
                'title' => $item->title,
                'category' => $item->category,
                'imageUrl' => $item->imageUrl(),
            ]);

        // Category chips are built from published items only, so a draft-only
        // category never leaks into the public filter bar.
        $categories = GalleryItem::query()
            ->published()
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->all();

        return Inertia::render('galeri', [
            'items' => $items,
            'categories' => $categories,
            'activeCategory' => $category ?: null,
            'meta' => $this->meta([
                'title' => 'Galeri — Pacific Gitalestari',
                'description' => 'Dokumentasi foto fasilitas, proyek, dan produk PT. Pacific Gitalestari di lapangan.',
            ]),
        ]);
    }
}
