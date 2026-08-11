<?php

use App\Models\News;
use App\Models\SiteSetting;

/**
 * OG/social meta must be rendered SERVER-SIDE in the initial HTML — link-preview
 * crawlers (WhatsApp, Facebook, Google) never run JS, so the client-side Inertia
 * <Head> is invisible to them. These tests assert the tags are present in the raw
 * blade response, not the Inertia XHR payload.
 */
test('public pages render OG meta tags server-side from site settings', function () {
    SiteSetting::current()->update([
        'meta_title' => 'Judul OG Uji',
        'meta_description' => 'Deskripsi OG untuk pratinjau tautan.',
    ]);

    $html = $this->get('/')->assertOk()->getContent();

    expect($html)
        ->toContain('property="og:title"')
        ->toContain('property="og:description"')
        ->toContain('property="og:image"')
        ->toContain('name="twitter:card"')
        ->toContain('Judul OG Uji')
        ->toContain('Deskripsi OG untuk pratinjau tautan.');
});

test('the OG image falls back to a bundled default when none is uploaded', function () {
    // Fresh settings: no uploaded image.
    $html = $this->get('/')->assertOk()->getContent();

    expect($html)->toContain('logo-pgl-white-background.png');
});

test('the OG image url is absolute', function () {
    $image = SiteSetting::current()->ogImageUrl();

    expect($image)->toStartWith('http');
});

test('an article page overrides OG with its own title and excerpt', function () {
    $news = News::factory()->create([
        'title' => 'Judul Artikel Uji',
        'excerpt' => 'Ringkasan artikel uji untuk pratinjau.',
        'meta_title' => null,
        'meta_description' => null,
        'status' => 'published',
        'published_at' => now()->subDay(),
    ]);

    $html = $this->get("/berita/{$news->slug}")->assertOk()->getContent();

    // Assert the exact tag content so this proves the OG override — not merely that
    // the title appears somewhere (it is also in the Inertia data-page payload).
    expect($html)
        ->toContain('<meta property="og:title" content="Judul Artikel Uji">')
        ->toContain('<meta property="og:description" content="Ringkasan artikel uji untuk pratinjau.">');
});

test('a section page sets its own OG title', function () {
    $html = $this->get('/legalitas')->assertOk()->getContent();

    expect($html)->toContain(
        '<meta property="og:title" content="Legalitas &amp; Sertifikasi — Pacific Gitalestari">',
    );
});
