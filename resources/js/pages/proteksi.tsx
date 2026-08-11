import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

/**
 * Sistem Proteksi (Protection systems) — ported from the prototype's proteksi.html.
 * Renders only the in-<main> sections; chrome comes from LandingLayout.
 */
export default function Proteksi() {
    const heroBg = useHeroBackground('proteksi');

    return (
        <LandingLayout title="Sistem Proteksi | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Sistem proteksi PT. Pacific Gitalestari: waterproofing, grouting & anchor, serta flooring & lining untuk aset dan struktur beton."
                />
            </Head>

            <section className="page-hero">
                {/* Foto full-bleed page-hero. SWAP: ganti dengan foto proyek asli approved. */}
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Lantai industri dengan pelapisan pelindung"
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
                        <span aria-hidden="true">/</span>Sistem Proteksi
                    </nav>
                    <p className="eyebrow">Katalog · Sistem Proteksi</p>
                    <h1>
                        Proteksi teknis untuk beton, struktur, dan lantai
                        industri.
                    </h1>
                    <p>
                        Sebagai aplikator spesialis, PGL menangani
                        waterproofing, grouting, serta flooring dan lining
                        dengan produk teknis yang teruji di lapangan.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="catalog-grid">
                        <article className="catalog-card reveal">
                            <span className="card-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 3 5 6v5c0 4 3 8 7 10 4-2 7-6 7-10V6z" />
                                    <path d="M12 9c1.4 1.9 2.3 2.9 2.3 4a2.3 2.3 0 0 1-4.6 0c0-1.1.9-2.1 2.3-4z" />
                                </svg>
                            </span>
                            <span className="card-number">01</span>
                            <h3>Waterproofing System</h3>
                            <p>
                                Membran dan pelapis kedap air untuk atap,
                                basement, ground tank, dan struktur beton.
                            </p>
                            <ul className="spec-list">
                                <li>Proofex Torchseal (torching bitumen)</li>
                                <li>Proofex GPE (self-adhesive)</li>
                                <li>Nitoproof 600 (polyurethane)</li>
                                <li>Brushbond Flex (cementitious)</li>
                                <li>Conplast X421M / WP421 (integral)</li>
                            </ul>
                            <a className="text-link" href="/kontak#form">
                                Konsultasi waterproofing{' '}
                                <span aria-hidden="true">→</span>
                            </a>
                        </article>
                        <article className="catalog-card reveal">
                            <span className="card-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="1"
                                    />
                                    <path d="M3 10h18M3 14.5h18M10 5v5M15 10v4.5M10 14.5V19" />
                                </svg>
                            </span>
                            <span className="card-number">02</span>
                            <h3>Grouting &amp; Anchor</h3>
                            <p>
                                Grout non-shrink hingga epoxy kekuatan tinggi
                                untuk base plate, mesin, dan anchoring.
                            </p>
                            <ul className="spec-list">
                                <li>Conbextra GP (non-shrink cementitious)</li>
                                <li>Conbextra EP10TG (high strength epoxy)</li>
                                <li>Conbextra EPH (high temperature epoxy)</li>
                                <li>Lokfix (polyester anchor grout)</li>
                            </ul>
                            <a className="text-link" href="/kontak#form">
                                Konsultasi grouting{' '}
                                <span aria-hidden="true">→</span>
                            </a>
                        </article>
                        <article className="catalog-card reveal">
                            <span className="card-icon" aria-hidden="true">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 8l9-4 9 4-9 4z" />
                                    <path d="M3 13l9 4 9-4" />
                                    <path d="M3 17l9 4 9-4" />
                                </svg>
                            </span>
                            <span className="card-number">03</span>
                            <h3>Flooring &amp; Lining</h3>
                            <p>
                                Pelapis lantai epoxy dan lining pelindung untuk
                                area industri, WWTP, dan tangki air.
                            </p>
                            <ul className="spec-list">
                                <li>Nitoflor FC150 (epoxy flooring)</li>
                                <li>Nitoflor Hardtop (floor hardener)</li>
                                <li>Nitocote EN901 (WWTP lining)</li>
                                <li>Nitocote EP405 (potable water tank)</li>
                            </ul>
                            <a className="text-link" href="/kontak#form">
                                Konsultasi flooring &amp; lining{' '}
                                <span aria-hidden="true">→</span>
                            </a>
                        </article>
                    </div>
                </div>
            </section>

            <section className="section section-mist">
                <div className="two-column container">
                    <p className="eyebrow">Data teknis</p>
                    <div>
                        <h2>
                            Dosis, yield, dan packaging tersedia per produk.
                        </h2>
                        <p>
                            Setiap produk memiliki rekomendasi dosis pemakaian,
                            yield, dan ukuran kemasan (mis. liter/m², kg/set).
                            Detail lengkap dikirimkan sesuai aplikasi dan luas
                            area proyek Anda.
                        </p>
                        <a className="text-link" href="/kontak#form">
                            Minta detail dosis &amp; packaging{' '}
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
                        <h2>
                            Ada masalah beton, kebocoran, atau lantai industri?
                        </h2>
                        <p>
                            Ceritakan jenis kerusakan dan kondisi area — tim
                            aplikator PGL akan merekomendasikan sistem yang
                            tepat.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Konsultasikan proteksi{' '}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
