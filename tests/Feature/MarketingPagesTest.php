<?php

use Inertia\Testing\AssertableInertia as Assert;

test('marketing page is publicly accessible and renders its Inertia component', function (string $path, string $component) {
    $this->get($path)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'landing' => ['/', 'landing'],
    'tentang' => ['/tentang', 'tentang'],
    'solusi' => ['/solusi', 'solusi'],
    'proyek' => ['/proyek', 'proyek'],
    'produk-kimia' => ['/produk-kimia', 'produk-kimia'],
    'proteksi' => ['/proteksi', 'proteksi'],
    'berita' => ['/berita', 'berita'],
    'kontak' => ['/kontak', 'kontak'],
    'faq' => ['/faq', 'faq'],
    'download' => ['/download', 'download'],
]);
