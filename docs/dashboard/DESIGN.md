# Admin Dashboard UI Architecture Guide

Panduan ini adalah sumber acuan desain dan interaksi untuk **CMS Admin** PT Pacific Gitalestari. Dokumen ini menetapkan standar ketika membuat fitur dashboard baru—bukan dokumentasi desain situs publik.

> Stack: Laravel 13 · Inertia v3 · React 19 · Tailwind CSS v4 · shadcn/ui · lucide-react  
> Bahasa UI: Bahasa Indonesia  
> Status: **Standar aktif** adalah pola yang telah dipakai. **Standar target** adalah pola yang wajib diikuti saat kapabilitas terkait pertama kali dibangun atau diperluas.

---

## 1. Dashboard Overview

Dashboard adalah ruang kerja internal untuk memantau situs dan mengelola konten. `/dashboard` merupakan beranda analitik; pengelolaan konten berada di `/admin/*`. Tidak ada beranda `/admin` terpisah.

| Area | Akses saat ini | Fungsi |
|---|---|---|
| `/dashboard` | admin terverifikasi | Analitik trafik dan ringkasan konten |
| `/admin/*` | admin terverifikasi | CRUD konten, inbox, dan pengaturan situs |
| `/settings/*` | pengguna terautentikasi | Profil, keamanan, dan tampilan akun |

Sumber data analitik adalah `page_views` first-party. Middleware pencatatannya hanya dipasang pada halaman pemasaran sehingga trafik admin, autentikasi, dan sistem tidak mengotori metrik.

Setiap fitur baru—misalnya Users, Roles, Media Library, Activity Log, atau Settings tambahan—harus mengikuti panduan ini sebelum membuat komponen baru.

---

## 2. Dashboard Philosophy

Dashboard harus terasa seperti alat kerja: tenang, prediktif, cepat, dan aman.

1. **Konsisten lebih penting daripada unik.** Gunakan pola yang telah ditetapkan sebelum membuat variasi visual baru.
2. **Utamakan tugas utama.** Satu halaman memiliki satu primary action yang jelas.
3. **Informasi sebelum dekorasi.** Status, angka, konteks, dan konsekuensi aksi harus terbaca tanpa mengandalkan warna.
4. **Aman secara default.** Aksi permanen butuh konfirmasi; hak akses selalu diperiksa server-side.
5. **Progressive disclosure.** Detail lanjutan, filter tambahan, dan metadata sekunder tidak boleh mengganggu alur utama.
6. **Dapat berkembang.** Tabel, filter, form, dan permission harus tetap dapat dipakai saat volume data bertambah.

---

## 3. Dashboard Layout

Semua halaman dashboard memakai `AppLayout`. Halaman tidak boleh membuat sidebar, header, atau state layout sendiri.

```
┌──────────────────────────────────────────────────────────┐
│ AppShell / SidebarProvider                                │
│ ┌────────────┬─────────────────────────────────────────┐ │
│ │ AppSidebar │ AppContent / SidebarInset                │ │
│ │ Logo       │ ┌─────────────────────────────────────┐ │ │
│ │ Navigation │ │ Header: trigger · breadcrumb        │ │ │
│ │ Footer     │ ├─────────────────────────────────────┤ │ │
│ │ User menu  │ │ Page: Heading · action · content    │ │ │
│ └────────────┴─┴─────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

| Bagian | Berkas | Standar |
|---|---|---|
| Root layout | `resources/js/layouts/app-layout.tsx` | Toast bridge dan breadcrumb layout. |
| Shell | `components/app-shell.tsx` | `SidebarProvider`; state awal berasal dari `sidebarOpen`. |
| Sidebar | `components/app-sidebar.tsx` | `variant="inset"` dan dapat diciutkan menjadi ikon. |
| Header | `components/app-sidebar-header.tsx` | Trigger sidebar dan breadcrumb; `h-16`, atau `h-12` saat collapsed. |
| Konten | `components/app-content.tsx` | `SidebarInset` dengan `overflow-x-hidden`. |

Setiap halaman wajib memuat urutan berikut:

```
Breadcrumb
Heading + description                         Primary action (bila ada)
Filter/search (bila diperlukan)
Main content
Secondary information atau activity (bila diperlukan)
```

Gunakan padding halaman `px-4 py-6`. Judul browser memakai `<Head title="…" />`. Metadata layout harus mengisi breadcrumb lewat helper Wayfinder:

```tsx
Page.layout = {
    breadcrumbs: [{ title: 'Nama halaman', href: routeHelper() }],
};
```

---

## 4. Navigation

Navigasi memakai `NavItem` (`title`, `href`, `icon`) dan ikon `lucide-react`. Semua route React harus datang dari Wayfinder; URL literal aplikasi tidak diperbolehkan.

| Grup | Item saat ini |
|---|---|
| Utama | Dashboard |
| CMS | Berita, Proyek, Galeri, Produk Kimia, Download, FAQ, Legalitas |
| Operasional | Inbox Kontak |
| Konfigurasi | Latar Hero, Pengaturan Situs |

Aturan navigasi:

- Letakkan fitur pada grup berdasarkan pekerjaan pengguna, bukan berdasarkan model database.
- Gunakan nama pendek, konkret, dan konsisten dalam Bahasa Indonesia.
- Menu yang tidak diizinkan **disembunyikan**, bukan sekadar dibuat nonaktif.
- Sidebar collapsed tetap harus menyediakan tooltip/label dari primitive sidebar.
- Saat menambah route backend, regenerasikan helper Wayfinder dengan opsi `--with-form` sesuai konvensi proyek.

Status sidebar dipersist melalui cookie `sidebar_state`. Jangan menambahkan state sidebar per halaman.

---

## 5. Dashboard Analytics

Halaman `resources/js/pages/dashboard.tsx` menampilkan analitik first-party dari `Admin\DashboardController`.

### 5.1 Card pattern

Setiap card analitik mengikuti struktur yang sama:

```
[icon opsional]  Label singkat
                 Nilai utama
                 Deskripsi / periode / pembanding
                 Footer atau link detail opsional
```

| Elemen | Standar |
|---|---|
| Container | `Card` dengan `CardHeader` dan `CardContent`. |
| Label | `CardDescription` atau teks muted yang singkat. |
| Nilai | `CardTitle`, minimal `text-2xl`; `text-3xl` untuk KPI utama; selalu `tabular-nums`. |
| Format angka | `toLocaleString('id-ID')`. |
| Ikon | Opsional; hanya jika membantu membedakan metrik, bukan dekorasi. |
| Trend | Opsional; tampilkan periode dan arah dalam teks, bukan hanya warna/panah. |
| Footer | Opsional; gunakan untuk definisi metrik atau link ke detail. |

Jangan mencampur ukuran nilai, posisi label, atau makna warna di antara card pada satu halaman.

### 5.2 Analytics saat ini

| Seksi | Data | Bentuk |
|---|---|---|
| Statistik utama | `stats` | Empat card; `sm:grid-cols-2 lg:grid-cols-4`. |
| Konten CMS | `contentCounts`, `totalDownloads` | Satu card dengan `grid-cols-2 sm:grid-cols-5`. |
| Tren | `trend` | Grafik batang CSS tujuh hari; seri diisi nol oleh server. |
| Halaman terpopuler | `topPages` | Path `font-mono`, jumlah rata kanan, empty state. |
| Artikel terpopuler | `topArticles` | Judul `truncate`, jumlah `tabular-nums`, empty state. |

Grafik CSS cukup untuk satu seri pendek. Gunakan chart library hanya setelah diperlukan filter periode, tooltip kaya, drill-down, beberapa seri, atau ekspor. `maxViews` minimal `1` agar data nol tidak merusak tinggi batang.

---

## 6. CRUD Pattern

Pilih pola berdasarkan tugas pengguna, bukan dengan memaksakan setiap sumber data menjadi CRUD penuh.

| Pola | Digunakan oleh | Halaman |
|---|---|---|
| CRUD konten | Berita, Proyek, Galeri, Produk Kimia, Download, FAQ, Legalitas | `index`, `create`, `edit` |
| Inbox workflow | Inbox Kontak | `index`, `show`; perubahan status dan hapus dari detail |
| Singleton | Pengaturan Situs | `edit` untuk satu sumber pengaturan global |
| Daftar tetap | Latar Hero | `index` berisi daftar halaman tetap (enum `HeroPage`); tiap baris unggah/kembalikan gambar latar Hero, bukan create/delete record |

Aturan CRUD:

1. **Index** adalah tempat menemukan, memfilter, dan memilih data.
2. **Create** hanya berisi input yang diperlukan untuk menghasilkan record valid.
3. **Edit** memakai form yang sama dengan create dan menampilkan konteks record.
4. **Show/detail** dipakai ketika pembacaan atau workflow lebih penting daripada mengedit langsung.
5. **Delete** tidak boleh menjadi primary action dan harus berada setelah aksi aman seperti edit atau archive.
6. Tindakan berikutnya setelah simpan harus jelas: kembali ke daftar dengan toast, tetap di halaman untuk workflow lanjutan, atau buka detail—pilih satu secara konsisten per resource.

---

## 7. Forms Pattern

Form bersama berada di `components/admin/<nama>-form.tsx` dan menggunakan `useForm` Inertia. Create dan edit harus berbagi komponen form bila struktur datanya sama.

### 7.1 Struktur form

```
Heading + konteks
Field group
  Label
  Input control
  Hint opsional
  Validation error
Secondary group / details
Action bar: Cancel · Save
```

- Kontainer default: `max-w-2xl space-y-6`.
- Satu field terdiri dari `Label`, kontrol, hint bila perlu, dan `InputError`.
- `htmlFor` dan `id` wajib berpasangan.
- Required, format, dan batasan ditunjukkan sebelum submit; validasi server tetap menjadi sumber kebenaran.
- Primary submit dinonaktifkan ketika `form.processing` dan memiliki label aksi yang spesifik.
- `Cancel` kembali ke konteks sebelumnya tanpa melakukan mutasi.

### 7.2 Standar jenis input

| Jenis | Standar penggunaan |
|---|---|
| Text input | Data singkat satu baris: judul, nama, kode, URL. |
| Textarea | Ringkasan, catatan, atau isi multi-baris; gunakan `whitespace-pre-wrap` pada tampilan hasil jika relevan. |
| Markdown | Tidak lagi dipakai untuk field konten CMS (digantikan Rich text). Bila suatu field memang butuh Markdown, tampilkan label “Markdown”, hint sintaks, dan sanitasi HTML mentah di server. |
| Rich text | **Standar aktif.** Editor WYSIWYG TinyMCE (self-hosted, lisensi GPL) untuk field konten `News.body`, `Product.description`, `Project.description`, `Faq.answer`. Komponen `components/admin/rich-text-editor.tsx` dimuat **client-only** (dynamic import di `useEffect`) karena TinyMCE menyentuh `window` saat import dan akan memecahkan SSR Inertia. Output HTML **disanitasi di server** pada mutator model lewat HTMLPurifier (whitelist di `config/purifier.php`), bukan di klien — sanitasi klien tidak boleh jadi sumber kebenaran. |
| Image upload | `accept="image/*"`, preview aset lama/edit, pesan batas format/ukuran, dan `InputError`. |
| Gallery upload | **Standar target.** Tampilkan antrean, progres, urutan, status gagal, dan kemampuan hapus sebelum simpan. |
| File upload | Batasi `accept` pada tipe yang didukung; jelaskan file yang sedang tersimpan saat edit. |
| Select | Pilihan eksklusif dengan daftar stabil. Native `select` boleh untuk pilihan sederhana; pakai primitive `Select` untuk kebutuhan pencarian/kelompok. |
| Multi-select | **Standar target.** Gunakan chip/tag dengan tombol hapus, pencarian, dan batas pilihan bila diperlukan. |
| Checkbox | Pilihan biner independen atau konfirmasi eksplisit; label harus dapat diklik. |
| Switch | **Standar target.** Hanya untuk perubahan boolean yang langsung dipahami; gunakan checkbox bila perubahan perlu persetujuan saat submit. |
| Radio | Pilihan eksklusif berjumlah kecil yang sebaiknya terlihat seluruhnya. |
| Date/date-time | Gunakan field native yang konsisten dengan timezone aplikasi; jelaskan zona waktu bila nilai dipublikasikan. |
| Slug | Boleh dibuat otomatis dari judul hingga pengguna mengubahnya; setelah diedit manual, jangan menimpa input pengguna. |

Untuk PUT/PATCH yang mengunggah berkas, gunakan multipart dan method spoofing pada baris terpisah:

```tsx
form.transform((data) => ({ ...data, _method: 'put' }));
form.post(updateUrl, { forceFormData: true });
```

`transform()` mengembalikan `void`, sehingga tidak boleh di-chain dengan `.post()`.

---

## 8. Table Pattern

Tabel adalah pola utama untuk data operasional. Gunakan tabel ketika pengguna perlu memindai, membandingkan, memfilter, atau melakukan aksi terhadap banyak record.

```
┌──────────────────────────────────────────────────────────────────┐
│ Search                         Filter                + Buat baru │
├──────────────────────────────────────────────────────────────────┤
│ □ │ Judul / informasi utama │ Status │ Diperbarui │ Aksi         │
├──────────────────────────────────────────────────────────────────┤
│ □ │ Konten yang dapat dibaca │ Badge  │ 31 Jul 2026│ Edit · Hapus │
└──────────────────────────────────────────────────────────────────┘
                 Pagination · jumlah hasil · bulk action
```

### 8.1 Struktur dan konten

- Bungkus tabel dengan `rounded-xl border`; header memakai `bg-muted/50 text-left text-muted-foreground`; baris memakai `border-t hover:bg-muted/30`.
- Urutan kolom: selection (jika ada), identitas utama, atribut penting, status, tanggal, lalu aksi.
- Kolom identitas utama harus paling mudah dipindai dan memakai `font-medium`.
- Status memakai `Badge` dengan label, bukan warna saja.
- Angka serta tanggal rata dengan konsisten; angka memakai `tabular-nums`.
- Kolom aksi berada paling kanan dan menggunakan label yang jelas. Aksi sekunder dapat disimpan pada menu overflow ketika tabel padat.
- Jangan menaruh informasi panjang yang membuat baris tinggi. Gunakan `truncate`, detail, atau halaman show.

### 8.2 Sorting, pagination, dan selection

| Kapabilitas | Standar target |
|---|---|
| Sorting | Header sortable menampilkan arah urutan dan dapat dioperasikan keyboard. Default sort harus stabil dan terdokumentasi. |
| Pagination | Query/filter/sort dipertahankan saat berpindah halaman; reset ke halaman pertama ketika filter atau search berubah. |
| Page size | Tambahkan hanya setelah volume data memerlukannya; sediakan pilihan yang terbatas dan persist dalam query. |
| Row selection | Hanya tampil jika setidaknya ada bulk action yang aman dan bernilai. `Select all` harus menjelaskan apakah cakupannya halaman ini atau seluruh hasil filter. |
| Row action | Gunakan link/button dengan label spesifik. Hindari menjadikan seluruh baris link jika tabel memiliki banyak kontrol interaktif. |

Implementasi saat ini menampilkan pagination bila `links.length > 3`. Pertahankan perilaku ini sampai pola paginator bersama dibutuhkan.

### 8.3 Bulk action

**Standar target.** Bulk action dipakai untuk pekerjaan berulang, misalnya publish, draft, archive, delete, atau export.

1. Selection muncul setelah pengguna memilih minimal satu baris.
2. Toolbar menampilkan jumlah record terpilih dan tindakan yang valid untuk seluruh selection.
3. Aksi berisiko menampilkan dialog konfirmasi dengan jumlah target dan dampaknya.
4. Aksi berjalan dengan status processing, hasil ringkas, dan refresh daftar yang mempertahankan filter.
5. Bulk delete tidak boleh menjadi satu-satunya bulk action yang tersedia bila operasi aman seperti archive tersedia.

---

## 9. Filter & Search Pattern

Search dan filter harus membentuk satu sumber state: URL/query. Pengguna harus bisa bookmark, membagikan, refresh, dan kembali ke daftar tanpa kehilangan konteks.

```
Search / filter / sort berubah
          ↓
Normalisasi nilai dan reset page
          ↓
Tulis query lewat router.get()
          ↓
Server mengembalikan hasil + query yang sama
          ↓
Pagination dan reset filter mempertahankan konteks
```

| Elemen | Standar |
|---|---|
| Search | Placeholder menyebut bidang pencarian, misalnya “Cari judul…”. |
| Debounce | **Standar target:** 300–400 ms untuk pencarian langsung pada daftar besar. Untuk pola submit eksplisit saat ini, pertahankan tombol “Cari” sampai debounce dibangun dengan benar. |
| Filter | Status, kategori, tanggal, author, dan sort hanya ditampilkan bila data mendukungnya. Jangan menampilkan filter tanpa dampak. |
| Active filter | Nilai aktif harus terlihat, dapat dihapus satu per satu, dan memiliki “Reset filter” ketika lebih dari satu filter digunakan. |
| Persistensi | Simpan di query string; `preserveState` hanya saat memang menjaga input lokal diperlukan. |
| Pagination | Perubahan search/filter/sort selalu mengembalikan pengguna ke halaman pertama. |
| Empty result | Bedakan “Belum ada data” dari “Tidak ada hasil untuk filter ini”, dan tawarkan reset filter untuk kondisi kedua. |

Filter chip `Link` cocok untuk sejumlah status kecil. Gunakan panel/filter popover ketika jumlah filter atau kontrol tanggal mulai bertambah.

---

## 10. Modal & Dialog Pattern

Gunakan `Dialog` untuk interaksi fokus yang singkat, bukan sebagai pengganti halaman create/edit yang kompleks.

| Gunakan dialog untuk | Jangan gunakan dialog untuk |
|---|---|
| Konfirmasi delete, archive, restore, publish, atau bulk action | Form panjang, editor konten, upload banyak berkas, atau proses multi-langkah |
| Detail kecil yang tidak membutuhkan URL sendiri | Halaman yang perlu dapat dibookmark atau dibagikan |
| Pilihan yang harus diselesaikan sebelum melanjutkan | Informasi yang dapat ditampilkan inline |

Struktur dialog:

```
Title: kata kerja + objek
Description: dampak dan target yang akan berubah
Content: input minimum bila benar-benar diperlukan
Footer: Cancel (secondary) · Confirm action (primary/destructive)
```

- Tombol default adalah `Cancel` untuk aksi destruktif.
- Tombol konfirmasi menyebut tindakan, misalnya “Hapus 3 berita”, bukan “OK”.
- Selama request, disable aksi untuk mencegah submit ganda dan pertahankan fokus.
- Setelah sukses, tutup dialog lalu tampilkan toast; setelah gagal, pertahankan dialog dan tampilkan error yang dapat ditindaklanjuti.
- Aksi hapus CMS memakai `DeleteConfirmationDialog` bersama di `components/admin/delete-confirmation-dialog.tsx`. Dialog menyebut target, menjelaskan bahwa penghapusan permanen, menonaktifkan tombol saat request, lalu menutup setelah mutasi berhasil.

---

## 11. Feedback Pattern

Feedback harus dekat dengan konteks, spesifik, dan tidak menghilang sebelum pengguna memahami hasilnya.

| Kondisi | Pola |
|---|---|
| Sukses mutasi | Toast sukses satu kali, misalnya “Berita berhasil diperbarui.” |
| Gagal validasi | `InputError` tepat di bawah field; fokus/scroll ke error pertama bila form panjang. |
| Gagal request umum | Toast error atau `Alert` inline yang menjelaskan apa yang bisa dilakukan berikutnya. |
| Aksi sedang berjalan | Tombol processing nonaktif dengan label yang tetap menjelaskan aksi. |
| Perubahan status | Update daftar/detail lalu tampilkan toast singkat. |

Toast memakai Sonner di `bottom-right` dan mengikuti tema aktif. Dua channel yang berlaku:

| Sumber | Penggunaan |
|---|---|
| `Inertia::flash('toast', { type, message })` | event flash untuk flow pengaturan yang ada |
| `redirect()->with('success' | 'error', message)` | prop `flash.success` / `flash.error` untuk CRUD admin |

`useFlashToast()` harus berada di dalam tree Inertia, yaitu di `AppLayout`. `<Toaster />` di `app.tsx` hanya host render dan tidak boleh memanggil `usePage()`.

---

## 12. Loading & Empty State

Loading dan empty state adalah bagian dari desain halaman, bukan fallback teknis.

### Loading

- Tampilkan `Skeleton` dengan struktur yang menyerupai konten akhir: card untuk analytics, baris untuk tabel, dan field untuk form yang deferred.
- Jangan mengosongkan seluruh shell atau menggeser layout saat data muncul.
- Tombol mutasi memakai status `processing`; jangan membuat toast “Loading…” jika indikator lokal sudah cukup.
- Untuk filter/search, pertahankan hasil sebelumnya selama visit bila ini menghindari kedipan yang membingungkan.

### Empty state

| Kondisi | Pesan dan aksi |
|---|---|
| Belum pernah ada data | Jelaskan kondisi dan tampilkan CTA create jika pengguna berhak. |
| Tidak ada hasil filter | Jelaskan filter tidak menemukan hasil dan berikan reset filter. |
| Tidak ada akses data | Jangan gunakan empty state; tampilkan forbidden state. |
| Data dihapus | Kembali ke daftar atau parent context dengan toast sukses. |

Empty state minimum terdiri dari judul singkat, satu kalimat bantuan, dan satu CTA hanya jika tindakan tersebut aman serta diizinkan.

---

## 13. Error State

Error state harus membedakan kesalahan pengguna, gangguan sementara, dan akses terlarang.

| Jenis | Tindakan UI |
|---|---|
| Validation (422) | Error per field; pertahankan nilai input. |
| Unauthorized / forbidden (401/403) | Halaman jelas tanpa navigasi yang mengundang aksi terlarang; berikan link kembali yang aman. |
| Not found (404) | Jelaskan record tidak tersedia atau telah dihapus; sediakan kembali ke daftar. |
| Server/network (5xx / jaringan) | Alert yang ramah, aksi “Coba lagi” jika request aman diulang, dan jangan kehilangan input form. |
| Upload gagal | Tampilkan error pada item/file terkait dan biarkan pengguna memilih ulang. |

Jangan menampilkan detail exception, stack trace, atau informasi internal kepada pengguna. Error teknis tetap harus dicatat di server sesuai praktik aplikasi.

---

## 14. Permission & Role UI

**Kondisi saat ini:** `UserRole` memiliki `admin` dan `editor`, namun area CMS masih digerbang middleware `admin`. Editor akan menerima 403 untuk route CMS sampai kebijakan dan route diperluas.

**Model target:** UI mengikuti kemampuan yang diberikan server/policy, bukan role string yang di-hardcode di tiap komponen.

| Role target | Navigasi | Mutasi | Tampilan |
|---|---|---|---|
| Admin | Seluruh menu yang diizinkan | Penuh, termasuk pengaturan dan aksi permanen | Normal |
| Editor | Menu konten yang diizinkan | Create/edit sesuai policy; tidak otomatis boleh delete/pengaturan | Normal pada fitur yang diizinkan |
| Viewer | Menu/data baca yang diizinkan | Tidak ada mutasi | Read-only, tanpa CTA mutasi |

Aturan permission UI:

- Server-side authorization adalah sumber kebenaran; hidden menu bukan mekanisme keamanan.
- Sembunyikan menu dan CTA untuk kemampuan yang tidak dimiliki pengguna.
- Gunakan disabled control hanya bila pengguna perlu memahami bahwa aksi tersedia tetapi sementara tidak dapat dilakukan, dan sertakan alasan yang terlihat.
- Untuk data yang boleh dibaca tetapi tidak diubah, tampilkan field read-only dengan status/keterangan yang jelas.
- Halaman forbidden harus lebih eksplisit daripada empty state dan menyediakan jalan kembali yang aman.
- Props kemampuan masa depan sebaiknya bernama tindakan, misalnya `can.update` atau `can.delete`, bukan memaksa semua halaman memeriksa role.

---

## 15. Responsive Behaviour

Dashboard harus usable di mobile, tablet, dan desktop—bukan hanya “muat”.

| Area | Mobile | Desktop |
|---|---|---|
| Sidebar | Ditutup/dikelola oleh primitive sidebar | Dapat terbuka atau collapsed menjadi ikon |
| Heading/action | Stack atau wrap; CTA tidak terpotong | Judul kiri, primary action kanan |
| KPI cards | Satu kolom lalu dua kolom pada `sm` | Empat kolom pada `lg` |
| Analytics grid | Satu kolom | Dua kolom pada `lg` |
| Table | Prioritaskan kolom utama; scroll horizontal bila perlu | Semua kolom relevan terlihat |
| Form | Satu kolom kecuali field berpasangan yang tetap terbaca | Grid dua kolom bila membantu scanning |
| Dialog | Lebar aman dengan padding layar | Lebar sesuai konten, tidak berlebihan |

Aturan wajib:

- Jangan menyembunyikan data kritis hanya untuk menghindari horizontal scroll.
- Gunakan `flex-wrap` pada toolbar, filter, dan action group.
- Target sentuh harus cukup besar dan tidak berhimpitan.
- Uji minimal pada lebar mobile, tablet, dan desktop setelah mengubah tabel, form, atau toolbar.

---

## 16. Design Tokens

Gunakan token semantik yang sudah tersedia di `resources/css/app.css`. Token otomatis menyesuaikan light/dark mode.

| Kebutuhan | Token / utilitas |
|---|---|
| Permukaan | `background`, `card`, `popover` |
| Teks | `foreground`, `muted-foreground` |
| Aksi utama | `primary`, `primary-foreground` |
| Aksi destruktif | `destructive`, `destructive-foreground` |
| Batas dan input | `border`, `input`, `ring` |
| Sidebar | seluruh token `sidebar-*` |
| Spacing halaman | `px-4 py-6`, `gap-4`, `mt-4`, `mt-6` |
| Radius | `rounded-md` untuk kontrol; `rounded-xl` untuk card/tabel |

Jangan gunakan hex color atau palet ad-hoc untuk UI dashboard. Jangan menggunakan `chart-*` untuk menyampaikan status sukses/gagal; gunakan token semantik dan teks.

---

## 17. Component Standards

| Kebutuhan | Komponen / aturan |
|---|---|
| Judul halaman | `Heading` dengan title dan description kontekstual |
| Kontainer | `Card`, `CardHeader`, `CardContent`, `CardTitle`, `CardDescription` |
| Aksi | `Button`; gunakan `asChild` saat membungkus `Link` |
| Input | `Input`, `Label`, `InputError` |
| Pilihan kaya | `Select`, `Checkbox`, `Dialog` dari `components/ui` saat kebutuhan sesuai |
| Status | `Badge` dengan label tekstual |
| Notifikasi | Sonner melalui `useFlashToast` |
| Ikon | `lucide-react` |
| Kelas kondisional | `cn()` dari `@/lib/utils` |

Konvensi visual:

- Heading halaman: `text-xl font-semibold tracking-tight`; deskripsi `text-sm text-muted-foreground`.
- Heading card: `text-base`.
- Angka: `tabular-nums` dan `toLocaleString('id-ID')`.
- Aksi utama memakai `Button` primary; aksi sekunder memakai `outline`/link; aksi berbahaya memakai `destructive`.
- Jangan membuat komponen generik baru sampai pola dipakai setidaknya dua kali atau memang menyelesaikan masalah aksesibilitas/kompleksitas yang nyata.

---

## 18. Best Practices

- Mulai dari pola yang paling dekat di aplikasi sebelum menulis UI baru.
- Gunakan data page props dengan tipe eksplisit; hindari `any`.
- Semua link dan submit memakai helper Wayfinder dari `@/routes` atau `@/actions`.
- Tetapkan loading, success, empty, validation, error, dan forbidden state sebelum fitur dianggap selesai.
- Hindari lebih dari satu primary action dalam satu area visual.
- Tulis label aksi dalam bentuk kata kerja + objek: “Buat berita”, “Simpan pengaturan”, “Hapus pesan”.
- Jangan mengandalkan tooltip sebagai satu-satunya penjelasan untuk aksi penting.
- Pertahankan filter/search/pagination dalam URL dan hindari state duplikat.
- Validasi di server; UI hanya membantu pengguna memperbaiki input lebih cepat.
- Uji keyboard focus, dark mode, layar kecil, dan data yang sangat panjang sebelum menyerahkan fitur.
- Setelah route/form Laravel berubah, regenerasikan Wayfinder sesuai konvensi proyek.

---

## 19. Future Guidelines

Bagian ini menetapkan arah ekspansi. Daftar berikut **bukan** bukti bahwa fitur sudah tersedia.

| Fitur masa depan | Gunakan ketika | Pedoman awal |
|---|---|---|
| Charts | Analitik melampaui tujuh titik/satu seri | Tentukan periode, empty state, tooltip, dan export terlebih dahulu. |
| Timeline / Activity Log | Perlu jejak perubahan record | Catat pelaku, waktu, aksi, objek, dan ringkasan perubahan; jangan tampilkan data sensitif. |
| Calendar | Konten atau tugas berbasis tanggal | Sediakan list alternatif dan timezone eksplisit. |
| Kanban | Workflow memiliki status yang mudah dipindahkan | Definisikan permission, urutan, undo, dan perilaku keyboard sebelum drag-and-drop. |
| Media Manager / File Browser | Aset dipakai banyak resource | Wajib ada pencarian, filter tipe, preview, metadata, izin, dan state upload. |
| Audit Trail | Perubahan memerlukan akuntabilitas | Bersifat read-only bagi kebanyakan role dan dapat difilter menurut record/pelaku. |
| Users & Roles | Pengelolaan akses perlu dioperasikan di UI | Bangun capability/policy dahulu; role UI tidak boleh menjadi satu-satunya guard. |
| Bulk action | Operasi sama berulang pada banyak record | Implementasikan selection, scope, konfirmasi, processing, dan hasil ringkas sebagai satu paket. |

Saat menambahkan pola baru, perbarui dokumen ini dengan: tujuan, struktur visual, states, permission, responsivitas, dan contoh komponen/referensi. Dengan begitu fitur berikutnya mengikuti standar yang sama tanpa mendesain ulang dari nol.
