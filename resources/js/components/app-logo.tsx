// Brand mark + name for the sidebar/header. Uses the same PGL logo asset as the
// public site (landing header/footer) for consistency. The name is fixed to the
// brand rather than config('app.name') — the landing hardcodes it too, and .env is
// tool-guarded so APP_NAME can't be set here. See notes if the browser title/emails
// (VITE_APP_NAME / APP_NAME) also need branding.
export default function AppLogo() {
    return (
        <>
            <img
                src="/landing/logo/logo-pgl.png"
                alt="Pacific Gitalestari"
                className="size-8 shrink-0 object-contain"
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Pacific Gitalestari
                </span>
            </div>
        </>
    );
}
