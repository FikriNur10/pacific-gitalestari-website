<?php

use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\DownloadController as AdminDownloadController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\HeroBackgroundController;
use App\Http\Controllers\Admin\LegalDocumentController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SiteSettingController;
use Illuminate\Support\Facades\Route;

// CMS admin area — gated by auth + email verification + the `admin` role.
Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard lives at /dashboard (see web.php) — this group is CRUD-only.

        // Contact inbox (read-only content; status + delete only).
        Route::get('kontak', [ContactSubmissionController::class, 'index'])->name('kontak.index');
        Route::get('kontak/{submission}', [ContactSubmissionController::class, 'show'])->name('kontak.show');
        Route::patch('kontak/{submission}', [ContactSubmissionController::class, 'update'])->name('kontak.update');
        Route::delete('kontak/{submission}', [ContactSubmissionController::class, 'destroy'])->name('kontak.destroy');

        // Berita (News) — full CRUD; route param is {news}.
        Route::resource('berita', NewsController::class)
            ->parameters(['berita' => 'news'])
            ->except(['show']);

        // Proyek (Projects) — full CRUD; route param is {project}.
        Route::resource('proyek', ProjectController::class)
            ->parameters(['proyek' => 'project'])
            ->except(['show']);

        // Produk Kimia (Products) — full CRUD; route param is {product}.
        Route::resource('produk-kimia', ProductController::class)
            ->parameters(['produk-kimia' => 'product'])
            ->except(['show']);

        // Download (dokumen) — full CRUD; route param is {download}, id-bound.
        Route::resource('download', AdminDownloadController::class)
            ->except(['show']);

        // FAQ — full CRUD; route param is {faq}, id-bound.
        Route::resource('faq', FaqController::class)
            ->except(['show']);

        // Galeri (gallery photos) — full CRUD; route param is {galleryItem}, id-bound.
        Route::resource('galeri', GalleryController::class)
            ->parameters(['galeri' => 'galleryItem'])
            ->except(['show']);

        // Legalitas & Sertifikasi (legal documents) — full CRUD; param {legalDocument}, id-bound.
        Route::resource('legalitas', LegalDocumentController::class)
            ->parameters(['legalitas' => 'legalDocument'])
            ->except(['show']);

        // Latar Hero — per-page Hero background overrides. {page} is a HeroPage
        // enum (implicit binding → unknown page 404s). Update is POST (not PUT) so
        // the file upload is a plain multipart request without method spoofing.
        Route::get('latar-hero', [HeroBackgroundController::class, 'index'])->name('latar-hero.index');
        Route::post('latar-hero/{page}', [HeroBackgroundController::class, 'update'])->name('latar-hero.update');
        Route::delete('latar-hero/{page}', [HeroBackgroundController::class, 'destroy'])->name('latar-hero.destroy');

        // Pengaturan Situs — singleton (default OG/social meta). Edit + update only.
        Route::get('pengaturan', [SiteSettingController::class, 'edit'])->name('pengaturan.edit');
        Route::put('pengaturan', [SiteSettingController::class, 'update'])->name('pengaturan.update');
    });
