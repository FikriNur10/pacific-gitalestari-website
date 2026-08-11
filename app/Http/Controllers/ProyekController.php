<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProyekController extends Controller
{
    /**
     * Public projects portfolio — published projects only, ordered by sort_order then newest.
     */
    public function index(): Response
    {
        $projects = Project::query()
            ->published()
            ->orderBy('sort_order')
            ->latest()
            ->paginate(9)
            ->through(fn (Project $item): array => [
                'title' => $item->title,
                'slug' => $item->slug,
                'client' => $item->client,
                'category' => $item->category,
                'location' => $item->location,
                'year' => $item->year,
                'summary' => $item->summary,
                'coverUrl' => $item->coverUrl(),
            ]);

        return Inertia::render('proyek', [
            'projects' => $projects,
            'meta' => $this->meta([
                'title' => 'Portofolio Proyek — Pacific Gitalestari',
                'description' => 'Rekam jejak proyek PT. Pacific Gitalestari: water treatment, penyewaan diesel/PLTD, proteksi struktur, dan pasokan bahan kimia industri.',
            ]),
        ]);
    }
}
