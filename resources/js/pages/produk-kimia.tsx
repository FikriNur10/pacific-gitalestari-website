import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type Spec = {
    label: string | null;
    value: string | null;
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
 * Produk Kimia (Chemical products catalog) — now backed by the CMS. Lists published
 * products from the database; markup reuses the prototype `.pgl` catalog classes.
 */
export default function ProdukKimia({ products }: PageProps) {
    const heroBg = useHeroBackground('produk-kimia');

    return (
        <LandingLayout title="Produk Kimia | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Katalog bahan kimia industri PT. Pacific Gitalestari: cooling & boiler water treatment, sugar processing, reverse osmosis, waste water, dan demin plant."
                />
            </Head>

            <section className="page-hero">
                {/* Foto full-bleed page-hero. SWAP: ganti dengan foto proyek asli approved. */}
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Tangki baja proses kimia industri"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>
                        <a href="/solusi">Solusi</a>
                        <span aria-hidden="true">/</span>Produk Kimia
                    </nav>
                    <p className="eyebrow">Katalog · Bahan Kimia Industri</p>
                    <h1>Bahan kimia industri untuk setiap tahap proses.</h1>
                    <p>
                        Enam lini utama dengan fungsi teknis spesifik — dari
                        corrosion &amp; scale inhibitor hingga flocculants dan
                        resin demineralisasi.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {products.data.length === 0 ? (
                        <p className="pending-note">
                            Belum ada produk yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="catalog-grid">
                            {products.data.map((product, index) => (
                                <article
                                    key={product.slug}
                                    className="catalog-card reveal"
                                >
                                    <span
                                        className="card-icon"
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
                                            <path d="M12 2v20" />
                                            <path d="M3.5 7 20.5 17" />
                                            <path d="M20.5 7 3.5 17" />
                                        </svg>
                                    </span>
                                    <span className="card-number">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3>{product.name}</h3>
                                    {product.summary && (
                                        <p>{product.summary}</p>
                                    )}
                                    {product.specs.length > 0 && (
                                        <ul className="spec-list">
                                            {product.specs.map((spec, i) => (
                                                <li key={i}>
                                                    {spec.value || spec.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {product.datasheetUrl ? (
                                        <a
                                            className="text-link"
                                            href={product.datasheetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Unduh datasheet{' '}
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    ) : (
                                        <a
                                            className="text-link"
                                            href="/kontak#form"
                                        >
                                            Minta informasi produk{' '}
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    )}
                                </article>
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

            <section className="section section-mist">
                <div className="two-column container">
                    <p className="eyebrow">Catatan teknis</p>
                    <div>
                        <h2>Butuh lembar spesifikasi dan dosis pemakaian?</h2>
                        <p>
                            Lembar spesifikasi teknis dan rekomendasi dosis per
                            produk disiapkan menyusul konfirmasi data internal.
                            Untuk kebutuhan saat ini, tim PGL dapat mengirimkan
                            detail produk sesuai aplikasi Anda.
                        </p>
                        <a className="text-link" href="/kontak#form">
                            Minta lembar spesifikasi{' '}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Mulai dari kebutuhan Anda
                        </p>
                        <h2>Cari bahan kimia untuk aplikasi spesifik?</h2>
                        <p>
                            Sampaikan jenis sistem dan kondisi prosesnya — kami
                            bantu rekomendasikan produk dan dosis yang sesuai.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Konsultasikan kebutuhan{' '}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
