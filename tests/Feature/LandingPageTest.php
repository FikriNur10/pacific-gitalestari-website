<?php

use App\Models\LegalDocument;
use App\Models\Project;
use Inertia\Testing\AssertableInertia as Assert;

test('the landing page renders at the home route', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('landing'));
});

test('the landing page is publicly accessible without authentication', function () {
    $this->get(route('home'))->assertOk();
});

test('the home page exposes featuredProjects and certificates props', function () {
    Project::factory()->create();
    LegalDocument::factory()->create();

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('landing')
            ->has('featuredProjects', 1)
            ->has('certificates', 1)
            ->has('featuredProjects.0', fn (Assert $project) => $project
                ->hasAll(['title', 'slug', 'client', 'category', 'summary', 'coverUrl'])
            )
            ->has('certificates.0', fn (Assert $doc) => $doc
                ->hasAll(['id', 'title', 'category', 'issuer', 'fileUrl', 'imageUrl'])
            )
        );
});

test('the home page shows only published projects and certificates', function () {
    Project::factory()->count(2)->create();          // published
    Project::factory()->draft()->create();            // draft — excluded
    LegalDocument::factory()->create();               // published
    LegalDocument::factory()->draft()->create();      // draft — excluded

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->has('featuredProjects', 2)
            ->has('certificates', 1)
        );
});

test('the home page caps the featured portfolio at three projects', function () {
    Project::factory()->count(5)->create();

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page->has('featuredProjects', 3));
});

test('featured projects follow sort_order then newest', function () {
    Project::factory()->create(['title' => 'Second', 'sort_order' => 2]);
    Project::factory()->create(['title' => 'First', 'sort_order' => 1]);
    Project::factory()->create(['title' => 'Third', 'sort_order' => 3]);

    $this->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('featuredProjects.0.title', 'First')
            ->where('featuredProjects.1.title', 'Second')
            ->where('featuredProjects.2.title', 'Third')
        );
});
