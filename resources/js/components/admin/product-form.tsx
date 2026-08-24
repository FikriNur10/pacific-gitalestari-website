import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import RichTextEditor from '@/components/admin/rich-text-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as produkKimiaIndex } from '@/routes/admin/produk-kimia';

export type SpecRow = {
    label: string;
    value: string;
    // Optional long-form text shown in the public spec popup (produk-kimia).
    description?: string;
};

export type ProductFormValues = {
    name: string;
    slug: string;
    category: string;
    status: string;
    sort_order: string;
    summary: string;
    description: string;
    application: string;
    specs: SpecRow[];
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<ProductFormValues>;
    existingImageUrl?: string | null;
    existingDatasheetUrl?: string | null;
    submitLabel: string;
};

const FIELD =
    'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function ProductForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    existingImageUrl,
    existingDatasheetUrl,
    submitLabel,
}: Props) {
    const form = useForm<
        ProductFormValues & { image: File | null; datasheet: File | null }
    >({
        name: initial?.name ?? '',
        slug: initial?.slug ?? '',
        category: initial?.category ?? '',
        status: initial?.status ?? 'draft',
        sort_order: initial?.sort_order ?? '0',
        summary: initial?.summary ?? '',
        description: initial?.description ?? '',
        application: initial?.application ?? '',
        specs: initial?.specs ?? [],
        image: null,
        datasheet: null,
    });

    const addSpec = () => {
        form.setData('specs', [
            ...form.data.specs,
            { label: '', value: '', description: '' },
        ]);
    };

    const removeSpec = (index: number) => {
        form.setData(
            'specs',
            form.data.specs.filter((_, i) => i !== index),
        );
    };

    const updateSpec = (index: number, key: keyof SpecRow, value: string) => {
        const next = form.data.specs.map((row, i) =>
            i === index ? { ...row, [key]: value } : row,
        );
        form.setData('specs', next);
    };

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
                <Label htmlFor="name">Nama produk</Label>
                <Input
                    id="name"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    required
                />
                <InputError message={form.errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="slug">Slug (opsional)</Label>
                <Input
                    id="slug"
                    value={form.data.slug}
                    onChange={(e) => form.setData('slug', e.target.value)}
                    placeholder="dibuat otomatis dari nama"
                />
                <InputError message={form.errors.slug} />
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
                <Label htmlFor="sort_order">Urutan (opsional)</Label>
                <Input
                    id="sort_order"
                    type="number"
                    value={form.data.sort_order}
                    onChange={(e) => form.setData('sort_order', e.target.value)}
                />
                <InputError message={form.errors.sort_order} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="summary">Ringkasan</Label>
                <textarea
                    id="summary"
                    className={FIELD}
                    rows={2}
                    value={form.data.summary}
                    onChange={(e) => form.setData('summary', e.target.value)}
                />
                <InputError message={form.errors.summary} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="description">Deskripsi</Label>
                <RichTextEditor
                    id="description"
                    value={form.data.description}
                    onChange={(html) => form.setData('description', html)}
                />
                <InputError message={form.errors.description} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="application">Aplikasi</Label>
                <textarea
                    id="application"
                    className={FIELD}
                    rows={3}
                    value={form.data.application}
                    onChange={(e) =>
                        form.setData('application', e.target.value)
                    }
                />
                <InputError message={form.errors.application} />
            </div>

            <div className="grid gap-3 rounded-md border p-4">
                <div className="flex items-center justify-between">
                    <Label>Spesifikasi</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addSpec}
                    >
                        + Tambah baris
                    </Button>
                </div>
                {form.data.specs.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Belum ada spesifikasi.
                    </p>
                )}
                {form.data.specs.map((row, index) => (
                    <div
                        key={index}
                        className="grid gap-2 rounded-md border p-3"
                    >
                        <div className="flex items-start gap-2">
                            <Input
                                aria-label={`Label spesifikasi ${index + 1}`}
                                placeholder="Label"
                                value={row.label}
                                onChange={(e) =>
                                    updateSpec(index, 'label', e.target.value)
                                }
                            />
                            <Input
                                aria-label={`Nilai spesifikasi ${index + 1}`}
                                placeholder="Nilai"
                                value={row.value}
                                onChange={(e) =>
                                    updateSpec(index, 'value', e.target.value)
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSpec(index)}
                            >
                                Hapus
                            </Button>
                        </div>
                        <textarea
                            aria-label={`Deskripsi spesifikasi ${index + 1}`}
                            className={FIELD}
                            rows={2}
                            placeholder="Deskripsi (tampil di popup saat pill diklik)"
                            value={row.description ?? ''}
                            onChange={(e) =>
                                updateSpec(index, 'description', e.target.value)
                            }
                        />
                    </div>
                ))}
                <InputError message={form.errors.specs} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="image">Gambar produk</Label>
                {existingImageUrl && (
                    <img
                        src={existingImageUrl}
                        alt="Gambar saat ini"
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

            <div className="grid gap-2">
                <Label htmlFor="datasheet">Datasheet (PDF)</Label>
                {existingDatasheetUrl && (
                    <a
                        href={existingDatasheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-2 text-sm font-medium text-primary hover:underline"
                    >
                        Datasheet saat ini
                    </a>
                )}
                <Input
                    id="datasheet"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                        form.setData('datasheet', e.target.files?.[0] ?? null)
                    }
                />
                <InputError message={form.errors.datasheet} />
            </div>

            <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                    <Link href={produkKimiaIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
