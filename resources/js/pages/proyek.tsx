import { Head, Link } from '@inertiajs/react';
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
 * Proyek (Projects) — now backed by the CMS (Fase 3). Lists published portfolio
 * projects from the database. Hero + featured + consultation chrome stays static.
 */
export default function Proyek({ projects }: PageProps) {
    const heroBg = useHeroBackground('proyek');

    return (
        <LandingLayout title="Proyek | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Portofolio proyek PT. Pacific Gitalestari, termasuk penyewaan diesel PLTD Pangkalan Bun untuk PT. PLN (Persero) Wilayah Kalselteng."
                />
            </Head>

            <section className="page-hero">
                {/* Foto full-bleed page-hero. SWAP: ganti dengan foto proyek asli approved. */}
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Struktur konstruksi industri tampak atas"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Proyek
                    </nav>
                    <p className="eyebrow">Proyek</p>
                    <h1>Rekam jejak yang terlihat di lapangan.</h1>
                    <p>
                        Portofolio B2B dan sektor publik, dari penyewaan diesel
                        skala pembangkit hingga sistem pengolahan air dan
                        proteksi struktur.
                    </p>
                </div>
            </section>

            <section className="section project-section">
                <div className="project-layout container">
                    <div>
                        <p className="eyebrow">Featured project</p>
                        <h2>PLTD Pangkalan Bun.</h2>
                        <p>
                            Penyewaan diesel engine (PLTD) untuk mendukung
                            kebutuhan daya PT. PLN (Persero) Wilayah Kalselteng
                            — salah satu portofolio sektor publik PGL.
                        </p>
                        <ul className="check-list">
                            <li>Klien: PT. PLN (Persero) Wilayah Kalselteng</li>
                            <li>Lingkup: Diesel engine rental / PLTD</li>
                            <li>Sektor: Kelistrikan &amp; infrastruktur</li>
                        </ul>
                        <a className="button button-ghost" href="/kontak#form">
                            Diskusikan proyek serupa{' '}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                    <article className="project-card reveal">
                        <div className="project-image">
                            <img
                                src="/landing/diesel-generator.jpg"
                                alt="Generator diesel kuning dalam lingkungan proyek industri"
                            />
                            <span>PLTD</span>
                        </div>
                        <div className="project-copy">
                            <p>Featured project</p>
                            <h3>PLTD Pangkalan Bun</h3>
                            <span>PT. PLN (Persero) Wilayah Kalselteng</span>
                        </div>
                    </article>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Portofolio</p>
                            <h2>Lingkup proyek lintas divisi.</h2>
                        </div>
                        <p>
                            Studi kasus terverifikasi lengkap dengan foto dan
                            fakta proyek akan ditampilkan setelah persetujuan
                            klien.
                        </p>
                    </div>

                    {projects.data.length === 0 ? (
                        <p className="pending-note">
                            Belum ada proyek yang dipublikasikan.
                        </p>
                    ) : (
                        <div className="portfolio-grid">
                            {projects.data.map((project) => (
                                <div
                                    key={project.slug}
                                    className="portfolio-item reveal"
                                >
                                    <div className="portfolio-thumb">
                                        <img
                                            src={
                                                project.coverUrl ??
                                                FALLBACK_COVER
                                            }
                                            alt={project.title}
                                        />
                                        {project.category && (
                                            <span>{project.category}</span>
                                        )}
                                    </div>
                                    <div className="portfolio-body">
                                        <strong>{project.title}</strong>
                                        {project.summary && (
                                            <small>{project.summary}</small>
                                        )}
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

            <section className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Mulai dari kebutuhan Anda
                        </p>
                        <h2>Punya proyek dengan kebutuhan teknis serupa?</h2>
                        <p>
                            Ceritakan lingkup dan lokasi proyek Anda — tim PGL
                            akan bantu menyusun pendekatan dan penawaran.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Diskusikan proyek Anda{' '}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
