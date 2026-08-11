<?php

use App\Models\Download;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('the index lists only published documents', function () {
    Download::factory()->count(2)->create();     // published, past
    Download::factory()->draft()->create();       // draft
    Download::factory()->scheduled()->create();   // future-dated

    $this->get('/download')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('download')
            ->has('downloads', 2)
            ->has('categories')
        );
});

test('the file route serves the document and increments the download count', function () {
    Storage::fake('public');
    $document = Download::factory()->create([
        'download_count' => 0,
        'file_name' => 'katalog.pdf',
        'file_path' => UploadedFile::fake()->create('katalog.pdf', 256)->store('downloads', 'public'),
    ]);

    $this->get(route('download.file', $document))
        ->assertOk()
        ->assertDownload('katalog.pdf');

    expect($document->fresh()->download_count)->toBe(1);
});

test('the file route for a draft document returns 404', function () {
    Storage::fake('public');
    $document = Download::factory()->draft()->create([
        'file_path' => UploadedFile::fake()->create('draf.pdf', 100)->store('downloads', 'public'),
    ]);

    $this->get(route('download.file', $document))->assertNotFound();
    expect($document->fresh()->download_count)->toBe($document->download_count);
});

test('the file route for a future-dated document returns 404', function () {
    Storage::fake('public');
    $document = Download::factory()->scheduled()->create([
        'file_path' => UploadedFile::fake()->create('terjadwal.pdf', 100)->store('downloads', 'public'),
    ]);

    $this->get(route('download.file', $document))->assertNotFound();
});

test('the file route 404s when the stored file is missing', function () {
    Storage::fake('public');
    $document = Download::factory()->create(['file_path' => 'downloads/does-not-exist.pdf']);

    $this->get(route('download.file', $document))->assertNotFound();
    expect($document->fresh()->download_count)->toBe($document->download_count);
});
