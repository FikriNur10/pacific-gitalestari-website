import { Head } from '@inertiajs/react';
import LegalDocumentForm from '@/components/admin/legal-document-form';
import Heading from '@/components/heading';
import { index as legalitasIndex, update } from '@/routes/admin/legalitas';

type StatusOption = { value: string; label: string };

type LegalDocumentData = {
    id: number;
    title: string;
    category: string | null;
    issuer: string | null;
    documentNumber: string | null;
    issuedAt: string | null;
    expiresAt: string | null;
    status: string;
    sortOrder: number;
    fileUrl: string | null;
    imageUrl: string | null;
};

export default function LegalitasEdit({
    document,
    statusOptions,
}: {
    document: LegalDocumentData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit: ${document.title}`} />
            <Heading title="Edit dokumen" description={document.title} />
            <LegalDocumentForm
                submitUrl={update(document.id).url}
                method="put"
                statusOptions={statusOptions}
                existingFileUrl={document.fileUrl}
                existingImageUrl={document.imageUrl}
                initial={{
                    title: document.title,
                    category: document.category ?? '',
                    issuer: document.issuer ?? '',
                    document_number: document.documentNumber ?? '',
                    issued_at: document.issuedAt ?? '',
                    expires_at: document.expiresAt ?? '',
                    status: document.status,
                    sort_order: document.sortOrder.toString(),
                }}
                submitLabel="Perbarui dokumen"
            />
        </div>
    );
}

LegalitasEdit.layout = {
    breadcrumbs: [{ title: 'Legalitas & Sertifikasi', href: legalitasIndex() }],
};
