<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\HeroPage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * A per-page Hero background override, editable from the admin dashboard
 * (Latar Hero). One row per {@see HeroPage}, present only when the admin has
 * uploaded a custom image; otherwise the page falls back to the enum default.
 *
 * @property int $id
 * @property HeroPage $page
 * @property string $image_path
 */
class HeroBackground extends Model
{
    protected $table = 'hero_backgrounds';

    protected $fillable = [
        'page',
        'image_path',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'page' => HeroPage::class,
        ];
    }

    /**
     * Public URL for the uploaded override (stored on the `public` disk).
     */
    public function imageUrl(): string
    {
        return Storage::url($this->image_path);
    }

    /**
     * The full page-key => URL map shared with every Inertia response: an admin
     * override when one exists, otherwise the bundled default from {@see HeroPage}.
     * Always contains all pages so the frontend can read its key unconditionally.
     *
     * @return array<string, string>
     */
    public static function urlMap(): array
    {
        // keyBy the raw enum value (a HeroPage instance can't be an array key).
        $overrides = static::all()->keyBy(fn (self $hero): string => $hero->page->value);

        $map = [];

        foreach (HeroPage::cases() as $page) {
            $override = $overrides->get($page->value);

            $map[$page->value] = $override instanceof self
                ? $override->imageUrl()
                : $page->defaultImagePath();
        }

        return $map;
    }
}
