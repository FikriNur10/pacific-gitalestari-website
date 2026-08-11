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
    index as galeriIndex,
} from '@/routes/admin/galeri';

type GalleryItem = {
    id: number;
    title: string;
    category: string | null;
    status: string;
    statusLabel: string;
    sortOrder: number;
    imageUrl: string;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    items: {
        data: GalleryItem[];
        links: PaginationLink[];
        total: number;
    };
    filters: { search: string | null };
};

export default function GaleriIndex({ items, filters }: PageProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const runSearch = (event: React.FormEvent) => {
        event.preventDefault();
        router.get(
            galeriIndex().url,
            { search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="px-4 py-6">
            <Head title="Kelola Galeri" />

            <div className="mb-4 flex items-center justify-between gap-4">
                <Heading title="Galeri" description={`${items.total} foto`} />
                <Button asChild>
                    <Link href={create().url}>+ Foto baru</Link>
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

            {items.data.length === 0 ? (
                <div className="rounded-xl border px-4 py-10 text-center text-muted-foreground">
                    <CollectionEmptyState
                        isFiltered={!!filters.search}
                        emptyMessage="Belum ada foto."
                        onReset={() => {
                            setSearch('');
                            router.get(
                                galeriIndex().url,
                                {},
                                { preserveState: true, replace: true },
                            );
                        }}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {items.data.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-xl border"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="aspect-video w-full object-cover"
                            />
                            <div className="space-y-2 p-3">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <Badge
                                        variant={
                                            item.status === 'published'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {item.statusLabel}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {item.category ?? '—'} · urutan{' '}
                                    {item.sortOrder}
                                </p>
                                <div className="flex gap-3 text-sm">
                                    <Link
                                        href={edit(item.id).url}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteConfirmationDialog
                                        title="Hapus foto?"
                                        description={`Foto “${item.title}” akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
                                        confirmLabel="Hapus foto"
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {items.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {items.links.map((link) => (
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

GaleriIndex.layout = {
    breadcrumbs: [{ title: 'Galeri', href: galeriIndex() }],
};
