import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import '../../css/landing.css';
import LandingFooter from '@/components/landing/landing-footer';
import LandingHeader from '@/components/landing/landing-header';
import {
    CrystalMotif,
    FacilitySilhouette,
    MoleculeField,
    MonitoringReadout,
    SugarcaneMotif,
    WaveDivider,
} from '@/components/landing/landing-motifs';
import WhatsappFab from '@/components/landing/whatsapp-fab';
import { useLandingEffects } from '@/hooks/use-landing-effects';
import { useHeroBackground } from '@/lib/hero-background';
import { WHATSAPP_URL } from '@/lib/landing';

/**
 * PT. Pacific Gitalestari landing page.
 *
 * Ported from the static HTML prototype (index.html). All styling lives in the
 * scoped `landing.css` design system (`.pgl` root); interactions are driven by
 * `useLandingEffects`. Primary "konsultasi" CTAs route to WhatsApp (the one live
 * channel); nav/solution links point to sibling pages that are not built yet.
 */
export default function Landing() {
    const rootRef = useRef<HTMLDivElement>(null);
    useLandingEffects(rootRef);
    const heroBg = useHeroBackground('beranda');

    return (
        <>
            <Head title="PT. Pacific Gitalestari | Solusi Industri Terintegrasi">
                <meta
                    name="description"
                    content="PT. Pacific Gitalestari - solusi industri terintegrasi untuk pengolahan air, bahan kimia, dukungan daya, dan sistem perlindungan teknis."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/landing/logo/favicon-32.png"
                />
                <link
                    rel="apple-touch-icon"
                    href="/landing/logo/apple-touch-icon.png"
                />
            </Head>

            <div className="pgl" ref={rootRef}>
                <a className="skip-link" href="#main">
                    Lewati ke konten
                </a>

                <LandingHeader />

                <main id="main">
                    <section className="hero">
                        <img
                            className="hero-bg"
                            src={heroBg}
                            alt="Kompleks water treatment plant tampak atas"
                            fetchPriority="high"
                        />
                        <div className="hero-scrim" aria-hidden="true" />
                        <div className="hero-orbs" aria-hidden="true">
                            <div className="hero-orb hero-orb-1" />
                            <div
                                className="hero-orb hero-orb-2"
                                data-parallax="0.22"
                            />
                        </div>
                        <MoleculeField className="molecule-field--on-dark" />
                        <div className="hero-grid container">
                            <div className="hero-copy reveal">
                                <p className="eyebrow">
                                    PT. Pacific Gitalestari
                                </p>
                                <h1>
                                    Solusi industri yang bekerja untuk{' '}
                                    <span className="hl">
                                        air, energi, dan aset
                                    </span>{' '}
                                    Anda.
                                </h1>
                                <p className="hero-intro">
                                    Kami membantu kebutuhan pengolahan air,
                                    bahan kimia industri, dukungan daya, dan
                                    sistem perlindungan teknis dengan pengalaman
                                    lebih dari 18 tahun.
                                </p>
                                <div className="hero-actions">
                                    <a
                                        className="button"
                                        href={WHATSAPP_URL}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Mulai konsultasi{' '}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                    <a className="text-link" href="/solusi">
                                        Lihat solusi kami{' '}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <MonitoringReadout />
                        <WaveDivider tone="white" />
                    </section>

                    <section
                        className="proof-strip"
                        aria-label="Keunggulan Pacific Gitalestari"
                    >
                        <div className="proof-grid container">
                            <p>
                                <strong>PT. PLN</strong>
                                <span>Klien sektor publik</span>
                            </p>
                            <p>
                                <strong>
                                    <span className="count" data-count-to="4">
                                        4
                                    </span>{' '}
                                    Pilar
                                </strong>
                                <span>Solusi terintegrasi</span>
                            </p>
                            <p>
                                <strong>On-site</strong>
                                <span>Dukungan teknis lapangan</span>
                            </p>
                            <p>
                                <strong>B2B &amp; Publik</strong>
                                <span>Mitra sektor strategis</span>
                            </p>
                        </div>
                    </section>

                    <section className="section intro-section">
                        <div className="two-column container">
                            <p className="eyebrow">Kemampuan terintegrasi</p>
                            <div>
                                <h2>
                                    Keahlian teknis untuk kebutuhan industri
                                    yang terus bergerak.
                                </h2>
                                <p>
                                    PGL menghadirkan pengadaan, instalasi,
                                    operasi dan pemeliharaan untuk sistem
                                    pengolahan air dan limbah, produk kimia,
                                    penyewaan mesin diesel, serta aplikasi
                                    perlindungan konstruksi dan lantai industri.
                                </p>
                                <a className="text-link" href="/tentang">
                                    Kenali profil perusahaan{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="section section-mist">
                        <div className="container">
                            <div className="section-heading">
                                <div>
                                    <p className="eyebrow">Solusi utama</p>
                                    <h2>
                                        Dibangun untuk kebutuhan operasional
                                        nyata.
                                    </h2>
                                </div>
                                <p>
                                    Setiap solusi dimulai dari pemahaman kondisi
                                    lapangan, kebutuhan proses, dan target
                                    kinerja fasilitas.
                                </p>
                            </div>
                            <div className="solution-grid">
                                <article className="solution-card reveal">
                                    <span
                                        className="card-icon"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
                                        </svg>
                                    </span>
                                    <span className="card-number">01</span>
                                    <h3>Water Treatment &amp; WWTP</h3>
                                    <p>
                                        Perancangan, pengadaan, instalasi,
                                        operasi, dan pemeliharaan sistem air dan
                                        air limbah.
                                    </p>
                                    <a
                                        href="/solusi"
                                        aria-label="Pelajari Water Treatment dan WWTP"
                                    >
                                        Pelajari solusi{' '}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </article>
                                <article className="solution-card reveal">
                                    <span
                                        className="card-icon"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 3h6" />
                                            <path d="M10 3v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3" />
                                            <path d="M7.5 15h9" />
                                        </svg>
                                    </span>
                                    <span className="card-number">02</span>
                                    <h3>Industrial Chemicals</h3>
                                    <p>
                                        Kimia untuk cooling water, boiler, gula,
                                        reverse osmosis, dan pengolahan air
                                        limbah.
                                    </p>
                                    <a
                                        href="/produk-kimia"
                                        aria-label="Pelajari bahan kimia industri"
                                    >
                                        Pelajari solusi{' '}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </article>
                                <article className="solution-card reveal">
                                    <span
                                        className="card-icon"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M13 2 4 14h7l-2 8 9-12h-7z" />
                                        </svg>
                                    </span>
                                    <span className="card-number">03</span>
                                    <h3>Power &amp; Diesel Rental</h3>
                                    <p>
                                        Dukungan sewa mesin diesel untuk
                                        kebutuhan daya industri dan
                                        infrastruktur.
                                    </p>
                                    <a
                                        href="/solusi"
                                        aria-label="Pelajari sewa mesin diesel"
                                    >
                                        Pelajari solusi{' '}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </article>
                                <article className="solution-card reveal">
                                    <span
                                        className="card-icon"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 3 5 6v5c0 4 3 8 7 10 4-2 7-6 7-10V6z" />
                                        </svg>
                                    </span>
                                    <span className="card-number">04</span>
                                    <h3>Protection Systems</h3>
                                    <p>
                                        Waterproofing, grouting, epoxy lining,
                                        concrete repair, dan flooring untuk aset
                                        kritis.
                                    </p>
                                    <a
                                        href="/proteksi"
                                        aria-label="Pelajari sistem perlindungan"
                                    >
                                        Pelajari solusi{' '}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                </article>
                            </div>
                        </div>
                    </section>

                    <section className="section plant-section">
                        <div className="plant-layout container">
                            <div className="plant-image">
                                <picture>
                                    <source
                                        srcSet="/landing/images/rephile-water-nINNu6nHH5o-unsplash.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="/landing/images/rephile-water-nINNu6nHH5o-unsplash.jpg"
                                        alt="Unit Water Treatment Plant dengan tangki stainless steel dan sistem pipa"
                                        width={1600}
                                        height={1080}
                                        loading="lazy"
                                    />
                                </picture>
                                <span>WTP</span>
                                <b>STEEL · STAINLESS · CONCRETE · MOBILE</b>
                            </div>
                            <div>
                                <p className="eyebrow">Water treatment plant</p>
                                <h2>
                                    Dirancang sesuai kondisi air dan ruang kerja
                                    Anda.
                                </h2>
                                <p>
                                    Konfigurasi steel, stainless steel,
                                    concrete, mobile, dan trailer type untuk
                                    kebutuhan pengolahan air industri.
                                    Prioritaskan kualitas hasil, instalasi yang
                                    efisien, serta kemudahan operasional.
                                </p>
                                <ul className="check-list">
                                    <li>Pengadaan dan instalasi sistem</li>
                                    <li>Operasi &amp; pemeliharaan</li>
                                    <li>Analisis air dan dukungan teknis</li>
                                </ul>
                                <a className="text-link" href="/solusi">
                                    Detail solusi water treatment{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="proc-strip container">
                            <figure className="proc-photo reveal">
                                <picture>
                                    <source
                                        srcSet="/landing/images/steel-pipes-scUBcasSvbE-unsplash.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="/landing/images/steel-pipes-scUBcasSvbE-unsplash.jpg"
                                        alt="Susunan pipa industri stainless steel di fasilitas pengolahan"
                                        width={900}
                                        height={600}
                                        loading="lazy"
                                    />
                                </picture>
                                <figcaption>Pipa industri</figcaption>
                            </figure>
                            <figure className="proc-photo reveal">
                                <picture>
                                    <source
                                        srcSet="/landing/images/chemical-steel-tanks-xD5SWy7hMbw-unsplash.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="/landing/images/chemical-steel-tanks-xD5SWy7hMbw-unsplash.jpg"
                                        alt="Tangki penyimpanan bahan kimia dari baja di area plant"
                                        width={900}
                                        height={600}
                                        loading="lazy"
                                    />
                                </picture>
                                <figcaption>
                                    Tangki penyimpanan kimia
                                </figcaption>
                            </figure>
                            <figure className="proc-photo reveal">
                                <picture>
                                    <source
                                        srcSet="/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.webp"
                                        type="image/webp"
                                    />
                                    <img
                                        src="/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.jpg"
                                        alt="Instalasi pengolahan air tampak atas dengan aliran air jernih"
                                        width={1200}
                                        height={656}
                                        loading="lazy"
                                    />
                                </picture>
                                <figcaption>
                                    Instalasi pengolahan air
                                </figcaption>
                            </figure>
                        </div>
                    </section>

                    <section className="section">
                        <div className="services-layout container">
                            <div>
                                <p className="eyebrow">Katalog produk</p>
                                <h2>
                                    Bahan kimia industri untuk tiap tahap
                                    proses.
                                </h2>
                                <p>
                                    Enam lini utama, dari cooling &amp; boiler
                                    water treatment hingga demin plant resin —
                                    masing-masing dengan fungsi teknis spesifik.
                                </p>
                                <a className="text-link" href="/produk-kimia">
                                    Lihat katalog kimia{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                            <div className="service-points">
                                <span>Cooling Water</span>
                                <span>Boiler Water</span>
                                <span>Sugar Processing</span>
                                <span>Reverse Osmosis</span>
                                <span>Waste Water</span>
                                <span>Demin Plant</span>
                            </div>
                        </div>
                    </section>

                    <section
                        className="section sugar-section motif-host"
                        aria-label="Pengolahan tebu menjadi gula kristal putih"
                    >
                        <MoleculeField className="molecule-field--on-dark" />
                        <div className="sugar-layout container">
                            <div className="sugar-copy reveal">
                                <p className="eyebrow eyebrow-light">
                                    Pengolahan gula
                                </p>
                                <h2>
                                    Dari perkebunan tebu hingga gula kristal
                                    putih.
                                </h2>
                                <p>
                                    PGL menopang industri gula lewat program
                                    kimia sugar processing — dari penjernihan
                                    nira, kendali kerak dan busa, hingga
                                    efisiensi kristalisasi — untuk hasil gula
                                    kristal putih yang bersih dan konsisten.
                                </p>
                                <a className="text-link" href="/produk-kimia">
                                    Lihat kimia sugar processing{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                            <div className="sugar-visual" aria-hidden="true">
                                <SugarcaneMotif />
                                <span className="sugar-arrow">→</span>
                                <CrystalMotif />
                            </div>
                        </div>
                        <ol className="sugar-flow container">
                            <li>
                                <span className="sugar-step">01</span>
                                Perkebunan Tebu
                            </li>
                            <li>
                                <span className="sugar-step">02</span>
                                Penggilingan (Nira)
                            </li>
                            <li>
                                <span className="sugar-step">03</span>
                                Klarifikasi
                            </li>
                            <li>
                                <span className="sugar-step">04</span>
                                Evaporasi
                            </li>
                            <li>
                                <span className="sugar-step">05</span>
                                Kristalisasi
                            </li>
                            <li>
                                <span className="sugar-step">06</span>
                                Gula Kristal Putih
                            </li>
                        </ol>
                    </section>

                    <section
                        className="sector-band"
                        aria-label="Sektor yang dilayani"
                    >
                        <div className="container">
                            <div className="section-heading">
                                <div>
                                    <p className="eyebrow">
                                        Sektor yang dilayani
                                    </p>
                                    <h2>
                                        Dipercaya lintas industri strategis.
                                    </h2>
                                </div>
                                <p>
                                    Dari pembangkit listrik hingga pabrik gula,
                                    fasilitas air bersih, dan sektor publik.
                                </p>
                            </div>
                            <div className="marquee" data-marquee>
                                <div className="marquee-track">
                                    <span>Pembangkit Listrik / PLTD</span>
                                    <span>Pabrik Gula</span>
                                    <span>Industri Air &amp; WWTP</span>
                                    <span>Konstruksi &amp; Infrastruktur</span>
                                    <span>BUMN &amp; Sektor Publik</span>
                                    <span>Manufaktur</span>
                                    <span aria-hidden="true">
                                        Pembangkit Listrik / PLTD
                                    </span>
                                    <span aria-hidden="true">Pabrik Gula</span>
                                    <span aria-hidden="true">
                                        Industri Air &amp; WWTP
                                    </span>
                                    <span aria-hidden="true">
                                        Konstruksi &amp; Infrastruktur
                                    </span>
                                    <span aria-hidden="true">
                                        BUMN &amp; Sektor Publik
                                    </span>
                                    <span aria-hidden="true">Manufaktur</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section project-section">
                        <div className="project-layout container">
                            <div>
                                <p className="eyebrow">Rekam jejak</p>
                                <h2>Keandalan yang terlihat di lapangan.</h2>
                                <p>
                                    Salah satu portofolio sektor publik PGL:
                                    penyewaan diesel engine (PLTD) untuk
                                    mendukung kebutuhan daya PT. PLN (Persero)
                                    Wilayah Kalselteng.
                                </p>
                                <ul className="check-list">
                                    <li>
                                        Klien: PT. PLN (Persero) Wilayah
                                        Kalselteng
                                    </li>
                                    <li>
                                        Lingkup: Diesel engine rental / PLTD
                                    </li>
                                    <li>
                                        Sektor: Kelistrikan &amp; infrastruktur
                                    </li>
                                </ul>
                                <a
                                    className="button button-ghost"
                                    href="/proyek"
                                >
                                    Lihat portofolio{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                            <article className="project-card reveal">
                                <div className="project-image">
                                    <picture>
                                        <source
                                            srcSet="/landing/diesel-generator.webp"
                                            type="image/webp"
                                        />
                                        <img
                                            src="/landing/diesel-generator.jpg"
                                            alt="Generator diesel kuning dalam lingkungan proyek industri"
                                            width={1000}
                                            height={750}
                                            loading="lazy"
                                        />
                                    </picture>
                                    <span>PLTD</span>
                                </div>
                                <div className="project-copy">
                                    <p>Featured project</p>
                                    <h3>PLTD Pangkalan Bun</h3>
                                    <span>
                                        PT. PLN (Persero) Wilayah Kalselteng
                                    </span>
                                </div>
                            </article>
                        </div>
                    </section>

                    <section className="section services-band">
                        <div className="services-layout container">
                            <div>
                                <p className="eyebrow">
                                    Technical service &amp; QA
                                </p>
                                <h2>
                                    Dukungan yang tidak berhenti saat produk
                                    dikirim.
                                </h2>
                            </div>
                            <div className="service-points">
                                <span>On-site testing</span>
                                <span>Field trial</span>
                                <span>Commissioning</span>
                                <span>Troubleshooting</span>
                                <span>Water analysis</span>
                                <span>R&amp;D support</span>
                            </div>
                        </div>
                    </section>

                    <section className="section section-mist motif-host">
                        <div className="two-column container">
                            <p className="eyebrow">Arah perusahaan</p>
                            <div>
                                <h2>
                                    Menjadi perusahaan nasional terkemuka di
                                    bidang energi, kelistrikan, pengolahan gula,
                                    dan air.
                                </h2>
                                <p>
                                    Visi PGL berorientasi jangka panjang pada
                                    pasar domestik, ditopang pengalaman panjang
                                    di Water Treatment, Sugar Processing, dan
                                    Electrical Power Plant.
                                </p>
                                <a className="text-link" href="/tentang">
                                    Pelajari profil, visi &amp; misi{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <WaveDivider tone="navy" />
                    </section>

                    <section className="consultation">
                        <FacilitySilhouette className="facility-silhouette--on-dark" />
                        <div className="consultation-box container">
                            <div>
                                <p className="eyebrow eyebrow-light">
                                    Mulai dari kebutuhan Anda
                                </p>
                                <h2>
                                    Butuh solusi teknis untuk fasilitas Anda?
                                </h2>
                                <p>
                                    Bagikan kebutuhan awal Anda. Tim PGL akan
                                    menindaklanjuti untuk konsultasi teknis dan
                                    langkah berikutnya.
                                </p>
                            </div>
                            <div>
                                <a
                                    className="button button-light"
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Mulai konsultasi teknis{' '}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>

                <LandingFooter />
                <WhatsappFab />
            </div>
        </>
    );
}
