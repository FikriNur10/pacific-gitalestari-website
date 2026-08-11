<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ContentStatus;
use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Seed the six prototype articles as published news.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Pentingnya Menjaga Stabilitas pH pada Sistem Cooling Water',
                'category' => 'Artikel Teknis',
                'date' => '2026-07-12',
                'excerpt' => 'Kontrol pH yang konsisten adalah fondasi program cooling water treatment yang andal.',
                'body' => "Sistem cooling water bekerja pada rentang kondisi yang berubah-ubah — suhu, laju alir, dan kualitas air make-up. Di tengah dinamika itu, **pH** menjadi salah satu parameter paling menentukan: ia memengaruhi laju korosi, pembentukan kerak, dan efektivitas program mikrobiologi.\n\n## Kenapa pH begitu berpengaruh?\n\npH yang terlalu rendah mempercepat korosi pada logam sistem, sementara pH yang terlalu tinggi mendorong pengendapan kerak (scaling) yang menurunkan efisiensi perpindahan panas.\n\n## Praktik yang kami sarankan\n\n- Pantau pH secara rutin, tidak hanya saat ada masalah.\n- Sesuaikan dosis chemical berdasarkan tren, bukan pembacaan tunggal.\n- Lakukan full water analysis berkala untuk melihat gambaran menyeluruh.\n- Dokumentasikan hasil melalui progress & visit report agar tren terpantau.",
            ],
            [
                'title' => '3 Tanda Water Treatment Plant Anda Butuh Perawatan',
                'category' => 'Tips & Edukasi',
                'date' => '2026-07-05',
                'excerpt' => 'Kenali tanda-tanda awal sebelum masalah kecil menjadi gangguan operasional.',
                'body' => "Water Treatment Plant (WTP) yang terawat menjaga kualitas air dan kelangsungan produksi. Berikut tiga tanda umum yang menandakan unit Anda butuh perhatian.\n\n1. **Kualitas air keluaran menurun** dari baseline.\n2. **Konsumsi chemical meningkat** tanpa perubahan beban.\n3. **Tekanan dan laju alir tidak stabil** pada unit filtrasi.\n\nJika salah satu muncul, jadwalkan inspeksi menyeluruh sebelum berdampak ke produksi.",
            ],
            [
                'title' => 'PGL Dukung Kebutuhan Daya PLTD di Wilayah Kalimantan',
                'category' => 'Berita Perusahaan',
                'date' => '2026-06-28',
                'excerpt' => 'Dukungan penyewaan diesel engine untuk keandalan pasokan daya.',
                'body' => 'PT. Pacific Gitalestari mendukung kebutuhan daya PLTD di wilayah Kalimantan melalui layanan diesel engine rental. Ketersediaan unit yang andal membantu menjaga kontinuitas pasokan listrik di area operasional mitra.',
            ],
            [
                'title' => 'Memilih Sistem Waterproofing yang Tepat untuk Ground Tank',
                'category' => 'Artikel Teknis',
                'date' => '2026-06-20',
                'excerpt' => 'Panduan singkat memilih sistem waterproofing sesuai kondisi struktur.',
                'body' => "Ground tank menuntut sistem waterproofing yang tahan terhadap tekanan air dan pergerakan struktur. Pemilihan yang tepat mempertimbangkan kondisi beton, paparan bahan kimia, dan metode aplikasi.\n\nPGL sebagai specialist applicator menyediakan solusi concrete repair, waterproofing, dan epoxy lining sesuai kebutuhan lapangan.",
            ],
            [
                'title' => 'Tim Teknis PGL Lakukan Commissioning Unit WTP',
                'category' => 'Kegiatan',
                'date' => '2026-06-10',
                'excerpt' => 'Proses commissioning memastikan unit beroperasi sesuai spesifikasi.',
                'body' => 'Tim teknis PGL menyelesaikan commissioning unit Water Treatment Plant untuk memastikan seluruh parameter beroperasi sesuai spesifikasi sebelum serah terima ke mitra.',
            ],
            [
                'title' => 'Menjaga Efisiensi Boiler dengan Oxygen Scavenger',
                'category' => 'Tips & Edukasi',
                'date' => '2026-06-02',
                'excerpt' => 'Oxygen scavenger membantu mencegah korosi pada sistem boiler.',
                'body' => "Oksigen terlarut adalah penyebab utama korosi pada sistem boiler. **Oxygen scavenger** mengikat oksigen sisa sehingga memperpanjang umur peralatan dan menjaga efisiensi termal.\n\nProgram dosing yang tepat, dipadukan dengan pemantauan rutin, menjaga sistem tetap andal.",
            ],
        ];

        foreach ($articles as $article) {
            News::updateOrCreate(
                ['slug' => Str::slug($article['title'])],
                [
                    'title' => $article['title'],
                    'category' => $article['category'],
                    'excerpt' => $article['excerpt'],
                    // Prototype bodies are authored in Markdown, but the field now stores
                    // HTML (the dashboard editor is TinyMCE), so render it once here. The
                    // News::body() mutator then sanitizes the result.
                    'body' => Str::markdown($article['body'], ['html_input' => 'strip', 'allow_unsafe_links' => false]),
                    'status' => ContentStatus::Published,
                    'published_at' => Carbon::parse($article['date']),
                ],
            );
        }
    }
}
