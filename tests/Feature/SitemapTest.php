<?php

use App\Models\News;

test('the sitemap lists static pages and published articles only', function () {
    News::factory()->create(['slug' => 'artikel-sitemap']);
    News::factory()->draft()->create(['slug' => 'draf-sitemap']);

    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('application/xml');

    $response->assertSee('/berita/artikel-sitemap', false)
        ->assertSee('/tentang', false)
        ->assertDontSee('draf-sitemap', false);
});

test('robots.txt disallows admin and points to the sitemap', function () {
    $this->get('/robots.txt')
        ->assertOk()
        ->assertSee('Disallow: /admin')
        ->assertSee('sitemap.xml');
});
