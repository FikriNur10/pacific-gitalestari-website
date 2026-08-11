<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\HeroPage;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateHeroBackgroundRequest;
use App\Models\HeroBackground;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroBackgroundController extends Controller
{
    /**
     * The single "Latar Hero" management screen — every page listed with its
     * current background (override or bundled default) and whether it is custom.
     */
    public function index(): Response
    {
        $overrides = HeroBackground::all()->keyBy(fn (HeroBackground $hero): string => $hero->page->value);

        $pages = array_map(function (HeroPage $page) use ($overrides): array {
            $override = $overrides->get($page->value);

            return [
                'key' => $page->value,
                'label' => $page->label(),
                'imageUrl' => $override instanceof HeroBackground
                    ? $override->imageUrl()
                    : $page->defaultImagePath(),
                'isCustom' => $override instanceof HeroBackground,
            ];
        }, HeroPage::cases());

        return Inertia::render('admin/latar-hero/index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Upload (or replace) the background for one page. {@see HeroPage} is resolved
     * via implicit enum route binding, so an unknown page value 404s automatically.
     */
    public function update(UpdateHeroBackgroundRequest $request, HeroPage $page): RedirectResponse
    {
        $existing = HeroBackground::query()->where('page', $page)->first();

        // Replacing an existing override deletes the old file first.
        if ($existing instanceof HeroBackground) {
            Storage::disk('public')->delete($existing->image_path);
        }

        // Assign through an array (updateOrCreate) rather than a typed property so
        // UploadedFile::store()'s string|false return doesn't clash with the model's
        // non-null image_path — same idiom as GalleryController/SiteSettingController.
        HeroBackground::updateOrCreate(
            ['page' => $page],
            ['image_path' => $request->file('image')->store('hero', 'public')],
        );

        return back()->with('success', "Latar Hero halaman {$page->label()} diperbarui.");
    }

    /**
     * Revert a page to its bundled default by removing the override (row + file).
     */
    public function destroy(HeroPage $page): RedirectResponse
    {
        $hero = HeroBackground::query()->where('page', $page)->first();

        if ($hero instanceof HeroBackground) {
            Storage::disk('public')->delete($hero->image_path);
            $hero->delete();
        }

        return back()->with('success', "Latar Hero halaman {$page->label()} dikembalikan ke default.");
    }
}
