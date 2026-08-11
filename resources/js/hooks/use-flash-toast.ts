import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

/**
 * Bridges Laravel/Inertia flash messages to Sonner toasts. Two independent flash
 * channels feed the same toast UI:
 *
 *  1. `Inertia::flash('toast', {type, message})` (settings pages) — delivered as a
 *     client-side `flash` event. Kept as-is for the existing profile/security flows.
 *  2. `redirect()->with('success'|'error', ...)` (all admin CRUD) — surfaced as the
 *     shared `flash.success`/`flash.error` prop. Watched here and shown as a toast.
 *
 * MUST be called from within the Inertia <App> tree (usePage) — it lives in AppLayout,
 * which wraps only the dashboard shell, so public pages that render their own inline
 * flash (e.g. the contact form) never double-notify. It intentionally does NOT run in
 * <Toaster/>, which app.tsx mounts as a sibling of the app, outside the usePage() scope.
 */
export function useFlashToast(): void {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const success = flash?.success;
    const error = flash?.error;

    // Channel 1 — the Inertia::flash('toast', ...) event (settings pages).
    useEffect(() => {
        return router.on('flash', (event) => {
            const detail = (event as CustomEvent).detail?.flash;
            const data = detail?.toast as FlashToast | undefined;

            if (!data) {
                return;
            }

            toast[data.type](data.message);
        });
    }, []);

    // Channel 2 — session flash surfaced as a shared prop (admin CRUD). Fires only
    // when the message changes (deps are the primitive strings), so partial reloads
    // that keep the prop unchanged won't re-toast.
    useEffect(() => {
        if (success) {
            toast.success(success);
        }

        if (error) {
            toast.error(error);
        }
    }, [success, error]);
}
