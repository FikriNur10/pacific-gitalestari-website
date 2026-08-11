<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\NewsFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;

/**
 * A news / article entry. Body holds rich-text HTML from the dashboard editor,
 * sanitized on write against a tag whitelist (see the {@see self::body()} mutator).
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $excerpt
 * @property string|null $body
 * @property string|null $cover_path
 * @property string|null $category
 * @property ContentStatus $status
 * @property Carbon|null $published_at
 * @property int|null $author_id
 * @property string|null $meta_title
 * @property string|null $meta_description
 */
class News extends Model
{
    /** @use HasFactory<NewsFactory> */
    use HasFactory;

    protected $table = 'news';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'cover_path',
        'category',
        'status',
        'published_at',
        'author_id',
        'meta_title',
        'meta_description',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ContentStatus::class,
            'published_at' => 'datetime',
        ];
    }

    /**
     * Sanitize the rich-text body on write: the dashboard editor (TinyMCE) submits HTML,
     * which HTMLPurifier reduces to a safe tag whitelist. This is the stored-XSS guard —
     * it replaced the old Str::markdown('html_input' => 'strip') read-time pipeline.
     *
     * @return Attribute<string|null, string|null>
     */
    protected function body(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value): ?string => $value === null ? null : Purifier::clean($value),
        );
    }

    /**
     * Public route binding is by slug (`/berita/{news:slug}`).
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * @param  Builder<News>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published)
            ->where('published_at', '<=', now());
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * The stored body is already sanitized HTML (see the {@see self::body()} mutator),
     * so rendering is a straight pass-through into the page's dangerouslySetInnerHTML.
     */
    public function bodyHtml(): string
    {
        return $this->body ?? '';
    }

    public function coverUrl(): ?string
    {
        return $this->cover_path !== null ? Storage::url($this->cover_path) : null;
    }
}
