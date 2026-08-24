<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\LegalDocument;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Marketing home page. Static content lives in the React page; only the two
     * credibility blocks are data-backed — the featured portfolio grid and the
     * legalitas/certificate band — so the home page never ships dead placeholders.
     * Both use the same published→sort_order→newest ordering as their full pages.
     */
    public function index(): Response
    {
        $featuredProjects = Project::query()
            ->published()
            ->orderBy('sort_order')
            ->latest()
            ->limit(3)
            ->get()
            ->map(fn (Project $item): array => [
                'title' => $item->title,
                'slug' => $item->slug,
                'client' => $item->client,
                'category' => $item->category,
                'summary' => $item->summary,
                'coverUrl' => $item->coverUrl(),
            ]);

        $certificates = LegalDocument::query()
            ->published()
            ->orderBy('sort_order')
            ->latest()
            ->limit(6)
            ->get()
            ->map(fn (LegalDocument $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'issuer' => $item->issuer,
                'fileUrl' => $item->fileUrl(),
                'imageUrl' => $item->imageUrl(),
            ]);

        return Inertia::render('landing', [
            'featuredProjects' => $featuredProjects,
            'certificates' => $certificates,
        ]);
    }
}
