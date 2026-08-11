<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * The public marketing pages whose Hero background image is swappable from the
 * admin dashboard (Latar Hero). Each case owns the ONE bundled default asset
 * shipped in /public — this enum is the single source of truth for those
 * defaults, so the frontend no longer hardcodes them (see useHeroBackground).
 *
 * Values mirror the page keys used in resources/js/lib/hero-background.ts.
 */
enum HeroPage: string
{
    case Beranda = 'beranda';
    case Tentang = 'tentang';
    case Solusi = 'solusi';
    case Proteksi = 'proteksi';
    case Kontak = 'kontak';
    case Proyek = 'proyek';
    case ProdukKimia = 'produk-kimia';
    case Berita = 'berita';
    case Faq = 'faq';
    case Download = 'download';
    case Galeri = 'galeri';
    case Legalitas = 'legalitas';

    /**
     * Human label shown in the admin Latar Hero list.
     */
    public function label(): string
    {
        return match ($this) {
            self::Beranda => 'Beranda',
            self::Tentang => 'Tentang Kami',
            self::Solusi => 'Solusi',
            self::Proteksi => 'Proteksi',
            self::Kontak => 'Kontak',
            self::Proyek => 'Proyek',
            self::ProdukKimia => 'Produk Kimia',
            self::Berita => 'Berita',
            self::Faq => 'FAQ',
            self::Download => 'Download',
            self::Galeri => 'Galeri',
            self::Legalitas => 'Legalitas',
        };
    }

    /**
     * The bundled default background — a root-relative URL to a static asset in
     * /public/landing/images (served directly, NOT via the storage disk). Used
     * whenever the admin has not uploaded an override. These paths were lifted
     * verbatim from the pages' original hardcoded `src` so nothing changes visually
     * until an admin swaps an image.
     */
    public function defaultImagePath(): string
    {
        return match ($this) {
            self::Beranda => '/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.jpg',
            self::Tentang => '/landing/images/rephile-water-nINNu6nHH5o-unsplash.jpg',
            self::Solusi => '/landing/images/rephile-water-8mpHMUsrYDo-unsplash.jpg',
            self::Proteksi => '/landing/images/concrete-floor-pmWQwdO9Rpg-unsplash.jpg',
            self::Kontak => '/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.jpg',
            self::Proyek => '/landing/images/concrete-structures-Ac97OqAWDvg-unsplash.jpg',
            self::ProdukKimia => '/landing/images/chemical-steel-tanks-xD5SWy7hMbw-unsplash.jpg',
            self::Berita => '/landing/images/steel-pipelines-4CNNH2KEjhc-unsplash.jpg',
            self::Faq => '/landing/images/water-storage-tanks-dbePDzNQFec-unsplash.jpg',
            self::Download => '/landing/images/steel-pipes-scUBcasSvbE-unsplash.jpg',
            self::Galeri => '/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.jpg',
            self::Legalitas => '/landing/images/steel-pipelines-4CNNH2KEjhc-unsplash.jpg',
        };
    }
}
