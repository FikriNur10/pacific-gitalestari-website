<?php

use App\Enums\ContentStatus;
use App\Models\News;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('an editor cannot access news administration', function () {
    $this->actingAs(User::factory()->create())
        ->get('/admin/berita')
        ->assertForbidden();
});

test('an admin sees the news list', function () {
    News::factory()->count(3)->create();

    $this->actingAs(User::factory()->admin()->create())
        ->get('/admin/berita')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/berita/index')
            ->has('news.data', 3)
        );
});

test('an admin can create an article and the slug + author are set', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post('/admin/berita', [
            'title' => 'Judul Uji Coba',
            'status' => 'published',
            'body' => 'Isi artikel.',
        ])
        ->assertRedirect('/admin/berita');

    $article = News::first();
    expect($article->title)->toBe('Judul Uji Coba')
        ->and($article->slug)->toBe('judul-uji-coba')
        ->and($article->status)->toBe(ContentStatus::Published)
        ->and($article->published_at)->not->toBeNull()
        ->and($article->author_id)->toBe($admin->id);
});

test('the title is required', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/berita', ['status' => 'draft'])
        ->assertSessionHasErrors('title');
});

test('a provided slug must be unique', function () {
    News::factory()->create(['slug' => 'sudah-ada']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/berita', [
            'title' => 'Apa Saja',
            'status' => 'draft',
            'slug' => 'sudah-ada',
        ])
        ->assertSessionHasErrors('slug');
});

test('an auto-generated slug avoids collisions', function () {
    News::factory()->create(['slug' => 'judul-uji-coba']);

    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/berita', ['title' => 'Judul Uji Coba', 'status' => 'draft']);

    expect(News::where('slug', 'judul-uji-coba-2')->exists())->toBeTrue();
});

test('an admin can update an article', function () {
    $article = News::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->put(route('admin.berita.update', $article), [
            'title' => 'Judul Baru',
            'status' => 'draft',
        ])
        ->assertRedirect('/admin/berita');

    expect($article->fresh()->title)->toBe('Judul Baru');
});

test('an admin can delete an article', function () {
    $article = News::factory()->create();

    $this->actingAs(User::factory()->admin()->create())
        ->delete(route('admin.berita.destroy', $article))
        ->assertRedirect('/admin/berita');

    expect(News::count())->toBe(0);
});
