import { Head } from '@inertiajs/react';
import DownloadForm from '@/components/admin/download-form';
import Heading from '@/components/heading';
import { index as downloadIndex, update } from '@/routes/admin/download';

type StatusOption = { value: string; label: string };

type DownloadData = {
    id: number;
    title: string;
    description: string | null;
    category: string | null;
    status: string;
    publishedAt: string | null;
    fileName: string | null;
    humanSize: string | null;
};

export default function DownloadEdit({
    download,
    statusOptions,
}: {
    download: DownloadData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit: ${download.title}`} />
            <Heading title="Edit dokumen" description={download.title} />
            <DownloadForm
                submitUrl={update(download.id).url}
                method="put"
                statusOptions={statusOptions}
                existingFileName={download.fileName}
                existingHumanSize={download.humanSize}
                initial={{
                    title: download.title,
                    category: download.category ?? '',
                    status: download.status,
                    published_at: download.publishedAt ?? '',
                    description: download.description ?? '',
                }}
                submitLabel="Perbarui dokumen"
            />
        </div>
    );
}

DownloadEdit.layout = {
    breadcrumbs: [{ title: 'Download', href: downloadIndex() }],
};
