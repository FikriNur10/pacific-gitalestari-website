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
 * Berita detail (article) — finbest blog-details port, CMS-backed (Fase 2). The
 * breadcrumb banner carries the article title over the cover photo; the body holds
 * sanitized rich-text HTML (server-side purified) and is injected as-is.
 */
export default function BeritaDetail({ article }: PageProps) {
    return (
        <LandingLayout
            title={`${article.metaTitle} | PT. Pacific Gitalestari`}
            breadcrumb={{
                title: article.title,
                image: article.coverUrl ?? undefined,
            }}
        >
            <Head>
                {article.metaDescription && (
                    <meta
                        name="description"
                        content={article.metaDescription}
                    />
                )}
            </Head>

            <section className="pt-120 pb-120">
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

                        {/* Body is sanitized rich-text HTML (server-side purified). */}
                        <div
                            className="article-body"
                            dangerouslySetInnerHTML={{
                                __html: article.bodyHtml,
                            }}
                        />

                        <p>
                            Butuh evaluasi teknis untuk fasilitas Anda?{' '}
                            <a className="tp-service-link" href="/kontak#form">
                                Diskusikan dengan tim teknis kami →
                            </a>
                        </p>
                    </article>
                </div>
            </section>
        </LandingLayout>
    );
}
