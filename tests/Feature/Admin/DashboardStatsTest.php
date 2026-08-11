<?php

use App\Models\News;
use App\Models\PageView;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    // 3 views today across 2 distinct sessions, 2 older views. tentang leads.
    PageView::factory()->create(['session_hash' => 'a', 'path' => 'tentang', 'viewed_at' => today()->addHours(1)]);
    PageView::factory()->create(['session_hash' => 'a', 'path' => 'tentang', 'viewed_at' => today()->addHours(2)]);
    PageView::factory()->create(['session_hash' => 'b', 'path' => 'solusi', 'viewed_at' => today()->addHours(3)]);
    PageView::factory()->create(['session_hash' => 'c', 'path' => 'tentang', 'viewed_at' => today()->subDays(3)]);
    PageView::factory()->create(['session_hash' => 'd', 'path' => 'kontak', 'viewed_at' => today()->subDays(5)]);
});

test('dashboard aggregates traffic stats correctly', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('stats.totalViews', 5)
            ->where('stats.viewsToday', 3)
            ->where('stats.uniqueVisitorsToday', 2)
            ->etc()
        );
});

test('dashboard ranks the most-viewed pages first', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/dashboard')
        ->assertInertia(fn (Assert $page) => $page
            ->where('topPages.0.path', 'tentang')
            ->where('topPages.0.views', 3)
            ->etc()
        );
});

test('dashboard trend is a gap-filled 7-day series', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/dashboard')
        ->assertInertia(fn (Assert $page) => $page
            ->has('trend', 7)
            ->where('trend.6.views', 3) // last element = today
            ->etc()
        );
});

test('dashboard exposes content counts and top articles', function () {
    News::factory()->count(2)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/dashboard')
        ->assertInertia(fn (Assert $page) => $page
            ->where('contentCounts.news', 2)
            ->has('topArticles')
            ->has('totalDownloads')
            ->etc()
        );
});
