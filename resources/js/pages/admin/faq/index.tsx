import { Head, Link } from '@inertiajs/react';
import DeleteConfirmationDialog from '@/components/admin/delete-confirmation-dialog';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { create, destroy, edit, index as faqIndex } from '@/routes/admin/faq';

type FaqItem = {
    id: number;
    question: string;
    category: string | null;
    sortOrder: number;
    status: string;
    statusLabel: string;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    faqs: {
        data: FaqItem[];
        links: PaginationLink[];
        total: number;
    };
};

export default function FaqIndex({ faqs }: PageProps) {
    return (
        <div className="px-4 py-6">
            <Head title="Kelola FAQ" />

            <div className="mb-4 flex items-center justify-between gap-4">
                <Heading title="FAQ" description={`${faqs.total} pertanyaan`} />
                <Button asChild>
                    <Link href={create().url}>+ FAQ baru</Link>
                </Button>
            </div>

            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 font-medium">
                                Pertanyaan
                            </th>
                            <th className="px-4 py-3 font-medium">Kategori</th>
                            <th className="px-4 py-3 font-medium">Urutan</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {faqs.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-muted-foreground"
                                >
                                    Belum ada FAQ.
                                </td>
                            </tr>
                        ) : (
                            faqs.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-muted/30"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {item.question}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {item.category ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {item.sortOrder}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={
                                                item.status === 'published'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {item.statusLabel}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={edit(item.id).url}
                                            className="mr-3 font-medium text-primary hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteConfirmationDialog
                                            title="Hapus FAQ?"
                                            description={`FAQ “${item.question}” akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
                                            confirmLabel="Hapus FAQ"
                                            deleteUrl={destroy(item.id).url}
                                            trigger={(openDialog) => (
                                                <button
                                                    type="button"
                                                    onClick={openDialog}
                                                    className="font-medium text-destructive hover:underline"
                                                >
                                                    Hapus
                                                </button>
                                            )}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {faqs.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {faqs.links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.url ?? '#'}
                            preserveScroll
                            className={cn(
                                'rounded-md border px-3 py-1.5 text-sm',
                                link.active &&
                                    'bg-primary text-primary-foreground',
                                !link.url &&
                                    'pointer-events-none text-muted-foreground opacity-50',
                            )}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

FaqIndex.layout = {
    breadcrumbs: [{ title: 'FAQ', href: faqIndex() }],
};
