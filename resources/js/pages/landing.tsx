import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Droplets,
    FlaskConical,
    Phone,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import { useRef } from 'react';
import '../../css/landing.css';
import '../../css/landing-finbest.css';
import LandingFooter from '@/components/landing/landing-footer';
import LandingHeader from '@/components/landing/landing-header';
import WhatsappFab from '@/components/landing/whatsapp-fab';
import { useLandingEffects } from '@/hooks/use-landing-effects';
import { useHeroBackground } from '@/lib/hero-background';
import { WHATSAPP_URL } from '@/lib/landing';

/**
 * PT. Pacific Gitalestari homepage — finbest template port.
 *
 * Same content as before (hero, proof stats, integrated-capability profile, four
 * solutions, chemicals, sugar processing, sectors, featured PLTD project, technical
 * service, consultation CTA) rebuilt into finbest's section language: split hero,
 * counter strip, tp-about, tp-service cards, chip clusters, project card, cta band.
 * Styling: `.pgl`-scoped `landing.css` tokens + `landing-finbest.css` component layer.
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
                    href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&family=Kumbh+Sans:wght@400;500;600;700;800&display=swap"
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
                    {/* ===== Hero (finbest split) ===== */}
                    <section className="tp-hero-area">
                        <div className="tp-hero-bg" aria-hidden="true" />
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-7">
                                    <div className="tp-hero-content">
                                        <span className="tp-hero-subtitle">
                                            PT. Pacific Gitalestari
                                        </span>
                                        <h1 className="tp-hero-title">
                                            Solusi industri yang bekerja untuk{' '}
                                            <span>air, energi, dan aset</span>{' '}
                                            Anda.
                                        </h1>
                                        <p>
                                            Kami membantu kebutuhan pengolahan
                                            air, bahan kimia industri, dukungan
                                            daya, dan sistem perlindungan teknis
                                            dengan pengalaman lebih dari 18
                                            tahun.
                                        </p>
                                        <div className="tp-hero-button-wrapper">
                                            <a
                                                className="tp-btn"
                                                href={WHATSAPP_URL}
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Mulai konsultasi{' '}
                                                <ArrowRight size={17} />
                                            </a>
                                            <div className="tp-hero-call">
                                                <span className="tp-hero-call-icon">
                                                    <Phone size={20} />
                                                </span>
                                                <div>
                                                    <p>Butuh bantuan?</p>
                                                    <a href="tel:+62216514815">
                                                        +62 21 6514815
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="tp-hero-thumb">
                                        <img
                                            className="shape-2"
                                            src="/landing/finbest/shape-2.png"
                                            alt=""
                                            aria-hidden="true"
                                        />
                                        <div className="main">
                                            <img
                                                src={heroBg}
                                                alt="Kompleks water treatment plant tampak atas"
                                                fetchPriority="high"
                                            />
                                        </div>
                                        <img
                                            className="shape-1"
                                            src="/landing/finbest/shape-1.png"
                                            alt=""
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Counter strip ===== */}
                    <section className="tp-counter-area">
                        <div className="container">
                            <div className="tp-counter-box">
                                <div className="tp-counter-item">
                                    <div className="tp-counter-number">
                                        <span
                                            className="count"
                                            data-count-to="18"
                                        >
                                            18
                                        </span>
                                        +
                                    </div>
                                    <p>Tahun pengalaman</p>
                                </div>
                                <div className="tp-counter-item">
                                    <div className="tp-counter-number">
                                        <span
                                            className="count"
                                            data-count-to="4"
                                        >
                                            4
                                        </span>
                                    </div>
                                    <p>Pilar solusi terintegrasi</p>
                                </div>
                                <div className="tp-counter-item">
                                    <div className="tp-counter-number">
                                        <span>PT. PLN</span>
                                    </div>
                                    <p>Klien sektor publik</p>
                                </div>
                                <div className="tp-counter-item">
                                    <div className="tp-counter-number">
                                        <span>On-site</span>
                                    </div>
                                    <p>Dukungan teknis lapangan</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== About / integrated capability ===== */}
                    <section className="tp-about-area pt-120 pb-120">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="tp-about-thumb-wrapper reveal">
                                        <div className="main">
                                            <picture>
                                                <source
                                                    srcSet="/landing/images/rephile-water-nINNu6nHH5o-unsplash.webp"
                                                    type="image/webp"
                                                />
                                                <img
                                                    src="/landing/images/rephile-water-nINNu6nHH5o-unsplash.jpg"
                                                    alt="Unit Water Treatment Plant dengan tangki stainless steel dan sistem pipa"
                                                    loading="lazy"
                                                />
                                            </picture>
                                        </div>
                                        <div className="tp-about-experience">
                                            <strong>
                                                <span
                                                    className="count"
                                                    data-count-to="18"
                                                >
                                                    18
                                                </span>
                                                +
                                            </strong>
                                            <span>Tahun pengalaman</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="tp-about-wrapper">
                                        <div className="tp-about-title-wrapper">
                                            <span className="tp-section-title-pre">
                                                Kemampuan terintegrasi
                                            </span>
                                            <h2 className="tp-section-title">
                                                Keahlian teknis untuk kebutuhan
                                                industri yang terus bergerak.
                                            </h2>
                                        </div>
                                        <p>
                                            PGL menghadirkan pengadaan,
                                            instalasi, operasi dan pemeliharaan
                                            untuk sistem pengolahan air dan
                                            limbah, produk kimia, penyewaan mesin
                                            diesel, serta aplikasi perlindungan
                                            konstruksi dan lantai industri.
                                        </p>
                                        <div className="tp-about-list">
                                            <ul>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Pengadaan &amp; instalasi
                                                    sistem
                                                </li>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Operasi &amp; pemeliharaan
                                                </li>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Analisis air &amp; dukungan
                                                    teknis
                                                </li>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Perlindungan aset &amp;
                                                    lantai industri
                                                </li>
                                            </ul>
                                        </div>
                                        <a className="tp-btn" href="/tentang">
                                            Kenali profil perusahaan{' '}
                                            <ArrowRight size={17} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Services (4 solutions) ===== */}
                    <section className="tp-service-area pt-120 pb-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="tp-service-title-wrapper mb-50">
                                        <span className="tp-section-title-pre">
                                            Solusi utama
                                        </span>
                                        <h2 className="tp-section-title">
                                            Dibangun untuk kebutuhan operasional
                                            nyata.
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6">
                                    <div className="tp-service-item mb-30 reveal">
                                        <span className="tp-service-number">
                                            01
                                        </span>
                                        <span className="tp-service-icon">
                                            <Droplets size={32} />
                                        </span>
                                        <h4 className="tp-service-title">
                                            <a href="/solusi">
                                                Water Treatment &amp; WWTP
                                            </a>
                                        </h4>
                                        <p>
                                            Perancangan, pengadaan, instalasi,
                                            operasi, dan pemeliharaan sistem air
                                            dan air limbah.
                                        </p>
                                        <a
                                            className="tp-service-link"
                                            href="/solusi"
                                        >
                                            Pelajari solusi{' '}
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="tp-service-item mb-30 reveal">
                                        <span className="tp-service-number">
                                            02
                                        </span>
                                        <span className="tp-service-icon">
                                            <FlaskConical size={32} />
                                        </span>
                                        <h4 className="tp-service-title">
                                            <a href="/produk-kimia">
                                                Industrial Chemicals
                                            </a>
                                        </h4>
                                        <p>
                                            Kimia untuk cooling water, boiler,
                                            gula, reverse osmosis, dan pengolahan
                                            air limbah.
                                        </p>
                                        <a
                                            className="tp-service-link"
                                            href="/produk-kimia"
                                        >
                                            Pelajari solusi{' '}
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="tp-service-item mb-30 reveal">
                                        <span className="tp-service-number">
                                            03
                                        </span>
                                        <span className="tp-service-icon">
                                            <Zap size={32} />
                                        </span>
                                        <h4 className="tp-service-title">
                                            <a href="/solusi">
                                                Power &amp; Diesel Rental
                                            </a>
                                        </h4>
                                        <p>
                                            Dukungan sewa mesin diesel untuk
                                            kebutuhan daya industri dan
                                            infrastruktur.
                                        </p>
                                        <a
                                            className="tp-service-link"
                                            href="/solusi"
                                        >
                                            Pelajari solusi{' '}
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <div className="tp-service-item mb-30 reveal">
                                        <span className="tp-service-number">
                                            04
                                        </span>
                                        <span className="tp-service-icon">
                                            <ShieldCheck size={32} />
                                        </span>
                                        <h4 className="tp-service-title">
                                            <a href="/proteksi">
                                                Protection Systems
                                            </a>
                                        </h4>
                                        <p>
                                            Waterproofing, grouting, epoxy
                                            lining, concrete repair, dan flooring
                                            untuk aset kritis.
                                        </p>
                                        <a
                                            className="tp-service-link"
                                            href="/proteksi"
                                        >
                                            Pelajari solusi{' '}
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Chemicals catalog ===== */}
                    <section className="pt-120 pb-120">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="tp-section-title-wrapper">
                                        <span className="tp-section-title-pre">
                                            Katalog produk
                                        </span>
                                        <h2 className="tp-section-title">
                                            Bahan kimia industri untuk tiap tahap
                                            proses.
                                        </h2>
                                        <p className="tp-section-text">
                                            Enam lini utama, dari cooling &amp;
                                            boiler water treatment hingga demin
                                            plant resin — masing-masing dengan
                                            fungsi teknis spesifik.
                                        </p>
                                        <a
                                            className="tp-btn mb-30"
                                            href="/produk-kimia"
                                            style={{ marginTop: '10px' }}
                                        >
                                            Lihat katalog kimia{' '}
                                            <ArrowRight size={17} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="tp-chip-list">
                                        <span>Cooling Water</span>
                                        <span>Boiler Water</span>
                                        <span>Sugar Processing</span>
                                        <span>Reverse Osmosis</span>
                                        <span>Waste Water</span>
                                        <span>Demin Plant</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Sugar processing ===== */}
                    <section className="tp-service-area pt-120 pb-120">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="tp-section-title-wrapper mb-40">
                                        <span className="tp-section-title-pre">
                                            Pengolahan gula
                                        </span>
                                        <h2 className="tp-section-title">
                                            Dari perkebunan tebu hingga gula
                                            kristal putih.
                                        </h2>
                                        <p className="tp-section-text">
                                            PGL menopang industri gula lewat
                                            program kimia sugar processing — dari
                                            penjernihan nira, kendali kerak dan
                                            busa, hingga efisiensi kristalisasi —
                                            untuk hasil gula kristal putih yang
                                            bersih dan konsisten.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="tp-chip-list">
                                <span>01 · Perkebunan Tebu</span>
                                <span>02 · Penggilingan (Nira)</span>
                                <span>03 · Klarifikasi</span>
                                <span>04 · Evaporasi</span>
                                <span>05 · Kristalisasi</span>
                                <span>06 · Gula Kristal Putih</span>
                            </div>
                            <a
                                className="tp-btn"
                                href="/produk-kimia"
                                style={{ marginTop: '34px' }}
                            >
                                Lihat kimia sugar processing{' '}
                                <ArrowRight size={17} />
                            </a>
                        </div>
                    </section>

                    {/* ===== Featured project ===== */}
                    <section className="pt-120 pb-120">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="tp-section-title-wrapper">
                                        <span className="tp-section-title-pre">
                                            Rekam jejak
                                        </span>
                                        <h2 className="tp-section-title">
                                            Keandalan yang terlihat di lapangan.
                                        </h2>
                                        <p className="tp-section-text">
                                            Salah satu portofolio sektor publik
                                            PGL: penyewaan diesel engine (PLTD)
                                            untuk mendukung kebutuhan daya PT. PLN
                                            (Persero) Wilayah Kalselteng.
                                        </p>
                                        <div className="tp-about-list">
                                            <ul>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Klien: PT. PLN (Persero)
                                                    Wilayah Kalselteng
                                                </li>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Lingkup: Diesel engine rental
                                                    / PLTD
                                                </li>
                                                <li>
                                                    <CheckCircle2 size={20} />{' '}
                                                    Sektor: Kelistrikan &amp;
                                                    infrastruktur
                                                </li>
                                            </ul>
                                        </div>
                                        <a className="tp-btn" href="/proyek">
                                            Lihat portofolio{' '}
                                            <ArrowRight size={17} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6">
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
                                                PT. PLN (Persero) Wilayah
                                                Kalselteng
                                            </span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Sectors served ===== */}
                    <section className="tp-service-area pt-120 pb-120">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="tp-section-title-wrapper mb-40">
                                        <span className="tp-section-title-pre">
                                            Sektor yang dilayani
                                        </span>
                                        <h2 className="tp-section-title">
                                            Dipercaya lintas industri strategis.
                                        </h2>
                                    </div>
                                </div>
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

                    {/* ===== Technical service & QA ===== */}
                    <section className="pt-120 pb-120">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="tp-section-title-wrapper">
                                        <span className="tp-section-title-pre">
                                            Technical service &amp; QA
                                        </span>
                                        <h2 className="tp-section-title">
                                            Dukungan yang tidak berhenti saat
                                            produk dikirim.
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="tp-chip-list">
                                        <span>On-site testing</span>
                                        <span>Field trial</span>
                                        <span>Commissioning</span>
                                        <span>Troubleshooting</span>
                                        <span>Water analysis</span>
                                        <span>R&amp;D support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== CTA band ===== */}
                    <section className="tp-cta-area">
                        <div className="container">
                            <div className="tp-cta-box">
                                <div className="row align-items-center">
                                    <div className="col-lg-8">
                                        <h2 className="tp-cta-title">
                                            Butuh solusi teknis untuk fasilitas
                                            Anda?
                                        </h2>
                                        <p>
                                            Bagikan kebutuhan awal Anda. Tim PGL
                                            akan menindaklanjuti untuk konsultasi
                                            teknis dan langkah berikutnya.
                                        </p>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="tp-cta-actions">
                                            <a
                                                className="tp-btn tp-btn-white"
                                                href={WHATSAPP_URL}
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Mulai konsultasi teknis{' '}
                                                <ArrowRight size={17} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
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
