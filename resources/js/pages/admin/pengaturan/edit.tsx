import { Head, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit, update } from '@/routes/admin/pengaturan';

type Settings = {
    metaTitle: string | null;
    metaDescription: string | null;
    ogImageUrl: string | null;
};

const FIELD =
    'flex min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring';

export default function PengaturanEdit({ settings }: { settings: Settings }) {
    const form = useForm<{
        meta_title: string;
        meta_description: string;
        og_image: File | null;
    }>({
        meta_title: settings.metaTitle ?? '',
        meta_description: settings.metaDescription ?? '',
        og_image: null,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        // PUT with a file upload → POST + method spoofing (Inertia multipart).
        form.transform((data) => ({ ...data, _method: 'put' }));
        form.post(update().url, { forceFormData: true });
    };

    return (
        <div className="px-4 py-6">
            <Head title="Pengaturan Situs" />
            <Heading
                title="Pengaturan Situs"
                description="Meta & pratinjau tautan (OG) saat situs dibagikan di WhatsApp, Google, media sosial"
            />

            <form onSubmit={submit} className="max-w-2xl space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="meta_title">Judul meta (og:title)</Label>
                    <Input
                        id="meta_title"
                        value={form.data.meta_title}
                        onChange={(e) =>
                            form.setData('meta_title', e.target.value)
                        }
                        placeholder="Nama & tagline perusahaan"
                    />
                    <InputError message={form.errors.meta_title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="meta_description">
                        Deskripsi meta (og:description)
                    </Label>
                    <textarea
                        id="meta_description"
                        className={FIELD}
                        rows={3}
                        maxLength={300}
                        value={form.data.meta_description}
                        onChange={(e) =>
                            form.setData('meta_description', e.target.value)
                        }
                        placeholder="Ringkasan 1–2 kalimat yang muncul di pratinjau tautan."
                    />
                    <p className="text-xs text-muted-foreground">
                        {form.data.meta_description.length}/300 karakter
                    </p>
                    <InputError message={form.errors.meta_description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="og_image">
                        Gambar pratinjau (og:image) — disarankan 1200×630
                    </Label>
                    {settings.ogImageUrl && (
                        <img
                            src={settings.ogImageUrl}
                            alt="OG image saat ini"
                            className="mb-2 max-h-40 w-auto rounded-md border object-cover"
                        />
                    )}
                    <Input
                        id="og_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            form.setData(
                                'og_image',
                                e.target.files?.[0] ?? null,
                            )
                        }
                    />
                    <InputError message={form.errors.og_image} />
                </div>

                <Button type="submit" disabled={form.processing}>
                    Simpan pengaturan
                </Button>
            </form>
        </div>
    );
}

PengaturanEdit.layout = {
    breadcrumbs: [{ title: 'Pengaturan Situs', href: edit() }],
};
