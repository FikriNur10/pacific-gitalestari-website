import { Head } from '@inertiajs/react';
import { Anchor, ArrowRight, Layers, Umbrella } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

/**
 * Sistem Proteksi (Protection systems) — finbest services page port. Breadcrumb
 * banner + finbest service-card grid (three catalogs, icon + product specs +
 * link), a technical-data two-column block, and a CTA band. Content preserved.
 */
export default function Proteksi() {
    const heroBg = useHeroBackground('proteksi');

    return (
        <LandingLayout
            title="Sistem Proteksi | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Sistem Proteksi', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Sistem proteksi PT. Pacific Gitalestari: waterproofing, grouting & anchor, serta flooring & lining untuk aset dan struktur beton."
                />
            </Head>

            {/* ===== Service grid ===== */}
            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">
                            Katalog · Sistem Proteksi
                        </span>
                        <h1 className="tp-section-title">
                            Proteksi teknis untuk beton, struktur, dan lantai
                            industri.
                        </h1>
                        <p className="tp-section-text">
                            Sebagai aplikator spesialis, PGL menangani
                            waterproofing, grouting, serta flooring dan lining
                            dengan produk teknis yang teruji di lapangan.
                        </p>
                    </div>
                    <div className="row tp-card-row">
                        <div className="col-lg-4 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">01</span>
                                <span className="tp-service-icon">
                                    <Umbrella size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Waterproofing System
                                </h3>
                                <p>
                                    Membran dan pelapis kedap air untuk atap,
                                    basement, ground tank, dan struktur beton.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Proofex Torchseal</li>
                                    <li>Proofex GPE</li>
                                    <li>Nitoproof 600</li>
                                    <li>Brushbond Flex</li>
                                    <li>Conplast X421M / WP421</li>
                                </ul>
                                <a
                                    className="tp-service-link"
                                    href="/kontak#form"
                                >
                                    Konsultasi waterproofing{' '}
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">02</span>
                                <span className="tp-service-icon">
                                    <Anchor size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Grouting &amp; Anchor
                                </h3>
                                <p>
                                    Grout non-shrink hingga epoxy kekuatan
                                    tinggi untuk base plate, mesin, dan
                                    anchoring.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Conbextra GP</li>
                                    <li>Conbextra EP10TG</li>
                                    <li>Conbextra EPH</li>
                                    <li>Lokfix</li>
                                </ul>
                                <a
                                    className="tp-service-link"
                                    href="/kontak#form"
                                >
                                    Konsultasi grouting <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="tp-service-item reveal mb-30">
                                <span className="tp-service-number">03</span>
                                <span className="tp-service-icon">
                                    <Layers size={32} />
                                </span>
                                <h3 className="tp-service-title">
                                    Flooring &amp; Lining
                                </h3>
                                <p>
                                    Pelapis lantai epoxy dan lining pelindung
                                    untuk area industri, WWTP, dan tangki air.
                                </p>
                                <ul className="tp-service-specs">
                                    <li>Nitoflor FC150</li>
                                    <li>Nitoflor Hardtop</li>
                                    <li>Nitocote EN901</li>
                                    <li>Nitocote EP405</li>
                                </ul>
                                <a
                                    className="tp-service-link"
                                    href="/kontak#form"
                                >
                                    Konsultasi flooring &amp; lining{' '}
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Technical data ===== */}
            <section className="section-mist pt-120 pb-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7">
                            <div className="tp-section-title-wrapper">
                                <span className="tp-section-title-pre">
                                    Data teknis
                                </span>
                                <h2 className="tp-section-title">
                                    Dosis, yield, dan packaging tersedia per
                                    produk.
                                </h2>
                                <p className="tp-section-text">
                                    Setiap produk memiliki rekomendasi dosis
                                    pemakaian, yield, dan ukuran kemasan (mis.
                                    liter/m², kg/set). Detail lengkap dikirimkan
                                    sesuai aplikasi dan luas area proyek Anda.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-5 text-lg-end">
                            <a className="tp-btn" href="/kontak#form">
                                Minta detail dosis &amp; packaging{' '}
                                <ArrowRight size={17} />
                            </a>
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
                                    Ada masalah beton, kebocoran, atau lantai
                                    industri?
                                </h2>
                                <p>
                                    Ceritakan jenis kerusakan dan kondisi area —
                                    tim aplikator PGL akan merekomendasikan
                                    sistem yang tepat.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
                                    >
                                        Konsultasikan proteksi{' '}
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
