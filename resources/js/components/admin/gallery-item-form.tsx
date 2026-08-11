import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as galeriIndex } from '@/routes/admin/galeri';

export type GalleryItemFormValues = {
    title: string;
    category: string;
    status: string;
    sort_order: string;
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<GalleryItemFormValues>;
    existingImageUrl?: string | null;
    submitLabel: string;
};

export default function GalleryItemForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    existingImageUrl,
    submitLabel,
}: Props) {
    const form = useForm<GalleryItemFormValues & { image: File | null }>({
        title: initial?.title ?? '',
        category: initial?.category ?? '',
        status: initial?.status ?? 'draft',
        sort_order: initial?.sort_order ?? '0',
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
                <Label htmlFor="title">Judul / Keterangan</Label>
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
                        placeholder="Fasilitas, Proyek, Produk…"
                    />
                    <InputError message={form.errors.category} />
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
                <Label htmlFor="image">Foto</Label>
                {existingImageUrl && (
                    <img
                        src={existingImageUrl}
                        alt="Foto saat ini"
                        className="mb-2 h-40 w-auto rounded-md object-cover"
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
                    <Link href={galeriIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
