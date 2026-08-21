import { ChevronRight } from 'lucide-react';

interface LandingBreadcrumbProps {
    /** Page title shown as the banner heading + last crumb. */
    title: string;
    /** Optional background photo (else the finbest bg-shape texture is used). */
    image?: string;
}

/**
 * finbest breadcrumb banner — the navy inner-page hero used on every sub-page
 * (title left, Home › {title} trail right). Optional `image` overlays a page
 * photo behind the navy scrim (fed from `useHeroBackground`).
 */
export default function LandingBreadcrumb({
    title,
    image,
}: LandingBreadcrumbProps) {
    return (
        <section className="breadcrumb-area">
            {image ? (
                <img
                    className="breadcrumb-bg-photo"
                    src={image}
                    alt=""
                    aria-hidden="true"
                />
            ) : null}
            <div
                className="breadcrumb-bg"
                style={{
                    backgroundImage:
                        'url(/landing/finbest/breadcrumb-bg.png)',
                }}
                aria-hidden="true"
            />
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <h1 className="breadcrumb-title">{title}</h1>
                    </div>
                    <div className="col-md-5">
                        <nav
                            className="breadcrumb-list justify-content-lg-end"
                            aria-label="Breadcrumb"
                        >
                            <a href="/">Beranda</a>
                            <ChevronRight size={15} aria-hidden="true" />
                            <span aria-current="page">{title}</span>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}
