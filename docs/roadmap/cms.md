# Roadmap: Situs Statik → CMS

Transformasi situs marketing PGL dari konten **hardcoded** menjadi **CMS** yang bisa dikelola tim
tanpa menyentuh kode. Dokumen ini adalah rencana kerja berfase — bukan spesifikasi final; tiap fase
punya deliverable + kriteria selesai + daftar test yang harus hijau.

---

## 1. Keputusan arsitektur (terkunci)

| Keputusan | Pilihan | Alasan |
|-----------|---------|--------|
| **Stack admin** | Custom **Inertia + React + shadcn** di `/admin` | Satu stack dengan yang sudah dibangun; 0 dependency frontend baru; typed via Wayfinder. Konsekuensi: CRUD dibangun manual (paling banyak kerja, tapi konsisten). |
| **Scope CMS** | **Koleksi dinamis saja** | Fokus ke konten yang sering berubah. Halaman statik & pengaturan global sengaja **out of scope** (lihat §9). |

**Yang jadi CMS-managed:** Berita · Proyek · Produk Kimia · Download · FAQ · Inbox Kontak.

**Tetap di kode (out of scope roadmap ini):** halaman Tentang / Solusi / Proteksi, menu nav, footer,
nomor WhatsApp, email, SEO global.

Alternatif yang ditolak & alasannya: **Filament** (tercepat, tapi menambah stack Livewire/Alpine
berdampingan dengan SPA React — dua paradigma frontend); **Statamic** (flat-file/Git, tapi memaksa
rework rendering ke Antlers padahal halaman React baru jadi).

---

## 2. Kondisi awal (terverifikasi di repo)

- **Routing:** 11 halaman via `Route::inertia('/...', '...')` di `routes/web.php` — statik, tanpa controller.
- **Model:** hanya `app/Models/User.php`. Belum ada tabel konten.
- **Migrasi:** hanya users / cache / jobs / passkeys / 2FA.
- **Auth:** Fortify aktif (login, register, verifikasi email, 2FA, passkey). **Belum ada role/permission.**
- **Frontend:** halaman `resources/js/pages/*.tsx` — konten JSX hardcoded, styling `.pgl` (lihat memory `landing-page-implementation`).
- **Interaksi:** `resources/js/hooks/use-landing-effects.ts` — filter kategori (`[data-filter]`) & form kontak
  masih **stub tanpa backend** (hanya menampilkan pesan terima kasih).
- **Tooling:** Pest v4, Wayfinder (typed routes), Pint, ESLint/Prettier. Docker via Sail.

Implikasi: pekerjaan inti = (a) memodelkan data, (b) membangun shell admin + CRUD, (c) mengganti
`Route::inertia` statik dengan controller yang menyuntik data DB, (d) me-refactor halaman publik agar
membaca **props** alih-alih JSX hardcoded — **tanpa** mengubah tampilan/komponen `.pgl`.

---

## 3. Arsitektur target (alur request)

```
Publik:
  GET /berita            → BeritaController@index   → props: paginated published news
  GET /berita/{slug}     → BeritaController@show     → props: 1 artикel (404 jika draft)
  POST /kontak           → KontakController@store     → simpan ContactSubmission + notifikasi

Admin (auth + gate 'admin'):
  GET  /admin                     → dashboard ringkas (jumlah konten, submission baru)
  GET  /admin/berita              → index (tabel, search, filter, paginate)
  GET  /admin/berita/create       → form
  POST /admin/berita              → store (validasi via FormRequest)
  GET  /admin/berita/{news}/edit  → form terisi
  PUT  /admin/berita/{news}       → update
  DELETE /admin/berita/{news}     → destroy
```

**Konvensi lapisan (ikuti Laravel way):**
- Controller tipis di `app/Http/Controllers/Admin/*` (resourceful) & publik di `app/Http/Controllers/*`.
- Validasi selalu lewat **FormRequest** (`app/Http/Requests/*`), tidak inline.
- Otorisasi lewat **Policy** + **Gate** (`admin`), bukan cek `if` manual.
- Bentuk data ke frontend lewat **Eloquent API Resource** / DTO agar tipe props stabil.
- Setiap model punya **Factory + Seeder**. Named routes + Wayfinder untuk link.
- Halaman admin di `resources/js/pages/admin/<entity>/{index,create,edit}.tsx` dengan `AdminLayout` sendiri.

---

## 4. Model data (draf skema)

> Kategori dimulai sebagai kolom `string`/enum per entitas (paling ramping). Naik ke tabel taksonomi
> bersama hanya jika kebutuhan filter lintas-entitas muncul (lihat §9).

### 4.1 `news` (Berita)
| Kolom | Tipe | Catatan |
|-------|------|---------|
| id | bigint | |
| title | string | |
| slug | string unique | route-key untuk `/berita/{slug}` |
| excerpt | string(500) | kartu list |
| body | longtext | rich text (HTML tersanitasi — lihat §6) |
| cover_path | string nullable | media (lihat §5) |
| category | string | untuk chip filter |
| status | enum(`draft`,`published`) | default draft |
| published_at | timestamp nullable | publik hanya tampil bila `published` & `<= now` |
| author_id | fk users nullable | |
| meta_title / meta_description | string nullable | SEO per artikel |
| timestamps | | |

### 4.2 `projects` (Proyek)
title, slug, `client` (string), `sector`/category, `location`, `year` (smallint), `summary`,
`description` (rich), `cover_path`, `gallery` (json array path), `status`, `sort_order`, timestamps.

### 4.3 `products` (Produk Kimia)
name, slug, category, `summary`, `description` (rich), `specs` (json: array of `{label, value}`),
`application` (text), `image_path`, `datasheet_path` (nullable file), `status`, `sort_order`, timestamps.

### 4.4 `downloads` (Download)
title, description, category, `file_path`, `file_name`, `file_size` (int), `mime` (string),
`download_count` (int default 0), `status`, `published_at`, timestamps.

### 4.5 `faqs`
question, answer (rich/plain), category, `sort_order` (int), `status`, timestamps.

### 4.6 `contact_submissions` (Inbox Kontak)
name, company, email, phone, `service` (minat layanan), message (text),
`status` enum(`new`,`read`,`handled`,`spam`) default new, `handled_by` (fk users nullable),
`handled_at` nullable, `ip`, `user_agent`, timestamps. **Read-only dari admin** (tidak dibuat manual).

### 4.7 Peran (roles)
Kolom `role` enum(`admin`,`editor`) di `users` (default `editor`) **atau** paket
`spatie/laravel-permission` bila perlu granular. Rekomendasi: mulai dengan enum + Gate/Policy
(tanpa dependency). Naik ke spatie hanya bila butuh banyak peran/izin (lihat §7, butuh approval).

---

## 5. Strategi media / upload

Kebutuhan: cover Berita/Proyek/Produk, galeri Proyek, file Download & datasheet.

- **Mulai tanpa dependency:** simpan lewat `Storage` disk `public` (`php artisan storage:link`),
  path disimpan di kolom. Validasi mime/size di FormRequest. Cukup untuk kebutuhan saat ini.
- **Upgrade opsional (butuh approval):** `spatie/laravel-medialibrary` bila butuh konversi
  thumbnail/responsive images/koleksi terstruktur. Jangan pasang sebelum benar-benar perlu.
- **File Download:** rute unduh terpisah (`GET /download/{download}/file`) yang menaikkan
  `download_count`, bukan link langsung ke `/storage` — agar bisa dihitung & dikontrol.
- **Keamanan upload:** whitelist mime, batas ukuran, nama file di-generate (jangan pakai nama asli
  mentah), tolak SVG kecuali disanitasi.

> **Update — sudah dibangun (Latar Hero).** Latar bagian Hero tiap halaman publik kini bisa
> diganti dari admin (menu **Latar Hero**). Model `HeroBackground` (satu baris per `App\Enums\HeroPage`)
> menyimpan override di disk `public`; tanpa override, halaman memakai default bawaan yang jadi
> **single source of truth di enum** (`HeroPage::defaultImagePath()`), bukan hardcode di tsx.
> Peta `page => url` di-share global via `HandleInertiaRequests` dan dibaca hook `useHeroBackground`.
> Ini juga menutup sebagian item "Global settings" di §9 (khusus latar Hero, bukan menu/footer).

---

## 6. Rich text

Halaman Berita/Proyek/Produk butuh konten kaya. Karena admin = React:

- **Editor:** Tiptap (React) di form admin. Simpan **HTML** (atau JSON Tiptap).
  → **Dependency npm baru — butuh approval.**
- **Sanitasi (WAJIB):** jangan percaya HTML dari editor. Sanitasi **di server** sebelum simpan
  (mis. `mews/purifier`/HTMLPurifier) — **butuh approval**. Alternatif tanpa dependency:
  batasi ke **Markdown** (`league/commonmark` sudah lazim di ekosистem Laravel) dan render terkontrol.
- **Keputusan yang harus diambil di Fase 0:** Tiptap+HTML(+purifier) **vs** Markdown. Pengaruh ke
  skema (`body` isinya HTML atau MD) & form admin.

> **Update — sudah dibangun (rich text HTML).** Awalnya rilis dengan **Markdown** (`league/commonmark`).
> Kini di-upgrade ke **editor WYSIWYG TinyMCE** (self-hosted, lisensi GPL — bukan Tiptap; approval user)
> pada field konten `News.body`, `Product.description`, `Project.description`, `Faq.answer`. Field kini
> menyimpan **HTML**. Sanitasi **di server** via **`mews/purifier`** (HTMLPurifier) pada mutator model
> (whitelist di `config/purifier.php`) — bukan di klien. Migrasi konten Markdown lama sekali jalan:
> `php artisan content:markdown-to-html` (idempotent). Detail standar editor: `docs/dashboard/DESIGN.md` §7.2.

---

## 7. Dependency yang butуh persetujuan

Sesuai aturan proyek (tidak menambah dependency tanpa approval). Tiap butir punya alternatif tanpa-dependency:

| Kebutuhan | Kandidat | Alternatif tanpa dep |
|-----------|----------|----------------------|
| Rich text editor | Tiptap (npm) | Markdown + `league/commonmark` |
| Sanitasi HTML | `mews/purifier` | Batasi ke Markdown (render aman) |
| Media lanjutan | `spatie/laravel-medialibrary` | `Storage` disk `public` + kolom path |
| Role/permission granular | `spatie/laravel-permission` | kolom `role` enum + Gate/Policy |
| Tabel admin (sort/filter) | — (bangun sendiri di React) | reka-ulang dgn komponen shadcn |
| Chart/visualisasi dashboard | Recharts / Chart.js (npm) | angka + bar CSS sederhana (tanpa dep) |
| Analytics eksternal (opsi Fase 6) | Plausible / Umami (self-host, infra) | first-party middleware + tabel `page_views` (tanpa dep) |

Rekomendasi default: **mulai tanpa dependency** (Markdown + Storage + role enum), naikkan hanya saat
kebutuhan nyata muncul. Setiap kenaikan minta approval eksplisit.

---

## 8. Fase kerja

Estimasi = ukuran relatif (S ≈ 1–2 hari, M ≈ 3–5 hari, L ≈ 1–2 minggu), indikatif untuk 1 dev.
Setiap fase **wajib** menyertakan test (kebijakan proyek: tiap perubahan kode diuji). Definisi
"selesai" = deliverable jadi + kriteria terpenuhi + test hijau + Pint/ESLint bersih.

### Fase 0 — Fondasi (M) — *prasyarat semua fase*

> **✅ STATUS: SELESAI & terverifikasi** (14 test baru hijau, suite penuh 66/66). Yang ter-ship:
> `UserRole` enum + kolom `users.role` (**sengaja non-fillable** — role di-set eksplisit, tak bisa
> mass-assign lewat registrasi), Gate `admin` + middleware `EnsureUserIsAdmin` (alias `admin`),
> grup `/admin` (`auth`+`verified`+`admin`) → `Admin/DashboardController`, seeder admin awal.
> Instrumentasi analytics first-party **sudah dipasang sekarang** (bukan ditunda ke Fase 6):
> middleware `RecordPageView` di-scope HANYA ke grup rute marketing, model `PageView` (IP & sesi
> di-hash, bot di-skip), + dashboard menampilkan trafik nyata (kunjungan, unik, top pages, tren 7 hari).
> **Deviasi dari rencana:** (a) tak membuat `AdminLayout` terpisah — memakai `AppLayout` (sidebar
> starter-kit) + item nav "Admin CMS" yang hanya tampil untuk role admin (surgical, hindari duplikasi
> chrome); (b) dashboard menampilkan **analytics trafik**, bukan "jumlah konten" — koleksi belum ada,
> kartu konten menyusul per fase; (c) media/`storage:link` & keputusan rich text **belum** disentuh —
> baru relevan di Fase 1/2.
>
> **Gotcha (didokumentasikan):** `php artisan wayfinder:generate` TANPA `--with-form` menghapus helper
> `.form()` yang dipakai halaman auth/settings (vite-plugin pakai `formVariants: true`). Selalu regen
> dengan `--with-form` atau lewat `npm run build`.

Bangun kerangka sebelum konten pertama.
- **Auth/role:** tambah kolom `role` ke `users` (migrasi), Gate `admin`, middleware `EnsureUserIsAdmin`, seeder user admin awal.
- **Shell admin:** `AdminLayout` (Inertia) + rute group `/admin` di belakang `auth` + gate, dashboard kosong (kartu **jumlah konten + submission baru** — ini statistik *isi CMS*, bukan analytics trafik; analytics pengunjung ada di Fase 6), navigasi admin.
- **Instrumentasi analytics (opsional, dianjurkan didahulukan):** bila pilih pendekatan first-party (Fase 6), pasang middleware perekam `page_views` sejak sekarang agar data terkumpul sebelum widget dashboard dibangun. Perekaman ≠ visualisasi.
- **Konvensi:** tetapkan pola Controller resourceful + FormRequest + Policy + Resource + Factory/Seeder + test — dokumentasikan 1 contoh acuan.
- **Keputusan rich text** (Tiptap+HTML vs Markdown) — kunci di sini (§6).
- **Strategi media** (Storage disk `public` + `storage:link`) — siapkan helper upload.
- **Kriteria selesai:** non-admin ditolak dari `/admin` (redirect/403); admin melihat dashboard; `storage:link` jalan.
- **Test:** akses `/admin` oleh guest → redirect login; oleh editor → 403; oleh admin → 200. Gate unit test.

### Fase 1 — Inbox Kontak (S) — *nilai langsung, risiko terendah, tanpa redesign publik*
Ubah stub form jadi capture nyata. Dipilih pertama karena self-contained.
- Model/migrasi/factory `ContactSubmission`.
- `POST /kontak` → `KontakController@store`: FormRequest (validasi), honeypot + rate-limit anti-spam, simpan IP/UA.
- Ganti stub di `use-landing-effects.ts` → submit Inertia (`router.post`) dengan state sukses/gagal; pertahankan UX pesan terima kasih yang ada.
- Admin: daftar submission (tabel, filter status, search), detail, tandai `read`/`handled`/`spam`, hapus. **Read-only** (tak ada create/edit isi).
- Opsional: notifikasi email ke tim saat submission baru.
- **Kriteria selesai:** submit dari `/kontak` tersimpan & muncul di `/admin`; spam ter-block; badge "submission baru" di dashboard.
- **Test:** store valid→tersimpan; validasi gagal→error; honeypot terisi→ditolak; rate-limit; admin index butuh gate; ubah status.

### Fase 2 — Berita (L) — *flagship dynamic content, tegakkan pola CRUD penuh*
- Model/migrasi/factory/seeder `News` (slug, status, published_at, cover, category, body, SEO).
- Admin CRUD penuh: index (tabel+search+filter+paginate), create/edit (editor rich text, upload cover, draft/publish, auto-slug + unique), destroy.
- Publik: `BeritaController@index` (hanya `published` & `published_at <= now`, paginate) + `show` by slug (route-model-binding, 404 untuk draft). Ganti `berita-detail` statik jadi `/berita/{slug}`.
- Refactor `berita.tsx` & detail → baca props (komponen kartu/artikel `.pgl` **tidak diubah**, hanya sumber datanya).
- **Migrasi konten:** seeder dari artikel hardcoded prototype → DB.
- **Kriteria selesai:** artikel dibuat di admin muncul di `/berita`; draft tak tampil publik; slug unik; detail 404 bila draft/tak ada.
- **Test:** CRUD admin + gate; validasi; slug unik; index publik hanya published; show draft→404; paginate.

### Fase 3 — Proyek + Produk Kimia + Download (L) — *ulangi pola Fase 2 untuk katalog*
Pola CRUD sama; kekhususan per entitas:
- **Proyek:** galeri (multi-image), `sort_order`, filter kategori dari DB (ganti `[data-filter]` statik).
- **Produk Kimia:** `specs` (JSON key–value) → editor repeater di form; datasheet (file opsional).
- **Download:** upload file + size/mime, rute unduh berhitung (`download_count`), filter kategori dari DB.
- Refactor `proyek.tsx` / `produk-kimia.tsx` / `download.tsx` → props; **pertahankan interaksi filter** (kini kategori dari server).
- Seeder dari konten hardcoded tiap halaman.
- **Kriteria selesai:** ketiga katalog dikelola dari admin; filter publik jalan atas data DB; unduh terhitung.
- **Test:** CRUD+gate per entitas; validasi (termasuk upload mime/size); rute unduh menaikkan counter; filter mengembalikan subset benar.

### Fase 4 — FAQ (S)
- Model/migrasi/factory/seeder `Faq` (question, answer, category, `sort_order`, status).
- Admin CRUD + pengurutan (numeric `sort_order`; drag-order opsional).
- Publik `faq.tsx` dari DB — **pertahankan `<details>` accordion** yang sudah ada.
- Seeder dari 16 accordion prototype.
- **Test:** CRUD+gate; publik hanya `published`; urutan sesuai `sort_order`.

### Fase 5 — Pengerasan & rilis (M)
- **SEO:** field meta per koleksi sudah ada (Fase 2+) → pastikan ter-render di `<Head>`; `sitemap.xml` dinamis; `robots`.
- **Performa:** paginate semua list, cache query berat, optimasi/resize gambar, lazy-load.
- **Keamanan:** rate-limit form, audit sanitasi rich text, validasi upload, review Policy semua entitas.
- **Ops:** strategi backup DB + storage; log/audit perubahan konten (opsional).
- **Carryover bisnis:** ganti placeholder WhatsApp `6280000000000` (`resources/js/lib/landing.ts`) & email footer `@yahoo.com` → data resmi.
- Regresi penuh + cek aksesibilitas.
- **Test:** suite penuh hijau; smoke test 11 rute publik + rute admin; sitemap valid.

### Fase 6 — Analytics dashboard (M) — *statistik pengunjung & konten*

> **🟡 SEBAGIAN SUDAH SHIP di Fase 0** — pendekatan **#2 first-party dipilih & dieksekusi**: middleware
> `RecordPageView` + tabel `page_views` + widget dashboard dasar (kunjungan, unik, top pages, tren 7 hari)
> sudah jalan. **Sisa Fase 6:** rollup harian `page_view_daily` + scheduler, metrik konten (artikel
> terbaca / download terbanyak / tren submission — bergantung Fase 1–3), `Do-Not-Track`, dan grafik kaya.

Menambah analytics trafik + konten ke `/admin` (bukan sekadar jumlah isi CMS). **Keputusan pendekatan
dikunci di awal fase** (default rekomendasi: **first-party**, alasan di bawah).

**Pilihan pendekatan** (detail trade-off di §8-catatan bawah tabel):

| # | Pendekatan | Ringkas | Dependency |
|---|-----------|---------|------------|
| 1 | **Eksternal** (GA4 / Plausible / Umami) | Snippet di layout publik; dashboard menautkan/embed | Layanan pihak-3 / self-host infra; GA4 perlu consent cookie |
| 2 | **First-party** *(rekomendasi)* | Middleware Laravel catat request → tabel `page_views` → agregasi → widget nyatu di `/admin` | 0 dep untuk MVP; chart lib (approval) hanya bila butuh grafik kaya |
| 3 | **Hybrid** | Plausible/Umami self-host + tarik angka via API ke widget dashboard | Infra analytics + HTTP client |

Rekomendasi **#2 first-party**: sesuai tujuanmu ("nyatu di dashboard + data milik sendiri") & filosofi
dokumen "mulai tanpa dependency". Varian MVP tanpa dep (angka + bar CSS), naik ke chart lib bila perlu.

**Model data (bila #2/#3) — `page_views`** *(skema ter-ship)*:
`id`, `path`, `referrer` (nullable), `session_hash` (sesi ter-hash, untuk unique), `ip_hash`
(HASH, jangan IP mentah — privacy), `user_agent`, `device` (mobile/desktop), `viewed_at`.
Bot **tidak disimpan** (di-skip saat perekaman by user-agent), jadi tak ada kolom `is_bot`.
Opsional tabel rollup harian `page_view_daily` (`date`, `path`, `views`, `uniques`) via
scheduled command agar query dashboard ringan (**belum dibuat**).

**Metrik target:**
- *Trafik:* pengunjung unik & total page view (harian/mingguan), **halaman terpopuler**, sumber/referrer, device/browser, tren waktu.
- *Konten (nyambung CMS):* artikel paling dibaca, **download terbanyak** (`download_count` dari Fase 3), tren submission kontak (dari Fase 1).

**Deliverable:** middleware perekam (exclude `/admin`, aset, & bot) → tabel + agregasi → command rollup
(scheduler) → widget dashboard (kartu angka + tren + top pages + top konten).

**Privacy/keandalan:** hash IP (jangan simpan mentah), hormati `Do-Not-Track`, tanpa PII, filter bot
by user-agent, jangan hitung request admin/aset. Bila pilih GA4 → wajib consent/cookie banner.

- **Kriteria selesai:** kunjungan halaman publik tercatat & teragregasi; dashboard menampilkan pengunjung, halaman populer, tren; admin/aset/bot tak terhitung; IP ter-hash.
- **Test:** middleware mencatat request publik; **tidak** mencatat `/admin`/aset/bot; IP tersimpan ter-hash (bukan mentah); unique per `session_hash`; agregasi harian benar; widget dashboard butuh gate.

> **Catatan urutan:** perekaman (middleware + tabel) ringan & idealnya dipasang **sejak Fase 1** agar data
> menumpuk; **visualisasi** dashboard tetap di Fase 6. Jadi Fase 6 = terutama pekerjaan agregasi + UI.

---

## 9. Out of scope (sengaja ditunda)

Bukan bagian roadmap ini; catat sebagai kandidat fase lanjutan bila diminta:
- **Halaman statik editable** (Tentang/Solusi/Proteksi sebagai "Pages" block-based).
- **Global settings** (menu nav, footer, nomor WA, email, SEO default) via admin.
- **Taksonomi bersama** (tabel category/tag lintas-entitas) — sekarang kategori = kolom per entitas.
- **Multi-bahasa** (situs saat ini Indonesia saja).
- **Media library lanjutan**, **role granular (spatie)**, **workflow approval editor**, **versioning konten**.

---

## 10. Risiko & catatan

- **Refactor halaman publik** (props menggantikan JSX hardcoded) menyentuh file yang sudah teruji —
  jaga komponen/`.pgl` tetap sama, ganti hanya sumber data; pertahankan test rute publik yang ada
  (`tests/Feature/MarketingPagesTest.php` — komponen tak berubah, tapi kini butuh data/seed).
- **Gotcha className kondisional** (spasi di luar ternary) tetap berlaku di komponen admin — lihat memory `landing-page-implementation`.
- **`.env` tool-guarded** — konfigurasi (mail, filesystem) rutекan lewat subprocess artisan, bukan edit langsung.
- **Rich text = permukaan serangan XSS** — sanitasi server wajib; jangan render HTML mentah dari editor.
- **Dependency** hanya ditambah dengan approval eksplisit (§7).

---

## 11. Urutan eksekusi ringkas

```
✅ Fase 0 (fondasi) → ✅ Fase 1 (Kontak) → ✅ Fase 2 (Berita) → ✅ Fase 3 (Proyek/Produk/Download) → ✅ Fase 4 (FAQ) → ✅ Fase 5 (rilis) → ✅ Fase 6 (analytics)
```

> **🎉 SEMUA FASE SELESAI & terverifikasi** — suite penuh 139 test hijau (639 assertion), build + tsc + Pint bersih.
> Yang belum: mengganti data bisnis placeholder (nomor WhatsApp `6280000000000`, email `@yahoo.com`), mengunggah
> file Download nyata (record seed pakai path placeholder), dan opsi eskalasi analytics (chart lib / Plausible)
> bila butuh grafik lebih kaya. Semua opsional/menunggu klien — bukan pekerjaan kode yang tertunda.

Fase 0 prasyarat mutlak. Fase 1 lebih dulu dari Fase 2 karena self-contained & memberi nilai cepat
tanpa redesign halaman publik. Fase 2 menegakkan pola CRUD yang di-copy Fase 3–4. Fase 6 (analytics)
divisualisasikan pasca-rilis, tapi **perekamannya idealnya dipasang sejak Fase 1** agar data terkumpul.
