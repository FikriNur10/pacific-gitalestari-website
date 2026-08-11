import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type GalleryItem = {
    title: string;
    category: string | null;
    imageUrl: string;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    items: {
        data: GalleryItem[];
        links: PaginationLink[];
    };
    categories: string[];
    activeCategory: string | null;
};

/**
 * Galeri (Gallery) — CMS-backed grid of published photos, with an optional
 * category filter. Chrome mirrors the Proyek page for a consistent look.
 */
export default function Galeri({
    items,
    categories,
    activeCategory,
}: PageProps) {
    const heroBg = useHeroBackground('galeri');

    return (
        <LandingLayout title="Galeri | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Galeri foto fasilitas, proyek, dan produk PT. Pacific Gitalestari — chemical supporting & solusi industri."
                />
            </Head>

            <section className="page-hero">
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Fasilitas pengolahan air tampak atas"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Galeri
                    </nav>
                    <p className="eyebrow">Galeri</p>
                    <h1>Dokumentasi fasilitas, proyek, dan produk.</h1>
                    <p>
                        Rekam visual pekerjaan dan kapabilitas PGL di lapangan —
                        dari instalasi pengolahan air hingga proteksi struktur.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {categories.length > 0 && (
                        <div
                            className="gallery-filter"
                            role="group"
                            aria-label="Filter kategori"
                        >
                            <Link
                                href="/galeri"
                                className={
                                    activeCategory === null
                                        ? 'button button-small'
                                        : 'button button-small button-ghost'
                                }
                            >
                                Semua
                            </Link>
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/galeri?kategori=${encodeURIComponent(category)}`}
                                    className={
                                        activeCategory === category
                                            ? 'button button-small'
                                            : 'button button-small button-ghost'
                                    }
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    )}

                    {items.data.length === 0 ? (
                        <p className="pending-note">
                            Belum ada foto yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="gallery-grid">
                            {items.data.map((item, index) => (
                                <figure
                                    key={`${item.title}-${index}`}
                                    className="gallery-item reveal"
                                >
                                    <div className="gallery-thumb">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                        {item.category && (
                                            <span>{item.category}</span>
                                        )}
                                    </div>
                                    <figcaption className="gallery-body">
                                        <strong>{item.title}</strong>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    )}

                    {items.links.length > 3 && (
                        <nav
                            className="news-pagination"
                            aria-label="Navigasi halaman"
                        >
                            {items.links.map((link) =>
                                link.url ? (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        className={
                                            link.active
                                                ? 'is-active'
                                                : undefined
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={link.label}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ),
                            )}
                        </nav>
                    )}
                </div>
            </section>

            <section className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Ingin lihat lebih detail?
                        </p>
                        <h2>Minta company profile & dokumentasi proyek.</h2>
                        <p>
                            Tim PGL siap mengirimkan portofolio lengkap dan
                            dokumentasi teknis sesuai kebutuhan tender Anda.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Hubungi tim kami <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
