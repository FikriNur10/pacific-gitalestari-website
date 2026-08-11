import { Head } from '@inertiajs/react';
import LegalDocumentForm from '@/components/admin/legal-document-form';
import Heading from '@/components/heading';
import {
    create,
    index as legalitasIndex,
    store,
} from '@/routes/admin/legalitas';

type StatusOption = { value: string; label: string };

export default function LegalitasCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="Dokumen baru" />
            <Heading
                title="Dokumen baru"
                description="Tambah dokumen legalitas atau sertifikasi"
            />
            <LegalDocumentForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan dokumen"
            />
        </div>
    );
}

LegalitasCreate.layout = {
    breadcrumbs: [
        { title: 'Legalitas & Sertifikasi', href: legalitasIndex() },
        { title: 'Baru', href: create() },
    ],
};
