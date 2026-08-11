<?php

use App\Models\Faq;
use App\Models\News;
use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

test('the rich-text mutator strips scripts, iframes, event handlers and js: urls', function () {
    $dirty = '<p onclick="steal()">Halo</p>'
        .'<script>alert(1)</script>'
        .'<iframe src="https://evil.test"></iframe>'
        .'<a href="javascript:alert(1)">tautan</a>';

    $news = News::factory()->create(['body' => $dirty]);

    expect($news->body)->toContain('Halo');
    expect($news->body)->not->toContain('<script');
    expect($news->body)->not->toContain('onclick');
    expect($news->body)->not->toContain('<iframe');
    expect($news->body)->not->toContain('javascript:');
});

test('the rich-text mutator keeps whitelisted formatting', function () {
    $html = '<h2>Judul</h2><p><strong>Tebal</strong> dan <em>miring</em></p><ul><li>Satu</li></ul>';

    $product = Product::factory()->create(['description' => $html]);

    expect($product->description)
        ->toContain('<h2>')
        ->toContain('<strong>')
        ->toContain('<em>')
        ->toContain('<li>');
});

test('sanitization covers every rich-text field', function () {
    $payload = '<p>Aman</p><script>alert(1)</script>';

    $news = News::factory()->create(['body' => $payload]);
    $product = Product::factory()->create(['description' => $payload]);
    $project = Project::factory()->create(['description' => $payload]);
    $faq = Faq::factory()->create(['answer' => $payload]);

    expect($news->body)->not->toContain('<script');
    expect($product->description)->not->toContain('<script');
    expect($project->description)->not->toContain('<script');
    expect($faq->answer)->not->toContain('<script');
});

test('the html accessors return the stored sanitized html as-is', function () {
    $news = News::factory()->create(['body' => '<p>Berita</p>']);
    $product = Product::factory()->create(['description' => '<p>Produk</p>']);
    $project = Project::factory()->create(['description' => '<p>Proyek</p>']);
    $faq = Faq::factory()->create(['answer' => '<p>Jawaban</p>']);

    expect($news->bodyHtml())->toBe($news->body)->toContain('<p>Berita</p>');
    expect($product->descriptionHtml())->toBe($product->description);
    expect($project->descriptionHtml())->toBe($project->description);
    expect($faq->answerHtml())->toBe($faq->answer);
});

test('null content stays null through the mutator and accessor', function () {
    $product = Product::factory()->create(['description' => null]);

    expect($product->description)->toBeNull()
        ->and($product->descriptionHtml())->toBe('');
});

test('admin submissions are sanitized before storage', function () {
    $this->actingAs(User::factory()->admin()->create())
        ->post('/admin/berita', [
            'title' => 'Uji XSS',
            'status' => 'published',
            'body' => '<p>Isi</p><script>alert(1)</script>',
        ])
        ->assertRedirect('/admin/berita');

    $news = News::first();
    expect($news->body)->toContain('<p>Isi</p>');
    expect($news->body)->not->toContain('<script');
});

test('the convert command renders legacy markdown to html and is idempotent', function () {
    $news = News::factory()->create();

    // Force raw Markdown into the column, bypassing the sanitizing mutator, to simulate
    // a row created before the switch to the rich-text editor.
    DB::table('news')->where('id', $news->id)->update([
        'body' => "## Sub Judul\n\nParagraf dengan **tebal**.",
    ]);

    Artisan::call('content:markdown-to-html');

    $first = News::find($news->id)->body;
    expect($first)->toContain('<h2>')->toContain('<strong>');
    expect($first)->not->toContain('## Sub Judul');

    // A second run must not re-process the (now HTML) row — proves idempotency.
    Artisan::call('content:markdown-to-html');
    expect(News::find($news->id)->body)->toBe($first);
});
