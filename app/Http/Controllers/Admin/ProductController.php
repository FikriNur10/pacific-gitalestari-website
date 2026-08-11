<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $products = Product::query()
            ->when($search !== '', fn ($query) => $query->where('name', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Product $item): array => [
                'id' => $item->id,
                'name' => $item->name,
                'slug' => $item->slug,
                'category' => $item->category,
                'status' => $item->status->value,
                'statusLabel' => $item->status->label(),
                'sortOrder' => $item->sort_order,
            ]);

        return Inertia::render('admin/produk-kimia/index', [
            'products' => $products,
            'filters' => ['search' => $search ?: null],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/produk-kimia/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $this->prepare($request);

        Product::create($data);

        return redirect()
            ->route('admin.produk-kimia.index')
            ->with('success', 'Produk dibuat.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('admin/produk-kimia/edit', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'category' => $product->category,
                'summary' => $product->summary,
                'description' => $product->description,
                'specs' => $product->specs ?? [],
                'application' => $product->application,
                'status' => $product->status->value,
                'sortOrder' => $product->sort_order,
                'imageUrl' => $product->imageUrl(),
                'datasheetUrl' => $product->datasheetUrl(),
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $data = $this->prepare($request, $product);

        $product->update($data);

        return redirect()
            ->route('admin.produk-kimia.index')
            ->with('success', 'Produk diperbarui.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        if ($product->image_path !== null) {
            Storage::disk('public')->delete($product->image_path);
        }
        if ($product->datasheet_path !== null) {
            Storage::disk('public')->delete($product->datasheet_path);
        }

        $product->delete();

        return redirect()
            ->route('admin.produk-kimia.index')
            ->with('success', 'Produk dihapus.');
    }

    /**
     * Build the persistable attributes from the request: slug, specs, image, datasheet.
     *
     * @return array<string, mixed>
     */
    private function prepare(StoreProductRequest|UpdateProductRequest $request, ?Product $product = null): array
    {
        $data = $request->safe()->except(['image', 'datasheet']);

        // Auto-slug from the name when left blank; keep it unique.
        $data['slug'] = $this->uniqueSlug(
            ($data['slug'] ?? null) ?: Str::slug($data['name']),
            $product?->id,
        );

        // Specs arrive as an array of {label, value} rows; drop rows with nothing in them.
        $data['specs'] = collect($data['specs'] ?? [])
            ->filter(fn (array $row): bool => filled($row['label'] ?? null) || filled($row['value'] ?? null))
            ->values()
            ->all();

        if ($request->hasFile('image')) {
            if ($product?->image_path !== null) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        if ($request->hasFile('datasheet')) {
            if ($product?->datasheet_path !== null) {
                Storage::disk('public')->delete($product->datasheet_path);
            }
            $data['datasheet_path'] = $request->file('datasheet')->store('datasheets', 'public');
        }

        return $data;
    }

    /**
     * Ensure the slug is unique, appending -2, -3, … on collision.
     */
    private function uniqueSlug(string $base, ?int $ignoreId): string
    {
        $slug = $base;
        $suffix = 2;

        while (
            Product::where('slug', $slug)
                ->when($ignoreId !== null, fn ($query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
