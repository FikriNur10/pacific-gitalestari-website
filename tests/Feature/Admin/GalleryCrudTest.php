<?php

use App\Enums\ContentStatus;
use App\Models\GalleryItem;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access gallery administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/galeri')
        ->assertForbidden();
});

test('an admin sees the gallery list', function () {
    GalleryItem::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/galeri')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/galeri/index')
            ->has('items.data', 3)
        );
});

test('an admin can create a gallery item with an uploaded image', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/galeri', [
            'title' => 'Foto Fasilitas',
            'category' => 'Fasilitas',
            'status' => 'published',
            'image' => UploadedFile::fake()->image('foto.jpg'),
        ])
        ->assertRedirect('/admin/galeri');

    $item = GalleryItem::first();
    expect($item->title)->toBe('Foto Fasilitas')
        ->and($item->category)->toBe('Fasilitas')
        ->and($item->status)->toBe(ContentStatus::Published);

    Storage::disk('public')->assertExists($item->image_path);
});

test('the title is required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/galeri', ['status' => 'draft'])
        ->assertSessionHasErrors('title');
});

test('the image is required on create', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/galeri', ['title' => 'Tanpa Foto', 'status' => 'draft'])
        ->assertSessionHasErrors('image');
});

test('a non-image upload is rejected', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/galeri', [
            'title' => 'Berkas Salah',
            'status' => 'draft',
            'image' => UploadedFile::fake()->create('dokumen.pdf', 100, 'application/pdf'),
        ])
        ->assertSessionHasErrors('image');
});

test('an admin can update a gallery item and replacing the image deletes the old one', function () {
    Storage::fake('public');
    $item = GalleryItem::factory()->create([
        'image_path' => UploadedFile::fake()->image('lama.jpg')->store('gallery', 'public'),
    ]);
    $oldPath = $item->image_path;

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.galeri.update', $item), [
            'title' => 'Judul Baru',
            'status' => 'draft',
            'image' => UploadedFile::fake()->image('baru.jpg'),
        ])
        ->assertRedirect('/admin/galeri');

    $item->refresh();
    expect($item->title)->toBe('Judul Baru')
        ->and($item->image_path)->not->toBe($oldPath);

    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($item->image_path);
});

test('an admin can update a gallery item without replacing the image', function () {
    Storage::fake('public');
    $item = GalleryItem::factory()->create([
        'image_path' => UploadedFile::fake()->image('tetap.jpg')->store('gallery', 'public'),
    ]);
    $originalPath = $item->image_path;

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.galeri.update', $item), [
            'title' => 'Judul Diperbarui',
            'status' => 'published',
        ])
        ->assertRedirect('/admin/galeri');

    $item->refresh();
    expect($item->title)->toBe('Judul Diperbarui')
        ->and($item->image_path)->toBe($originalPath);
});

test('an admin can delete a gallery item and its image', function () {
    Storage::fake('public');
    $item = GalleryItem::factory()->create([
        'image_path' => UploadedFile::fake()->image('hapus.jpg')->store('gallery', 'public'),
    ]);
    $path = $item->image_path;

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.galeri.destroy', $item))
        ->assertRedirect('/admin/galeri');

    expect(GalleryItem::count())->toBe(0);
    Storage::disk('public')->assertMissing($path);
});
