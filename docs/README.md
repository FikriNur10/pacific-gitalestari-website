# Dokumentasi PT. Pacific Gitalestari

Peta dokumentasi internal untuk situs marketing PGL (Laravel 13 · Inertia v3 · React 19 · Tailwind v4).

## Peta direktori

| Direktori | Isi |
|-----------|-----|
| `dashboard/` | Desain UI dashboard CMS admin — shell, navigasi, analytics, pola CRUD, toast, design system |
| `roadmap/` | Rencana pengembangan berfase — arah kerja jangka menengah/panjang |

## Roadmap aktif

| Dokumen | Ringkas |
|---------|---------|
| [roadmap/cms.md](roadmap/cms.md) | Transformasi situs statik → **CMS** (admin custom Inertia/React, koleksi dinamis: Berita, Proyek, Produk Kimia, Download, FAQ, Inbox Kontak) + **analytics dashboard** (Fase 6) |

## Konteks proyek (ringkas)

Situs ini di-port dari prototype HTML statik menjadi 11 halaman Inertia/React. Saat ini
seluruh konten **hardcoded** di `resources/js/pages/*.tsx` dan dirutekan lewat
`Route::inertia()` tanpa controller/database. Auth sudah kuat (Fortify: login, 2FA, passkey),
tetapi belum ada model konten maupun peran (role) admin.

> Detail arsitektur port statik ada di memory `landing-page-implementation`; setup Docker lokal
> di memory `docker-local-run`.
