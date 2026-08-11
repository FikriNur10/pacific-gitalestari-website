import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import RichTextEditor from '@/components/admin/rich-text-editor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as faqIndex } from '@/routes/admin/faq';

export type FaqFormValues = {
    question: string;
    answer: string;
    category: string;
    sort_order: number;
    status: string;
};

type StatusOption = { value: string; label: string };

type Props = {
    submitUrl: string;
    method: 'post' | 'put';
    statusOptions: StatusOption[];
    initial?: Partial<FaqFormValues>;
    submitLabel: string;
};

export default function FaqForm({
    submitUrl,
    method,
    statusOptions,
    initial,
    submitLabel,
}: Props) {
    const form = useForm<FaqFormValues>({
        question: initial?.question ?? '',
        answer: initial?.answer ?? '',
        category: initial?.category ?? '',
        sort_order: initial?.sort_order ?? 0,
        status: initial?.status ?? 'draft',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (method === 'put') {
            form.transform((data) => ({ ...data, _method: 'put' }));
        }

        form.post(submitUrl);
    };

    return (
        <form onSubmit={submit} className="max-w-2xl space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="question">Pertanyaan</Label>
                <Input
                    id="question"
                    value={form.data.question}
                    onChange={(e) => form.setData('question', e.target.value)}
                    required
                />
                <InputError message={form.errors.question} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="answer">Jawaban</Label>
                <RichTextEditor
                    id="answer"
                    value={form.data.answer}
                    onChange={(html) => form.setData('answer', html)}
                />
                <InputError message={form.errors.answer} />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Input
                        id="category"
                        value={form.data.category}
                        onChange={(e) =>
                            form.setData('category', e.target.value)
                        }
                        placeholder="mis. Umum & Perusahaan"
                    />
                    <InputError message={form.errors.category} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input
                        id="sort_order"
                        type="number"
                        min={0}
                        value={form.data.sort_order}
                        onChange={(e) =>
                            form.setData(
                                'sort_order',
                                Number(e.target.value) || 0,
                            )
                        }
                    />
                    <InputError message={form.errors.sort_order} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                    id="status"
                    className="h-9 max-w-xs rounded-md border border-input bg-transparent px-3 text-sm"
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

            <div className="flex items-center gap-3">
                <Button asChild variant="outline">
                    <Link href={faqIndex().url}>Batal</Link>
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
