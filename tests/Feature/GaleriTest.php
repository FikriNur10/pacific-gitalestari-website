<?php

use App\Models\GalleryItem;
use Inertia\Testing\AssertableInertia as Assert;

test('the public gallery lists only published items', function () {
    GalleryItem::factory()->count(2)->create(); // published by default
    GalleryItem::factory()->draft()->create();

    $this->get('/galeri')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('galeri')
            ->has('items.data', 2)
        );
});

test('the gallery is reachable by guests', function () {
    $this->get('/galeri')->assertOk();
});

test('the category filter narrows the gallery to a single category', function () {
    GalleryItem::factory()->create(['category' => 'Fasilitas']);
    GalleryItem::factory()->create(['category' => 'Fasilitas']);
    GalleryItem::factory()->create(['category' => 'Proyek']);

    $this->get('/galeri?kategori=Fasilitas')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('galeri')
            ->where('activeCategory', 'Fasilitas')
            ->has('items.data', 2)
        );
});

test('the filter bar exposes only published categories', function () {
    GalleryItem::factory()->create(['category' => 'Fasilitas']);
    GalleryItem::factory()->draft()->create(['category' => 'Rahasia']);

    $this->get('/galeri')
        ->assertInertia(fn (Assert $page) => $page
            ->where('categories', ['Fasilitas'])
        );
});

test('the gallery route is included in the sitemap', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertSee(url('/galeri'));
});
