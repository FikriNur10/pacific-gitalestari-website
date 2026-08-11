import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

/**
 * Tentang Kami (About) — ported from the prototype's tentang.html.
 * Renders only the in-<main> sections; chrome comes from LandingLayout.
 */
export default function Tentang() {
    const heroBg = useHeroBackground('tentang');

    return (
        <LandingLayout title="Tentang Kami | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Profil PT. Pacific Gitalestari - lebih dari 18 tahun di bidang water treatment, bahan kimia industri, penyewaan diesel, dan sistem perlindungan teknis."
                />
            </Head>

            <section className="page-hero">
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Fasilitas pengolahan air modern PGL"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Tentang Kami
                    </nav>
                    <p className="eyebrow">Tentang Kami</p>
                    <h1>
                        Mitra engineering yang tumbuh bersama industri selama
                        lebih dari 18 tahun.
                    </h1>
                    <p>
                        PT. Pacific Gitalestari melayani kebutuhan pengolahan
                        air, bahan kimia industri, dukungan daya, dan sistem
                        perlindungan teknis untuk mitra B2B dan sektor publik di
                        pasar domestik.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="two-column container">
                    <p className="eyebrow">Profil perusahaan</p>
                    <div>
                        <h2>
                            Kontraktor umum dan mitra teknis untuk fasilitas
                            industri.
                        </h2>
                        <p>
                            Dengan pengalaman lebih dari 18 tahun, PGL
                            menjalankan proyek general contracting, engineering,
                            pengadaan dan instalasi, serta layanan pengolahan
                            air secara menyeluruh — dan terus menyempurnakan
                            sistemnya seiring praktik terbaik industri.
                        </p>
                        <ul className="check-list">
                            <li>Water Treatment Business &amp; Services</li>
                            <li>
                                Pengadaan &amp; instalasi Water Treatment Plant,
                                piping chemicals, dan equipment
                            </li>
                            <li>
                                Operasi &amp; pemeliharaan sistem air dan air
                                limbah
                            </li>
                            <li>Pengadaan Sugar Processing Chemicals</li>
                            <li>Diesel Engine Rental</li>
                            <li>
                                Specialist applicator: concrete repair,
                                waterproofing, flooring, sealant, epoxy lining
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section section-mist">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Visi &amp; Misi</p>
                            <h2>Arah jangka panjang perusahaan.</h2>
                        </div>
                        <p>
                            Berorientasi keluar untuk pasar domestik di bidang
                            energi, kelistrikan, pengolahan gula, dan air.
                        </p>
                    </div>
                    <div className="vm-grid">
                        <div className="vm-quote">
                            <p className="eyebrow">Visi</p>
                            <blockquote>
                                Menjadi perusahaan nasional terkemuka di bidang
                                energi, kelistrikan, pengolahan gula, dan
                                pengelolaan air.
                            </blockquote>
                        </div>
                        <div className="vm-quote">
                            <p className="eyebrow">Misi</p>
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

            <section className="section">
                <div className="two-column container">
                    <p className="eyebrow">R&amp;D &amp; Quality Assurance</p>
                    <div>
                        <h2>
                            Pengujian yang menopang keandalan setiap solusi.
                        </h2>
                        <p>
                            Laboratorium internal PGL didukung instrumen
                            pengujian, dilengkapi kerja sama dengan laboratorium
                            eksternal untuk pengujian lanjutan.
                        </p>
                        <h3>Instrumen laboratorium internal</h3>
                        <div className="service-points">
                            <span>pH meter</span>
                            <span>Viscosity meter</span>
                            <span>Setaflash point</span>
                            <span>Picnometer &amp; hygrometer</span>
                            <span>Color</span>
                            <span>Laboratory glass reactor</span>
                        </div>
                        <h3>Laboratorium eksternal</h3>
                        <div className="service-points">
                            <span>Corrosion RCE &amp; stirred autoclave</span>
                            <span>Mud laboratory</span>
                            <span>Stimulation laboratory</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-mist">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">Budaya kerja</p>
                            <h2>
                                Empat prinsip yang menjaga mutu di lapangan.
                            </h2>
                        </div>
                        <p>
                            Standar kerja PGL bertumpu pada empat nilai yang
                            dijaga di setiap proyek.
                        </p>
                    </div>
                    <div className="info-grid">
                        <div className="info-card reveal">
                            <h4>Kebersihan</h4>
                            <p>
                                Area kerja dan proses yang tertata untuk hasil
                                yang konsisten dan aman.
                            </p>
                        </div>
                        <div className="info-card reveal">
                            <h4>Ketertiban</h4>
                            <p>
                                Prosedur dan dokumentasi yang rapi di setiap
                                tahap pekerjaan.
                            </p>
                        </div>
                        <div className="info-card reveal">
                            <h4>Kelestarian</h4>
                            <p>
                                Pengelolaan air dan limbah yang bertanggung
                                jawab terhadap lingkungan.
                            </p>
                        </div>
                        <div className="info-card reveal">
                            <h4>Kedisiplinan</h4>
                            <p>
                                Komitmen pada jadwal, mutu, dan standar teknis
                                yang disepakati.
                            </p>
                        </div>
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
                            Ingin tahu bagaimana PGL bisa membantu fasilitas
                            Anda?
                        </h2>
                        <p>
                            Tim kami siap mendiskusikan kebutuhan teknis dan
                            langkah berikutnya.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak">
                            Hubungi tim PGL <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
