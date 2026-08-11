import { Head } from '@inertiajs/react';
import NewsForm from '@/components/admin/news-form';
import Heading from '@/components/heading';
import { create, index as beritaIndex, store } from '@/routes/admin/berita';

type StatusOption = { value: string; label: string };

export default function BeritaCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="Berita baru" />
            <Heading
                title="Berita baru"
                description="Tulis artikel dengan editor teks kaya"
            />
            <NewsForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan berita"
            />
        </div>
    );
}

BeritaCreate.layout = {
    breadcrumbs: [
        { title: 'Berita', href: beritaIndex() },
        { title: 'Baru', href: create() },
    ],
};
