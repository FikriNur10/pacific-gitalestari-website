import { Head, useForm } from '@inertiajs/react';
import {  useState } from 'react';
import type {FormEvent} from 'react';
import DeleteConfirmationDialog from '@/components/admin/delete-confirmation-dialog';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    destroy,
    index as latarHeroIndex,
    update,
} from '@/routes/admin/latar-hero';

type HeroPageRow = {
    key: string;
    label: string;
    imageUrl: string;
    isCustom: boolean;
};

type PageProps = { pages: HeroPageRow[] };

/**
 * One row per page. Each owns its own `useForm` so a file upload posts only that
 * page's field. The file <input> is uncontrolled; a bump of `resetKey` remounts
 * it after a successful save to clear the shown filename (Inertia's back() reloads
 * the thumbnail but leaves the form mounted).
 */
function HeroRow({ page }: { page: HeroPageRow }) {
    const form = useForm<{ image: File | null }>({ image: null });
    const [resetKey, setResetKey] = useState(0);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        form.post(update(page.key).url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset('image');
                setResetKey((key) => key + 1);
            },
        });
    };

    return (
        <div className="rounded-xl border p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
                <img
                    src={page.imageUrl}
                    alt={`Latar Hero ${page.label}`}
                    className="h-24 w-full shrink-0 rounded-md border object-cover sm:w-40"
                />
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                        <p className="font-medium">{page.label}</p>
                        <Badge
                            variant={page.isCustom ? 'default' : 'secondary'}
                        >
                            {page.isCustom ? 'Kustom' : 'Default'}
                        </Badge>
                    </div>
                    <form
                        onSubmit={submit}
                        className="flex flex-wrap items-center gap-2"
                    >
                        <Input
                            key={resetKey}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="max-w-xs"
                            onChange={(e) =>
                                form.setData(
                                    'image',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />
                        <Button
                            type="submit"
                            disabled={form.processing || !form.data.image}
                        >
                            {form.processing ? 'Menyimpan…' : 'Simpan'}
                        </Button>
                        {page.isCustom && (
                            <DeleteConfirmationDialog
                                title="Kembalikan ke default?"
                                description={`Latar Hero halaman ${page.label} akan kembali ke gambar bawaan dan gambar unggahan dihapus.`}
                                confirmLabel="Kembalikan"
                                deleteUrl={destroy(page.key).url}
                                trigger={(openDialog) => (
                                    <button
                                        type="button"
                                        onClick={openDialog}
                                        className="text-sm font-medium text-destructive hover:underline"
                                    >
                                        Kembalikan ke default
                                    </button>
                                )}
                            />
                        )}
                    </form>
                    <InputError message={form.errors.image} />
                </div>
            </div>
        </div>
    );
}

export default function LatarHeroIndex({ pages }: PageProps) {
    return (
        <div className="px-4 py-6">
            <Head title="Latar Hero" />
            <Heading
                title="Latar Hero"
                description="Ganti gambar latar bagian Hero di setiap halaman. Kosongkan (kembalikan ke default) untuk memakai gambar bawaan."
            />

            <div className="max-w-3xl space-y-4">
                {pages.map((page) => (
                    <HeroRow key={page.key} page={page} />
                ))}
            </div>
        </div>
    );
}

LatarHeroIndex.layout = {
    breadcrumbs: [{ title: 'Latar Hero', href: latarHeroIndex() }],
};
