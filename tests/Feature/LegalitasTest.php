<?php

use App\Models\LegalDocument;
use Inertia\Testing\AssertableInertia as Assert;

test('the public legalitas page lists only published documents', function () {
    LegalDocument::factory()->count(2)->create(); // published by default
    LegalDocument::factory()->draft()->create();

    $this->get('/legalitas')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('legalitas')
            ->has('documents', 2)
        );
});

test('the legalitas page is reachable by guests', function () {
    $this->get('/legalitas')->assertOk();
});

test('documents are ordered by sort_order', function () {
    LegalDocument::factory()->create(['title' => 'Kedua', 'sort_order' => 2]);
    LegalDocument::factory()->create(['title' => 'Pertama', 'sort_order' => 1]);

    $this->get('/legalitas')
        ->assertInertia(fn (Assert $page) => $page
            ->where('documents.0.title', 'Pertama')
            ->where('documents.1.title', 'Kedua')
        );
});

test('the legalitas route is included in the sitemap', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertSee(url('/legalitas'));
});
