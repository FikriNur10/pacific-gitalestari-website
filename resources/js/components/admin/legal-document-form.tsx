import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as legalitasIndex } from '@/routes/admin/legalitas';

export type LegalDocumentFormValues = {
    title: string;
    category: string;
    issuer: string;
    document_number: string;
    issued_at: string;
    expires_at: string;
    status: string;
    sort_order: string;
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<LegalDocumentFormValues>;
    existingFileUrl?: string | null;
    existingImageUrl?: string | null;
    submitLabel: string;
};

export default function LegalDocumentForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    existingFileUrl,
    existingImageUrl,
    submitLabel,
}: Props) {
    const form = useForm<
        LegalDocumentFormValues & { file: File | null; image: File | null }
    >({
        title: initial?.title ?? '',
        category: initial?.category ?? '',
        issuer: initial?.issuer ?? '',
        document_number: initial?.document_number ?? '',
        issued_at: initial?.issued_at ?? '',
        expires_at: initial?.expires_at ?? '',
        status: initial?.status ?? 'draft',
        sort_order: initial?.sort_order ?? '0',
        file: null,
        image: null,
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
                <Label htmlFor="title">Judul dokumen</Label>
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
                        placeholder="Legalitas / Sertifikasi"
                    />
                    <InputError message={form.errors.category} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="issuer">Penerbit</Label>
                    <Input
                        id="issuer"
                        value={form.data.issuer}
                        onChange={(e) => form.setData('issuer', e.target.value)}
                    />
                    <InputError message={form.errors.issuer} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="document_number">Nomor dokumen</Label>
                <Input
                    id="document_number"
                    value={form.data.document_number}
                    onChange={(e) =>
                        form.setData('document_number', e.target.value)
                    }
                />
                <InputError message={form.errors.document_number} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="issued_at">Tanggal terbit</Label>
                    <Input
                        id="issued_at"
                        type="date"
                        value={form.data.issued_at}
                        onChange={(e) =>
                            form.setData('issued_at', e.target.value)
                        }
                    />
                    <InputError message={form.errors.issued_at} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="expires_at">Berlaku sampai</Label>
                    <Input
                        id="expires_at"
                        type="date"
                        value={form.data.expires_at}
                        onChange={(e) =>
                            form.setData('expires_at', e.target.value)
                        }
                    />
                    <InputError message={form.errors.expires_at} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="grid gap-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input
                        id="sort_order"
                        type="number"
                        value={form.data.sort_order}
                        onChange={(e) =>
                            form.setData('sort_order', e.target.value)
                        }
                    />
                    <InputError message={form.errors.sort_order} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="file">Berkas PDF (opsional)</Label>
                {existingFileUrl && (
                    <a
                        href={existingFileUrl}
                        target="_blank"
                        rel="noopener"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Lihat berkas saat ini ↗
                    </a>
                )}
                <Input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                        form.setData('file', e.target.files?.[0] ?? null)
                    }
                />
                <InputError message={form.errors.file} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="image">Gambar pratinjau (opsional)</Label>
                {existingImageUrl && (
                    <img
                        src={existingImageUrl}
                        alt="Pratinjau saat ini"
                        className="mb-2 h-32 w-auto rounded-md object-cover"
                    />
                )}
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        form.setData('image', e.target.files?.[0] ?? null)
                    }
                />
                <InputError message={form.errors.image} />
            </div>

            <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                    <Link href={legalitasIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
