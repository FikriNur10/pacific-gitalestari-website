import { ArrowRight, Mail, MapPin, Phone, X } from 'lucide-react';
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/landing';

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
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            aria-current={
                                currentPath === link.href ? 'page' : undefined
                            }
                            onClick={onClose}
                        >
                            {link.label}
                        </a>
                    ))}
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
