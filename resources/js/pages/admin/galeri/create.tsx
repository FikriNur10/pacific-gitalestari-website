import { Head } from '@inertiajs/react';
import GalleryItemForm from '@/components/admin/gallery-item-form';
import Heading from '@/components/heading';
import { create, index as galeriIndex, store } from '@/routes/admin/galeri';

type StatusOption = { value: string; label: string };

export default function GaleriCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="Foto baru" />
            <Heading title="Foto baru" description="Tambah foto ke galeri" />
            <GalleryItemForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan foto"
            />
        </div>
    );
}

GaleriCreate.layout = {
    breadcrumbs: [
        { title: 'Galeri', href: galeriIndex() },
        { title: 'Baru', href: create() },
    ],
};
