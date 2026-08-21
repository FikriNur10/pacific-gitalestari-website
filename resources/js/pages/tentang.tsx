import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    ClipboardCheck,
    Eye,
    Leaf,
    ShieldCheck,
    Sparkles,
    Target,
} from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

/**
 * Tentang Kami — finbest About page port. Breadcrumb banner + two-column About
 * area (image + experience badge + profile + check-list), vision/mission cards,
 * R&D/QA chip clusters, work-culture value cards, and a CTA band. All content is
 * preserved from the prototype; chrome + breadcrumb come from LandingLayout.
 */
export default function Tentang() {
    const heroBg = useHeroBackground('tentang');

    return (
        <LandingLayout
            title="Tentang Kami | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Tentang Kami', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Profil PT. Pacific Gitalestari - lebih dari 18 tahun di bidang water treatment, bahan kimia industri, penyewaan diesel, dan sistem perlindungan teknis."
                />
            </Head>

            {/* ===== About (two-column) ===== */}
            <section className="tp-about-area pt-120 pb-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="tp-about-thumb-wrapper reveal">
                                <div className="main">
                                    <picture>
                                        <source
                                            srcSet="/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.webp"
                                            type="image/webp"
                                        />
                                        <img
                                            src="/landing/images/water-treatment-aerial-Rdxjg7UqF08-unsplash.jpg"
                                            alt="Instalasi pengolahan air PGL tampak atas"
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
                                        Profil perusahaan
                                    </span>
                                    <h1 className="tp-section-title">
                                        Kontraktor umum dan mitra teknis untuk
                                        fasilitas industri.
                                    </h1>
                                </div>
                                <p>
                                    Dengan pengalaman lebih dari 18 tahun, PGL
                                    menjalankan proyek general contracting,
                                    engineering, pengadaan dan instalasi, serta
                                    layanan pengolahan air secara menyeluruh —
                                    dan terus menyempurnakan sistemnya seiring
                                    praktik terbaik industri.
                                </p>
                                <div className="tp-about-list">
                                    <ul>
                                        <li>
                                            <CheckCircle2 size={20} /> Water
                                            Treatment Business &amp; Services
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Pengadaan
                                            &amp; instalasi WTP &amp; equipment
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Operasi
                                            &amp; pemeliharaan sistem air
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Sugar
                                            Processing Chemicals
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Diesel
                                            Engine Rental
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Specialist
                                            applicator (repair, waterproofing)
                                        </li>
                                    </ul>
                                </div>
                                <a className="tp-btn" href="/kontak">
                                    Hubungi tim PGL <ArrowRight size={17} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Vision & Mission ===== */}
            <section className="section-mist pt-120 pb-120">
                <div className="container">
                    <div className="tp-section-title-wrapper text-center mb-50">
                        <span className="tp-section-title-pre">
                            Visi &amp; Misi
                        </span>
                        <h2 className="tp-section-title">
                            Arah jangka panjang perusahaan.
                        </h2>
                    </div>
                    <div className="tp-vm-grid">
                        <div className="tp-vm-card reveal">
                            <span className="tp-vm-label">
                                <Eye size={18} /> Visi
                            </span>
                            <blockquote>
                                Menjadi perusahaan nasional terkemuka di bidang
                                energi, kelistrikan, pengolahan gula, dan
                                pengelolaan air.
                            </blockquote>
                        </div>
                        <div className="tp-vm-card reveal">
                            <span className="tp-vm-label">
                                <Target size={18} /> Misi
                            </span>
                            <blockquote>
                                Pertumbuhan dan laba yang tinggi melalui
                                pengembangan pasar domestik, membuka pemasaran
                                baru lewat diversifikasi, peningkatan kualitas
                                sumber daya manusia, dan pemanfaatan fasilitas
                                yang optimal.
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== R&D & Quality Assurance ===== */}
            <section className="pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="tp-section-title-wrapper">
                                <span className="tp-section-title-pre">
                                    R&amp;D &amp; Quality Assurance
                                </span>
                                <h2 className="tp-section-title">
                                    Pengujian yang menopang keandalan setiap
                                    solusi.
                                </h2>
                                <p className="tp-section-text">
                                    Laboratorium internal PGL didukung instrumen
                                    pengujian, dilengkapi kerja sama dengan
                                    laboratorium eksternal untuk pengujian
                                    lanjutan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <h3 className="tp-service-title mb-20">
                                Instrumen laboratorium internal
                            </h3>
                            <div className="tp-chip-list mb-40">
                                <span>pH meter</span>
                                <span>Viscosity meter</span>
                                <span>Setaflash point</span>
                                <span>Picnometer &amp; hygrometer</span>
                                <span>Color</span>
                                <span>Laboratory glass reactor</span>
                            </div>
                            <h3 className="tp-service-title mb-20">
                                Laboratorium eksternal
                            </h3>
                            <div className="tp-chip-list">
                                <span>Corrosion RCE &amp; stirred autoclave</span>
                                <span>Mud laboratory</span>
                                <span>Stimulation laboratory</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Work culture (4 values) ===== */}
            <section className="tp-service-area pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper text-center mb-50">
                        <span className="tp-section-title-pre">Budaya kerja</span>
                        <h2 className="tp-section-title">
                            Empat prinsip yang menjaga mutu di lapangan.
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="tp-service-item mb-30 reveal">
                                <span className="tp-service-icon">
                                    <Sparkles size={32} />
                                </span>
                                <h4 className="tp-service-title">Kebersihan</h4>
                                <p>
                                    Area kerja dan proses yang tertata untuk
                                    hasil yang konsisten dan aman.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="tp-service-item mb-30 reveal">
                                <span className="tp-service-icon">
                                    <ClipboardCheck size={32} />
                                </span>
                                <h4 className="tp-service-title">Ketertiban</h4>
                                <p>
                                    Prosedur dan dokumentasi yang rapi di setiap
                                    tahap pekerjaan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="tp-service-item mb-30 reveal">
                                <span className="tp-service-icon">
                                    <Leaf size={32} />
                                </span>
                                <h4 className="tp-service-title">Kelestarian</h4>
                                <p>
                                    Pengelolaan air dan limbah yang bertanggung
                                    jawab terhadap lingkungan.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="tp-service-item mb-30 reveal">
                                <span className="tp-service-icon">
                                    <ShieldCheck size={32} />
                                </span>
                                <h4 className="tp-service-title">Kedisiplinan</h4>
                                <p>
                                    Komitmen pada jadwal, mutu, dan standar
                                    teknis yang disepakati.
                                </p>
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
                                    Ingin tahu bagaimana PGL bisa membantu
                                    fasilitas Anda?
                                </h2>
                                <p>
                                    Tim kami siap mendiskusikan kebutuhan teknis
                                    dan langkah berikutnya.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak"
                                    >
                                        Hubungi tim PGL <ArrowRight size={17} />
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
