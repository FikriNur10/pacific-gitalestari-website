import { usePage } from '@inertiajs/react';
import { ArrowRight, Mail, MapPin, Menu, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/landing';
import LandingOffcanvas from './landing-offcanvas';

/**
 * Landing header — finbest HeaderOne port: a slim navy top bar (location + phone +
 * email) above a white main bar (logo, nav, phone block, cyan CTA pill, hamburger).
 * Frosts into a sticky bar on scroll; mobile nav opens the offcanvas drawer.
 */
export default function LandingHeader() {
    const [isSticky, setIsSticky] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const currentPath = usePage().url.split('?')[0];

    useEffect(() => {
        const onScroll = (): void => setIsSticky(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
                                <Mail size={15} /> ptpacificgitalestari@yahoo.com
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

                        <nav className="tp-main-menu" aria-label="Menu utama">
                            <ul>
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            aria-current={
                                                currentPath === link.href
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
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
