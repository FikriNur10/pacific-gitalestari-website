import { Head, Link, router } from '@inertiajs/react';
import CollectionEmptyState from '@/components/admin/collection-empty-state';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { index as kontakIndex, show } from '@/routes/admin/kontak';

type Submission = {
    id: number;
    name: string;
    company: string;
    email: string;
    service: string | null;
    status: string;
    statusLabel: string;
    createdAt: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    total: number;
};

type StatusOption = { value: string; label: string };

type PageProps = {
    submissions: Paginated<Submission>;
    filters: { status: string | null };
    statusOptions: StatusOption[];
    newCount: number;
};

// Conventional status → badge variant (text label always shown, so not colour-only).
const STATUS_VARIANT: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    new: 'default',
    read: 'secondary',
    handled: 'outline',
    spam: 'destructive',
};

export default function KontakIndex({
    submissions,
    filters,
    statusOptions,
    newCount,
}: PageProps) {
    return (
        <div className="px-4 py-6">
            <Head title="Inbox Kontak" />

            <Heading
                title="Inbox Kontak"
                description={`${submissions.total} pesan • ${newCount} baru`}
            />

            <div className="mb-4 flex flex-wrap gap-2">
                <FilterChip
                    href={kontakIndex().url}
                    active={!filters.status}
                    label="Semua"
                />
                {statusOptions.map((option) => (
                    <FilterChip
                        key={option.value}
                        href={
                            kontakIndex({ query: { status: option.value } }).url
                        }
                        active={filters.status === option.value}
                        label={option.label}
                    />
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 font-medium">Status</th>
                            <th className="px-4 py-3 font-medium">Pengirim</th>
                            <th className="px-4 py-3 font-medium">Kebutuhan</th>
                            <th className="px-4 py-3 font-medium">Tanggal</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-muted-foreground"
                                >
                                    <CollectionEmptyState
                                        isFiltered={!!filters.status}
                                        emptyMessage="Belum ada pesan masuk."
                                        onReset={() =>
                                            router.get(
                                                kontakIndex().url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                },
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ) : (
                            submissions.data.map((submission) => (
                                <tr
                                    key={submission.id}
                                    className="border-t hover:bg-muted/30"
                                >
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={
                                                STATUS_VARIANT[
                                                    submission.status
                                                ] ?? 'secondary'
                                            }
                                        >
                                            {submission.statusLabel}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">
                                            {submission.name}
                                        </div>
                                        <div className="text-muted-foreground">
                                            {submission.company}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {submission.service ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {submission.createdAt}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={show(submission.id).url}
                                            className="font-medium text-primary hover:underline"
                                        >
                                            Lihat
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {submissions.links.length > 3 && (
                <div className="mt-4 flex flex-wrap gap-1">
                    {submissions.links.map((link) => (
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

function FilterChip({
    href,
    active,
    label,
}: {
    href: string;
    active: boolean;
    label: string;
}) {
    return (
        <Link
            href={href}
            className={cn(
                'rounded-full border px-3 py-1 text-sm',
                active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted',
            )}
        >
            {label}
        </Link>
    );
}

KontakIndex.layout = {
    breadcrumbs: [{ title: 'Inbox Kontak', href: kontakIndex() }],
};
