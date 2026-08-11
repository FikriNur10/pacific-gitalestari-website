<?php

use App\Enums\ContentStatus;
use App\Models\LegalDocument;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access legal document administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/legalitas')
        ->assertForbidden();
});

test('an admin sees the legal document list', function () {
    LegalDocument::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/legalitas')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/legalitas/index')
            ->has('documents.data', 3)
        );
});

test('an admin can create a legal document with a PDF and image', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/legalitas', [
            'title' => 'NIB Perusahaan',
            'category' => 'Legalitas',
            'issuer' => 'OSS',
            'status' => 'published',
            'file' => UploadedFile::fake()->create('nib.pdf', 300, 'application/pdf'),
            'image' => UploadedFile::fake()->image('nib.jpg'),
        ])
        ->assertRedirect('/admin/legalitas');

    $document = LegalDocument::first();
    expect($document->title)->toBe('NIB Perusahaan')
        ->and($document->category)->toBe('Legalitas')
        ->and($document->status)->toBe(ContentStatus::Published)
        ->and($document->file_path)->not->toBeNull()
        ->and($document->image_path)->not->toBeNull();

    Storage::disk('public')->assertExists($document->file_path);
    Storage::disk('public')->assertExists($document->image_path);
});

test('the title is required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/legalitas', ['status' => 'draft'])
        ->assertSessionHasErrors('title');
});

test('the expiry date must not precede the issue date', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/legalitas', [
            'title' => 'Sertifikat',
            'status' => 'draft',
            'issued_at' => '2024-06-01',
            'expires_at' => '2024-01-01',
        ])
        ->assertSessionHasErrors('expires_at');
});

test('a non-PDF file upload is rejected', function () {
    Storage::fake('public');

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/legalitas', [
            'title' => 'Salah',
            'status' => 'draft',
            'file' => UploadedFile::fake()->image('gambar.jpg'),
        ])
        ->assertSessionHasErrors('file');
});

test('an admin can update a document and replacing the PDF deletes the old one', function () {
    Storage::fake('public');
    $document = LegalDocument::factory()->create([
        'file_path' => UploadedFile::fake()->create('lama.pdf', 200)->store('legal', 'public'),
    ]);
    $oldPath = $document->file_path;

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.legalitas.update', $document), [
            'title' => 'Judul Baru',
            'status' => 'draft',
            'file' => UploadedFile::fake()->create('baru.pdf', 300, 'application/pdf'),
        ])
        ->assertRedirect('/admin/legalitas');

    $document->refresh();
    expect($document->title)->toBe('Judul Baru')
        ->and($document->file_path)->not->toBe($oldPath);

    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists($document->file_path);
});

test('an admin can delete a document and its files', function () {
    Storage::fake('public');
    $document = LegalDocument::factory()->create([
        'file_path' => UploadedFile::fake()->create('hapus.pdf', 200)->store('legal', 'public'),
        'image_path' => UploadedFile::fake()->image('hapus.jpg')->store('legal', 'public'),
    ]);
    $filePath = $document->file_path;
    $imagePath = $document->image_path;

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.legalitas.destroy', $document))
        ->assertRedirect('/admin/legalitas');

    expect(LegalDocument::count())->toBe(0);
    Storage::disk('public')->assertMissing($filePath);
    Storage::disk('public')->assertMissing($imagePath);
});
