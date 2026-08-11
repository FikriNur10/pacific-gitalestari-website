import type { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';

type Props = {
    // Matches the surrounding form's field id so the <Label htmlFor> stays associated.
    id?: string;
    // Controlled HTML value (sanitized server-side on submit — see the model mutators).
    value: string;
    onChange: (html: string) => void;
};

/**
 * Rich-text editor for CMS content (news body, product/project descriptions, FAQ answers).
 *
 * TinyMCE is self-hosted and touches `window` at import time, so it CANNOT be imported at
 * module scope — Inertia SSR evaluates page modules on the server and would crash. We load
 * the bundle and the React wrapper via a client-side dynamic import in an effect, showing a
 * pulsing skeleton until they resolve.
 */
export default function RichTextEditor({ id, value, onChange }: Props) {
    const [EditorComponent, setEditorComponent] = useState<
        typeof TinyEditor | null
    >(null);
    const [contentStyle, setContentStyle] = useState('');

    useEffect(() => {
        let active = true;

        void (async () => {
            // Order matters: the setup module registers window.tinymce BEFORE the wrapper
            // mounts, so the wrapper uses the bundled build instead of loading from a CDN.
            const { CONTENT_STYLE } = await import('@/lib/tinymce-setup');
            const { Editor } = await import('@tinymce/tinymce-react');

            if (!active) {
                return;
            }

            setContentStyle(CONTENT_STYLE);
            setEditorComponent(() => Editor);
        })();

        return () => {
            active = false;
        };
    }, []);

    if (!EditorComponent) {
        return (
            <div
                className="h-64 animate-pulse rounded-md border border-input bg-muted/50"
                aria-hidden
            />
        );
    }

    return (
        <EditorComponent
            id={id}
            // Self-hosted GPL build: the wrapper takes the licence as a prop (it overrides
            // the init's license_key), so `gpl` here suppresses v8's cloud warning/gate.
            licenseKey="gpl"
            value={value}
            onEditorChange={(html) => onChange(html)}
            init={{
                // Skin CSS is bundled (see tinymce-setup); don't fetch it from a URL.
                skin: false,
                content_css: false,
                content_style: contentStyle,
                menubar: false,
                branding: false,
                promotion: false,
                height: 360,
                plugins: 'advlist autolink lists link table code',
                toolbar:
                    'undo redo | blocks | bold italic underline strikethrough | bullist numlist | link table | removeformat | code',
                block_formats: 'Paragraf=p; Judul 2=h2; Judul 3=h3; Judul 4=h4',
            }}
        />
    );
}
