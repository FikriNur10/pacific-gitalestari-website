<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Mews\Purifier\Facades\Purifier;

/**
 * A chemical product catalog entry. Description holds rich-text HTML from the dashboard
 * editor, sanitized on write against a tag whitelist (see the {@see self::description()} mutator).
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $category
 * @property string|null $summary
 * @property string|null $description
 * @property array<int, array{label: string|null, value: string|null, description?: string|null}>|null $specs
 * @property string|null $application
 * @property string|null $image_path
 * @property string|null $datasheet_path
 * @property ContentStatus $status
 * @property int $sort_order
 */
class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'slug',
        'category',
        'summary',
        'description',
        'specs',
        'application',
        'image_path',
        'datasheet_path',
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
            'specs' => 'array',
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
     * Public route binding is by slug (`/produk-kimia/{product:slug}`).
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * @param  Builder<Product>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published);
    }

    public function imageUrl(): ?string
    {
        return $this->image_path !== null ? Storage::url($this->image_path) : null;
    }

    public function datasheetUrl(): ?string
    {
        return $this->datasheet_path !== null ? Storage::url($this->datasheet_path) : null;
    }

    /**
     * The stored description is already sanitized HTML (see the {@see self::description()}
     * mutator), so rendering is a straight pass-through into dangerouslySetInnerHTML.
     */
    public function descriptionHtml(): string
    {
        return $this->description ?? '';
    }
}
