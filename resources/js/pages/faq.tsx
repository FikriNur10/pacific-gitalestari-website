import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type FaqItem = { question: string; answerHtml: string };
type FaqGroup = { category: string; slug: string; items: FaqItem[] };
type PageProps = { groups: FaqGroup[] };

/**
 * FAQ — CMS-backed (Fase 4). Questions grouped by category; answers hold sanitized
 * rich-text HTML from the dashboard editor. Native <details> accordion preserved.
 */
export default function Faq({ groups }: PageProps) {
    const heroBg = useHeroBackground('faq');

    return (
        <LandingLayout title="FAQ | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Pertanyaan yang sering diajukan seputar produk, layanan teknis, penawaran, dan standar mutu PT. Pacific Gitalestari."
                />
            </Head>

            <section className="page-hero">
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Tangki penyimpanan air di fasilitas pengolahan"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>FAQ
                    </nav>
                    <p className="eyebrow">FAQ</p>
                    <h1>Pertanyaan yang sering diajukan.</h1>
                    <p>
                        Ringkasan jawaban seputar produk, layanan teknis,
                        penawaran, dan standar mutu PGL. Tidak menemukan
                        jawabannya? Tim kami siap membantu.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {groups.length === 0 ? (
                        <p className="pending-note">
                            Belum ada pertanyaan yang dipublikasikan.
                        </p>
                    ) : (
                        <>
                            <nav className="faq-nav" aria-label="Kategori FAQ">
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
