import { usePage } from '@inertiajs/react';
import { ArrowRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { isNavGroup, NAV_ITEMS, WHATSAPP_URL } from '@/lib/landing';
import LandingOffcanvas from './landing-offcanvas';

/**
 * Landing header — finbest HeaderOne port: a slim navy top bar (location + phone +
 * email) above a white main bar (logo, nav, phone block, cyan CTA pill, hamburger).
 * Frosts into a sticky bar on scroll; mobile nav opens the offcanvas drawer.
 *
 * Desktop nav groups the 9 destinations under "Produk & Solusi" / "Informasi"
 * dropdowns so the top-level row is only 4 items — the flat 9-item row overflowed
 * the 1280px header and collided with the phone block + CTA.
 */
export default function LandingHeader() {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // Which desktop dropdown is open, by group label (null = none).
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const navRef = useRef<HTMLElement | null>(null);
    const currentPath = usePage().url.split('?')[0];

    useEffect(() => {
        const onScroll = (): void => setIsSticky(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the open dropdown on Escape or on a click outside the nav — hover/click
    // both drive `openMenu`, so touch + keyboard users need an explicit dismiss path.
    useEffect(() => {
        if (openMenu === null) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setOpenMenu(null);
            }
        };
        const onPointerDown = (event: PointerEvent): void => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setOpenMenu(null);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('pointerdown', onPointerDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [openMenu]);

    return (
        <header className="tp-header-area">
            <div className="tp-header-top">
                <div className="container">
                    <div className="tp-header-top-inner">
                        <div className="tp-header-top-info">
                            <span>
                                <MapPin size={15} /> Wisma Mitra Sunter, Jakarta
                                Utara
                            </span>
                            <a href="tel:+62216514815">
                                <Phone size={15} /> +62 21 6514815
                            </a>
                        </div>
                        <div className="tp-header-top-info">
                            <a href="mailto:ptpacificgitalestari@yahoo.com">
                                <Mail size={15} />{' '}
                                ptpacificgitalestari@yahoo.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`tp-header-main ${isSticky ? 'is-sticky' : ''}`}
                data-header
            >
                <div className="container">
                    <div className="tp-header-main-inner">
                        <a
                            className="tp-header-logo"
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

                        <nav
                            className="tp-main-menu"
                            aria-label="Menu utama"
                            ref={navRef}
                        >
                            <ul>
                                {NAV_ITEMS.map((item) => {
                                    if (!isNavGroup(item)) {
                                        return (
                                            <li key={item.href}>
                                                <a
                                                    href={item.href}
                                                    aria-current={
                                                        currentPath ===
                                                        item.href
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        );
                                    }

                                    const isOpen = openMenu === item.label;
                                    const isActive = item.children.some(
                                        (child) => child.href === currentPath,
                                    );

                                    return (
                                        <li
                                            key={item.label}
                                            className={`tp-menu-has-dropdown ${isOpen ? 'is-open' : ''}`}
                                            onMouseEnter={() =>
                                                setOpenMenu(item.label)
                                            }
                                            onMouseLeave={() =>
                                                setOpenMenu(null)
                                            }
                                        >
                                            <button
                                                type="button"
                                                className="tp-submenu-toggle"
                                                aria-haspopup="true"
                                                aria-expanded={isOpen}
                                                aria-current={
                                                    isActive
                                                        ? 'page'
                                                        : undefined
                                                }
                                                onClick={() =>
                                                    setOpenMenu((current) =>
                                                        current === item.label
                                                            ? null
                                                            : item.label,
                                                    )
                                                }
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    size={15}
                                                    aria-hidden="true"
                                                />
                                            </button>
                                            <ul className="tp-submenu">
                                                {item.children.map((child) => (
                                                    <li key={child.href}>
                                                        <a
                                                            href={child.href}
                                                            aria-current={
                                                                currentPath ===
                                                                child.href
                                                                    ? 'page'
                                                                    : undefined
                                                            }
                                                        >
                                                            {child.label}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="tp-header-right">
                            <div className="tp-header-contact">
                                <span className="tp-header-contact-icon">
                                    <Phone size={19} />
                                </span>
                                <div className="tp-header-contact-content">
                                    <p>Konsultasi:</p>
                                    <a href="tel:+62216514815">
                                        +62 21 6514815
                                    </a>
                                </div>
                            </div>
                            <a
                                className="tp-btn tp-header-cta"
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener"
                            >
                                Konsultasi Teknis <ArrowRight size={17} />
                            </a>
                            <button
                                className="tp-hamburger"
                                type="button"
                                onClick={() => setMenuOpen(true)}
                                aria-label="Buka menu"
                                aria-controls="mobile-menu"
                                aria-expanded={menuOpen}
                            >
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LandingOffcanvas
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                currentPath={currentPath}
            />
        </header>
    );
}
