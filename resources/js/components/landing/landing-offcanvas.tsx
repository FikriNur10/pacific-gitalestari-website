import { ArrowRight, ChevronDown, Mail, MapPin, Phone, X } from 'lucide-react';
import { isNavGroup, NAV_ITEMS, WHATSAPP_URL } from '@/lib/landing';

interface LandingOffcanvasProps {
    open: boolean;
    onClose: () => void;
    currentPath: string;
}

/**
 * Mobile slide-in drawer for the finbest header (replaces the old dropdown nav).
 * Open state is owned by LandingHeader; this renders the panel + click-away overlay.
 */
export default function LandingOffcanvas({
    open,
    onClose,
    currentPath,
}: LandingOffcanvasProps) {
    return (
        <>
            <div
                className={`tp-offcanvas ${open ? 'is-open' : ''}`}
                id="mobile-menu"
                aria-hidden={!open}
            >
                <div className="tp-offcanvas-top">
                    <a
                        className="tp-header-logo"
                        href="/"
                        onClick={onClose}
                        aria-label="Pacific Gitalestari - Beranda"
                    >
                        <img
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
                        className="tp-offcanvas-close"
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="tp-offcanvas-nav" aria-label="Menu utama">
                    {NAV_ITEMS.map((item) => {
                        if (!isNavGroup(item)) {
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    aria-current={
                                        currentPath === item.href
                                            ? 'page'
                                            : undefined
                                    }
                                    onClick={onClose}
                                >
                                    {item.label}
                                </a>
                            );
                        }

                        // Open the group that holds the current page so the active
                        // link is visible without an extra tap.
                        const containsCurrent = item.children.some(
                            (child) => child.href === currentPath,
                        );

                        return (
                            <details
                                key={item.label}
                                className="tp-offcanvas-group"
                                open={containsCurrent}
                            >
                                <summary>
                                    {item.label}
                                    <ChevronDown size={16} aria-hidden="true" />
                                </summary>
                                <div className="tp-offcanvas-subnav">
                                    {item.children.map((child) => (
                                        <a
                                            key={child.href}
                                            href={child.href}
                                            aria-current={
                                                currentPath === child.href
                                                    ? 'page'
                                                    : undefined
                                            }
                                            onClick={onClose}
                                        >
                                            {child.label}
                                        </a>
                                    ))}
                                </div>
                            </details>
                        );
                    })}
                </nav>

                <a
                    className="tp-btn"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener"
                    onClick={onClose}
                >
                    Konsultasi Teknis <ArrowRight size={17} />
                </a>

                <div className="tp-offcanvas-contact">
                    <p>
                        <MapPin size={15} /> Wisma Mitra Sunter, Jakarta Utara
                    </p>
                    <p>
                        <Phone size={15} />{' '}
                        <a href="tel:+62216514815">+62 21 6514815</a>
                    </p>
                    <p>
                        <Mail size={15} />{' '}
                        <a href="mailto:ptpacificgitalestari@yahoo.com">
                            ptpacificgitalestari@yahoo.com
                        </a>
                    </p>
                </div>
            </div>

            <div
                className={`body-overlay ${open ? 'is-open' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />
        </>
    );
}
