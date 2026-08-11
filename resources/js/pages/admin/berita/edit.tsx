import { Head } from '@inertiajs/react';
import NewsForm from '@/components/admin/news-form';
import Heading from '@/components/heading';
import { index as beritaIndex, update } from '@/routes/admin/berita';

type StatusOption = { value: string; label: string };

type NewsData = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string | null;
    category: string | null;
    status: string;
    publishedAt: string | null;
    coverUrl: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
};

export default function BeritaEdit({
    news,
    statusOptions,
}: {
    news: NewsData;
    statusOptions: StatusOption[];
}) {
    return (
        <div className="px-4 py-6">
            <Head title={`Edit: ${news.title}`} />
            <Heading title="Edit berita" description={news.title} />
            <NewsForm
                submitUrl={update(news.slug).url}
                method="put"
                statusOptions={statusOptions}
                existingCoverUrl={news.coverUrl}
                initial={{
                    title: news.title,
                    slug: news.slug,
                    category: news.category ?? '',
                    status: news.status,
                    published_at: news.publishedAt ?? '',
                    excerpt: news.excerpt ?? '',
                    body: news.body ?? '',
                    meta_title: news.metaTitle ?? '',
                    meta_description: news.metaDescription ?? '',
                }}
                submitLabel="Perbarui berita"
            />
        </div>
    );
}

BeritaEdit.layout = {
    breadcrumbs: [{ title: 'Berita', href: beritaIndex() }],
};
