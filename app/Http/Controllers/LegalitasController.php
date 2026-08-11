<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\LegalDocument;
use Inertia\Inertia;
use Inertia\Response;

class LegalitasController extends Controller
{
    /**
     * Public Legalitas & Sertifikasi page — published documents only, ordered by
     * sort_order. Grouped by category on the client.
     */
    public function index(): Response
    {
        $documents = LegalDocument::query()
            ->published()
            ->orderBy('sort_order')
            ->latest()
            ->get()
            ->map(fn (LegalDocument $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'category' => $item->category,
                'issuer' => $item->issuer,
                'documentNumber' => $item->document_number,
                'issuedAt' => $item->issued_at?->translatedFormat('F Y'),
                'expiresAt' => $item->expires_at?->translatedFormat('d F Y'),
                'fileUrl' => $item->fileUrl(),
                'imageUrl' => $item->imageUrl(),
            ]);

        return Inertia::render('legalitas', [
            'documents' => $documents,
            'meta' => $this->meta([
                'title' => 'Legalitas & Sertifikasi — Pacific Gitalestari',
                'description' => 'Kelengkapan izin usaha, badan hukum, dan sertifikasi (ISO, K3) PT. Pacific Gitalestari sebagai jaminan kualifikasi tender.',
            ]),
        ]);
    }
}
