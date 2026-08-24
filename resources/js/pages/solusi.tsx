import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Droplets,
    FlaskConical,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

/**
 * Solusi (Solutions) — finbest services page port. Breadcrumb banner + finbest
 * service-card grid (four pillars, icon + specs + link), a WTP two-column block,
 * a technical-service chip cluster, and a CTA band. Content preserved.
 */
export default function Solusi() {
    const heroBg = useHeroBackground('solusi');

    return (
        <LandingLayout
            title="Solusi | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Solusi', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Empat pilar solusi PT. Pacific Gitalestari: water treatment & WWTP, bahan kimia industri, sewa diesel, dan sistem perlindungan teknis."
                />
            </Head>

            {/* ===== Service grid ===== */}
            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">Solusi</span>
                        <h1 className="tp-section-title">
                            Empat pilar solusi, satu mitra teknis.
                        </h1>
                        <p className="tp-section-text">
                            Dari perancangan water treatment plant hingga bahan
                            kimia proses, dukungan daya, dan sistem perlindungan
                            aset — setiap solusi dimulai dari kondisi lapangan
                            dan target kinerja fasilitas Anda.
                        </p>
                    </div>
                    <div className="row tp-card-row">
                        <div className="col-lg-6 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">01</span>
                                <span className="tp-service-icon">
                                    <Droplets size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Water Treatment &amp; WWTP
                                </h3>
                                <p>
                                    Perancangan, pengadaan, instalasi, operasi,
                                    dan pemeliharaan sistem pengolahan air
                                    bersih dan air limbah untuk kebutuhan
                                    industri.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Water Treatment Plant</li>
                                    <li>Waste Water Treatment</li>
                                    <li>O&amp;M sistem</li>
                                    <li>Water analysis</li>
                                </ul>
                                <a
                                    className="tp-service-link"
                                    href="/kontak#form"
                                >
                                    Konsultasi solusi air{' '}
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">02</span>
                                <span className="tp-service-icon">
                                    <FlaskConical size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Industrial Chemicals
                                </h3>
                                <p>
                                    Bahan kimia untuk cooling water, boiler,
                                    sugar processing, reverse osmosis, waste
                                    water, dan demin plant — dengan fungsi
                                    teknis spesifik per aplikasi.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Cooling &amp; Boiler</li>
                                    <li>Sugar Processing</li>
                                    <li>Reverse Osmosis</li>
                                    <li>Demin Plant</li>
                                </ul>
                                <a
                                    className="tp-service-link"
                                    href="/produk-kimia"
                                >
                                    Lihat katalog kimia <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">03</span>
                                <span className="tp-service-icon">
                                    <Zap size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Power &amp; Diesel Rental
                                </h3>
                                <p>
                                    Penyewaan mesin diesel (PLTD) untuk
                                    kebutuhan daya industri dan infrastruktur,
                                    termasuk dukungan pemeliharaan.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Diesel engine rental</li>
                                    <li>Dukungan daya industri</li>
                                    <li>Chemicals for diesel maintenance</li>
                                </ul>
                                <a className="tp-service-link" href="/proyek">
                                    Lihat proyek PLTD <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">04</span>
                                <span className="tp-service-icon">
                                    <ShieldCheck size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Protection Systems
                                </h3>
                                <p>
                                    Aplikator spesialis untuk waterproofing,
                                    grouting, epoxy lining, concrete repair, dan
                                    flooring pada aset kritis.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Waterproofing</li>
                                    <li>Grouting</li>
                                    <li>Flooring &amp; lining</li>
                                    <li>Concrete repair</li>
                                </ul>
                                <a className="tp-service-link" href="/proteksi">
                                    Lihat sistem proteksi{' '}
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WTP two-column ===== */}
            <section className="tp-about-area section-mist pt-120 pb-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="tp-about-thumb-wrapper reveal">
                                <div className="main">
                                    <img
                                        src="/landing/wtp-facility.jpg"
                                        alt="Unit Water Treatment Plant dengan tangki stainless steel dan sistem pipa"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tp-about-wrapper">
                                <div className="tp-about-title-wrapper">
                                    <span className="tp-section-title-pre">
                                        Water treatment plant
                                    </span>
                                    <h2 className="tp-section-title">
                                        Dua tipe plant untuk beragam kondisi
                                        kerja.
                                    </h2>
                                </div>
                                <p>
                                    Water Treatment Plant berbahan steel,
                                    stainless steel, dan concrete, serta tipe
                                    mobile dan trailer untuk kebutuhan yang
                                    berpindah.
                                </p>
                                <div className="tp-about-list">
                                    <ul>
                                        <li>
                                            <CheckCircle2 size={20} /> Space
                                            saving — hemat ruang instalasi
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Rapid
                                            installation — pemasangan cepat
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Menangani
                                            air berkekeruhan tinggi
                                        </li>
                                        <li>
                                            <CheckCircle2 size={20} /> Kualitas
                                            hasil mengacu standar WHO
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Technical service & QA ===== */}
            <section className="pt-120 pb-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="tp-section-title-wrapper">
                                <span className="tp-section-title-pre">
                                    Technical service &amp; QA
                                </span>
                                <h2 className="tp-section-title">
                                    Dukungan teknis penuh, dari uji lapangan
                                    sampai laporan.
                                </h2>
                                <p className="tp-section-text">
                                    Layanan on-site dan analisis yang memastikan
                                    produk bekerja sesuai kondisi nyata
                                    fasilitas.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="tp-chip-list">
                                <span>On-site demulsifier bottle test</span>
                                <span>Paraffin inhibitor &amp; pour point</span>
                                <span>Corrosion inhibitor compatibility</span>
                                <span>Biocide kill &amp; performance test</span>
                                <span>
                                    Liquid-solid separation &amp; titration
                                </span>
                                <span>System survey &amp; line tracing</span>
                                <span>Chemical application field trial</span>
                                <span>Commissioning</span>
                                <span>Trouble-shooting</span>
                                <span>Full water analysis</span>
                                <span>Progress &amp; visit report</span>
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
                                    Belum yakin solusi mana yang sesuai?
                                </h2>
                                <p>
                                    Ceritakan kondisi fasilitas Anda — tim
                                    teknis PGL akan bantu memetakan pendekatan
                                    yang tepat.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
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
        </LandingLayout>
    );
}
