import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';
import { show } from '@/routes/berita';

type Article = {
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    coverUrl: string | null;
    publishedAt: string | null;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    articles: {
        data: Article[];
        links: PaginationLink[];
    };
};

// Fallback cover when an article has no uploaded image.
const FALLBACK_COVER =
    '/landing/images/steel-pipelines-4CNNH2KEjhc-unsplash.jpg';

/**
 * Berita & Artikel (News) index — now backed by the CMS (Fase 2). Lists published
 * articles from the database; each links to `/berita/{slug}`.
 */
export default function Berita({ articles }: PageProps) {
    const heroBg = useHeroBackground('berita');

    return (
        <LandingLayout title="Berita & Artikel | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Berita, artikel teknis, dan tips seputar water treatment, bahan kimia industri, dan sistem proteksi dari PT. Pacific Gitalestari."
                />
            </Head>

            <section className="page-hero">
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Jaringan pipa baja fasilitas industri"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Berita
                    </nav>
                    <p className="eyebrow">Berita &amp; Artikel</p>
                    <h1>Wawasan teknis dan kabar terbaru dari PGL.</h1>
                    <p>
                        Artikel teknis, tips operasional, dan kegiatan
                        perusahaan seputar pengolahan air, bahan kimia industri,
                        dan sistem proteksi.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {articles.data.length === 0 ? (
                        <p className="pending-note">
                            Belum ada artikel yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="news-grid">
                            {articles.data.map((article) => (
                                <article
                                    key={article.slug}
                                    className="news-card reveal"
                                >
                                    <div className="news-thumb">
                                        <img
                                            src={
                                                article.coverUrl ??
                                                FALLBACK_COVER
                                            }
                                            alt={article.title}
                                        />
                                        {article.category && (
                                            <span className="badge badge-cat">
                                                {article.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="news-body">
                                        {article.publishedAt && (
                                            <span className="news-date">
                                                {article.publishedAt}
                                            </span>
                                        )}
                                        <h3>{article.title}</h3>
                                        <Link
                                            className="text-link"
                                            href={show(article.slug).url}
                                        >
                                            Baca selengkapnya{' '}
                                            <span aria-hidden="true">→</span>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {articles.links.length > 3 && (
                        <nav
                            className="news-pagination"
                            aria-label="Navigasi halaman"
                        >
                            {articles.links.map((link) =>
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
        </LandingLayout>
    );
}
