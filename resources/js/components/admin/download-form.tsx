import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as downloadIndex } from '@/routes/admin/download';

export type DownloadFormValues = {
    title: string;
    category: string;
    status: string;
    published_at: string;
    description: string;
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<DownloadFormValues>;
    existingFileName?: string | null;
    existingHumanSize?: string | null;
    submitLabel: string;
};

const FIELD =
    'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function DownloadForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    existingFileName,
    existingHumanSize,
    submitLabel,
}: Props) {
    const form = useForm<DownloadFormValues & { file: File | null }>({
        title: initial?.title ?? '',
        category: initial?.category ?? '',
        status: initial?.status ?? 'draft',
        published_at: initial?.published_at ?? '',
        description: initial?.description ?? '',
        file: null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        // PUT with a file upload → POST + method spoofing (Inertia multipart).
        if (method === 'put') {
            form.transform((data) => ({ ...data, _method: 'put' }));
        }

        form.post(submitUrl, { forceFormData: true });
    };

    return (
        <form onSubmit={submit} className="max-w-2xl space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="title">Judul</Label>
                <Input
                    id="title"
                    value={form.data.title}
                    onChange={(e) => form.setData('title', e.target.value)}
                    required
                />
                <InputError message={form.errors.title} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                        id="category"
                        value={form.data.category}
                        onChange={(e) =>
                            form.setData('category', e.target.value)
                        }
                    />
                    <InputError message={form.errors.category} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
                        value={form.data.status}
                        onChange={(e) => form.setData('status', e.target.value)}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <InputError message={form.errors.status} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="published_at">Tanggal terbit (opsional)</Label>
                <Input
                    id="published_at"
                    type="datetime-local"
                    value={form.data.published_at}
                    onChange={(e) =>
                        form.setData('published_at', e.target.value)
                    }
                />
                <InputError message={form.errors.published_at} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <textarea
                    id="description"
                    className={FIELD}
                    rows={3}
                    value={form.data.description}
                    onChange={(e) =>
                        form.setData('description', e.target.value)
                    }
                />
                <InputError message={form.errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="file">
                    Berkas (PDF, Office, ZIP · maks 20 MB)
                </Label>
                {existingFileName && (
                    <p className="text-sm text-muted-foreground">
                        Berkas saat ini: {existingFileName}
                        {existingHumanSize ? ` · ${existingHumanSize}` : ''}
                    </p>
                )}
                <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
                    onChange={(e) =>
                        form.setData('file', e.target.files?.[0] ?? null)
                    }
                />
                <InputError message={form.errors.file} />
            </div>

            <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                    <Link href={downloadIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
