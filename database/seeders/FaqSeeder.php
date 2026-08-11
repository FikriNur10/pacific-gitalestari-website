<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\Faq;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FaqSeeder extends Seeder
{
    /**
     * Seed the prototype FAQ entries, grouped by category.
     */
    public function run(): void
    {
        $faqs = [
            ['Umum & Perusahaan', 'Apa saja bidang usaha PT. Pacific Gitalestari?', 'PGL bergerak di water treatment & WWTP, bahan kimia industri (cooling, boiler, sugar processing, reverse osmosis, waste water, demin plant), penyewaan mesin diesel (PLTD), serta aplikator proteksi: waterproofing, grouting, flooring, sealant, dan epoxy lining.'],
            ['Umum & Perusahaan', 'Sudah berapa lama PGL beroperasi?', 'Lebih dari 18 tahun sebagai kontraktor umum dan mitra teknis untuk fasilitas industri di pasar domestik.'],
            ['Umum & Perusahaan', 'Apakah PGL melayani instansi pemerintah/BUMN?', 'Ya, PGL melayani mitra B2B dan sektor publik. Salah satu portofolionya adalah penyewaan diesel PLTD Pangkalan Bun untuk PT. PLN (Persero) Wilayah Kalselteng.'],
            ['Produk & Spesifikasi', 'Bagaimana cara mendapatkan lembar spesifikasi produk?', 'Lembar spesifikasi, katalog, dan brosur dapat diunduh di halaman **Download**, atau diminta langsung lewat form konsultasi dan WhatsApp.'],
            ['Produk & Spesifikasi', 'Apakah tersedia informasi dosis dan packaging?', 'Informasi dosis, kemasan, dan penanganan tersedia untuk tiap produk. Tim teknis kami membantu menentukan dosis optimal sesuai kondisi sistem Anda.'],
            ['Konsultasi & Penawaran', 'Bagaimana proses meminta penawaran?', 'Kirim kebutuhan awal Anda lewat form konsultasi atau WhatsApp. Tim kami menindaklanjuti untuk asesmen teknis dan penyusunan penawaran.'],
            ['Konsultasi & Penawaran', 'Apakah ada asesmen awal sebelum penawaran?', 'Ya. Untuk kebutuhan tertentu kami melakukan asesmen kondisi sistem agar solusi dan penawaran yang diberikan tepat sasaran.'],
            ['Layanan Teknis & QA', 'Apakah PGL menyediakan layanan on-site?', 'Ya, PGL menyediakan on-site test, analisis air, dan dukungan teknis lapangan, dilengkapi progress & visit report.'],
            ['Layanan Teknis & QA', 'Bagaimana PGL menjaga mutu?', 'Laboratorium internal didukung instrumen pengujian, dilengkapi kerja sama dengan laboratorium eksternal untuk pengujian lanjutan.'],
            ['Standar & Kepatuhan', 'Apakah produk memenuhi standar industri?', 'Produk dan layanan PGL mengikuti praktik terbaik industri dan terus disempurnakan seiring perkembangan standar.'],
            ['Pengiriman & Dukungan', 'Bagaimana ketersediaan dan pengiriman produk?', 'Ketersediaan dan jadwal pengiriman dikonfirmasi saat penawaran, disesuaikan dengan lokasi dan kebutuhan mitra.'],
        ];

        $order = [];

        foreach ($faqs as [$category, $question, $answer]) {
            $order[$category] = ($order[$category] ?? 0) + 1;

            Faq::updateOrCreate(
                ['question' => $question],
                [
                    // Answers are authored in Markdown, but the field now stores HTML (the
                    // dashboard editor is TinyMCE), so render it once here. The Faq::answer()
                    // mutator then sanitizes the result.
                    'answer' => Str::markdown($answer, ['html_input' => 'strip', 'allow_unsafe_links' => false]),
                    'category' => $category,
                    'sort_order' => $order[$category],
                    'status' => ContentStatus::Published,
                ],
            );
        }
    }
}
