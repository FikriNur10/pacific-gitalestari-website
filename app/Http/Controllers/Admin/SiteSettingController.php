<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateSiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function edit(): Response
    {
        $settings = SiteSetting::current();

        return Inertia::render('admin/pengaturan/edit', [
            'settings' => [
                'metaTitle' => $settings->meta_title,
                'metaDescription' => $settings->meta_description,
                'ogImageUrl' => $settings->og_image_path !== null ? $settings->ogImageUrl() : null,
            ],
        ]);
    }

    public function update(UpdateSiteSettingRequest $request): RedirectResponse
    {
        $settings = SiteSetting::current();

        $data = $request->safe()->except(['og_image']);

        if ($request->hasFile('og_image')) {
            if ($settings->og_image_path !== null) {
                Storage::disk('public')->delete($settings->og_image_path);
            }
            $data['og_image_path'] = $request->file('og_image')->store('site', 'public');
        }

        $settings->update($data);

        return redirect()
            ->route('admin.pengaturan.edit')
            ->with('success', 'Pengaturan situs disimpan.');
    }
}
