import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/landing';

/**
 * Landing site header — transparent over the hero, frosts into a sticky glass bar
 * once scrolled (`is-sticky`), with a mobile hamburger menu.
 *
 * Sticky + menu are React state here (not the imperative effects hook) because they
 * drive className/aria on this component's own elements — the natural React path.
 * The space in the class templates lives OUTSIDE the ternary on purpose: a leading
 * space inside the conditional string is easy to lose to a formatter and would fuse
 * `site-header`+`is-sticky` into one dead class.
 */
export default function LandingHeader() {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const currentPath = usePage().url.split('?')[0];

    useEffect(() => {
        const onScroll = (): void => setIsSticky(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`site-header ${isSticky ? 'is-sticky' : ''}`}
            data-header
        >
            <div className="nav-wrap container">
                <a
                    className="brand"
                    href="/"
                    aria-label="Pacific Gitalestari - Beranda"
                >
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
                <button
                    className="menu-toggle"
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="site-nav"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                    <span />
                    <span className="sr-only">Buka menu</span>
                </button>
                <nav
                    id="site-nav"
                    className={`site-nav ${menuOpen ? 'is-open' : ''}`}
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={
                                currentPath === link.href ? 'page' : undefined
                            }
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        className="button button-small"
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener"
                        onClick={() => setMenuOpen(false)}
                    >
                        Konsultasi Teknis <span aria-hidden="true">↗</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}
