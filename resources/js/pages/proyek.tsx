import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type Project = {
    title: string;
    slug: string;
    client: string | null;
    category: string | null;
    location: string | null;
    year: number | null;
    summary: string | null;
    coverUrl: string | null;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    projects: {
        data: Project[];
        links: PaginationLink[];
    };
};

// Fallback cover when a project has no uploaded image.
const FALLBACK_COVER =
    '/landing/images/concrete-structures-Ac97OqAWDvg-unsplash.jpg';

/**
 * Proyek (Projects) — finbest project page port. Breadcrumb banner + featured
 * highlight (static PLTD case) + finbest project card grid backed by the CMS
 * (Fase 3) with pagination + a CTA band. Content/data wiring preserved.
 */
export default function Proyek({ projects }: PageProps) {
    const heroBg = useHeroBackground('proyek');

    return (
        <LandingLayout
            title="Proyek | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Proyek', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Portofolio proyek PT. Pacific Gitalestari, termasuk penyewaan diesel PLTD Pangkalan Bun untuk PT. PLN (Persero) Wilayah Kalselteng."
                />
            </Head>

            {/* ===== Featured highlight ===== */}
            <section className="tp-about-area pt-120 pb-90">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="tp-about-thumb-wrapper reveal">
                                <div className="main">
                                    <picture>
                                        <source
                                            srcSet="/landing/diesel-generator.webp"
                                            type="image/webp"
                                        />
                                        <img
                                            src="/landing/diesel-generator.jpg"
                                            alt="Generator diesel kuning dalam lingkungan proyek industri"
                                            loading="lazy"
                                        />
                                    </picture>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tp-about-wrapper">
                                <div className="tp-about-title-wrapper">
                                    <span className="tp-section-title-pre">
                                        Featured project
                                    </span>
                                    <h1 className="tp-section-title">
                                        PLTD Pangkalan Bun.
                                    </h1>
                                </div>
                                <p>
                                    Penyewaan diesel engine (PLTD) untuk
                                    mendukung kebutuhan daya PT. PLN (Persero)
                                    Wilayah Kalselteng — salah satu portofolio
                                    sektor publik PGL.
                                </p>
                                <div className="tp-about-list">
                                    <ul>
                                        <li>
                                            <CheckCircle2 size={20} /> Klien:
                                            PT. PLN (Persero) Wilayah Kalselteng
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Lingkup:
                                            Diesel engine rental / PLTD
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Sektor:
                                            Kelistrikan &amp; infrastruktur
                                        </li>
                                    </ul>
                                </div>
                                <a className="tp-btn" href="/kontak#form">
                                    Diskusikan proyek serupa{' '}
                                    <ArrowRight size={17} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Project grid ===== */}
            <section className="tp-service-area pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">Portofolio</span>
                        <h2 className="tp-section-title">
                            Lingkup proyek lintas divisi.
                        </h2>
                        <p className="tp-section-text">
                            Studi kasus terverifikasi lengkap dengan foto dan
                            fakta proyek akan ditampilkan setelah persetujuan
                            klien.
                        </p>
                    </div>

                    {projects.data.length === 0 ? (
                        <p className="pending-note text-center">
                            Belum ada proyek yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="row tp-card-row">
                            {projects.data.map((project) => (
                                <div
                                    key={project.slug}
                                    className="col-lg-4 col-md-6"
                                >
                                    <div className="tp-project-item reveal">
                                        <div className="tp-project-thumb">
                                            {project.category && (
                                                <span className="tp-project-tag">
                                                    {project.category}
                                                </span>
                                            )}
                                            <img
                                                src={
                                                    project.coverUrl ??
                                                    FALLBACK_COVER
                                                }
                                                alt={project.title}
                                            />
                                        </div>
                                        <div className="tp-project-content">
                                            {project.client && (
                                                <span>{project.client}</span>
                                            )}
                                            <h3 className="tp-project-name">
                                                {project.title}
                                            </h3>
                                            {project.summary && (
                                                <p>{project.summary}</p>
                                            )}
                                            {(project.location ||
                                                project.year) && (
                                                <p className="tp-project-meta">
                                                    {[
                                                        project.location,
                                                        project.year,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' · ')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.links.length > 3 && (
                        <nav
                            className="news-pagination"
                            aria-label="Navigasi halaman"
                        >
                            {projects.links.map((link) =>
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

            {/* ===== CTA band ===== */}
            <section className="tp-cta-area">
                <div className="container">
                    <div className="tp-cta-box">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="tp-cta-title">
                                    Punya proyek dengan kebutuhan teknis serupa?
                                </h2>
                                <p>
                                    Ceritakan lingkup dan lokasi proyek Anda —
                                    tim PGL akan bantu menyusun pendekatan dan
                                    penawaran.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
                                    >
                                        Diskusikan proyek Anda{' '}
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
