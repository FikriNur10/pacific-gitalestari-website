/**
 * Landing site footer — brand blurb, navigation, head office + contact.
 *
 * NOTE (from prototype): the @yahoo.com email and the WhatsApp number are business
 * data pending client confirmation; kept verbatim until approved.
 */
export default function LandingFooter() {
    return (
        <footer className="site-footer">
            <div className="footer-grid container">
                <div>
                    <a className="brand brand-footer" href="/">
                        <img
                            className="brand-mark"
                            src="/landing/logo/logo-pgl.png"
                            alt=""
                            aria-hidden="true"
                            width={40}
                            height={40}
                        />
                        <span>
                            <strong>Pacific</strong>
                            <small>Gitalestari</small>
                        </span>
                    </a>
                    <p>
                        Solusi industri untuk air, energi, dan perlindungan
                        aset.
                    </p>
                </div>
                <div>
                    <p className="footer-label">Navigasi</p>
                    <a href="/tentang">Tentang Kami</a>
                    <a href="/produk-kimia">Produk</a>
                    <a href="/solusi">Solusi Industri</a>
                    <a href="/proyek">Portofolio</a>
                    <a href="/berita">Berita &amp; Artikel</a>
                    <a href="/galeri">Galeri</a>
                    <a href="/legalitas">Legalitas</a>
                    <a href="/download">Unduhan</a>
                    <a href="/faq">FAQ</a>
                    <a href="/kontak">Kontak</a>
                </div>
                <div>
                    <p className="footer-label">Kantor pusat &amp; kontak</p>
                    <address>
                        Perkantoran Wisma Mitra Sunter Lt. 15-06
                        <br />
                        Jl. Boulevard Mitra Sunter Blok C2
                        <br />
                        Jakarta Utara 14350
                    </address>
                    <a href="tel:+62216514815">Telp. +62 21 6514815</a>
                    <a href="mailto:ptpacificgitalestari@yahoo.com">
                        ptpacificgitalestari@yahoo.com
                    </a>
                </div>
            </div>
            <div className="footer-bottom container">
                <span>© 2026 PT. Pacific Gitalestari</span>
                <span>
                    Mitra kimia &amp; solusi industri untuk fasilitas Anda
                </span>
            </div>
        </footer>
    );
}
