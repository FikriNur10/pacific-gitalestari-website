<?php

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('a guest is redirected to login from site settings', function () {
    $this->get('/admin/pengaturan')->assertRedirect(route('login'));
});

test('an editor cannot access site settings', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/pengaturan')
        ->assertForbidden();
});

test('an admin sees the settings form', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/pengaturan')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/pengaturan/edit')
            ->has('settings')
        );
});

test('an admin can update the meta title and description', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->put('/admin/pengaturan', [
            'meta_title' => 'PGL — Judul Baru',
            'meta_description' => 'Deskripsi baru untuk pratinjau tautan.',
        ])
        ->assertRedirect('/admin/pengaturan');

    $settings = SiteSetting::current();
    expect($settings->meta_title)->toBe('PGL — Judul Baru')
        ->and($settings->meta_description)->toBe('Deskripsi baru untuk pratinjau tautan.');
});

test('an admin can upload an OG image and replacing it deletes the old one', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->put('/admin/pengaturan', [
            'meta_title' => 'Judul',
            'og_image' => UploadedFile::fake()->image('og.jpg', 1200, 630),
        ])
        ->assertRedirect('/admin/pengaturan');

    $oldPath = SiteSetting::current()->og_image_path;
    expect($oldPath)->not->toBeNull();
    Storage::disk('public')->assertExists($oldPath);

    $this->actingAs($admin)
        ->put('/admin/pengaturan', [
            'meta_title' => 'Judul',
            'og_image' => UploadedFile::fake()->image('og-baru.jpg', 1200, 630),
        ])
        ->assertRedirect('/admin/pengaturan');

    $newPath = SiteSetting::current()->og_image_path;
    expect($newPath)->not->toBe($oldPath);
    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($newPath);
});

test('a non-image OG upload is rejected', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->put('/admin/pengaturan', [
            'meta_title' => 'Judul',
            'og_image' => UploadedFile::fake()->create('berkas.pdf', 100, 'application/pdf'),
        ])
        ->assertSessionHasErrors('og_image');
});
