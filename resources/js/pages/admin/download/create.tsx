import { Head } from '@inertiajs/react';
import DownloadForm from '@/components/admin/download-form';
import Heading from '@/components/heading';
import { create, index as downloadIndex, store } from '@/routes/admin/download';

type StatusOption = { value: string; label: string };

export default function DownloadCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="Dokumen baru" />
            <Heading
                title="Dokumen baru"
                description="Unggah katalog, datasheet, MSDS, atau sertifikat"
            />
            <DownloadForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan dokumen"
            />
        </div>
    );
}

DownloadCreate.layout = {
    breadcrumbs: [
        { title: 'Download', href: downloadIndex() },
        { title: 'Baru', href: create() },
    ],
};
