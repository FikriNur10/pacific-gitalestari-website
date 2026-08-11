<?php

use App\Models\News;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

/**
 * The dashboard Sonner toast is driven by two server-side contracts that these tests
 * lock down:
 *   - admin CRUD actions flash a `success` message on redirect, and
 *   - that message is exposed to every dashboard page via the shared `flash.success`
 *     prop (which the `use-flash-toast` hook turns into a toast).
 * The client hook itself can't be asserted here — the repo has no JS test runner — so
 * these guard the backend half the toast depends on.
 */
test('an admin CRUD action flashes a success message on redirect', function () {
    $news = News::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete("/admin/berita/{$news->slug}")
        ->assertRedirect('/admin/berita')
        ->assertSessionHas('success', 'Berita dihapus.');
});

test('the shared flash prop surfaces the success message to the dashboard', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->withSession(['success' => 'Data tersimpan.'])
        ->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->where('flash.success', 'Data tersimpan.'));
});

test('the shared flash prop surfaces an error message to the dashboard', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->withSession(['error' => 'Gagal menyimpan.'])
        ->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn (Assert $page): Assert => $page->where('flash.error', 'Gagal menyimpan.'));
});
