<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DownloadController as PublicDownloadController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\KontakController;
use App\Http\Controllers\LegalitasController;
use App\Http\Controllers\ProdukKimiaController;
use App\Http\Controllers\ProyekController;
use App\Http\Controllers\SitemapController;
use App\Http\Middleware\RecordPageView;
use Illuminate\Support\Facades\Route;

// Public marketing pages (ported from the static prototype). RecordPageView is
// scoped to this group only — first-party analytics never touches admin/auth/system
// routes because they simply don't carry the middleware.
Route::middleware(RecordPageView::class)->group(function () {
    Route::inertia('/', 'landing')->name('home');

    Route::inertia('/tentang', 'tentang')->name('tentang');
    Route::inertia('/solusi', 'solusi')->name('solusi');
    Route::get('/proyek', [ProyekController::class, 'index'])->name('proyek');
    Route::get('/produk-kimia', [ProdukKimiaController::class, 'index'])->name('produk-kimia');
    Route::inertia('/proteksi', 'proteksi')->name('proteksi');
    Route::get('/berita', [BeritaController::class, 'index'])->name('berita');
    Route::get('/berita/{news:slug}', [BeritaController::class, 'show'])->name('berita.show');
    Route::inertia('/kontak', 'kontak')->name('kontak');
    Route::get('/faq', [FaqController::class, 'index'])->name('faq');
    Route::get('/download', [PublicDownloadController::class, 'index'])->name('download');
    Route::get('/galeri', [GaleriController::class, 'index'])->name('galeri');
    Route::get('/legalitas', [LegalitasController::class, 'index'])->name('legalitas');
});

// Public contact form submission — throttled, POST is never page-view recorded.
Route::post('/kontak', [KontakController::class, 'store'])
    ->middleware('throttle:6,1')
    ->name('kontak.store');

// File download endpoint — increments the counter, not a page view.
Route::get('/download/{download}/file', [PublicDownloadController::class, 'file'])
    ->name('download.file');

// SEO: dynamic sitemap + robots (served via routes so the Sitemap URL is absolute).
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
Route::get('/robots.txt', function () {
    $body = "User-agent: *\nDisallow: /admin\nDisallow: /settings\n\nSitemap: ".url('/sitemap.xml')."\n";

    return response($body, 200)->header('Content-Type', 'text/plain');
})->name('robots');

// The dashboard IS the CMS admin dashboard — admin-gated like the rest of the CMS.
// Consolidated from a separate /admin index so there is a single dashboard; the
// /admin/* group (admin.php) keeps only the CRUD resources.
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/admin.php';
require __DIR__.'/settings.php';
