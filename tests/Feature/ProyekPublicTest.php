<?php

use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;

test('the index lists only published projects', function () {
    Project::factory()->count(2)->create();   // published
    Project::factory()->draft()->create();     // draft

    $this->get('/proyek')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('proyek')
            ->has('projects.data', 2)
        );
});

test('a draft project is not shown on the public index', function () {
    Project::factory()->draft()->create(['title' => 'Rahasia']);

    $this->get('/proyek')
        ->assertInertia(fn (Assert $page) => $page
            ->has('projects.data', 0)
        );
});
