import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Download,
    FlaskConical,
    FolderGit2,
    FolderKanban,
    HelpCircle,
    Images,
    Inbox,
    LayoutGrid,
    Newspaper,
    Settings,
    ShieldCheck,
    Wallpaper,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as beritaIndex } from '@/routes/admin/berita';
import { index as downloadIndex } from '@/routes/admin/download';
import { index as faqIndex } from '@/routes/admin/faq';
import { index as galeriIndex } from '@/routes/admin/galeri';
import { index as kontakIndex } from '@/routes/admin/kontak';
import { index as latarHeroIndex } from '@/routes/admin/latar-hero';
import { index as legalitasIndex } from '@/routes/admin/legalitas';
import { edit as pengaturanEdit } from '@/routes/admin/pengaturan';
import { index as produkKimiaIndex } from '@/routes/admin/produk-kimia';
import { index as proyekIndex } from '@/routes/admin/proyek';
import type { Auth, NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

// Admin-only entries, appended when the current user has the admin role.
// The Dashboard entry (mainNavItems) already points at the admin dashboard, so
// there's no separate "Admin CMS" link — these are the CRUD sections only.
const adminNavItems: NavItem[] = [
    {
        title: 'Berita',
        href: beritaIndex(),
        icon: Newspaper,
    },
    {
        title: 'Proyek',
        href: proyekIndex(),
        icon: FolderKanban,
    },
    {
        title: 'Galeri',
        href: galeriIndex(),
        icon: Images,
    },
    {
        title: 'Produk Kimia',
        href: produkKimiaIndex(),
        icon: FlaskConical,
    },
    {
        title: 'Download',
        href: downloadIndex(),
        icon: Download,
    },
    {
        title: 'FAQ',
        href: faqIndex(),
        icon: HelpCircle,
    },
    {
        title: 'Legalitas',
        href: legalitasIndex(),
        icon: ShieldCheck,
    },
    {
        title: 'Inbox Kontak',
        href: kontakIndex(),
        icon: Inbox,
    },
    {
        title: 'Latar Hero',
        href: latarHeroIndex(),
        icon: Wallpaper,
    },
    {
        title: 'Pengaturan Situs',
        href: pengaturanEdit(),
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    // Guard `auth.user` — a public page mis-routed to AppLayout (e.g. a page name
    // missing from MARKETING_PAGES in app.tsx) would otherwise crash for guests
    // reading `.role` on a null user.
    const navItems =
        auth.user?.role === 'admin'
            ? [...mainNavItems, ...adminNavItems]
            : mainNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
