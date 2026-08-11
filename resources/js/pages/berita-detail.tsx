import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';

type Article = {
    title: string;
    category: string | null;
    coverUrl: string | null;
    publishedAt: string | null;
    bodyHtml: string;
    metaTitle: string;
    metaDescription: string | null;
};

type PageProps = {
    article: Article;
};

/**
 * Berita detail (article) — CMS-backed (Fase 2). Body holds sanitized rich-text HTML
 * from the dashboard editor (server-side purified) and is injected as-is.
 */
export default function BeritaDetail({ article }: PageProps) {
    return (
        <LandingLayout title={`${article.metaTitle} | PT. Pacific Gitalestari`}>
            <Head>
                {article.metaDescription && (
                    <meta
                        name="description"
                        content={article.metaDescription}
                    />
                )}
            </Head>

            <section className="page-hero">
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>
                        <a href="/berita">Berita</a>
                        {article.category && (
                            <>
                                <span aria-hidden="true">/</span>
                                {article.category}
                            </>
                        )}
                    </nav>
                    {article.category && (
                        <p className="eyebrow">{article.category}</p>
                    )}
                    <h1>{article.title}</h1>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <article className="article">
                        <div className="article-meta">
                            {article.category && (
                                <span className="badge badge-cat">
                                    {article.category}
                                </span>
                            )}
                            {article.publishedAt && (
                                <span>{article.publishedAt}</span>
                            )}
                        </div>
                        {article.coverUrl && (
                            <div className="article-hero">
                                <img
                                    src={article.coverUrl}
                                    alt={article.title}
                                />
                            </div>
                        )}

                        {/* Body is sanitized rich-text HTML (server-side purified). */}
                        <div
                            className="article-body"
                            dangerouslySetInnerHTML={{
                                __html: article.bodyHtml,
                            }}
                        />

                        <p>
                            Butuh evaluasi teknis untuk fasilitas Anda?{' '}
                            <a className="text-link" href="/kontak#form">
                                Diskusikan dengan tim teknis kami →
                            </a>
                        </p>
                    </article>
                </div>
            </section>
        </LandingLayout>
    );
}
