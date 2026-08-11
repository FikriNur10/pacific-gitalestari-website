import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import RichTextEditor from '@/components/admin/rich-text-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as proyekIndex } from '@/routes/admin/proyek';

export type ProjectFormValues = {
    title: string;
    slug: string;
    client: string;
    category: string;
    location: string;
    year: string;
    status: string;
    sort_order: string;
    summary: string;
    description: string;
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<ProjectFormValues>;
    existingCoverUrl?: string | null;
    existingGalleryUrls?: string[];
    submitLabel: string;
};

const FIELD =
    'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function ProjectForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    existingCoverUrl,
    existingGalleryUrls,
    submitLabel,
}: Props) {
    const form = useForm<
        ProjectFormValues & { cover: File | null; gallery: File[] }
    >({
        title: initial?.title ?? '',
        slug: initial?.slug ?? '',
        client: initial?.client ?? '',
        category: initial?.category ?? '',
        location: initial?.location ?? '',
        year: initial?.year ?? '',
        status: initial?.status ?? 'draft',
        sort_order: initial?.sort_order ?? '0',
        summary: initial?.summary ?? '',
        description: initial?.description ?? '',
        cover: null,
        gallery: [],
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

            <div className="grid gap-2">
                <Label htmlFor="slug">Slug (opsional)</Label>
                <Input
                    id="slug"
                    value={form.data.slug}
                    onChange={(e) => form.setData('slug', e.target.value)}
                    placeholder="dibuat otomatis dari judul"
                />
                <InputError message={form.errors.slug} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="client">Klien</Label>
                    <Input
                        id="client"
                        value={form.data.client}
                        onChange={(e) => form.setData('client', e.target.value)}
                    />
                    <InputError message={form.errors.client} />
                </div>
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input
                        id="location"
                        value={form.data.location}
                        onChange={(e) =>
                            form.setData('location', e.target.value)
                        }
                    />
                    <InputError message={form.errors.location} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="year">Tahun</Label>
                    <Input
                        id="year"
                        type="number"
                        value={form.data.year}
                        onChange={(e) => form.setData('year', e.target.value)}
                    />
                    <InputError message={form.errors.year} />
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
                <Label htmlFor="cover">Gambar sampul</Label>
                {existingCoverUrl && (
                    <img
                        src={existingCoverUrl}
                        alt="Sampul saat ini"
                        className="mb-2 h-32 w-auto rounded-md object-cover"
                    />
                )}
                <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        form.setData('cover', e.target.files?.[0] ?? null)
                    }
                />
                <InputError message={form.errors.cover} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="gallery">Galeri (bisa banyak)</Label>
                {existingGalleryUrls && existingGalleryUrls.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {existingGalleryUrls.map((url) => (
                            <img
                                key={url}
                                src={url}
                                alt="Galeri"
                                className="h-24 w-auto rounded-md object-cover"
                            />
                        ))}
                    </div>
                )}
                <Input
                    id="gallery"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                        form.setData(
                            'gallery',
                            e.target.files ? Array.from(e.target.files) : [],
                        )
                    }
                />
                <InputError message={form.errors.gallery} />
            </div>

            <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                    <Link href={proyekIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
