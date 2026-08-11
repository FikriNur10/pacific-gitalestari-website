<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContactStatus;
use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use App\Models\Download;
use App\Models\Faq;
use App\Models\News;
use App\Models\PageView;
use App\Models\Product;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * CMS admin dashboard — first-party traffic analytics + content counts.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'totalViews' => PageView::count(),
                'viewsToday' => PageView::whereDate('viewed_at', today())->count(),
                'uniqueVisitorsToday' => PageView::whereDate('viewed_at', today())
                    ->distinct('session_hash')
                    ->count('session_hash'),
                'newSubmissions' => ContactSubmission::where('status', ContactStatus::New)->count(),
            ],
            'topPages' => $this->topPages(),
            'topArticles' => $this->topArticles(),
            'trend' => $this->trend(),
            'contentCounts' => [
                'news' => News::count(),
                'projects' => Project::count(),
                'products' => Product::count(),
                'downloads' => Download::count(),
                'faqs' => Faq::count(),
            ],
            'totalDownloads' => (int) Download::sum('download_count'),
        ]);
    }

    /**
     * Five most-read articles, derived from page views on `/berita/{slug}` paths
     * joined back to the article title.
     *
     * @return array<int, array{title: string, views: int}>
     */
    private function topArticles(): array
    {
        // 'berita/' is 7 chars → slug starts at position 8 (MySQL SUBSTRING is 1-indexed).
        $rows = PageView::query()
            ->selectRaw('SUBSTRING(path, 8) as slug, COUNT(*) as views')
            ->where('path', 'like', 'berita/%')
            ->groupBy('slug')
            ->orderByDesc('views')
            ->limit(5)
            ->get();

        $titles = News::whereIn('slug', $rows->pluck('slug'))->pluck('title', 'slug');

        return $rows
            ->map(fn ($row): array => [
                'title' => $titles[$row->slug] ?? $row->slug,
                'views' => (int) $row->views,
            ])
            ->all();
    }

    /**
     * Five most-viewed paths, all time.
     *
     * @return array<int, array{path: string, views: int}>
     */
    private function topPages(): array
    {
        return PageView::query()
            ->selectRaw('path, COUNT(*) as views')
            ->groupBy('path')
            ->orderByDesc('views')
            ->limit(5)
            ->get()
            ->map(fn (PageView $row): array => [
                'path' => $row->path,
                'views' => (int) $row->views,
            ])
            ->all();
    }

    /**
     * Page views per day for the last 7 days, gap-filled with zeros so the
     * frontend always renders a continuous series.
     *
     * @return array<int, array{date: string, views: int}>
     */
    private function trend(): array
    {
        $start = today()->subDays(6);

        $counts = PageView::query()
            ->selectRaw('DATE(viewed_at) as day, COUNT(*) as views')
            ->where('viewed_at', '>=', $start)
            ->groupBy('day')
            ->pluck('views', 'day');

        return collect(range(0, 6))
            ->map(function (int $offset) use ($start, $counts): array {
                $date = $start->addDays($offset)->toDateString();

                return [
                    'date' => $date,
                    'views' => (int) ($counts[$date] ?? 0),
                ];
            })
            ->all();
    }
}
