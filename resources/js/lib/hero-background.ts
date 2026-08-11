import { usePage } from '@inertiajs/react';

/**
 * Page keys that own a swappable Hero background. Mirror of the PHP
 * App\Enums\HeroPage values — keep the two in sync.
 */
export type HeroPageKey =
    | 'beranda'
    | 'tentang'
    | 'solusi'
    | 'proteksi'
    | 'kontak'
    | 'proyek'
    | 'produk-kimia'
    | 'berita'
    | 'faq'
    | 'download'
    | 'galeri'
    | 'legalitas';

/**
 * Resolve a page's Hero background URL from the globally-shared `heroBackgrounds`
 * map. The server always supplies every key (admin override → bundled default),
 * so there is no client-side fallback and no hardcoded default path here.
 */
export function useHeroBackground(page: HeroPageKey): string {
    const { heroBackgrounds } = usePage().props;

    return heroBackgrounds[page];
}
