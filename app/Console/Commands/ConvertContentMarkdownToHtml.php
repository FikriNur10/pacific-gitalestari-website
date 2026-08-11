<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Faq;
use App\Models\News;
use App\Models\Product;
use App\Models\Project;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Signature('content:markdown-to-html')]
#[Description('One-time backfill: render legacy Markdown content fields to HTML for the rich-text editor. Idempotent — rows already holding HTML are skipped.')]
class ConvertContentMarkdownToHtml extends Command
{
    /**
     * Content fields authored in Markdown before the switch to the TinyMCE rich-text
     * editor. Each entry is [model class, attribute].
     *
     * @var list<array{class-string<Model>, string}>
     */
    private const FIELDS = [
        [News::class, 'body'],
        [Product::class, 'description'],
        [Project::class, 'description'],
        [Faq::class, 'answer'],
    ];

    public function handle(): int
    {
        foreach (self::FIELDS as [$modelClass, $field]) {
            $converted = $this->convert($modelClass, $field);
            $this->info(sprintf('%s.%s: %d row(s) converted.', class_basename($modelClass), $field, $converted));
        }

        return self::SUCCESS;
    }

    /**
     * Render one model's Markdown field to HTML, skipping rows that already hold HTML so
     * re-running is a no-op. Str::markdown strips raw HTML; the model mutator then runs the
     * result through HTMLPurifier on save — same sanitization path as an editor submission.
     *
     * @param  class-string<Model>  $modelClass
     */
    private function convert(string $modelClass, string $field): int
    {
        $converted = 0;

        foreach ($modelClass::query()->cursor() as $model) {
            /** @var string|null $raw */
            $raw = $model->getRawOriginal($field);

            if ($raw === null || $raw === '' || $this->looksLikeHtml($raw)) {
                continue;
            }

            $model->{$field} = Str::markdown($raw, [
                'html_input' => 'strip',
                'allow_unsafe_links' => false,
            ]);
            $model->save();
            $converted++;
        }

        return $converted;
    }

    /**
     * Heuristic idempotency guard: does the value already contain block-level HTML? Markdown
     * source has none; converted HTML does — so this skips already-converted rows on re-run.
     */
    private function looksLikeHtml(string $value): bool
    {
        return (bool) preg_match('/<(p|h[1-6]|ul|ol|li|blockquote|table|pre|br|hr)[\s>\/]/i', $value);
    }
}
