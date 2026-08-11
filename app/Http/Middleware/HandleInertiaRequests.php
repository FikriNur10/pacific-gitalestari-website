<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Controller;
use App\Models\HeroBackground;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            // Default social/OG meta from the admin-managed site settings. Rendered
            // server-side in app.blade.php so link-preview crawlers (WhatsApp, Google)
            // — which never run JS — can read it. Individual controllers may override
            // this `meta` key with page-specific values (e.g. an article's title/cover).
            'meta' => fn () => $this->defaultMeta($request),
            // Per-page Hero background URLs (admin override → bundled default).
            // Shared globally so the 5 `Route::inertia` pages (no controller) can read
            // their own key without a bespoke controller; the query is ≤12 tiny rows.
            'heroBackgrounds' => fn (): array => HeroBackground::urlMap(),
        ];
    }

    /**
     * Build the default page meta from site settings. Controllers may override the
     * `meta` prop per page via {@see Controller::meta()}.
     *
     * @return array{title: string, description: string, image: string, url: string, siteName: string}
     */
    private function defaultMeta(Request $request): array
    {
        return SiteSetting::current()->toMeta($request);
    }
}
