<?php

use App\Enums\ContactStatus;
use App\Models\ContactSubmission;

test('a valid submission is stored and redirects back with success', function () {
    $response = $this->from('/kontak')->post('/kontak', [
        'name' => 'Budi Santoso',
        'company' => 'PT Air Jernih',
        'email' => 'budi@airjernih.test',
        'phone' => '+62 812 0000 0000',
        'service' => 'Water Treatment & WWTP',
        'message' => 'Butuh konsultasi WWTP.',
    ]);

    $response->assertRedirect('/kontak')->assertSessionHas('success');

    expect(ContactSubmission::count())->toBe(1);

    $submission = ContactSubmission::first();
    expect($submission->name)->toBe('Budi Santoso')
        ->and($submission->status)->toBe(ContactStatus::New)
        ->and($submission->ip_hash)->not->toBe('127.0.0.1'); // hashed, not raw
});

test('required fields are validated', function () {
    $this->from('/kontak')->post('/kontak', [])
        ->assertRedirect('/kontak')
        ->assertSessionHasErrors(['name', 'company', 'email']);

    expect(ContactSubmission::count())->toBe(0);
});

test('an invalid email is rejected', function () {
    $this->from('/kontak')->post('/kontak', [
        'name' => 'A',
        'company' => 'B',
        'email' => 'not-an-email',
    ])->assertSessionHasErrors('email');

    expect(ContactSubmission::count())->toBe(0);
});

test('a filled honeypot is rejected as spam', function () {
    $this->from('/kontak')->post('/kontak', [
        'name' => 'Spam Bot',
        'company' => 'Bot Co',
        'email' => 'bot@spam.test',
        'website' => 'http://spam.test', // honeypot must stay empty
    ])->assertSessionHasErrors('website');

    expect(ContactSubmission::count())->toBe(0);
});
