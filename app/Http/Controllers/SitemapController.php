<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Static public routes to include (named routes → absolute URLs).
     *
     * @var array<int, string>
     */
    private const STATIC_ROUTES = [
        'home', 'tentang', 'solusi', 'proyek', 'produk-kimia',
        'proteksi', 'berita', 'kontak', 'faq', 'download', 'galeri', 'legalitas',
    ];

    /**
     * Dynamic XML sitemap: static marketing pages + every published article.
     */
    public function index(): Response
    {
        $urls = [];

        foreach (self::STATIC_ROUTES as $name) {
            $urls[] = ['loc' => route($name), 'lastmod' => null];
        }

        News::query()
            ->published()
            ->latest('published_at')
            ->get(['slug', 'published_at'])
            ->each(function (News $news) use (&$urls): void {
                $urls[] = [
                    'loc' => route('berita.show', $news->slug),
                    'lastmod' => $news->published_at?->toAtomString(),
                ];
            });

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
