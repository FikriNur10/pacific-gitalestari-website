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
import type { ComponentType } from 'react';
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
 * A featured portfolio entry — the home controller's `.map()` shape mirrors
 * ProyekController so the type matches the /proyek page's Project.
 */
type FeaturedProject = {
    title: string;
    slug: string;
    client: string | null;
    category: string | null;
    summary: string | null;
    coverUrl: string | null;
};

/**
 * A legalitas/certificate entry — mirrors LegalitasController's `.map()` subset
 * used by the navy credibility band on the home page.
 */
type Certificate = {
    id: number;
    title: string;
    category: string | null;
    issuer: string | null;
    fileUrl: string | null;
    imageUrl: string | null;
};

type PageProps = {
    featuredProjects: FeaturedProject[];
    certificates: Certificate[];
};

// Fallback cover when a CMS project has no uploaded image — same asset the
// /proyek page falls back to, so the two portfolio views stay visually consistent.
const FALLBACK_COVER =
    '/landing/images/concrete-structures-Ac97OqAWDvg-unsplash.jpg';

// Four integrated solution pillars. Static — these are positioning statements,
// not CMS content; each links to the real built sub-page.
const SOLUTIONS: {
    no: string;
    Icon: ComponentType<{ size?: number }>;
    title: string;
    href: string;
    desc: string;
    specs: string[];
}[] = [
    {
        no: '01',
        Icon: Droplets,
        title: 'Water Treatment & WWTP',
        href: '/solusi',
        desc: 'Perancangan, pengadaan, instalasi, operasi, dan pemeliharaan sistem air dan air limbah.',
        specs: ['WTP', 'WWTP', 'Operasi & pemeliharaan'],
    },
    {
        no: '02',
        Icon: FlaskConical,
        title: 'Industrial Chemicals',
        href: '/produk-kimia',
        desc: 'Kimia untuk cooling water, boiler, gula, reverse osmosis, dan pengolahan air limbah.',
        specs: ['6 lini produk', 'Water analysis', 'Field trial'],
    },
    {
        no: '03',
        Icon: Zap,
        title: 'Power & Diesel Rental',
        href: '/solusi',
        desc: 'Dukungan sewa mesin diesel untuk kebutuhan daya industri dan infrastruktur.',
        specs: ['PLTD', 'Diesel engine rental', 'Sektor publik'],
    },
    {
        no: '04',
        Icon: ShieldCheck,
        title: 'Protection Systems',
        href: '/proteksi',
        desc: 'Waterproofing, grouting, epoxy lining, concrete repair, dan flooring untuk aset kritis.',
        specs: ['Waterproofing', 'Epoxy lining', 'Concrete repair'],
    },
];

// Six chemical product lines. Static catalog teaser — the full catalog lives at
// /produk-kimia (CMS-backed); these labels/functions are stable positioning copy.
const CHEMICALS: { no: string; name: string; fn: string }[] = [
    {
        no: '01',
        name: 'Cooling Water',
        fn: 'Kendali korosi, kerak, dan pertumbuhan mikrobiologi pada sistem air pendingin.',
    },
    {
        no: '02',
        name: 'Boiler Water',
        fn: 'Pengendalian kerak, oksigen terlarut, dan perlindungan jalur kondensat.',
    },
    {
        no: '03',
        name: 'Sugar Processing',
        fn: 'Penjernihan nira, kendali kerak dan busa, serta efisiensi kristalisasi.',
    },
    {
        no: '04',
        name: 'Reverse Osmosis',
        fn: 'Antiscalant, biocide, dan pembersih membran untuk unit RO.',
    },
    {
        no: '05',
        name: 'Waste Water',
        fn: 'Koagulan, flokulan, dan nutrisi proses untuk instalasi pengolahan air limbah.',
    },
    {
        no: '06',
        name: 'Demin Plant',
        fn: 'Resin penukar ion dan bahan regenerasi untuk unit demineralisasi.',
    },
];

// Sugar-processing flow. `active` marks the stages where PGL chemistry intervenes
// (klarifikasi → kristalisasi) — rendered with the accent top-rule.
const SUGAR_STEPS: {
    no: string;
    name: string;
    note: string;
    active: boolean;
}[] = [
    { no: '01', name: 'Perkebunan Tebu', note: '', active: false },
    { no: '02', name: 'Penggilingan (Nira)', note: '', active: false },
    { no: '03', name: 'Klarifikasi', note: 'Penjernihan nira', active: true },
    { no: '04', name: 'Evaporasi', note: 'Kendali kerak & busa', active: true },
    {
        no: '05',
        name: 'Kristalisasi',
        note: 'Efisiensi kristalisasi',
        active: true,
    },
    { no: '06', name: 'Gula Kristal Putih', note: '', active: false },
];

// Sectors served — duplicated once (aria-hidden) so the CSS marquee loops seamlessly.
const SECTORS = [
    'Pembangkit Listrik / PLTD',
    'Pabrik Gula',
    'Industri Air & WWTP',
    'Konstruksi & Infrastruktur',
    'BUMN & Sektor Publik',
    'Manufaktur',
];

const TECHNICAL_SERVICES = [
    'On-site testing',
    'Field trial',
    'Commissioning',
    'Troubleshooting',
    'Water analysis',
    'R&D support',
];

/**
 * PT. Pacific Gitalestari homepage — "Landing Improved" finbest port.
 *
 * Split hero → overlapping stat card → integrated-capability profile → four
 * solutions (2×2 with spec tags) → chemical catalog cards → sugar-processing flow
 * → CMS-backed portfolio grid → navy legalitas band → sectors marquee → technical
 * service → consultation CTA. Portfolio + legalitas are the only data-backed
 * blocks (props from HomeController); the rest is static positioning copy.
 * Styling: `.pgl`-scoped `landing.css` tokens + `landing-finbest.css` component layer.
 */
export default function Landing({ featuredProjects, certificates }: PageProps) {
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
                                            <a
                                                className="tp-btn tp-btn-outline"
                                                href="/download"
                                            >
                                                Unduh company profile
                                            </a>
                                        </div>
                                        <div className="tp-hero-trust">
                                            <span>
                                                <CheckCircle2 size={17} />
                                                18+ tahun pengalaman
                                            </span>
                                            <span>
                                                <CheckCircle2 size={17} />
                                                Klien sektor publik: PT. PLN
                                                (Persero)
                                            </span>
                                            <span>
                                                <CheckCircle2 size={17} />
                                                Dukungan teknis on-site
                                            </span>
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

                    {/* ===== Overlapping stat card ===== */}
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
                                        <span
                                            className="count"
                                            data-count-to="6"
                                        >
                                            6
                                        </span>
                                    </div>
                                    <p>Lini produk kimia</p>
                                </div>
                                <div className="tp-counter-item tp-counter-item--client">
                                    <p className="tp-counter-eyebrow">
                                        Klien sektor publik
                                    </p>
                                    <div className="tp-counter-client">
                                        PT. PLN (Persero)
                                    </div>
                                    <p>Wilayah Kalselteng · PLTD</p>
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
                                        <div className="tp-about-stats">
                                            <div>
                                                <strong>
                                                    <span
                                                        className="count"
                                                        data-count-to="18"
                                                    >
                                                        18
                                                    </span>
                                                    <span>+</span>
                                                </strong>
                                                <p>Tahun pengalaman</p>
                                            </div>
                                            <div>
                                                <strong>
                                                    <span
                                                        className="count"
                                                        data-count-to="4"
                                                    >
                                                        4
                                                    </span>
                                                </strong>
                                                <p>Pilar solusi terintegrasi</p>
                                            </div>
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
                                            limbah, produk kimia, penyewaan
                                            mesin diesel, serta aplikasi
                                            perlindungan konstruksi dan lantai
                                            industri.
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
                                        <div className="tp-about-actions">
                                            <a
                                                className="tp-btn"
                                                href="/tentang"
                                            >
                                                Kenali profil perusahaan{' '}
                                                <ArrowRight size={17} />
                                            </a>
                                            <a
                                                className="tp-text-link"
                                                href="/legalitas"
                                            >
                                                Dokumen legalitas{' '}
                                                <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ===== Solutions (4 pillars, 2×2) ===== */}
                    <section className="tp-service-area tp-solutions pt-120 pb-90">
                        <div className="container">
                            <div className="tp-section-head">
                                <div className="tp-section-title-wrapper">
                                    <span className="tp-section-title-pre">
                                        Solusi utama
                                    </span>
                                    <h2 className="tp-section-title">
                                        Dibangun untuk kebutuhan operasional
                                        nyata.
                                    </h2>
                                </div>
                                <p className="tp-section-text tp-section-head-note">
                                    Empat pilar yang bisa dikontrakkan terpisah
                                    atau sebagai satu paket pengadaan,
                                    instalasi, dan pemeliharaan.
                                </p>
                            </div>
                            <div className="tp-solutions-grid">
                                {SOLUTIONS.map(
                                    ({
                                        no,
                                        Icon,
                                        title,
                                        href,
                                        desc,
                                        specs,
                                    }) => (
                                        <div
                                            key={no}
                                            className="tp-service-item reveal"
                                        >
                                            <div className="tp-service-head">
                                                <span className="tp-service-icon">
                                                    <Icon size={30} />
                                                </span>
                                                <span className="tp-service-number">
                                                    {no}
                                                </span>
                                            </div>
                                            <h4 className="tp-service-title">
                                                <a href={href}>{title}</a>
                                            </h4>
                                            <p>{desc}</p>
                                            <ul className="tp-service-specs">
                                                {specs.map((spec) => (
                                                    <li key={spec}>{spec}</li>
                                                ))}
                                            </ul>
                                            <a
                                                className="tp-service-link"
                                                href={href}
                                            >
                                                Pelajari solusi{' '}
                                                <ArrowRight size={16} />
                                            </a>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ===== Chemicals catalog ===== */}
                    <section className="pt-120 pb-120">
                        <div className="container">
                            <div className="tp-section-head">
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
                                </div>
                                <a className="tp-btn" href="/produk-kimia">
                                    Lihat katalog kimia <ArrowRight size={17} />
                                </a>
                            </div>
                            <div className="tp-chem-grid">
                                {CHEMICALS.map(({ no, name, fn }) => (
                                    <article key={no} className="tp-chem-card">
                                        <p className="tp-chem-no">{no}</p>
                                        <h3>{name}</h3>
                                        <p>{fn}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ===== Sugar processing flow ===== */}
                    <section className="tp-service-area pt-120 pb-120">
                        <div className="container">
                            <div
                                className="tp-section-title-wrapper mb-40"
                                style={{ maxWidth: 720 }}
                            >
                                <span className="tp-section-title-pre">
                                    Pengolahan gula
                                </span>
                                <h2 className="tp-section-title">
                                    Dari perkebunan tebu hingga gula kristal
                                    putih.
                                </h2>
                                <p className="tp-section-text">
                                    PGL menopang industri gula lewat program
                                    kimia sugar processing — dari penjernihan
                                    nira, kendali kerak dan busa, hingga
                                    efisiensi kristalisasi — untuk hasil gula
                                    kristal putih yang bersih dan konsisten.
                                </p>
                            </div>
                            <div className="tp-flow-grid">
                                {SUGAR_STEPS.map(
                                    ({ no, name, note, active }) => (
                                        <div
                                            key={no}
                                            // Space MUST be outside the ternary — a leading space
                                            // inside the branch gets eaten, fusing "tp-flow-stepis-active".
                                            className={`tp-flow-step ${active ? 'is-active' : ''}`}
                                        >
                                            <span className="tp-flow-no">
                                                {no}
                                            </span>
                                            <h3>{name}</h3>
                                            {/* Always render the note row (even empty) so all six
                                                cards share the reserved note height and align. */}
                                            <p className="tp-flow-note">
                                                {note}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                            <div className="tp-flow-actions">
                                <span className="tp-flow-legend">
                                    Titik intervensi kimia PGL
                                </span>
                                <a className="tp-btn" href="/produk-kimia">
                                    Lihat kimia sugar processing{' '}
                                    <ArrowRight size={17} />
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* ===== Portfolio (CMS-backed) ===== */}
                    {featuredProjects.length > 0 ? (
                        <section className="pt-120 pb-120">
                            <div className="container">
                                <div className="tp-section-head">
                                    <div className="tp-section-title-wrapper">
                                        <span className="tp-section-title-pre">
                                            Rekam jejak
                                        </span>
                                        <h2 className="tp-section-title">
                                            Keandalan yang terlihat di lapangan.
                                        </h2>
                                    </div>
                                    <a className="tp-text-link" href="/proyek">
                                        Lihat portofolio lengkap{' '}
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                                <div className="tp-portfolio-grid">
                                    {featuredProjects.map((project) => (
                                        <article
                                            key={project.slug}
                                            className="tp-portfolio-card reveal"
                                        >
                                            <a
                                                className="tp-portfolio-thumb"
                                                href={`/proyek`}
                                            >
                                                <img
                                                    src={
                                                        project.coverUrl ??
                                                        FALLBACK_COVER
                                                    }
                                                    alt={project.title}
                                                    loading="lazy"
                                                />
                                                {project.category ? (
                                                    <span className="tp-portfolio-badge">
                                                        {project.category}
                                                    </span>
                                                ) : null}
                                            </a>
                                            <div className="tp-portfolio-body">
                                                {project.client ? (
                                                    <p className="tp-portfolio-eyebrow">
                                                        {project.client}
                                                    </p>
                                                ) : null}
                                                <h3 className="tp-portfolio-title">
                                                    <a href="/proyek">
                                                        {project.title}
                                                    </a>
                                                </h3>
                                                {project.summary ? (
                                                    <p>{project.summary}</p>
                                                ) : null}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ) : null}

                    {/* ===== Legalitas & sertifikasi (CMS-backed) ===== */}
                    {certificates.length > 0 ? (
                        <section className="tp-legal-area pt-120 pb-120">
                            <div className="container">
                                <div className="tp-section-head">
                                    <div className="tp-section-title-wrapper">
                                        <span className="tp-section-title-pre">
                                            Legalitas &amp; sertifikasi
                                        </span>
                                        <h2 className="tp-section-title tp-section-title-white">
                                            Kualifikasi yang siap diverifikasi.
                                        </h2>
                                    </div>
                                    <a
                                        className="tp-text-link tp-text-link--light"
                                        href="/legalitas"
                                    >
                                        Semua dokumen legalitas{' '}
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                                <div className="tp-legal-grid">
                                    {certificates.map((doc) => (
                                        <a
                                            key={doc.id}
                                            className="tp-legal-card"
                                            href={doc.fileUrl ?? '/legalitas'}
                                            target={
                                                doc.fileUrl
                                                    ? '_blank'
                                                    : undefined
                                            }
                                            rel={
                                                doc.fileUrl
                                                    ? 'noopener'
                                                    : undefined
                                            }
                                        >
                                            {doc.imageUrl ? (
                                                <span className="tp-legal-thumb">
                                                    <img
                                                        src={doc.imageUrl}
                                                        alt={doc.title}
                                                        loading="lazy"
                                                    />
                                                </span>
                                            ) : (
                                                <span className="tp-legal-fallback">
                                                    <ShieldCheck size={26} />
                                                </span>
                                            )}
                                            <span className="tp-legal-caption">
                                                <strong>{doc.title}</strong>
                                                {doc.issuer ? (
                                                    <span>{doc.issuer}</span>
                                                ) : null}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </section>
                    ) : null}

                    {/* ===== Sectors served ===== */}
                    <section className="tp-service-area pt-120 pb-120">
                        <div className="container">
                            <div
                                className="tp-section-title-wrapper mb-40"
                                style={{ maxWidth: 640 }}
                            >
                                <span className="tp-section-title-pre">
                                    Sektor yang dilayani
                                </span>
                                <h2 className="tp-section-title">
                                    Dipercaya lintas industri strategis.
                                </h2>
                            </div>
                            <div className="marquee" data-marquee>
                                <div className="marquee-track">
                                    {SECTORS.map((sector) => (
                                        <span key={sector}>{sector}</span>
                                    ))}
                                    {SECTORS.map((sector) => (
                                        <span
                                            key={`dup-${sector}`}
                                            aria-hidden="true"
                                        >
                                            {sector}
                                        </span>
                                    ))}
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
                                        {TECHNICAL_SERVICES.map((service) => (
                                            <span key={service}>{service}</span>
                                        ))}
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
                                            akan menindaklanjuti untuk
                                            konsultasi teknis dan langkah
                                            berikutnya.
                                        </p>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="tp-cta-actions tp-cta-actions--stack">
                                            <a
                                                className="tp-btn tp-btn-white"
                                                href={WHATSAPP_URL}
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Mulai konsultasi teknis{' '}
                                                <ArrowRight size={17} />
                                            </a>
                                            <a
                                                className="tp-cta-phone"
                                                href="tel:+62216514815"
                                            >
                                                <Phone size={17} /> atau telepon
                                                +62 21 6514815
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
