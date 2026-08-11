import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

/**
 * Solusi (Solutions) — ported from the prototype's solusi.html.
 * Renders only the in-<main> sections; chrome comes from LandingLayout.
 */
export default function Solusi() {
    const heroBg = useHeroBackground('solusi');

    return (
        <LandingLayout title="Solusi | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Empat pilar solusi PT. Pacific Gitalestari: water treatment & WWTP, bahan kimia industri, sewa diesel, dan sistem perlindungan teknis."
                />
            </Head>

            <section className="page-hero">
                {/* Foto full-bleed page-hero. SWAP: ganti dengan foto proyek asli approved. */}
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Interior fasilitas water treatment dengan tangki dan pipa"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Solusi
                    </nav>
                    <p className="eyebrow">Solusi</p>
                    <h1>Empat pilar solusi, satu mitra teknis.</h1>
                    <p>
                        Dari perancangan water treatment plant hingga bahan
                        kimia proses, dukungan daya, dan sistem perlindungan
                        aset — setiap solusi dimulai dari kondisi lapangan dan
                        target kinerja fasilitas Anda.
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
                                    <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
                                </svg>
                            </span>
                            <span className="card-number">01</span>
                            <h3>Water Treatment &amp; WWTP</h3>
                            <p>
                                Perancangan, pengadaan, instalasi, operasi, dan
                                pemeliharaan sistem pengolahan air bersih dan
                                air limbah untuk kebutuhan industri.
                            </p>
                            <ul className="spec-list">
                                <li>Water Treatment Plant</li>
                                <li>Waste Water Treatment</li>
                                <li>O&amp;M sistem</li>
                                <li>Water analysis</li>
                            </ul>
                            <a className="text-link" href="/kontak#form">
                                Konsultasi solusi air{' '}
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
                                    <path d="M9 3h6" />
                                    <path d="M10 3v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3" />
                                    <path d="M7.5 15h9" />
                                </svg>
                            </span>
                            <span className="card-number">02</span>
                            <h3>Industrial Chemicals</h3>
                            <p>
                                Bahan kimia untuk cooling water, boiler, sugar
                                processing, reverse osmosis, waste water, dan
                                demin plant — dengan fungsi teknis spesifik per
                                aplikasi.
                            </p>
                            <ul className="spec-list">
                                <li>Cooling &amp; Boiler</li>
                                <li>Sugar Processing</li>
                                <li>Reverse Osmosis</li>
                                <li>Demin Plant</li>
                            </ul>
                            <a className="text-link" href="/produk-kimia">
                                Lihat katalog kimia{' '}
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
                                    <path d="M13 2 4 14h7l-2 8 9-12h-7z" />
                                </svg>
                            </span>
                            <span className="card-number">03</span>
                            <h3>Power &amp; Diesel Rental</h3>
                            <p>
                                Penyewaan mesin diesel (PLTD) untuk kebutuhan
                                daya industri dan infrastruktur, termasuk
                                dukungan pemeliharaan.
                            </p>
                            <ul className="spec-list">
                                <li>Diesel engine rental</li>
                                <li>Dukungan daya industri</li>
                                <li>Chemicals for diesel maintenance</li>
                            </ul>
                            <a className="text-link" href="/proyek">
                                Lihat proyek PLTD{' '}
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
                                    <path d="M12 3 5 6v5c0 4 3 8 7 10 4-2 7-6 7-10V6z" />
                                </svg>
                            </span>
                            <span className="card-number">04</span>
                            <h3>Protection Systems</h3>
                            <p>
                                Aplikator spesialis untuk waterproofing,
                                grouting, epoxy lining, concrete repair, dan
                                flooring pada aset kritis.
                            </p>
                            <ul className="spec-list">
                                <li>Waterproofing</li>
                                <li>Grouting</li>
                                <li>Flooring &amp; lining</li>
                                <li>Concrete repair</li>
                            </ul>
                            <a className="text-link" href="/proteksi">
                                Lihat sistem proteksi{' '}
                                <span aria-hidden="true">→</span>
                            </a>
                        </article>
                    </div>
                </div>
            </section>

            <section className="section section-mist plant-section">
                <div className="plant-layout container">
                    <div className="plant-image">
                        <img
                            src="/landing/wtp-facility.jpg"
                            alt="Unit Water Treatment Plant dengan tangki stainless steel dan sistem pipa"
                        />
                        <span>WTP</span>
                        <b>STEEL · STAINLESS · CONCRETE · MOBILE · TRAILER</b>
                    </div>
                    <div>
                        <p className="eyebrow">Water treatment plant</p>
                        <h2>Dua tipe plant untuk beragam kondisi kerja.</h2>
                        <p>
                            Water Treatment Plant berbahan steel, stainless
                            steel, dan concrete, serta tipe mobile dan trailer
                            untuk kebutuhan yang berpindah.
                        </p>
                        <ul className="check-list">
                            <li>Space saving — hemat ruang instalasi</li>
                            <li>Rapid installation — pemasangan cepat</li>
                            <li>Mampu menangani air dengan kekeruhan tinggi</li>
                            <li>Kualitas air hasil mengacu pada standar WHO</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                Technical service &amp; QA
                            </p>
                            <h2>
                                Dukungan teknis penuh, dari uji lapangan sampai
                                laporan.
                            </h2>
                        </div>
                        <p>
                            Layanan on-site dan analisis yang memastikan produk
                            bekerja sesuai kondisi nyata fasilitas.
                        </p>
                    </div>
                    <div className="service-points">
                        <span>On-site demulsifier bottle test</span>
                        <span>Paraffin inhibitor &amp; pour point test</span>
                        <span>Corrosion inhibitor compatibility test</span>
                        <span>Biocide kill study &amp; performance test</span>
                        <span>Liquid-solid separation &amp; titration</span>
                        <span>System survey &amp; line tracing</span>
                        <span>Chemical application field trial</span>
                        <span>Commissioning</span>
                        <span>Trouble-shooting</span>
                        <span>Full water analysis</span>
                        <span>Progress &amp; visit report</span>
                    </div>
                </div>
            </section>

            <section className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Mulai dari kebutuhan Anda
                        </p>
                        <h2>Belum yakin solusi mana yang sesuai?</h2>
                        <p>
                            Ceritakan kondisi fasilitas Anda — tim teknis PGL
                            akan bantu memetakan pendekatan yang tepat.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Mulai konsultasi teknis{' '}
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
