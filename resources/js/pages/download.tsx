import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type DownloadItem = {
    id: number;
    title: string;
    description: string | null;
    category: string | null;
    categorySlug: string;
    humanSize: string;
    downloadUrl: string;
};

type Category = { label: string; slug: string };

type PageProps = {
    downloads: DownloadItem[];
    categories: Category[];
};

/**
 * Download Center — ported from the prototype's download.html, now DB-driven.
 * Filter chips + cards come from props; the `.pgl` markup and the
 * data-filter-group / data-filter / data-category attributes are preserved so
 * the existing use-landing-effects category filter keeps working.
 */
export default function Download({ downloads, categories }: PageProps) {
    const heroBg = useHeroBackground('download');

    return (
        <LandingLayout title="Download | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Download Center PT. Pacific Gitalestari - katalog, brosur, datasheet (TDS), MSDS, dan sertifikat, difilter per kategori produk."
                />
            </Head>

            <section className="page-hero">
                {/* Foto full-bleed page-hero. SWAP: ganti dengan foto proyek asli approved. */}
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Sambungan pipa baja teknik"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Download
                    </nav>
                    <p className="eyebrow">Download Center</p>
                    <h1>Katalog, datasheet, dan dokumen teknis.</h1>
                    <p>
                        Unduh katalog produk, brosur, lembar spesifikasi (TDS),
                        MSDS, dan sertifikat. Gunakan filter untuk menampilkan
                        dokumen per kategori.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div
                        className="filter-bar"
                        data-filter-group
                        data-filter-target="#download-list"
                        role="group"
                        aria-label="Filter kategori dokumen"
                    >
                        <button
                            type="button"
                            className="filter-chip is-active"
                            data-filter="all"
                            aria-pressed="true"
                        >
                            Semua
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.slug}
                                type="button"
                                className="filter-chip"
                                data-filter={category.slug}
                                aria-pressed="false"
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {downloads.length === 0 ? (
                        <p className="download-empty">
                            Belum ada dokumen untuk diunduh saat ini.
                        </p>
                    ) : (
                        <div className="catalog-grid" id="download-list">
                            {downloads.map((item) => (
                                <article
                                    key={item.id}
                                    className="download-card reveal"
                                    data-category={item.categorySlug}
                                >
                                    <div className="download-head">
                                        <span
                                            className="download-icon"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                                                <path d="M14 3v5h5" />
                                                <path d="M9 13h6M9 17h6" />
                                            </svg>
                                        </span>
                                        <h3>{item.title}</h3>
                                    </div>
                                    {item.category && (
                                        <div className="download-badges">
                                            <span className="badge badge-cat">
                                                {item.category}
                                            </span>
                                        </div>
                                    )}
                                    {item.description && (
                                        <p className="download-desc">
                                            {item.description}
                                        </p>
                                    )}
                                    <p className="download-meta">
                                        {item.humanSize}
                                    </p>
                                    <div className="download-actions">
                                        <a
                                            className="button button-small button-navy"
                                            href={item.downloadUrl}
                                        >
                                            Unduh{' '}
                                            <span aria-hidden="true">↓</span>
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Tidak menemukan dokumen?
                        </p>
                        <h2>Minta dokumen teknis spesifik.</h2>
                        <p>
                            Sebutkan produk atau sistem yang Anda butuhkan — tim
                            PGL akan mengirimkan katalog, TDS, atau MSDS
                            terkait.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Minta dokumen <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
