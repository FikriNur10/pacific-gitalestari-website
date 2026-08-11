import { Head } from '@inertiajs/react';
import ProjectForm from '@/components/admin/project-form';
import Heading from '@/components/heading';
import { create, index as proyekIndex, store } from '@/routes/admin/proyek';

type StatusOption = { value: string; label: string };

export default function ProyekCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="Proyek baru" />
            <Heading
                title="Proyek baru"
                description="Tambah proyek ke portofolio"
            />
            <ProjectForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan proyek"
            />
        </div>
    );
}

ProyekCreate.layout = {
    breadcrumbs: [
        { title: 'Proyek', href: proyekIndex() },
        { title: 'Baru', href: create() },
    ],
};
