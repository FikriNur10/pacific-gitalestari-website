import { Head } from '@inertiajs/react';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import LandingFooter from '@/components/landing/landing-footer';
import LandingHeader from '@/components/landing/landing-header';
import WhatsappFab from '@/components/landing/whatsapp-fab';
import { useLandingEffects } from '@/hooks/use-landing-effects';
import '../../css/landing.css';

interface LandingLayoutProps {
    /** Page title, formatted by the global Inertia title callback. */
    title?: string;
    /** Optional <meta>/<link> overrides merged into the shared marketing head. */
    head?: ReactNode;
    children: ReactNode;
}

/**
 * Shared chrome for every public marketing page (Tentang, Solusi, Proyek, …).
 *
 * Owns the scoped `.pgl` root, the brand fonts + favicon, header/footer/WhatsApp FAB,
 * and the interaction hook. Pages render only their in-`<main>` sections. The
 * homepage (`landing.tsx`) is intentionally self-contained and does NOT use this
 * layout — it predates it and already works; kept as-is to avoid churn.
 */
export default function LandingLayout({
    title,
    head,
    children,
}: LandingLayoutProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    useLandingEffects(rootRef);

    return (
        <>
            <Head title={title}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/landing/logo/favicon-32.png"
                />
                <link
                    rel="apple-touch-icon"
                    href="/landing/logo/apple-touch-icon.png"
                />
                {head}
            </Head>

            <div className="pgl" ref={rootRef}>
                <a className="skip-link" href="#main">
                    Lewati ke konten
                </a>

                <LandingHeader />

                <main id="main">{children}</main>

                <LandingFooter />
                <WhatsappFab />
            </div>
        </>
    );
}
