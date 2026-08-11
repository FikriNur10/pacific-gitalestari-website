<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Inertia\Response;

class BeritaController extends Controller
{
    /**
     * Public news index — published articles only, newest first.
     */
    public function index(): Response
    {
        $articles = News::query()
            ->published()
            ->latest('published_at')
            ->paginate(9)
            ->through(fn (News $item): array => [
                'title' => $item->title,
                'slug' => $item->slug,
                'excerpt' => $item->excerpt,
                'category' => $item->category,
                'coverUrl' => $item->coverUrl(),
                'publishedAt' => $item->published_at?->locale('id')->translatedFormat('d F Y'),
            ]);

        return Inertia::render('berita', [
            'articles' => $articles,
            'meta' => $this->meta([
                'title' => 'Berita & Artikel — Pacific Gitalestari',
                'description' => 'Kabar terbaru, wawasan teknis, dan aktivitas PT. Pacific Gitalestari seputar chemical supporting & solusi industri.',
            ]),
        ]);
    }

    /**
     * Public article detail. Draft / future-dated posts 404.
     */
    public function show(News $news): Response
    {
        abort_unless($news->status->value === 'published'
            && $news->published_at !== null
            && $news->published_at->isPast(), 404);

        $cover = $news->coverUrl();

        return Inertia::render('berita-detail', [
            'article' => [
                'title' => $news->title,
                'category' => $news->category,
                'coverUrl' => $cover,
                'publishedAt' => $news->published_at?->locale('id')->translatedFormat('d F Y'),
                'bodyHtml' => $news->bodyHtml(),
                'metaTitle' => $news->meta_title ?? $news->title,
                'metaDescription' => $news->meta_description ?? $news->excerpt,
            ],
            // Per-article OG: the article's own title, excerpt, and cover (absolute
            // URL) so a shared link previews the article, not the site default.
            'meta' => $this->meta([
                'title' => $news->meta_title ?? $news->title,
                'description' => $news->meta_description ?? $news->excerpt,
                'image' => $cover !== null ? url($cover) : null,
            ]),
        ]);
    }
}
