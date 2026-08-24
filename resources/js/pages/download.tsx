import { Head } from '@inertiajs/react';
import { ArrowRight, FileText } from 'lucide-react';
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
 * Download Center — finbest chrome (breadcrumb + section title + cta band) around
 * the CMS-driven download grid. The filter-bar / filter-chip markup and the
 * data-filter-group / data-filter / data-category attributes are preserved so the
 * existing use-landing-effects category filter keeps working.
 */
export default function Download({ downloads, categories }: PageProps) {
    const heroBg = useHeroBackground('download');

    return (
        <LandingLayout
            title="Download | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Download Center', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Download Center PT. Pacific Gitalestari - katalog, brosur, datasheet (TDS), MSDS, dan sertifikat, difilter per kategori produk."
                />
            </Head>

            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper text-center mb-50">
                        <span className="tp-section-title-pre">
                            Download Center
                        </span>
                        <h1 className="tp-section-title">
                            Katalog, datasheet, dan dokumen teknis.
                        </h1>
                        <p className="tp-section-text">
                            Unduh katalog produk, brosur, lembar spesifikasi
                            (TDS), MSDS, dan sertifikat. Gunakan filter untuk
                            menampilkan dokumen per kategori.
                        </p>
                    </div>

                    <div
                        className="filter-bar justify-content-center"
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
                        <p className="download-empty text-center">
                            Belum ada dokumen untuk diunduh saat ini.
                        </p>
                    ) : (
                        <div className="row" id="download-list">
                            {downloads.map((item) => (
                                <div
                                    key={item.id}
                                    className="col-lg-4 col-md-6"
                                    data-category={item.categorySlug}
                                >
                                    <article className="download-card mb-30 reveal">
                                        <div className="download-head">
                                            <span
                                                className="download-icon"
                                                aria-hidden="true"
                                            >
                                                <FileText size={24} />
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
                                                className="tp-btn"
                                                href={item.downloadUrl}
                                            >
                                                Unduh <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </article>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="tp-cta-area">
                <div className="container">
                    <div className="tp-cta-box">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="tp-cta-title">
                                    Minta dokumen teknis spesifik.
                                </h2>
                                <p>
                                    Sebutkan produk atau sistem yang Anda
                                    butuhkan — tim PGL akan mengirimkan katalog,
                                    TDS, atau MSDS terkait.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
                                    >
                                        Minta dokumen <ArrowRight size={17} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
