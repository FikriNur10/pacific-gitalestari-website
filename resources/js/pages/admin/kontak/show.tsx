import { Head, Link, router } from '@inertiajs/react';
import DeleteConfirmationDialog from '@/components/admin/delete-confirmation-dialog';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { destroy, index as kontakIndex, update } from '@/routes/admin/kontak';

type Submission = {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string | null;
    service: string | null;
    message: string | null;
    status: string;
    statusLabel: string;
    createdAt: string;
    handledBy: string | null;
    handledAt: string | null;
};

type StatusOption = { value: string; label: string };

type PageProps = {
    submission: Submission;
    statusOptions: StatusOption[];
};

export default function KontakShow({ submission, statusOptions }: PageProps) {
    const setStatus = (status: string) => {
        router.patch(
            update(submission.id).url,
            { status },
            { preserveScroll: true },
        );
    };

    return (
        <div className="px-4 py-6">
            <Head title={`Pesan dari ${submission.name}`} />

            <Link
                href={kontakIndex().url}
                className="mb-4 inline-block text-sm text-muted-foreground hover:underline"
            >
                ← Kembali ke inbox
            </Link>

            <div className="flex items-center gap-3">
                <Heading title={submission.company} />
                <Badge>{submission.statusLabel}</Badge>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Isi pesan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <Field label="Nama" value={submission.name} />
                        <Field
                            label="Email"
                            value={
                                <a
                                    href={`mailto:${submission.email}`}
                                    className="text-primary hover:underline"
                                >
                                    {submission.email}
                                </a>
                            }
                        />
                        <Field
                            label="Telepon"
                            value={submission.phone ?? '—'}
                        />
                        <Field
                            label="Kebutuhan"
                            value={submission.service ?? '—'}
                        />
                        <Field
                            label="Pesan"
                            value={
                                <span className="whitespace-pre-wrap">
                                    {submission.message ?? '—'}
                                </span>
                            }
                        />
                        <Field label="Diterima" value={submission.createdAt} />
                        {submission.handledBy && (
                            <Field
                                label="Ditangani oleh"
                                value={`${submission.handledBy}${submission.handledAt ? ` • ${submission.handledAt}` : ''}`}
                            />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Tindakan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {statusOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant={
                                    submission.status === option.value
                                        ? 'default'
                                        : 'outline'
                                }
                                className="w-full justify-start"
                                disabled={submission.status === option.value}
                                onClick={() => setStatus(option.value)}
                            >
                                Tandai: {option.label}
                            </Button>
                        ))}
                        <DeleteConfirmationDialog
                            title="Hapus pesan?"
                            description={`Pesan dari ${submission.name} akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
                            confirmLabel="Hapus pesan"
                            deleteUrl={destroy(submission.id).url}
                            trigger={(openDialog) => (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="mt-4 w-full"
                                    onClick={openDialog}
                                >
                                    Hapus pesan
                                </Button>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[120px_1fr] gap-2">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}

KontakShow.layout = {
    breadcrumbs: [{ title: 'Inbox Kontak', href: kontakIndex() }],
};
