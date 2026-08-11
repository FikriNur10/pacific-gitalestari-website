<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;

/**
 * A portfolio project entry. Description holds rich-text HTML from the dashboard editor,
 * sanitized on write against a tag whitelist (see the {@see self::description()} mutator).
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $client
 * @property string|null $category
 * @property string|null $location
 * @property int|null $year
 * @property string|null $summary
 * @property string|null $description
 * @property string|null $cover_path
 * @property array<int, string>|null $gallery
 * @property ContentStatus $status
 * @property int $sort_order
 */
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $table = 'projects';

    protected $fillable = [
        'title',
        'slug',
        'client',
        'category',
        'location',
        'year',
        'summary',
        'description',
        'cover_path',
        'gallery',
        'status',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ContentStatus::class,
            'gallery' => 'array',
        ];
    }

    /**
     * Sanitize the rich-text description on write (HTML from the dashboard editor →
     * whitelisted HTML via HTMLPurifier). Stored-XSS guard; replaced the old
     * Str::markdown('html_input' => 'strip') read-time pipeline.
     *
     * @return Attribute<string|null, string|null>
     */
    protected function description(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value): ?string => $value === null ? null : Purifier::clean($value),
        );
    }

    /**
     * Public route binding is by slug (`/proyek/{project:slug}`).
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Projects have no publish timestamp — status alone gates visibility.
     *
     * @param  Builder<Project>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published);
    }

    public function coverUrl(): ?string
    {
        return $this->cover_path !== null ? Storage::url($this->cover_path) : null;
    }

    /**
     * The stored description is already sanitized HTML (see the {@see self::description()}
     * mutator), so rendering is a straight pass-through into dangerouslySetInnerHTML.
     */
    public function descriptionHtml(): string
    {
        return $this->description ?? '';
    }

    /**
     * Resolve each stored gallery path to a public URL.
     *
     * @return array<int, string>
     */
    public function galleryUrls(): array
    {
        return array_map(
            fn (string $path): string => Storage::url($path),
            $this->gallery ?? [],
        );
    }
}
