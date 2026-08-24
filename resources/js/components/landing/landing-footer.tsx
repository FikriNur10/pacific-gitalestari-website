import { Mail, MapPin, Phone } from 'lucide-react';

/**
 * Landing footer — finbest FooterOne port: navy field with a decorative bg shape
 * and four widget columns (brand blurb, navigation, resources, contact) over a
 * copyright bar. Business data (address, @yahoo email, phone) kept verbatim from
 * the prototype until the client confirms replacements.
 */
export default function LandingFooter() {
    return (
        <footer className="tp-footer-area">
            <img
                className="tp-footer-bg-shape"
                src="/landing/finbest/footer-bg-shape.png"
                alt=""
                aria-hidden="true"
            />
            <div className="container">
                <div className="tp-footer-main">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="tp-footer-widget">
                                <a
                                    className="tp-footer-logo"
                                    href="/"
                                    aria-label="Pacific Gitalestari - Beranda"
                                >
                                    <img
                                        src="/landing/logo/logo-pgl.png"
                                        alt=""
                                        aria-hidden="true"
                                        width={44}
                                        height={44}
                                    />
                                    <span>
                                        <strong>Pacific</strong>
                                        <small>Gitalestari</small>
                                    </span>
                                </a>
                                <p>
                                    Solusi industri terintegrasi untuk air,
                                    energi, dan perlindungan aset — pengadaan,
                                    instalasi, operasi, dan pemeliharaan.
                                </p>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-4 col-md-6">
                            <div className="tp-footer-widget">
                                <h3 className="tp-footer-widget-title">
                                    Navigasi
                                </h3>
                                <ul>
                                    <li>
                                        <a href="/tentang">Tentang Kami</a>
                                    </li>
                                    <li>
                                        <a href="/produk-kimia">Produk</a>
                                    </li>
                                    <li>
                                        <a href="/solusi">Solusi Industri</a>
                                    </li>
                                    <li>
                                        <a href="/proyek">Portofolio</a>
                                    </li>
                                    <li>
                                        <a href="/berita">Berita &amp; Artikel</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="tp-footer-widget">
                                <h3 className="tp-footer-widget-title">
                                    Sumber Daya
                                </h3>
                                <ul>
                                    <li>
                                        <a href="/galeri">Galeri</a>
                                    </li>
                                    <li>
                                        <a href="/legalitas">Legalitas</a>
                                    </li>
                                    <li>
                                        <a href="/download">Unduhan</a>
                                    </li>
                                    <li>
                                        <a href="/faq">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="/kontak">Kontak</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="tp-footer-widget">
                                <h3 className="tp-footer-widget-title">
                                    Kantor Pusat
                                </h3>
                                <div className="tp-footer-contact-item">
                                    <MapPin size={18} />
                                    <span>
                                        Perkantoran Wisma Mitra Sunter Lt. 15-06,
                                        Jl. Boulevard Mitra Sunter Blok C2,
                                        Jakarta Utara 14350
                                    </span>
                                </div>
                                <div className="tp-footer-contact-item">
                                    <Phone size={18} />
                                    <a href="tel:+62216514815">
                                        +62 21 6514815
                                    </a>
                                </div>
                                <div className="tp-footer-contact-item">
                                    <Mail size={18} />
                                    <a href="mailto:ptpacificgitalestari@yahoo.com">
                                        ptpacificgitalestari@yahoo.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tp-footer-copyright">
                    <div className="row">
                        <div className="col-lg-6">
                            <span>© 2026 PT. Pacific Gitalestari</span>
                        </div>
                        <div className="col-lg-6 text-lg-end">
                            <span>
                                Mitra kimia &amp; solusi industri untuk fasilitas
                                Anda
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
