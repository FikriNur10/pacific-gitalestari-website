<?php

use App\Enums\ContactStatus;
use App\Models\ContactSubmission;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access the contact inbox', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/kontak')
        ->assertForbidden();
});

test('an admin sees the paginated inbox', function () {
    ContactSubmission::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/kontak')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/kontak/index')
            ->has('submissions.data', 3)
            ->where('newCount', 3)
        );
});

test('opening a new submission marks it read', function () {
    $submission = ContactSubmission::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get(route('admin.kontak.show', $submission))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/kontak/show'));

    expect($submission->fresh()->status)->toBe(ContactStatus::Read);
});

test('marking handled records the handler and timestamp', function () {
    $submission = ContactSubmission::factory()->create();
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->patch(route('admin.kontak.update', $submission), ['status' => 'handled'])
        ->assertRedirect();

    $submission->refresh();
    expect($submission->status)->toBe(ContactStatus::Handled)
        ->and($submission->handled_by)->toBe($admin->id)
        ->and($submission->handled_at)->not->toBeNull();
});

test('an invalid status is rejected', function () {
    $submission = ContactSubmission::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->patch(route('admin.kontak.update', $submission), ['status' => 'bogus'])
        ->assertSessionHasErrors('status');
});

test('an admin can delete a submission', function () {
    $submission = ContactSubmission::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.kontak.destroy', $submission))
        ->assertRedirect('/admin/kontak');

    expect(ContactSubmission::count())->toBe(0);
});

test('the status filter narrows the list', function () {
    ContactSubmission::factory()->count(2)->create();
    ContactSubmission::factory()->handled()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/kontak?status=handled')
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/kontak/index')
            ->has('submissions.data', 3)
        );
});
