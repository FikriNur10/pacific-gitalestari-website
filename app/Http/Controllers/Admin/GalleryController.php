<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGalleryItemRequest;
use App\Http\Requests\UpdateGalleryItemRequest;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $items = GalleryItem::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (GalleryItem $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'status' => $item->status->value,
                'statusLabel' => $item->status->label(),
                'sortOrder' => $item->sort_order,
                'imageUrl' => $item->imageUrl(),
            ]);

        return Inertia::render('admin/galeri/index', [
            'items' => $items,
            'filters' => ['search' => $search ?: null],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/galeri/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreGalleryItemRequest $request): RedirectResponse
    {
        $data = $request->safe()->except(['image']);
        $data['image_path'] = $request->file('image')->store('gallery', 'public');

        GalleryItem::create($data);

        return redirect()
            ->route('admin.galeri.index')
            ->with('success', 'Foto galeri ditambahkan.');
    }

    public function edit(GalleryItem $galleryItem): Response
    {
        return Inertia::render('admin/galeri/edit', [
            'item' => [
                'id' => $galleryItem->id,
                'title' => $galleryItem->title,
                'category' => $galleryItem->category,
                'status' => $galleryItem->status->value,
                'sortOrder' => $galleryItem->sort_order,
                'imageUrl' => $galleryItem->imageUrl(),
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateGalleryItemRequest $request, GalleryItem $galleryItem): RedirectResponse
    {
        $data = $request->safe()->except(['image']);

        // Replacing the image deletes the old file; omitting it keeps the current one.
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($galleryItem->image_path);
            $data['image_path'] = $request->file('image')->store('gallery', 'public');
        }

        $galleryItem->update($data);

        return redirect()
            ->route('admin.galeri.index')
            ->with('success', 'Foto galeri diperbarui.');
    }

    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        Storage::disk('public')->delete($galleryItem->image_path);

        $galleryItem->delete();

        return redirect()
            ->route('admin.galeri.index')
            ->with('success', 'Foto galeri dihapus.');
    }
}
