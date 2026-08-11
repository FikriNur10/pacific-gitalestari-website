<?php

use App\Models\Faq;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access FAQ administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/faq')
        ->assertForbidden();
});

test('an admin sees the FAQ list', function () {
    Faq::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/faq')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/faq/index')
            ->has('faqs.data', 3)
        );
});

test('an admin can create a FAQ', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/faq', [
            'question' => 'Apakah tersedia layanan on-site?',
            'answer' => 'Ya, tersedia.',
            'category' => 'Layanan Teknis & QA',
            'sort_order' => 1,
            'status' => 'published',
        ])
        ->assertRedirect('/admin/faq');

    expect(Faq::where('question', 'Apakah tersedia layanan on-site?')->exists())->toBeTrue();
});

test('the question and answer are required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/faq', ['status' => 'draft'])
        ->assertSessionHasErrors(['question', 'answer']);
});

test('an admin can update a FAQ', function () {
    $faq = Faq::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.faq.update', $faq), [
            'question' => 'Pertanyaan baru?',
            'answer' => 'Jawaban baru.',
            'status' => 'published',
        ])
        ->assertRedirect('/admin/faq');

    expect($faq->fresh()->question)->toBe('Pertanyaan baru?');
});

test('an admin can delete a FAQ', function () {
    $faq = Faq::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.faq.destroy', $faq))
        ->assertRedirect('/admin/faq');

    expect(Faq::count())->toBe(0);
});
