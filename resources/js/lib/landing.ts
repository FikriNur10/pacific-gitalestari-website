/**
 * Shared constants for the Pacific Gitalestari landing page.
 *
 * The WhatsApp number/message are centralised here (mirrors the prototype's
 * script.js `WA_NUMBER`) so the floating FAB and every "konsultasi" CTA share one
 * source — change the number in a single place before launch.
 */

// TODO: replace with the approved business WhatsApp number (country code, no "+"/spaces).
const WHATSAPP_NUMBER = '6280000000000'; // placeholder — MUST be replaced before launch
const WHATSAPP_MESSAGE =
    'Halo PGL, saya ingin konsultasi teknis untuk kebutuhan fasilitas kami.';

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
)}`;

export interface NavLink {
    href: string;
    label: string;
}

// Primary navigation. Order + enterprise labels (Solusi Industri, Portofolio,
// Berita & Artikel) mirror the reference competitor menu so the site reads as at
// least as complete on a glance — the tender is being judged on menu breadth.
// Every entry resolves to a real built page/route.
export const NAV_LINKS: NavLink[] = [
    { href: '/tentang', label: 'Tentang Kami' },
    { href: '/produk-kimia', label: 'Produk' },
    { href: '/solusi', label: 'Solusi Industri' },
    { href: '/proyek', label: 'Portofolio' },
    { href: '/berita', label: 'Berita & Artikel' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/download', label: 'Unduhan' },
    { href: '/faq', label: 'FAQ' },
    { href: '/kontak', label: 'Kontak' },
];
