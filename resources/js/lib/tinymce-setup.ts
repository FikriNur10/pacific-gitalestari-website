// Self-hosted TinyMCE bundle. Importing these registers TinyMCE globally (sets
// `window.tinymce`, which the React wrapper picks up) along with the theme, model,
// icons, and the plugins the toolbar uses — no cloud API key, no CDN.
//
// This module is loaded ONLY through a client-side dynamic import (see
// rich-text-editor.tsx). TinyMCE touches `window` at evaluation time, so importing it
// at the top level of a page component would crash Inertia's server-side render.
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';

// UI chrome (toolbar/dialog) skin — Vite injects this into the document head as a
// side effect, so the editor runs with `skin: false` and doesn't fetch it from a URL.
import 'tinymce/skins/ui/oxide/skin.min.css';

// Toolbar plugins.
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';

// Styles for the content *inside* the iframe. Imported as strings and handed to the
// editor via `content_style` (it runs with `content_css: false`), so they don't leak
// into the app's global styles.
import contentCss from 'tinymce/skins/content/default/content.min.css?inline';
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?inline';

export const CONTENT_STYLE = `${contentCss}\n${contentUiCss}`;
