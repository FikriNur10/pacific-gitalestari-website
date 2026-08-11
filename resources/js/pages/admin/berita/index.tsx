import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import CollectionEmptyState from '@/components/admin/collection-empty-state';
import DeleteConfirmationDialog from '@/components/admin/delete-confirmation-dialog';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
    create,
    destroy,
    edit,
    index as beritaIndex,
} from '@/routes/admin/berita';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    category: string | null;
    status: string;
    statusLabel: string;
    publishedAt: string | null;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    news: {
        data: NewsItem[];
        links: PaginationLink[];
        total: number;
    };
    filters: { search: string | null };
};

export default function BeritaIndex({ news, filters }: PageProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const runSearch = (event: React.FormEvent) => {
        event.preventDefault();
        router.get(
            beritaIndex().url,
            { search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="px-4 py-6">
            <Head title="Kelola Berita" />

            <div className="mb-4 flex items-center justify-between gap-4">
                <Heading title="Berita" description={`${news.total} artikel`} />
                <Button asChild>
                    <Link href={create().url}>+ Berita baru</Link>
                </Button>
            </div>

            <form onSubmit={runSearch} className="mb-4 flex max-w-sm gap-2">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul…"
                />
                <Button type="submit" variant="outline">
                    Cari
                </Button>
            </form>

            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 font-medium">Judul</th>
                            <th className="px-4 py-3 font-medium">Kategori</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Terbit</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {news.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-muted-foreground"
                                >
                                    <CollectionEmptyState
                                        isFiltered={!!filters.search}
                                        emptyMessage="Belum ada berita."
                                        onReset={() => {
                                            setSearch('');
                                            router.get(
                                                beritaIndex().url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                },
                                            );
                                        }}
                                    />
                                </td>
                            </tr>
                        ) : (
                            news.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-muted/30"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {item.title}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {item.category ?? '—'}
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
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {item.publishedAt ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={edit(item.slug).url}
                                            className="mr-3 font-medium text-primary hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteConfirmationDialog
                                            title="Hapus berita?"
                                            description={`Berita “${item.title}” akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
                                            confirmLabel="Hapus berita"
                                            deleteUrl={destroy(item.slug).url}
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

            {news.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {news.links.map((link) => (
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

BeritaIndex.layout = {
    breadcrumbs: [{ title: 'Berita', href: beritaIndex() }],
};
