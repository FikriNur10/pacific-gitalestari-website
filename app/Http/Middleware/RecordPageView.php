<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\PageView;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

/**
 * First-party page-view recorder for public marketing pages.
 *
 * Design (structure-first):
 * - Applied ONLY to the public marketing route group (see routes/web.php), so
 *   there is no path allow/deny-list to keep in sync — admin/auth/system routes
 *   simply never carry this middleware. The invariant "this is a public page" is
 *   enforced by route composition, not by string-matching the URL.
 * - Records only successful GET responses (real page views, not form posts,
 *   redirects, or errors). Inertia SPA navigations arrive as GET XHR to the same
 *   routes, so they are captured too.
 * - Skips known bots by user-agent.
 * - Stores NO raw PII: IP and session id are sha256-hashed.
 *
 * Recording happens after $next so it never alters the response. A DB failure is
 * swallowed — analytics must never break a public page. Could move to a queued /
 * terminable hook later if the synchronous insert ever matters.
 */
class RecordPageView
{
    /**
     * User-agent fragments that identify non-human traffic to exclude.
     */
    private const BOT_PATTERN = '/bot|crawl|spider|slurp|facebookexternalhit|headless|lighthouse|preview|monitor|scraper/i';

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->shouldRecord($request, $response)) {
            $this->record($request);
        }

        return $response;
    }

    private function shouldRecord(Request $request, Response $response): bool
    {
        if (! $request->isMethod('GET')) {
            return false;
        }

        if ($response->getStatusCode() >= 400) {
            return false;
        }

        // Honor Do-Not-Track — skip recording entirely when the visitor opts out.
        if ($request->header('DNT') === '1') {
            return false;
        }

        $agent = (string) $request->userAgent();

        return $agent === '' || preg_match(self::BOT_PATTERN, $agent) !== 1;
    }

    private function record(Request $request): void
    {
        try {
            PageView::create([
                'path' => mb_substr($request->path(), 0, 255),
                'referrer' => $this->truncate($request->headers->get('referer')),
                'session_hash' => hash('sha256', $request->session()->getId()),
                'ip_hash' => $request->ip() !== null
                    ? hash('sha256', $request->ip().config('app.key'))
                    : null,
                'user_agent' => $this->truncate($request->userAgent()),
                'device' => $this->device((string) $request->userAgent()),
                'viewed_at' => now(),
            ]);
        } catch (\Throwable $e) {
            Log::warning('Failed to record page view', ['exception' => $e->getMessage()]);
        }
    }

    private function device(string $agent): string
    {
        return preg_match('/mobile|android|iphone|ipad|ipod/i', $agent) === 1
            ? 'mobile'
            : 'desktop';
    }

    private function truncate(?string $value): ?string
    {
        return $value !== null ? mb_substr($value, 0, 255) : null;
    }
}
