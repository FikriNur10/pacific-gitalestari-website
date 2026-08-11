import { Head } from '@inertiajs/react';
import ProjectForm from '@/components/admin/project-form';
import Heading from '@/components/heading';
import { index as proyekIndex, update } from '@/routes/admin/proyek';

type StatusOption = { value: string; label: string };

type ProjectData = {
    id: number;
    title: string;
    slug: string;
    client: string | null;
    category: string | null;
    location: string | null;
    year: number | null;
    summary: string | null;
    description: string | null;
    status: string;
    sortOrder: number;
    coverUrl: string | null;
    galleryUrls: string[];
};

export default function ProyekEdit({
    project,
    statusOptions,
}: {
    project: ProjectData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit: ${project.title}`} />
            <Heading title="Edit proyek" description={project.title} />
            <ProjectForm
                submitUrl={update(project.slug).url}
                method="put"
                statusOptions={statusOptions}
                existingCoverUrl={project.coverUrl}
                existingGalleryUrls={project.galleryUrls}
                initial={{
                    title: project.title,
                    slug: project.slug,
                    client: project.client ?? '',
                    category: project.category ?? '',
                    location: project.location ?? '',
                    year: project.year?.toString() ?? '',
                    status: project.status,
                    sort_order: project.sortOrder.toString(),
                    summary: project.summary ?? '',
                    description: project.description ?? '',
                }}
                submitLabel="Perbarui proyek"
            />
        </div>
    );
}

ProyekEdit.layout = {
    breadcrumbs: [{ title: 'Proyek', href: proyekIndex() }],
};
