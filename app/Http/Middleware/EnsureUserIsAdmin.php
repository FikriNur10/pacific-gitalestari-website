<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

/**
 * Restricts a route to CMS administrators.
 *
 * Runs AFTER the `auth` middleware, so an unauthenticated visitor is already
 * redirected to login before reaching here — this only gates authenticated
 * non-admins (e.g. editors) with a 403.
 */
class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless(Gate::allows('admin'), 403);

        return $next($request);
    }
}
