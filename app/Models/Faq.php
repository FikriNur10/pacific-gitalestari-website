<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\FaqFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Mews\Purifier\Facades\Purifier;

/**
 * A frequently-asked question. Answer holds rich-text HTML from the dashboard editor,
 * sanitized on write against a tag whitelist (see the {@see self::answer()} mutator).
 *
 * @property int $id
 * @property string $question
 * @property string $answer
 * @property string|null $category
 * @property int $sort_order
 * @property ContentStatus $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Faq extends Model
{
    /** @use HasFactory<FaqFactory> */
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'category',
        'sort_order',
        'status',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ContentStatus::class,
        ];
    }

    /**
     * Sanitize the rich-text answer on write (HTML from the dashboard editor →
     * whitelisted HTML via HTMLPurifier). Stored-XSS guard; replaced the old
     * Str::markdown('html_input' => 'strip') read-time pipeline.
     *
     * @return Attribute<string|null, string|null>
     */
    protected function answer(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value): ?string => $value === null ? null : Purifier::clean($value),
        );
    }

    /**
     * @param  Builder<Faq>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published);
    }

    /**
     * The stored answer is already sanitized HTML (see the {@see self::answer()} mutator),
     * so rendering is a straight pass-through into the page's dangerouslySetInnerHTML.
     */
    public function answerHtml(): string
    {
        return $this->answer ?? '';
    }
}
