<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\LegalDocument;
use Illuminate\Database\Seeder;

class LegalDocumentSeeder extends Seeder
{
    /**
     * Seed the standard Indonesian company legal/certification document types as
     * published SHELLS — numbers, dates, and scanned files are intentionally left
     * empty for the admin to fill with real data (we don't fabricate legal numbers).
     */
    public function run(): void
    {
        $documents = [
            ['title' => 'Nomor Induk Berusaha (NIB)', 'category' => 'Legalitas'],
            ['title' => 'Akta Pendirian Perusahaan', 'category' => 'Legalitas'],
            ['title' => 'NPWP Perusahaan', 'category' => 'Legalitas'],
            ['title' => 'Surat Pengukuhan Pengusaha Kena Pajak (SPPKP)', 'category' => 'Legalitas'],
            ['title' => 'ISO 9001:2015 — Sistem Manajemen Mutu', 'category' => 'Sertifikasi'],
            ['title' => 'ISO 14001:2015 — Manajemen Lingkungan', 'category' => 'Sertifikasi'],
            ['title' => 'ISO 45001:2018 — Keselamatan & Kesehatan Kerja', 'category' => 'Sertifikasi'],
            ['title' => 'Sertifikat SMK3 (K3)', 'category' => 'Sertifikasi'],
        ];

        foreach ($documents as $index => $document) {
            LegalDocument::updateOrCreate(
                ['title' => $document['title']],
                [
                    'category' => $document['category'],
                    'status' => ContentStatus::Published,
                    'sort_order' => $index,
                ],
            );
        }
    }
}
