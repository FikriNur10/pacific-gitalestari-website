<?php

use App\Models\Faq;
use Inertia\Testing\AssertableInertia as Assert;

test('the FAQ page groups published questions by category', function () {
    Faq::factory()->create(['category' => 'Umum', 'status' => 'published']);
    Faq::factory()->create(['category' => 'Umum', 'status' => 'published']);
    Faq::factory()->create(['category' => 'Produk', 'status' => 'published']);
    Faq::factory()->draft()->create(['category' => 'Umum']);

    $this->get('/faq')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('faq')
            ->has('groups', 2) // Umum + Produk; draft excluded
        );
});

test('the answer keeps whitelisted rich-text HTML and strips scripts', function () {
    Faq::factory()->create([
        'category' => 'Umum',
        'status' => 'published',
        'answer' => 'jawaban <strong>tebal</strong> <script>alert(1)</script>',
    ]);

    $this->get('/faq')
        ->assertInertia(fn (Assert $page) => $page
            ->where('groups.0.items.0.answerHtml', fn (string $html) => str_contains($html, '<strong>tebal</strong>') && ! str_contains($html, '<script>'))
        );
});

test('a draft-only category is not shown', function () {
    Faq::factory()->draft()->create(['category' => 'Rahasia']);

    $this->get('/faq')
        ->assertInertia(fn (Assert $page) => $page->has('groups', 0));
});
