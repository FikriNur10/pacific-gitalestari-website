import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type FaqItem = { question: string; answerHtml: string };
type FaqGroup = { category: string; slug: string; items: FaqItem[] };
type PageProps = { groups: FaqGroup[] };

/**
 * FAQ — finbest chrome (breadcrumb + section title + filter pills) around the
 * CMS-backed accordion (Fase 4). Answers hold sanitized rich-text HTML from the
 * dashboard editor; the native <details> accordion is preserved.
 */
export default function Faq({ groups }: PageProps) {
    const heroBg = useHeroBackground('faq');

    return (
        <LandingLayout
            title="FAQ | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'FAQ', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Pertanyaan yang sering diajukan seputar produk, layanan teknis, penawaran, dan standar mutu PT. Pacific Gitalestari."
                />
            </Head>

            <section className="pt-120 pb-120">
                <div className="container">
                    <div className="tp-section-title-wrapper text-center mb-50">
                        <span className="tp-section-title-pre">FAQ</span>
                        <h1 className="tp-section-title">
                            Pertanyaan yang sering diajukan.
                        </h1>
                        <p className="tp-section-text">
                            Ringkasan jawaban seputar produk, layanan teknis,
                            penawaran, dan standar mutu PGL. Tidak menemukan
                            jawabannya? Tim kami siap membantu.
                        </p>
                    </div>

                    {groups.length === 0 ? (
                        <p className="pending-note text-center">
                            Belum ada pertanyaan yang dipublikasikan.
                        </p>
                    ) : (
                        <>
                            <nav
                                className="tp-filter justify-content-center"
                                aria-label="Kategori FAQ"
                            >
                                {groups.map((group) => (
                                    <a key={group.slug} href={`#${group.slug}`}>
                                        {group.category}
                                    </a>
                                ))}
                            </nav>

                            {groups.map((group) => (
                                <div
                                    key={group.slug}
                                    className="faq-group"
                                    id={group.slug}
                                >
                                    <h2>{group.category}</h2>
                                    {group.items.map((item, index) => (
                                        <details
                                            key={index}
                                            className="faq-item"
                                        >
                                            <summary>{item.question}</summary>
                                            {/* Answer is sanitized rich-text HTML (server-side purified). */}
                                            <div
                                                className="faq-answer"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.answerHtml,
                                                }}
                                            />
                                        </details>
                                    ))}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </section>
        </LandingLayout>
    );
}
