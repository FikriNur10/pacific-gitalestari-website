<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\News;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $news = News::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (News $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'category' => $item->category,
                'status' => $item->status->value,
                'statusLabel' => $item->status->label(),
                'publishedAt' => $item->published_at?->toDateString(),
            ]);

        return Inertia::render('admin/berita/index', [
            'news' => $news,
            'filters' => ['search' => $search ?: null],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/berita/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreNewsRequest $request): RedirectResponse
    {
        $data = $this->prepare($request);
        $data['author_id'] = $request->user()->id;

        News::create($data);

        return redirect()
            ->route('admin.berita.index')
            ->with('success', 'Berita dibuat.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('admin/berita/edit', [
            'news' => [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'excerpt' => $news->excerpt,
                'body' => $news->body,
                'category' => $news->category,
                'status' => $news->status->value,
                'publishedAt' => $news->published_at?->format('Y-m-d\TH:i'),
                'coverUrl' => $news->coverUrl(),
                'metaTitle' => $news->meta_title,
                'metaDescription' => $news->meta_description,
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news): RedirectResponse
    {
        $data = $this->prepare($request, $news);

        $news->update($data);

        return redirect()
            ->route('admin.berita.index')
            ->with('success', 'Berita diperbarui.');
    }

    public function destroy(News $news): RedirectResponse
    {
        if ($news->cover_path !== null) {
            Storage::disk('public')->delete($news->cover_path);
        }

        $news->delete();

        return redirect()
            ->route('admin.berita.index')
            ->with('success', 'Berita dihapus.');
    }

    /**
     * Build the persistable attributes from the request: slug, publish time, cover.
     *
     * @return array<string, mixed>
     */
    private function prepare(StoreNewsRequest|UpdateNewsRequest $request, ?News $news = null): array
    {
        $data = $request->safe()->except(['cover']);

        // Auto-slug from the title when left blank; keep it unique.
        $data['slug'] = $this->uniqueSlug(
            ($data['slug'] ?? null) ?: Str::slug($data['title']),
            $news?->id,
        );

        // A published post always has a timestamp; a draft keeps none unless set.
        $status = ContentStatus::from($data['status']);
        if ($status === ContentStatus::Published && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        if ($request->hasFile('cover')) {
            if ($news?->cover_path !== null) {
                Storage::disk('public')->delete($news->cover_path);
            }
            $data['cover_path'] = $request->file('cover')->store('news', 'public');
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
            News::where('slug', $slug)
                ->when($ignoreId !== null, fn ($query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
