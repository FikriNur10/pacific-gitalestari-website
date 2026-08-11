import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useHeroBackground } from '@/lib/hero-background';

type LegalDocument = {
    id: number;
    title: string;
    category: string | null;
    issuer: string | null;
    documentNumber: string | null;
    issuedAt: string | null;
    expiresAt: string | null;
    fileUrl: string | null;
    imageUrl: string | null;
};

type PageProps = {
    documents: LegalDocument[];
};

/**
 * Legalitas & Sertifikasi — CMS-backed credibility page for tenders. Documents are
 * grouped by category (Legalitas, Sertifikasi, …) preserving the admin sort order.
 */
export default function Legalitas({ documents }: PageProps) {
    const heroBg = useHeroBackground('legalitas');

    // Preserve first-seen category order (controller already sorts by sort_order).
    const categories = documents.reduce<string[]>((acc, doc) => {
        const key = doc.category ?? 'Lainnya';

        if (!acc.includes(key)) {
            acc.push(key);
        }

        return acc;
    }, []);

    return (
        <LandingLayout title="Legalitas & Sertifikasi | PT. Pacific Gitalestari">
            <Head>
                <meta
                    name="description"
                    content="Dokumen legalitas dan sertifikasi PT. Pacific Gitalestari — izin usaha, akta, serta sertifikasi ISO & K3 sebagai jaminan kualifikasi untuk tender."
                />
            </Head>

            <section className="page-hero">
                <img
                    className="hero-bg"
                    src={heroBg}
                    alt="Instalasi perpipaan industri"
                />
                <div className="hero-scrim" aria-hidden="true" />
                <div className="hero-orbs" aria-hidden="true">
                    <div className="hero-orb hero-orb-1" />
                    <div className="hero-orb hero-orb-2" />
                </div>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Beranda</a>
                        <span aria-hidden="true">/</span>Legalitas
                    </nav>
                    <p className="eyebrow">Legalitas &amp; Sertifikasi</p>
                    <h1>Kualifikasi legal yang siap diverifikasi.</h1>
                    <p>
                        Kelengkapan izin usaha, badan hukum, dan sertifikasi
                        sistem manajemen sebagai jaminan kredibilitas untuk
                        proses tender dan pengadaan.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {documents.length === 0 ? (
                        <p className="pending-note">
                            Dokumen legalitas akan ditampilkan setelah diunggah.
                        </p>
                    ) : (
                        categories.map((category) => (
                            <div key={category} className="legal-group">
                                <div className="section-heading">
                                    <div>
                                        <p className="eyebrow">{category}</p>
                                        <h2>{category}</h2>
                                    </div>
                                </div>
                                <div className="legal-grid">
                                    {documents
                                        .filter(
                                            (doc) =>
                                                (doc.category ?? 'Lainnya') ===
                                                category,
                                        )
                                        .map((doc) => (
                                            <article
                                                key={doc.id}
                                                className="legal-card reveal"
                                            >
                                                {doc.imageUrl ? (
                                                    <div className="legal-thumb">
                                                        <img
                                                            src={doc.imageUrl}
                                                            alt={doc.title}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="legal-thumb legal-thumb-empty"
                                                        aria-hidden="true"
                                                    >
                                                        <span>PGL</span>
                                                    </div>
                                                )}
                                                <div className="legal-body">
                                                    <strong>{doc.title}</strong>
                                                    {doc.issuer && (
                                                        <small>
                                                            {doc.issuer}
                                                        </small>
                                                    )}
                                                    <dl className="legal-meta">
                                                        {doc.documentNumber && (
                                                            <div>
                                                                <dt>Nomor</dt>
                                                                <dd>
                                                                    {
                                                                        doc.documentNumber
                                                                    }
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {doc.issuedAt && (
                                                            <div>
                                                                <dt>Terbit</dt>
                                                                <dd>
                                                                    {
                                                                        doc.issuedAt
                                                                    }
                                                                </dd>
                                                            </div>
                                                        )}
                                                        {doc.expiresAt && (
                                                            <div>
                                                                <dt>
                                                                    Berlaku s/d
                                                                </dt>
                                                                <dd>
                                                                    {
                                                                        doc.expiresAt
                                                                    }
                                                                </dd>
                                                            </div>
                                                        )}
                                                    </dl>
                                                    {doc.fileUrl && (
                                                        <a
                                                            className="legal-download"
                                                            href={doc.fileUrl}
                                                            target="_blank"
                                                            rel="noopener"
                                                        >
                                                            Lihat dokumen{' '}
                                                            <span aria-hidden="true">
                                                                ↗
                                                            </span>
                                                        </a>
                                                    )}
                                                </div>
                                            </article>
                                        ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="consultation">
                <div className="consultation-box container">
                    <div>
                        <p className="eyebrow eyebrow-light">
                            Butuh dokumen untuk lelang?
                        </p>
                        <h2>Kami siapkan dokumen kualifikasi lengkap.</h2>
                        <p>
                            Hubungi tim kami untuk salinan resmi dokumen
                            legalitas dan sertifikasi sesuai persyaratan tender
                            Anda.
                        </p>
                    </div>
                    <div>
                        <a className="button button-light" href="/kontak#form">
                            Hubungi tim kami <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
