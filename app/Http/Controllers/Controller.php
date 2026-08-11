<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;

abstract class Controller
{
    /**
     * Per-page social/OG meta: site defaults with the given overrides applied.
     * Pass this as the `meta` prop of an Inertia response to give a page its own
     * link-preview title/description/image (e.g. an article). Overrides that are
     * null/empty fall back to the site default. Rendered server-side in
     * app.blade.php so link-preview crawlers (which don't run JS) see it.
     *
     * @param  array<string, string|null>  $overrides
     * @return array{title: string, description: string, image: string, url: string, siteName: string}
     */
    protected function meta(array $overrides = []): array
    {
        return SiteSetting::current()->toMeta(request(), $overrides);
    }
}
