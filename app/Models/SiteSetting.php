<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Site-wide settings, stored as a single row. Editable from the admin dashboard
 * (Pengaturan Situs). Currently holds the default social/OG meta used for link
 * previews (WhatsApp/Facebook/Google), which crawlers read from server-rendered
 * tags in app.blade.php — never from the client-side Inertia <Head>.
 *
 * @property int $id
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string|null $og_image_path
 */
class SiteSetting extends Model
{
    protected $table = 'site_settings';

    /** Fallback OG image shipped with the app, used until the admin uploads one. */
    private const DEFAULT_OG_IMAGE = '/landing/logo/logo-pgl-white-background.png';

    protected $fillable = [
        'meta_title',
        'meta_description',
        'og_image_path',
    ];

    /**
     * The one settings row, created on first access.
     *
     * NOT cached: a single-row lookup is cheap, and caching the Eloquent instance in
     * the (database) cache store broke with __PHP_Incomplete_Class on unserialize —
     * never cache model objects. Cache the scalar attributes instead if this ever
     * shows up in a profiler.
     */
    public static function current(): self
    {
        return static::query()->firstOrCreate([]);
    }

    /**
     * Absolute URL for the OG image — crawlers require an absolute URL. Falls back
     * to the bundled default when the admin has not uploaded one.
     */
    public function ogImageUrl(): string
    {
        $path = $this->og_image_path !== null
            ? Storage::url($this->og_image_path)
            : self::DEFAULT_OG_IMAGE;

        return url($path);
    }

    /**
     * Build the page meta array: site-wide defaults merged with per-page overrides.
     * Null/empty overrides are dropped so they fall back to the default (e.g. an
     * article with no cover keeps the default OG image). Single source of truth for
     * both the shared default (HandleInertiaRequests) and per-page controller meta.
     *
     * @param  array<string, string|null>  $overrides
     * @return array{title: string, description: string, image: string, url: string, siteName: string}
     */
    public function toMeta(Request $request, array $overrides = []): array
    {
        $siteName = $this->meta_title ?: config('app.name');

        $defaults = [
            'title' => $siteName,
            'description' => $this->meta_description
                ?: 'Chemical supporting & solusi industri untuk pabrik gula dan fasilitas industri di Indonesia.',
            'image' => $this->ogImageUrl(),
            'url' => $request->url(),
            'siteName' => $siteName,
        ];

        return array_merge($defaults, array_filter(
            $overrides,
            fn ($value): bool => $value !== null && $value !== '',
        ));
    }
}
