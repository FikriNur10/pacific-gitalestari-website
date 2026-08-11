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
    index as produkIndex,
} from '@/routes/admin/produk-kimia';

type ProductItem = {
    id: number;
    name: string;
    slug: string;
    category: string | null;
    status: string;
    statusLabel: string;
    sortOrder: number;
};

type PaginationLink = { url: string | null; label: string; active: boolean };

type PageProps = {
    products: {
        data: ProductItem[];
        links: PaginationLink[];
        total: number;
    };
    filters: { search: string | null };
};

export default function ProdukKimiaIndex({ products, filters }: PageProps) {
    const [search, setSearch] = useState(filters.search ?? '');

    const runSearch = (event: React.FormEvent) => {
        event.preventDefault();
        router.get(
            produkIndex().url,
            { search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <div className="px-4 py-6">
            <Head title="Kelola Produk Kimia" />

            <div className="mb-4 flex items-center justify-between gap-4">
                <Heading
                    title="Produk Kimia"
                    description={`${products.total} produk`}
                />
                <Button asChild>
                    <Link href={create().url}>+ Produk baru</Link>
                </Button>
            </div>

            <form onSubmit={runSearch} className="mb-4 flex max-w-sm gap-2">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama…"
                />
                <Button type="submit" variant="outline">
                    Cari
                </Button>
            </form>

            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 font-medium">Nama</th>
                            <th className="px-4 py-3 font-medium">Kategori</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Urutan</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {products.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-muted-foreground"
                                >
                                    <CollectionEmptyState
                                        isFiltered={!!filters.search}
                                        emptyMessage="Belum ada produk."
                                        onReset={() => {
                                            setSearch('');
                                            router.get(
                                                produkIndex().url,
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
                            products.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-muted/30"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {item.name}
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
                                        {item.sortOrder}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={edit(item.slug).url}
                                            className="mr-3 font-medium text-primary hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteConfirmationDialog
                                            title="Hapus produk?"
                                            description={`Produk “${item.name}” akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
                                            confirmLabel="Hapus produk"
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

            {products.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {products.links.map((link) => (
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

ProdukKimiaIndex.layout = {
    breadcrumbs: [{ title: 'Produk Kimia', href: produkIndex() }],
};
