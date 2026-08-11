<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;

class KontakController extends Controller
{
    /**
     * Store a public contact-form submission into the admin inbox.
     */
    public function store(StoreContactRequest $request): RedirectResponse
    {
        ContactSubmission::create([
            ...$request->validated(),
            // Hash the IP (no raw PII) — consistent with page-view analytics.
            'ip_hash' => $request->ip() !== null
                ? hash('sha256', $request->ip().config('app.key'))
                : null,
            'user_agent' => mb_substr((string) $request->userAgent(), 0, 255),
        ]);

        return back()->with('success', 'Terima kasih. Tim PGL akan menindaklanjuti permintaan konsultasi Anda.');
    }
}
