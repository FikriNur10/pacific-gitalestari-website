import { Head } from '@inertiajs/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
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
 * Legalitas & Sertifikasi — finbest chrome (breadcrumb + section title + cta band)
 * around the CMS-backed document grid, grouped by category (preserving the admin
 * sort order). Card markup + data wiring preserved.
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
        <LandingLayout
            title="Legalitas & Sertifikasi | PT. Pacific Gitalestari"
            breadcrumb={{ title: 'Legalitas & Sertifikasi', image: heroBg }}
        >
            <Head>
                <meta
                    name="description"
                    content="Dokumen legalitas dan sertifikasi PT. Pacific Gitalestari — izin usaha, akta, serta sertifikasi ISO & K3 sebagai jaminan kualifikasi untuk tender."
                />
            </Head>

            <section className="pt-120 pb-90">
                <div className="container">
                    <div className="tp-section-title-wrapper tp-section-intro mb-50">
                        <span className="tp-section-title-pre">
                            Legalitas &amp; Sertifikasi
                        </span>
                        <h1 className="tp-section-title">
                            Kualifikasi legal yang siap diverifikasi.
                        </h1>
                        <p className="tp-section-text">
                            Kelengkapan izin usaha, badan hukum, dan sertifikasi
                            sistem manajemen sebagai jaminan kredibilitas untuk
                            proses tender dan pengadaan.
                        </p>
                    </div>

                    {documents.length === 0 ? (
                        <p className="pending-note text-center">
                            Dokumen legalitas akan ditampilkan setelah diunggah.
                        </p>
                    ) : (
                        categories.map((category) => (
                            <div key={category} className="legal-group">
                                <div className="tp-section-title-wrapper mb-30">
                                    <span className="tp-section-title-pre">
                                        {category}
                                    </span>
                                </div>
                                <div className="row tp-card-row">
                                    {documents
                                        .filter(
                                            (doc) =>
                                                (doc.category ?? 'Lainnya') ===
                                                category,
                                        )
                                        .map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="col-lg-4 col-md-6"
                                            >
                                                <article className="legal-card reveal mb-30">
                                                    {doc.imageUrl ? (
                                                        <div className="legal-thumb">
                                                            <img
                                                                src={
                                                                    doc.imageUrl
                                                                }
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
                                                        <strong>
                                                            {doc.title}
                                                        </strong>
                                                        {doc.issuer && (
                                                            <small>
                                                                {doc.issuer}
                                                            </small>
                                                        )}
                                                        <dl className="legal-meta">
                                                            {doc.documentNumber && (
                                                                <div>
                                                                    <dt>
                                                                        Nomor
                                                                    </dt>
                                                                    <dd>
                                                                        {
                                                                            doc.documentNumber
                                                                        }
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {doc.issuedAt && (
                                                                <div>
                                                                    <dt>
                                                                        Terbit
                                                                    </dt>
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
                                                                        Berlaku
                                                                        s/d
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
                                                                href={
                                                                    doc.fileUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener"
                                                            >
                                                                Lihat dokumen{' '}
                                                                <ExternalLink
                                                                    size={14}
                                                                />
                                                            </a>
                                                        )}
                                                    </div>
                                                </article>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="tp-cta-area">
                <div className="container">
                    <div className="tp-cta-box">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h2 className="tp-cta-title">
                                    Kami siapkan dokumen kualifikasi lengkap.
                                </h2>
                                <p>
                                    Hubungi tim kami untuk salinan resmi dokumen
                                    legalitas dan sertifikasi sesuai persyaratan
                                    tender Anda.
                                </p>
                            </div>
                            <div className="col-lg-4">
                                <div className="tp-cta-actions">
                                    <a
                                        className="tp-btn tp-btn-white"
                                        href="/kontak#form"
                                    >
                                        Hubungi tim kami{' '}
                                        <ArrowRight size={17} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
