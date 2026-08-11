<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Download;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadController extends Controller
{
    /**
     * Public download catalog — published documents only, newest first.
     */
    public function index(): Response
    {
        $downloads = Download::query()
            ->published()
            ->latest('published_at')
            ->get()
            ->map(fn (Download $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'description' => $item->description,
                'category' => $item->category,
                // Slug of the category — the key the chip filter matches on ([data-category]).
                'categorySlug' => $item->category !== null ? Str::slug($item->category) : 'lainnya',
                'humanSize' => $item->humanSize(),
                'downloadUrl' => $item->fileUrl(),
            ]);

        // Distinct categories (label + slug) for the filter chips, preserving first-seen order.
        $categories = $downloads
            ->filter(fn (array $item): bool => $item['category'] !== null)
            ->unique('category')
            ->map(fn (array $item): array => [
                'label' => $item['category'],
                'slug' => $item['categorySlug'],
            ])
            ->values();

        return Inertia::render('download', [
            'downloads' => $downloads,
            'categories' => $categories,
        ]);
    }

    /**
     * Serve a published document through a counting route — every fetch bumps
     * `download_count`. Draft / future-dated documents 404; so does a missing file.
     */
    public function file(Download $download): StreamedResponse|HttpResponse
    {
        abort_unless($download->status->value === 'published'
            && $download->published_at !== null
            && $download->published_at->isPast(), 404);

        abort_unless(Storage::disk('public')->exists($download->file_path), 404);

        $download->increment('download_count');

        return Storage::disk('public')->download($download->file_path, $download->file_name);
    }
}
