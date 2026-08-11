<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $projects = Project::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Project $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'category' => $item->category,
                'client' => $item->client,
                'status' => $item->status->value,
                'statusLabel' => $item->status->label(),
                'sortOrder' => $item->sort_order,
            ]);

        return Inertia::render('admin/proyek/index', [
            'projects' => $projects,
            'filters' => ['search' => $search ?: null],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/proyek/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $data = $this->prepare($request);

        Project::create($data);

        return redirect()
            ->route('admin.proyek.index')
            ->with('success', 'Proyek dibuat.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('admin/proyek/edit', [
            'project' => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'client' => $project->client,
                'category' => $project->category,
                'location' => $project->location,
                'year' => $project->year,
                'summary' => $project->summary,
                'description' => $project->description,
                'status' => $project->status->value,
                'sortOrder' => $project->sort_order,
                'coverUrl' => $project->coverUrl(),
                'galleryUrls' => $project->galleryUrls(),
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $data = $this->prepare($request, $project);

        $project->update($data);

        return redirect()
            ->route('admin.proyek.index')
            ->with('success', 'Proyek diperbarui.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->cover_path !== null) {
            Storage::disk('public')->delete($project->cover_path);
        }

        foreach ($project->gallery ?? [] as $path) {
            Storage::disk('public')->delete($path);
        }

        $project->delete();

        return redirect()
            ->route('admin.proyek.index')
            ->with('success', 'Proyek dihapus.');
    }

    /**
     * Build the persistable attributes from the request: slug, cover, gallery.
     *
     * @return array<string, mixed>
     */
    private function prepare(StoreProjectRequest|UpdateProjectRequest $request, ?Project $project = null): array
    {
        $data = $request->safe()->except(['cover', 'gallery']);

        // Auto-slug from the title when left blank; keep it unique.
        $data['slug'] = $this->uniqueSlug(
            ($data['slug'] ?? null) ?: Str::slug($data['title']),
            $project?->id,
        );

        if ($request->hasFile('cover')) {
            if ($project?->cover_path !== null) {
                Storage::disk('public')->delete($project->cover_path);
            }
            $data['cover_path'] = $request->file('cover')->store('projects', 'public');
        }

        // Gallery uploads append to any existing images rather than replacing them.
        if ($request->hasFile('gallery')) {
            $stored = array_map(
                fn ($file): string => $file->store('projects/gallery', 'public'),
                $request->file('gallery'),
            );
            $data['gallery'] = array_values([...($project?->gallery ?? []), ...$stored]);
        }

        return $data;
    }

    /**
     * Ensure the slug is unique, appending -2, -3, … on collision.
     */
    private function uniqueSlug(string $base, ?int $ignoreId): string
    {
        $slug = $base;
        $suffix = 2;

        while (
            Project::where('slug', $slug)
                ->when($ignoreId !== null, fn ($query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
