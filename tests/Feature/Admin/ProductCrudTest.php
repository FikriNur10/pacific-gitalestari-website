<?php

use App\Enums\ContentStatus;
use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access product administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/produk-kimia')
        ->assertForbidden();
});

test('an admin sees the product list', function () {
    Product::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/produk-kimia')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/produk-kimia/index')
            ->has('products.data', 3)
        );
});

test('an admin can create a product and the slug is set', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/produk-kimia', [
            'name' => 'Corrosion Inhibitor Uji',
            'status' => 'published',
            'specs' => [
                ['label' => 'Bentuk', 'value' => 'Cair'],
                ['label' => '', 'value' => ''],
            ],
        ])
        ->assertRedirect('/admin/produk-kimia');

    $product = Product::first();
    expect($product->name)->toBe('Corrosion Inhibitor Uji')
        ->and($product->slug)->toBe('corrosion-inhibitor-uji')
        ->and($product->status)->toBe(ContentStatus::Published)
        ->and($product->specs)->toBe([['label' => 'Bentuk', 'value' => 'Cair']]);
});

test('an admin can store a per-spec description', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/produk-kimia', [
            'name' => 'Cooling Water Treatment',
            'status' => 'published',
            'specs' => [
                [
                    'label' => 'Produk',
                    'value' => 'Corrosion Inhibitor',
                    'description' => 'Melindungi permukaan logam dari korosi.',
                ],
            ],
        ])
        ->assertRedirect('/admin/produk-kimia');

    $spec = Product::first()->specs[0];
    expect($spec['value'])->toBe('Corrosion Inhibitor')
        ->and($spec['description'])->toBe('Melindungi permukaan logam dari korosi.');
});

test('the name is required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/produk-kimia', ['status' => 'draft'])
        ->assertSessionHasErrors('name');
});

test('a provided slug must be unique', function () {
    Product::factory()->create(['slug' => 'sudah-ada']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/produk-kimia', [
            'name' => 'Apa Saja',
            'status' => 'draft',
            'slug' => 'sudah-ada',
        ])
        ->assertSessionHasErrors('slug');
});

test('an auto-generated slug avoids collisions', function () {
    Product::factory()->create(['slug' => 'produk-uji']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/produk-kimia', ['name' => 'Produk Uji', 'status' => 'draft']);

    expect(Product::where('slug', 'produk-uji-2')->exists())->toBeTrue();
});

test('an admin can update a product', function () {
    $product = Product::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.produk-kimia.update', $product), [
            'name' => 'Nama Baru',
            'status' => 'draft',
        ])
        ->assertRedirect('/admin/produk-kimia');

    expect($product->fresh()->name)->toBe('Nama Baru');
});

test('an admin can delete a product', function () {
    $product = Product::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.produk-kimia.destroy', $product))
        ->assertRedirect('/admin/produk-kimia');

    expect(Product::count())->toBe(0);
});
