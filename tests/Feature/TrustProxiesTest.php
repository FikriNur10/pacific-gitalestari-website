<?php

use Illuminate\Support\Facades\Route;

/*
 * Railway terminate TLS di edge & forward HTTP + X-Forwarded-Proto: https.
 * trustProxies(at: '*') di bootstrap/app.php harus bikin Laravel deteksi HTTPS
 * dan generate URL absolut (aset/font) sebagai https — mencegah mixed-content.
 */

test('generates https urls when the proxy reports X-Forwarded-Proto https', function () {
    Route::get('/__proxy-probe', fn () => [
        'secure' => request()->isSecure(),
        'url' => url('/build/assets/font.woff2'),
    ]);

    $response = $this->get('/__proxy-probe', ['X-Forwarded-Proto' => 'https']);

    $response->assertOk();
    expect($response->json('secure'))->toBeTrue();
    expect($response->json('url'))->toStartWith('https://');
});

test('keeps http scheme when no forwarded proto header is present', function () {
    Route::get('/__proxy-probe-plain', fn () => [
        'secure' => request()->isSecure(),
        'url' => url('/build/assets/font.woff2'),
    ]);

    $response = $this->get('/__proxy-probe-plain');

    $response->assertOk();
    expect($response->json('secure'))->toBeFalse();
    expect($response->json('url'))->toStartWith('http://');
});
