<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Testing\AssertableInertia as Assert;

test('guest is redirected to login from the admin area', function () {
    // /admin has no index anymore; hit a CRUD route to prove the group is gated.
    $this->get('/admin/berita')->assertRedirect(route('login'));
});

test('authenticated non-admin (editor) is forbidden from the admin area', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/berita')
        ->assertForbidden();
});

test('admin can open the dashboard and it renders the dashboard component', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->get('/dashboard')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('stats')
            ->has('topPages')
            ->has('trend', 7)
        );
});

test('isAdmin reflects the user role', function () {
    expect(User::factory()->admin()->create()->isAdmin())->toBeTrue()
        ->and(User::factory()->create()->isAdmin())->toBeFalse();
});

test('the admin gate allows admins and denies editors', function () {
    $admin = User::factory()->admin()->create();
    $editor = User::factory()->create();

    expect(Gate::forUser($admin)->allows('admin'))->toBeTrue()
        ->and(Gate::forUser($editor)->allows('admin'))->toBeFalse();
});

test('role casts to the UserRole enum', function () {
    expect(User::factory()->admin()->create()->role)->toBe(UserRole::Admin);
});
