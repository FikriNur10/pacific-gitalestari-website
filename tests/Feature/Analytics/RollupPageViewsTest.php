<?php

use App\Models\PageView;
use App\Models\PageViewDaily;

test('the rollup command aggregates a day into page_view_daily', function () {
    $day = today()->subDay();

    PageView::factory()->create(['path' => 'tentang', 'session_hash' => 'a', 'viewed_at' => $day->setTime(10, 0)]);
    PageView::factory()->create(['path' => 'tentang', 'session_hash' => 'a', 'viewed_at' => $day->setTime(11, 0)]);
    PageView::factory()->create(['path' => 'tentang', 'session_hash' => 'b', 'viewed_at' => $day->setTime(12, 0)]);

    $this->artisan('analytics:rollup')->assertSuccessful();

    $row = PageViewDaily::where('path', 'tentang')->firstOrFail();
    expect($row->views)->toBe(3)
        ->and($row->uniques)->toBe(2);
});

test('the rollup is idempotent for a given day', function () {
    PageView::factory()->create(['path' => 'solusi', 'viewed_at' => today()->subDay()->setTime(9, 0)]);

    $this->artisan('analytics:rollup')->assertSuccessful();
    $this->artisan('analytics:rollup')->assertSuccessful();

    expect(PageViewDaily::where('path', 'solusi')->count())->toBe(1);
});

test('an explicit --date can be rolled up', function () {
    PageView::factory()->create(['path' => 'faq', 'viewed_at' => today()->setTime(8, 0)]);

    $this->artisan('analytics:rollup', ['--date' => today()->toDateString()])
        ->assertSuccessful();

    expect(PageViewDaily::where('path', 'faq')->where('date', today()->toDateString())->exists())
        ->toBeTrue();
});
