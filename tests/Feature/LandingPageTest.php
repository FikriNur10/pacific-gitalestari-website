<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the landing page renders at the home route', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('landing'));
});

test('the landing page is publicly accessible without authentication', function () {
    $this->get(route('home'))->assertOk();
});
