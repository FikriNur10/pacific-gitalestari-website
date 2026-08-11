<?php

use App\Models\PageView;
use App\Models\User;

test('a public marketing page view is recorded', function () {
    $this->get('/tentang')->assertOk();

    expect(PageView::count())->toBe(1);

    $view = PageView::first();
    expect($view->path)->toBe('tentang')
        ->and($view->device)->toBeIn(['mobile', 'desktop']);
});

test('the raw IP is never stored — only a hash', function () {
    $this->get('/tentang')->assertOk();

    $view = PageView::firstOrFail();
    expect($view->ip_hash)
        ->not->toBe('127.0.0.1')
        ->and(strlen($view->ip_hash))->toBe(64); // sha256 hex
});

test('bot traffic is not recorded', function () {
    $this->withHeader('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1)')
        ->get('/tentang')
        ->assertOk();

    expect(PageView::count())->toBe(0);
});

test('a Do-Not-Track request is not recorded', function () {
    $this->withHeader('DNT', '1')->get('/tentang')->assertOk();

    expect(PageView::count())->toBe(0);
});

test('admin and system routes are not recorded', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/berita')
        ->assertOk();

    expect(PageView::count())->toBe(0);
});

test('unique visitors are counted per session hash', function () {
    PageView::factory()->create(['session_hash' => 'x', 'viewed_at' => today()]);
    PageView::factory()->create(['session_hash' => 'x', 'viewed_at' => today()]);
    PageView::factory()->create(['session_hash' => 'y', 'viewed_at' => today()]);

    $unique = PageView::whereDate('viewed_at', today())
        ->distinct('session_hash')
        ->count('session_hash');

    expect($unique)->toBe(2);
});
