import { Head } from '@inertiajs/react';
import GalleryItemForm from '@/components/admin/gallery-item-form';
import Heading from '@/components/heading';
import { index as galeriIndex, update } from '@/routes/admin/galeri';

type StatusOption = { value: string; label: string };

type GalleryItemData = {
    id: number;
    title: string;
    category: string | null;
    status: string;
    sortOrder: number;
    imageUrl: string;
};

export default function GaleriEdit({
    item,
    statusOptions,
}: {
    item: GalleryItemData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit: ${item.title}`} />
            <Heading title="Edit foto" description={item.title} />
            <GalleryItemForm
                submitUrl={update(item.id).url}
                method="put"
                statusOptions={statusOptions}
                existingImageUrl={item.imageUrl}
                initial={{
                    title: item.title,
                    category: item.category ?? '',
                    status: item.status,
                    sort_order: item.sortOrder.toString(),
                }}
                submitLabel="Perbarui foto"
            />
        </div>
    );
}

GaleriEdit.layout = {
    breadcrumbs: [{ title: 'Galeri', href: galeriIndex() }],
};
