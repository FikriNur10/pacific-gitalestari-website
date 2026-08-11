<?php

use App\Models\News;
use Inertia\Testing\AssertableInertia as Assert;

test('the index lists only published articles', function () {
    News::factory()->count(2)->create();       // published, past
    News::factory()->draft()->create();         // draft
    News::factory()->scheduled()->create();     // future-dated

    $this->get('/berita')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('berita')
            ->has('articles.data', 2)
        );
});

test('a published article is viewable by slug and its rich-text HTML is rendered', function () {
    News::factory()->create(['slug' => 'artikel-uji', 'body' => '<p>teks <strong>tebal</strong></p>']);

    $this->get('/berita/artikel-uji')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('berita-detail')
            ->where('article.bodyHtml', fn (string $html) => str_contains($html, '<strong>tebal</strong>'))
        );
});

test('a draft article returns 404', function () {
    News::factory()->draft()->create(['slug' => 'draf-uji']);

    $this->get('/berita/draf-uji')->assertNotFound();
});

test('a future-dated article returns 404', function () {
    News::factory()->scheduled()->create(['slug' => 'terjadwal']);

    $this->get('/berita/terjadwal')->assertNotFound();
});

test('raw HTML in the body is stripped as an XSS guard', function () {
    News::factory()->create([
        'slug' => 'xss-uji',
        'body' => '<script>alert(1)</script> konten aman',
    ]);

    $this->get('/berita/xss-uji')
        ->assertInertia(fn (Assert $page) => $page
            ->where('article.bodyHtml', fn (string $html) => ! str_contains($html, '<script>'))
        );
});
