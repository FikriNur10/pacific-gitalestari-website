import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import RichTextEditor from '@/components/admin/rich-text-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as beritaIndex } from '@/routes/admin/berita';

export type NewsFormValues = {
    title: string;
    slug: string;
    category: string;
    status: string;
    published_at: string;
    excerpt: string;
    body: string;
    meta_title: string;
    meta_description: string;
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<NewsFormValues>;
    existingCoverUrl?: string | null;
    submitLabel: string;
};

const FIELD =
    'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function NewsForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    existingCoverUrl,
    submitLabel,
}: Props) {
    const form = useForm<NewsFormValues & { cover: File | null }>({
        title: initial?.title ?? '',
        slug: initial?.slug ?? '',
        category: initial?.category ?? '',
        status: initial?.status ?? 'draft',
        published_at: initial?.published_at ?? '',
        excerpt: initial?.excerpt ?? '',
        body: initial?.body ?? '',
        meta_title: initial?.meta_title ?? '',
        meta_description: initial?.meta_description ?? '',
        cover: null,
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
                <Label htmlFor="excerpt">Ringkasan</Label>
                <textarea
                    id="excerpt"
                    className={FIELD}
                    rows={2}
                    value={form.data.excerpt}
                    onChange={(e) => form.setData('excerpt', e.target.value)}
                />
                <InputError message={form.errors.excerpt} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="body">Isi artikel</Label>
                <RichTextEditor
                    id="body"
                    value={form.data.body}
                    onChange={(html) => form.setData('body', html)}
                />
                <InputError message={form.errors.body} />
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

            <details className="rounded-md border p-4">
                <summary className="cursor-pointer text-sm font-medium">
                    SEO (opsional)
                </summary>
                <div className="mt-4 space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="meta_title">Meta title</Label>
                        <Input
                            id="meta_title"
                            value={form.data.meta_title}
                            onChange={(e) =>
                                form.setData('meta_title', e.target.value)
                            }
                        />
                        <InputError message={form.errors.meta_title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="meta_description">
                            Meta description
                        </Label>
                        <textarea
                            id="meta_description"
                            className={FIELD}
                            rows={2}
                            value={form.data.meta_description}
                            onChange={(e) =>
                                form.setData('meta_description', e.target.value)
                            }
                        />
                        <InputError message={form.errors.meta_description} />
                    </div>
                </div>
            </details>

            <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                    <Link href={beritaIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
