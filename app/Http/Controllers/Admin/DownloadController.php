<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDownloadRequest;
use App\Http\Requests\UpdateDownloadRequest;
use App\Models\Download;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DownloadController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $downloads = Download::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Download $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'status' => $item->status->value,
                'statusLabel' => $item->status->label(),
                'downloadCount' => $item->download_count,
                'publishedAt' => $item->published_at?->toDateString(),
            ]);

        return Inertia::render('admin/download/index', [
            'downloads' => $downloads,
            'filters' => ['search' => $search ?: null],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/download/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreDownloadRequest $request): RedirectResponse
    {
        $data = $this->prepare($request);

        Download::create($data);

        return redirect()
            ->route('admin.download.index')
            ->with('success', 'Dokumen dibuat.');
    }

    public function edit(Download $download): Response
    {
        return Inertia::render('admin/download/edit', [
            'download' => [
                'id' => $download->id,
                'title' => $download->title,
                'description' => $download->description,
                'category' => $download->category,
                'status' => $download->status->value,
                'publishedAt' => $download->published_at?->format('Y-m-d\TH:i'),
                'fileName' => $download->file_name,
                'humanSize' => $download->humanSize(),
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateDownloadRequest $request, Download $download): RedirectResponse
    {
        $data = $this->prepare($request, $download);

        $download->update($data);

        return redirect()
            ->route('admin.download.index')
            ->with('success', 'Dokumen diperbarui.');
    }

    public function destroy(Download $download): RedirectResponse
    {
        Storage::disk('public')->delete($download->file_path);

        $download->delete();

        return redirect()
            ->route('admin.download.index')
            ->with('success', 'Dokumen dihapus.');
    }

    /**
     * Build the persistable attributes from the request: publish time + uploaded file.
     *
     * @return array<string, mixed>
     */
    private function prepare(StoreDownloadRequest|UpdateDownloadRequest $request, ?Download $download = null): array
    {
        $data = $request->safe()->except(['file']);

        // A published document always has a timestamp; a draft keeps none unless set.
        $status = ContentStatus::from($data['status']);
        if ($status === ContentStatus::Published && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        if ($request->hasFile('file')) {
            if ($download !== null) {
                Storage::disk('public')->delete($download->file_path);
            }

            $file = $request->file('file');
            $data['file_path'] = $file->store('downloads', 'public');
            $data['file_name'] = $file->getClientOriginalName();
            $data['file_size'] = $file->getSize();
            $data['mime'] = $file->getMimeType();
        }

        return $data;
    }
}
