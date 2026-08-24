import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CalendarDays } from 'lucide-react';
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
 * Berita & Artikel (News) index — finbest blog page port, CMS-backed (Fase 2).
 * Breadcrumb banner + finbest blog card grid (cover + category + date + title +
 * excerpt + read-more) with pagination. Each card links to `/berita/{slug}`.
 */
export default function Berita({ articles }: PageProps) {
    const heroBg = useHeroBackground('berita');

    return (
        <LandingLayout
            title="Berita & Artikel | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Berita & Artikel', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Berita, artikel teknis, dan tips seputar water treatment, bahan kimia industri, dan sistem proteksi dari PT. Pacific Gitalestari."
                />
            </Head>

            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">
                            Berita &amp; Artikel
                        </span>
                        <h1 className="tp-section-title">
                            Wawasan teknis dan kabar terbaru dari PGL.
                        </h1>
                        <p className="tp-section-text">
                            Artikel teknis, tips operasional, dan kegiatan
                            perusahaan seputar pengolahan air, bahan kimia
                            industri, dan sistem proteksi.
                        </p>
                    </div>

                    {articles.data.length === 0 ? (
                        <p className="pending-note text-center">
                            Belum ada artikel yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="row tp-card-row">
                            {articles.data.map((article) => (
                                <div
                                    key={article.slug}
                                    className="col-lg-4 col-md-6"
                                >
                                    <article className="tp-blog-item reveal">
                                        <div className="tp-blog-thumb">
                                            <Link href={show(article.slug).url}>
                                                <img
                                                    src={
                                                        article.coverUrl ??
                                                        FALLBACK_COVER
                                                    }
                                                    alt={article.title}
                                                    loading="lazy"
                                                />
                                            </Link>
                                            {article.category && (
                                                <span className="tp-blog-cat">
                                                    {article.category}
                                                </span>
                                            )}
                                        </div>
                                        <div className="tp-blog-body">
                                            {article.publishedAt && (
                                                <span className="tp-blog-date">
                                                    <CalendarDays size={15} />
                                                    {article.publishedAt}
                                                </span>
                                            )}
                                            <h3 className="tp-blog-title">
                                                <Link
                                                    href={
                                                        show(article.slug).url
                                                    }
                                                >
                                                    {article.title}
                                                </Link>
                                            </h3>
                                            {article.excerpt && (
                                                <p className="tp-blog-excerpt">
                                                    {article.excerpt}
                                                </p>
                                            )}
                                            <Link
                                                className="tp-service-link"
                                                href={show(article.slug).url}
                                            >
                                                Baca selengkapnya{' '}
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </article>
                                </div>
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
