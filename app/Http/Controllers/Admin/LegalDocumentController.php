<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLegalDocumentRequest;
use App\Http\Requests\UpdateLegalDocumentRequest;
use App\Models\LegalDocument;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class LegalDocumentController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $documents = LegalDocument::query()
            ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->latest('created_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (LegalDocument $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'issuer' => $item->issuer,
                'status' => $item->status->value,
                'statusLabel' => $item->status->label(),
                'sortOrder' => $item->sort_order,
                'hasFile' => $item->file_path !== null,
                'imageUrl' => $item->imageUrl(),
            ]);

        return Inertia::render('admin/legalitas/index', [
            'documents' => $documents,
            'filters' => ['search' => $search ?: null],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/legalitas/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreLegalDocumentRequest $request): RedirectResponse
    {
        $data = $this->prepare($request);

        LegalDocument::create($data);

        return redirect()
            ->route('admin.legalitas.index')
            ->with('success', 'Dokumen legalitas ditambahkan.');
    }

    public function edit(LegalDocument $legalDocument): Response
    {
        return Inertia::render('admin/legalitas/edit', [
            'document' => [
                'id' => $legalDocument->id,
                'title' => $legalDocument->title,
                'category' => $legalDocument->category,
                'issuer' => $legalDocument->issuer,
                'documentNumber' => $legalDocument->document_number,
                'issuedAt' => $legalDocument->issued_at?->toDateString(),
                'expiresAt' => $legalDocument->expires_at?->toDateString(),
                'status' => $legalDocument->status->value,
                'sortOrder' => $legalDocument->sort_order,
                'fileUrl' => $legalDocument->fileUrl(),
                'imageUrl' => $legalDocument->imageUrl(),
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateLegalDocumentRequest $request, LegalDocument $legalDocument): RedirectResponse
    {
        $data = $this->prepare($request, $legalDocument);

        $legalDocument->update($data);

        return redirect()
            ->route('admin.legalitas.index')
            ->with('success', 'Dokumen legalitas diperbarui.');
    }

    public function destroy(LegalDocument $legalDocument): RedirectResponse
    {
        foreach ([$legalDocument->file_path, $legalDocument->image_path] as $path) {
            if ($path !== null) {
                Storage::disk('public')->delete($path);
            }
        }

        $legalDocument->delete();

        return redirect()
            ->route('admin.legalitas.index')
            ->with('success', 'Dokumen legalitas dihapus.');
    }

    /**
     * Build persistable attributes, storing/replacing the PDF and preview image.
     *
     * @return array<string, mixed>
     */
    private function prepare(StoreLegalDocumentRequest|UpdateLegalDocumentRequest $request, ?LegalDocument $document = null): array
    {
        $data = $request->safe()->except(['file', 'image']);

        if ($request->hasFile('file')) {
            if ($document?->file_path !== null) {
                Storage::disk('public')->delete($document->file_path);
            }
            $data['file_path'] = $request->file('file')->store('legal', 'public');
        }

        if ($request->hasFile('image')) {
            if ($document?->image_path !== null) {
                Storage::disk('public')->delete($document->image_path);
            }
            $data['image_path'] = $request->file('image')->store('legal', 'public');
        }

        return $data;
    }
}
