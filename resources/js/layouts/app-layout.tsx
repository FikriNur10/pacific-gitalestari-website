import { useFlashToast } from '@/hooks/use-flash-toast';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    // Flash→toast bridge scoped to the dashboard shell: AppLayout wraps only the
    // authenticated dashboard/admin/settings pages, so public pages (LandingLayout)
    // that render their own inline flash never double-notify. Runs inside the Inertia
    // <App> tree, which usePage() (inside the hook) requires.
    useFlashToast();

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
