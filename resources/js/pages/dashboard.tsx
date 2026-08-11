import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes';

type Stats = {
    totalViews: number;
    viewsToday: number;
    uniqueVisitorsToday: number;
    newSubmissions: number;
};

type TopPage = {
    path: string;
    views: number;
};

type TrendPoint = {
    date: string;
    views: number;
};

type TopArticle = {
    title: string;
    views: number;
};

type ContentCounts = {
    news: number;
    projects: number;
    products: number;
    downloads: number;
    faqs: number;
};

type PageProps = {
    stats: Stats;
    topPages: TopPage[];
    topArticles: TopArticle[];
    trend: TrendPoint[];
    contentCounts: ContentCounts;
    totalDownloads: number;
};

const CONTENT_LABELS: Array<{ key: keyof ContentCounts; label: string }> = [
    { key: 'news', label: 'Berita' },
    { key: 'projects', label: 'Proyek' },
    { key: 'products', label: 'Produk' },
    { key: 'downloads', label: 'Download' },
    { key: 'faqs', label: 'FAQ' },
];

const statCards: Array<{ key: keyof Stats; label: string; hint: string }> = [
    { key: 'viewsToday', label: 'Kunjungan hari ini', hint: 'Page view' },
    {
        key: 'uniqueVisitorsToday',
        label: 'Pengunjung unik hari ini',
        hint: 'Berdasarkan sesi',
    },
    { key: 'totalViews', label: 'Total kunjungan', hint: 'Sepanjang waktu' },
    { key: 'newSubmissions', label: 'Pesan baru', hint: 'Belum dibaca' },
];

export default function Dashboard({
    stats,
    topPages,
    topArticles,
    trend,
    contentCounts,
    totalDownloads,
}: PageProps) {
    // Scale trend bars to the busiest day; guard against an all-zero series.
    const maxViews = Math.max(1, ...trend.map((point) => point.views));

    return (
        <div className="px-4 py-6">
            <Head title="Dashboard" />

            <Heading
                title="Dashboard"
                description="Ringkasan trafik situs & konten CMS"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card) => (
                    <Card key={card.key}>
                        <CardHeader className="pb-2">
                            <CardDescription>{card.label}</CardDescription>
                            <CardTitle className="text-3xl tabular-nums">
                                {stats[card.key].toLocaleString('id-ID')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">
                                {card.hint}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="mt-6">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Konten CMS</CardTitle>
                    <CardDescription>
                        {totalDownloads.toLocaleString('id-ID')} total unduhan
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                        {CONTENT_LABELS.map((item) => (
                            <div key={item.key}>
                                <div className="text-2xl font-semibold tabular-nums">
                                    {contentCounts[item.key].toLocaleString(
                                        'id-ID',
                                    )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Tren 7 hari terakhir
                        </CardTitle>
                        <CardDescription>Kunjungan per hari</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex h-40 items-end gap-2">
                            {trend.map((point) => (
                                <div
                                    key={point.date}
                                    className="flex flex-1 flex-col items-center gap-2"
                                >
                                    <div
                                        className="w-full rounded-t bg-primary/80"
                                        style={{
                                            height: `${(point.views / maxViews) * 100}%`,
                                        }}
                                        title={`${point.views} kunjungan`}
                                    />
                                    <span className="text-[10px] text-muted-foreground">
                                        {point.date.slice(5)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Halaman terpopuler
                        </CardTitle>
                        <CardDescription>Berdasarkan page view</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topPages.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                                Belum ada data kunjungan.
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {topPages.map((page) => (
                                    <li
                                        key={page.path}
                                        className="flex items-center justify-between gap-4 text-sm"
                                    >
                                        <span className="truncate font-mono text-muted-foreground">
                                            /{page.path.replace(/^\//, '')}
                                        </span>
                                        <span className="font-medium tabular-nums">
                                            {page.views.toLocaleString('id-ID')}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-base">
                        Artikel terpopuler
                    </CardTitle>
                    <CardDescription>
                        Berdasarkan page view artikel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {topArticles.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Belum ada data pembacaan artikel.
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {topArticles.map((article) => (
                                <li
                                    key={article.title}
                                    className="flex items-center justify-between gap-4 text-sm"
                                >
                                    <span className="truncate text-muted-foreground">
                                        {article.title}
                                    </span>
                                    <span className="font-medium tabular-nums">
                                        {article.views.toLocaleString('id-ID')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
