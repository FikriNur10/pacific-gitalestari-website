import { Head } from '@inertiajs/react';
import FaqForm from '@/components/admin/faq-form';
import Heading from '@/components/heading';
import { index as faqIndex, update } from '@/routes/admin/faq';

type StatusOption = { value: string; label: string };

type FaqData = {
    id: number;
    question: string;
    answer: string;
    category: string | null;
    sortOrder: number;
    status: string;
};

export default function FaqEdit({
    faq,
    statusOptions,
}: {
    faq: FaqData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit FAQ`} />
            <Heading title="Edit FAQ" description={faq.question} />
            <FaqForm
                submitUrl={update(faq.id).url}
                method="put"
                statusOptions={statusOptions}
                initial={{
                    question: faq.question,
                    answer: faq.answer,
                    category: faq.category ?? '',
                    sort_order: faq.sortOrder,
                    status: faq.status,
                }}
                submitLabel="Perbarui FAQ"
            />
        </div>
    );
}

FaqEdit.layout = {
    breadcrumbs: [{ title: 'FAQ', href: faqIndex() }],
};
