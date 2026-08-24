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

/** A top-level entry that opens a submenu instead of navigating itself. */
export interface NavGroup {
    label: string;
    children: NavLink[];
}

export type NavItem = NavLink | NavGroup;

/** Narrow a NavItem to a group (has children) vs a plain leaf link. */
export function isNavGroup(item: NavItem): item is NavGroup {
    return 'children' in item;
}

// Primary navigation. Labels (Solusi Industri, Portofolio, Berita & Artikel)
// mirror the reference competitor menu so the site reads as at least as complete
// on a glance — the tender is being judged on menu breadth. All 9 destinations are
// preserved, but grouped under "Produk & Solusi" / "Informasi" dropdowns so the
// top-level row stays at 4 items and no longer overflows the 1280px header.
// Every leaf resolves to a real built page/route; group labels are not pages.
export const NAV_ITEMS: NavItem[] = [
    { href: '/tentang', label: 'Tentang Kami' },
    {
        label: 'Produk & Solusi',
        children: [
            { href: '/produk-kimia', label: 'Produk' },
            { href: '/solusi', label: 'Solusi Industri' },
            { href: '/proyek', label: 'Portofolio' },
        ],
    },
    {
        label: 'Informasi',
        children: [
            { href: '/berita', label: 'Berita & Artikel' },
            { href: '/galeri', label: 'Galeri' },
            { href: '/download', label: 'Unduhan' },
            { href: '/faq', label: 'FAQ' },
        ],
    },
    { href: '/kontak', label: 'Kontak' },
];
