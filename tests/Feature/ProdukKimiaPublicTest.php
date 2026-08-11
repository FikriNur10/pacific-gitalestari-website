<?php

use App\Models\Product;
use Inertia\Testing\AssertableInertia as Assert;

test('the index lists only published products', function () {
    Product::factory()->count(2)->create();   // published
    Product::factory()->draft()->create();     // draft

    $this->get('/produk-kimia')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('produk-kimia')
            ->has('products.data', 2)
        );
});

test('a draft product does not appear on the public catalog', function () {
    Product::factory()->create(['name' => 'Produk Terbit']);
    Product::factory()->draft()->create(['name' => 'Produk Draf']);

    $this->get('/produk-kimia')
        ->assertInertia(fn (Assert $page) => $page
            ->where('products.data', fn ($data) => collect($data)->pluck('name')->doesntContain('Produk Draf'))
        );
});
