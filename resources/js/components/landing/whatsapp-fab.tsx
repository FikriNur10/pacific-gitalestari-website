import { WHATSAPP_URL } from '@/lib/landing';

/**
 * Floating WhatsApp CTA — fixed bottom-right, global to the landing page.
 * href resolves to wa.me at build time (see @/lib/landing); the pulse ring is CSS
 * and is disabled under prefers-reduced-motion.
 */
export default function WhatsappFab() {
    return (
        <a
            className="wa-fab"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            aria-label="Chat via WhatsApp"
        >
            <svg
                viewBox="0 0 32 32"
                width="26"
                height="26"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.7L.5 31.5l8-2.1c2.2 1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5C4 22.9 3.2 19.5 3.2 16 3.2 8.9 8.9 3.2 16 3.2S28.8 8.9 28.8 16 23.1 28.8 16 28.8zm7.3-9.6c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-.5-.4-1.5-1.5-2.4-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.4 1.3-1.4 3.2s1.4 3.7 1.6 4c.2.3 2.8 4.3 6.8 6 .9.4 1.7.6 2.3.8.9.3 1.8.2 2.5.1.8-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5z" />
            </svg>
        </a>
    );
}
