import { Head } from '@inertiajs/react';
import FaqForm from '@/components/admin/faq-form';
import Heading from '@/components/heading';
import { create, index as faqIndex, store } from '@/routes/admin/faq';

type StatusOption = { value: string; label: string };

export default function FaqCreate({
    statusOptions,
}: {
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title="FAQ baru" />
            <Heading title="FAQ baru" description="Tambah pertanyaan" />
            <FaqForm
                submitUrl={store().url}
                method="post"
                statusOptions={statusOptions}
                submitLabel="Simpan FAQ"
            />
        </div>
    );
}

FaqCreate.layout = {
    breadcrumbs: [
        { title: 'FAQ', href: faqIndex() },
        { title: 'Baru', href: create() },
    ],
};
