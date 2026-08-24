import { Head, Link } from '@inertiajs/react';
import { ArrowRight, FlaskConical, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type Spec = {
    label: string | null;
    value: string | null;
    description: string | null;
};

type Product = {
    name: string;
    slug: string;
    category: string | null;
    summary: string | null;
    specs: Spec[];
    application: string | null;
    imageUrl: string | null;
    datasheetUrl: string | null;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    products: {
        data: Product[];
        links: PaginationLink[];
    };
};

/**
 * Produk Kimia (Chemical products catalog) — finbest services page port, CMS-backed.
 * Breadcrumb banner + finbest service-card grid (icon + spec pills + datasheet link)
 * with pagination, a technical-note block, and a cta band. Data wiring preserved.
 */
export default function ProdukKimia({ products }: PageProps) {
    const heroBg = useHeroBackground('produk-kimia');
    // The spec whose detail popup is open (null = closed).
    const [activeSpec, setActiveSpec] = useState<Spec | null>(null);

    // Close the popup on Escape while it's open.
    useEffect(() => {
        if (!activeSpec) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setActiveSpec(null);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, [activeSpec]);

    return (
        <LandingLayout
            title="Produk Kimia | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Produk Kimia', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Katalog bahan kimia industri PT. Pacific Gitalestari: cooling & boiler water treatment, sugar processing, reverse osmosis, waste water, dan demin plant."
                />
            </Head>

            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">
                            Katalog · Bahan Kimia Industri
                        </span>
                        <h1 className="tp-section-title">
                            Bahan kimia industri untuk setiap tahap proses.
                        </h1>
                        <p className="tp-section-text">
                            Enam lini utama dengan fungsi teknis spesifik — dari
                            corrosion &amp; scale inhibitor hingga flocculants
                            dan resin demineralisasi.
                        </p>
                    </div>

                    {products.data.length === 0 ? (
                        <p className="pending-note text-center">
                            Belum ada produk yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="row tp-card-row">
                            {products.data.map((product, index) => (
                                <div
                                    key={product.slug}
                                    className="col-lg-4 col-md-6"
                                >
                                    <div className="tp-service-item reveal mb-30">
                                        <span className="tp-service-number">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="tp-service-icon">
                                            <FlaskConical size={32} />
                                        </span>
                                        <h3 className="tp-service-title">
                                            {product.name}
                                        </h3>
                                        {product.summary && (
                                            <p>{product.summary}</p>
                                        )}
                                        {product.specs.length > 0 && (
                                            <ul className="tp-spec-chips">
                                                {product.specs.map(
                                                    (spec, i) => (
                                                        <li key={i}>
                                                            <button
                                                                type="button"
                                                                className="tp-spec-chip"
                                                                onClick={() =>
                                                                    setActiveSpec(
                                                                        spec,
                                                                    )
                                                                }
                                                            >
                                                                {spec.value ||
                                                                    spec.label}
                                                                <Info
                                                                    size={13}
                                                                    aria-hidden="true"
                                                                />
                                                            </button>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                        {product.datasheetUrl ? (
                                            <a
                                                className="tp-service-link"
                                                href={product.datasheetUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Unduh datasheet{' '}
                                                <ArrowRight size={16} />
                                            </a>
                                        ) : (
                                            <a
                                                className="tp-service-link"
                                                href="/kontak#form"
                                            >
                                                Minta informasi produk{' '}
                                                <ArrowRight size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {products.links.length > 3 && (
                        <nav
                            className="news-pagination"
                            aria-label="Navigasi halaman"
                        >
                            {products.links.map((link) =>
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

            <section className="section-mist pt-120 pb-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="tp-section-title-wrapper">
                                <span className="tp-section-title-pre">
                                    Catatan teknis
                                </span>
                                <h2 className="tp-section-title">
                                    Butuh lembar spesifikasi dan dosis
                                    pemakaian?
                                </h2>
                                <p className="tp-section-text">
                                    Lembar spesifikasi teknis dan rekomendasi
                                    dosis per produk disiapkan menyusul
                                    konfirmasi data internal. Untuk kebutuhan
                                    saat ini, tim PGL dapat mengirimkan detail
                                    produk sesuai aplikasi Anda.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-5 text-lg-end">
                            <a className="tp-btn" href="/kontak#form">
                                Minta lembar spesifikasi{' '}
                                <ArrowRight size={17} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="tp-cta-area">
                <div className="container">
                    <div className="tp-cta-box">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="tp-cta-title">
                                    Cari bahan kimia untuk aplikasi spesifik?
                                </h2>
                                <p>
                                    Sampaikan jenis sistem dan kondisi prosesnya
                                    — kami bantu rekomendasikan produk dan dosis
                                    yang sesuai.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
                                    >
                                        Konsultasikan kebutuhan{' '}
                                        <ArrowRight size={17} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {activeSpec && (
                <div
                    className="tp-modal-overlay"
                    role="presentation"
                    onClick={() => setActiveSpec(null)}
                >
                    <div
                        className="tp-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tp-spec-modal-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="tp-modal-close"
                            aria-label="Tutup"
                            onClick={() => setActiveSpec(null)}
                        >
                            <X size={18} />
                        </button>
                        {activeSpec.label && (
                            <p className="tp-modal-eyebrow">
                                {activeSpec.label}
                            </p>
                        )}
                        <h3 id="tp-spec-modal-title" className="tp-modal-title">
                            {activeSpec.value || activeSpec.label}
                        </h3>
                        <p className="tp-modal-body">
                            {activeSpec.description &&
                            activeSpec.description.trim()
                                ? activeSpec.description
                                : 'Deskripsi belum tersedia.'}
                        </p>
                    </div>
                </div>
            )}
        </LandingLayout>
    );
}
