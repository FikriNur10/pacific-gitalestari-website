<?php

use App\Enums\HeroPage;
use App\Models\HeroBackground;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('a guest is redirected to login from latar hero', function () {
    $this->get('/admin/latar-hero')->assertRedirect(route('login'));
});

test('an editor cannot access latar hero', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/latar-hero')
        ->assertForbidden();
});

test('an admin sees every page listed', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/latar-hero')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/latar-hero/index')
            ->has('pages', count(HeroPage::cases()))
            ->where('pages.0.isCustom', false)
        );
});

test('an admin can upload a hero background and it becomes the override', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/latar-hero/tentang', [
            'image' => UploadedFile::fake()->image('hero.jpg', 1600, 700),
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    $hero = HeroBackground::query()->where('page', HeroPage::Tentang)->first();
    expect($hero)->not->toBeNull();
    Storage::disk('public')->assertExists($hero->image_path);

    // The override now surfaces in the globally-shared map.
    expect(HeroBackground::urlMap()['tentang'])->toBe($hero->imageUrl());
});

test('replacing a hero background deletes the old file', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)->post('/admin/latar-hero/berita', [
        'image' => UploadedFile::fake()->image('lama.jpg'),
    ])->assertRedirect();

    $oldPath = HeroBackground::query()->where('page', HeroPage::Berita)->value('image_path');
    Storage::disk('public')->assertExists($oldPath);

    $this->actingAs($admin)->post('/admin/latar-hero/berita', [
        'image' => UploadedFile::fake()->image('baru.jpg'),
    ])->assertRedirect();

    $newPath = HeroBackground::query()->where('page', HeroPage::Berita)->value('image_path');
    expect($newPath)->not->toBe($oldPath);
    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($newPath);

    // Still exactly one row per page (upsert, not insert).
    expect(HeroBackground::query()->where('page', HeroPage::Berita)->count())->toBe(1);
});

test('an admin can revert a page to its bundled default', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)->post('/admin/latar-hero/solusi', [
        'image' => UploadedFile::fake()->image('custom.jpg'),
    ])->assertRedirect();

    $path = HeroBackground::query()->where('page', HeroPage::Solusi)->value('image_path');

    $this->actingAs($admin)
        ->delete('/admin/latar-hero/solusi')
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(HeroBackground::query()->where('page', HeroPage::Solusi)->exists())->toBeFalse();
    Storage::disk('public')->assertMissing($path);
    // Falls back to the enum default.
    expect(HeroBackground::urlMap()['solusi'])->toBe(HeroPage::Solusi->defaultImagePath());
});

test('a non-image upload is rejected', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/latar-hero/kontak', [
            'image' => UploadedFile::fake()->create('berkas.pdf', 100, 'application/pdf'),
        ])
        ->assertSessionHasErrors('image');

    expect(HeroBackground::query()->where('page', HeroPage::Kontak)->exists())->toBeFalse();
});

test('an oversized image is rejected', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/latar-hero/faq', [
            'image' => UploadedFile::fake()->image('besar.jpg')->size(5000), // >4096 KB
        ])
        ->assertSessionHasErrors('image');
});

test('a missing image is rejected', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/latar-hero/download', [])
        ->assertSessionHasErrors('image');
});

test('an unknown page value 404s via enum route binding', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->delete('/admin/latar-hero/halaman-tidak-ada')
        ->assertNotFound();
});

test('public pages share the hero backgrounds map with overrides applied', function () {
    HeroBackground::create([
        'page' => HeroPage::Tentang,
        'image_path' => 'hero/custom-tentang.jpg',
    ]);

    $this->get('/tentang')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('heroBackgrounds', fn (Assert $map) => $map
                // Overridden page → storage URL.
                ->where('tentang', Storage::url('hero/custom-tentang.jpg'))
                // Untouched page → bundled default.
                ->where('beranda', HeroPage::Beranda->defaultImagePath())
                ->etc()
            )
        );
});

test('the url map contains every page keyed by its enum value', function () {
    $map = HeroBackground::urlMap();

    expect($map)->toHaveCount(count(HeroPage::cases()));

    foreach (HeroPage::cases() as $page) {
        expect($map)->toHaveKey($page->value);
        expect($map[$page->value])->toBe($page->defaultImagePath());
    }
});
