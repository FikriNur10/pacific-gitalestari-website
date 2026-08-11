<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\GalleryItemFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * A single photo in the public gallery. Unlike the other CMS collections a gallery
 * item has no slug or detail page — it is only ever rendered inside the /galeri grid,
 * so route binding stays on the default id.
 *
 * @property int $id
 * @property string $title
 * @property string|null $category
 * @property string $image_path
 * @property ContentStatus $status
 * @property int $sort_order
 */
class GalleryItem extends Model
{
    /** @use HasFactory<GalleryItemFactory> */
    use HasFactory;

    protected $table = 'gallery_items';

    protected $fillable = [
        'title',
        'category',
        'image_path',
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
        ];
    }

    /**
     * Gallery items have no publish timestamp — status alone gates visibility.
     *
     * @param  Builder<GalleryItem>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published);
    }

    public function imageUrl(): string
    {
        return Storage::url($this->image_path);
    }
}
