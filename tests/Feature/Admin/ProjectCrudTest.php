<?php

use App\Enums\ContentStatus;
use App\Models\Project;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access project administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/proyek')
        ->assertForbidden();
});

test('an admin sees the project list', function () {
    Project::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/proyek')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/proyek/index')
            ->has('projects.data', 3)
        );
});

test('an admin can create a project and the slug is set', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/proyek', [
            'title' => 'Proyek Uji Coba',
            'status' => 'published',
            'summary' => 'Ringkasan proyek.',
        ])
        ->assertRedirect('/admin/proyek');

    $project = Project::first();
    expect($project->title)->toBe('Proyek Uji Coba')
        ->and($project->slug)->toBe('proyek-uji-coba')
        ->and($project->status)->toBe(ContentStatus::Published);
});

test('the title is required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/proyek', ['status' => 'draft'])
        ->assertSessionHasErrors('title');
});

test('a provided slug must be unique', function () {
    Project::factory()->create(['slug' => 'sudah-ada']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/proyek', [
            'title' => 'Apa Saja',
            'status' => 'draft',
            'slug' => 'sudah-ada',
        ])
        ->assertSessionHasErrors('slug');
});

test('an auto-generated slug avoids collisions', function () {
    Project::factory()->create(['slug' => 'proyek-uji-coba']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/proyek', ['title' => 'Proyek Uji Coba', 'status' => 'draft']);

    expect(Project::where('slug', 'proyek-uji-coba-2')->exists())->toBeTrue();
});

test('an admin can update a project', function () {
    $project = Project::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.proyek.update', $project), [
            'title' => 'Judul Baru',
            'status' => 'draft',
        ])
        ->assertRedirect('/admin/proyek');

    expect($project->fresh()->title)->toBe('Judul Baru');
});

test('an admin can delete a project', function () {
    $project = Project::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.proyek.destroy', $project))
        ->assertRedirect('/admin/proyek');

    expect(Project::count())->toBe(0);
});
