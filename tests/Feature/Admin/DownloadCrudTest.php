<?php

use App\Enums\ContentStatus;
use App\Models\Download;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access download administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/download')
        ->assertForbidden();
});

test('an admin sees the download list', function () {
    Download::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/download')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/download/index')
            ->has('downloads.data', 3)
        );
});

test('an admin can create a document with an uploaded file', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post('/admin/download', [
            'title' => 'Katalog Uji Coba',
            'status' => 'published',
            'file' => UploadedFile::fake()->create('katalog.pdf', 512, 'application/pdf'),
        ])
        ->assertRedirect('/admin/download');

    $document = Download::first();
    expect($document->title)->toBe('Katalog Uji Coba')
        ->and($document->status)->toBe(ContentStatus::Published)
        ->and($document->published_at)->not->toBeNull()
        ->and($document->file_name)->toBe('katalog.pdf')
        ->and($document->file_size)->toBeGreaterThan(0)
        ->and($document->mime)->not->toBeNull();

    Storage::disk('public')->assertExists($document->file_path);
});

test('the title is required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/download', ['status' => 'draft'])
        ->assertSessionHasErrors('title');
});

test('the file is required on create', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/download', ['title' => 'Tanpa Berkas', 'status' => 'draft'])
        ->assertSessionHasErrors('file');
});

test('a disallowed file type is rejected', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/download', [
            'title' => 'Berkas Salah',
            'status' => 'draft',
            'file' => UploadedFile::fake()->create('gambar.png', 100, 'image/png'),
        ])
        ->assertSessionHasErrors('file');
});

test('an admin can update a document and replacing the file deletes the old one', function () {
    Storage::fake('public');
    $document = Download::factory()->create([
        'file_path' => UploadedFile::fake()->create('lama.pdf', 200)->store('downloads', 'public'),
    ]);
    $oldPath = $document->file_path;

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.download.update', $document), [
            'title' => 'Judul Baru',
            'status' => 'draft',
            'file' => UploadedFile::fake()->create('baru.pdf', 300, 'application/pdf'),
        ])
        ->assertRedirect('/admin/download');

    $document->refresh();
    expect($document->title)->toBe('Judul Baru')
        ->and($document->file_name)->toBe('baru.pdf')
        ->and($document->file_path)->not->toBe($oldPath);

    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($document->file_path);
});

test('an admin can update a document without replacing the file', function () {
    Storage::fake('public');
    $document = Download::factory()->create([
        'file_name' => 'tetap.pdf',
        'file_path' => UploadedFile::fake()->create('tetap.pdf', 200)->store('downloads', 'public'),
    ]);
    $originalPath = $document->file_path;

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.download.update', $document), [
            'title' => 'Judul Diperbarui',
            'status' => 'draft',
        ])
        ->assertRedirect('/admin/download');

    $document->refresh();
    expect($document->title)->toBe('Judul Diperbarui')
        ->and($document->file_name)->toBe('tetap.pdf')
        ->and($document->file_path)->toBe($originalPath);
});

test('an admin can delete a document and its file', function () {
    Storage::fake('public');
    $document = Download::factory()->create([
        'file_path' => UploadedFile::fake()->create('hapus.pdf', 200)->store('downloads', 'public'),
    ]);
    $path = $document->file_path;

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.download.destroy', $document))
        ->assertRedirect('/admin/download');

    expect(Download::count())->toBe(0);
    Storage::disk('public')->assertMissing($path);
});
