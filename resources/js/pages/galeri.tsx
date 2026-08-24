import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
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
 * Galeri (Gallery) — finbest project-grid port, CMS-backed. Breadcrumb banner +
 * finbest filter pills + finbest project card grid (photo + category tag + title)
 * with pagination and a cta band. Category filter + data wiring preserved.
 */
export default function Galeri({
    items,
    categories,
    activeCategory,
}: PageProps) {
    const heroBg = useHeroBackground('galeri');

    return (
        <LandingLayout
            title="Galeri | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Galeri', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Galeri foto fasilitas, proyek, dan produk PT. Pacific Gitalestari — chemical supporting & solusi industri."
                />
            </Head>

            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">Galeri</span>
                        <h1 className="tp-section-title">
                            Dokumentasi fasilitas, proyek, dan produk.
                        </h1>
                        <p className="tp-section-text">
                            Rekam visual pekerjaan dan kapabilitas PGL di
                            lapangan — dari instalasi pengolahan air hingga
                            proteksi struktur.
                        </p>
                    </div>

                    {categories.length > 0 && (
                        <div
                            className="tp-filter justify-content-center"
                            role="group"
                            aria-label="Filter kategori"
                        >
                            <Link
                                href="/galeri"
                                className={
                                    activeCategory === null
                                        ? 'is-active'
                                        : undefined
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
                                            ? 'is-active'
                                            : undefined
                                    }
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    )}

                    {items.data.length === 0 ? (
                        <p className="pending-note text-center">
                            Belum ada foto yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="row tp-card-row">
                            {items.data.map((item, index) => (
                                <div
                                    key={`${item.title}-${index}`}
                                    className="col-lg-4 col-md-6"
                                >
                                    <figure className="tp-project-item reveal">
                                        <div className="tp-project-thumb">
                                            {item.category && (
                                                <span className="tp-project-tag">
                                                    {item.category}
                                                </span>
                                            )}
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                loading="lazy"
                                            />
                                        </div>
                                        <figcaption className="tp-project-content">
                                            <h3 className="tp-project-name">
                                                {item.title}
                                            </h3>
                                        </figcaption>
                                    </figure>
                                </div>
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

            <section className="tp-cta-area">
                <div className="container">
                    <div className="tp-cta-box">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="tp-cta-title">
                                    Minta company profile &amp; dokumentasi
                                    proyek.
                                </h2>
                                <p>
                                    Tim PGL siap mengirimkan portofolio lengkap
                                    dan dokumentasi teknis sesuai kebutuhan
                                    tender Anda.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
                                    >
                                        Hubungi tim kami{' '}
                                        <ArrowRight size={17} />
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
