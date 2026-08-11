<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContactStatus;
use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class ContactSubmissionController extends Controller
{
    /**
     * Paginated inbox with an optional status filter.
     */
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();

        $submissions = ContactSubmission::query()
            ->when(
                ContactStatus::tryFrom($status) !== null,
                fn ($query) => $query->where('status', $status),
            )
            ->latest()
            ->paginate(15)
            ->withQueryString()
            ->through(fn (ContactSubmission $submission): array => $this->toListItem($submission));

        return Inertia::render('admin/kontak/index', [
            'submissions' => $submissions,
            'filters' => ['status' => $status ?: null],
            'statusOptions' => ContactStatus::options(),
            'newCount' => ContactSubmission::where('status', ContactStatus::New)->count(),
        ]);
    }

    /**
     * Show one submission; a first read auto-transitions New → Read.
     */
    public function show(ContactSubmission $submission): Response
    {
        if ($submission->status === ContactStatus::New) {
            // status is guarded (not fillable) — set explicitly, don't mass-assign.
            $submission->status = ContactStatus::Read;
            $submission->save();
        }

        $submission->load('handler:id,name');

        return Inertia::render('admin/kontak/show', [
            'submission' => [
                ...$this->toListItem($submission),
                'phone' => $submission->phone,
                'message' => $submission->message,
                'handledBy' => $submission->handler?->name,
                'handledAt' => $submission->handled_at?->toDateTimeString(),
            ],
            'statusOptions' => ContactStatus::options(),
        ]);
    }

    /**
     * Change a submission's status (read / handled / spam).
     */
    public function update(Request $request, ContactSubmission $submission): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', new Enum(ContactStatus::class)],
        ]);

        $status = ContactStatus::from($validated['status']);

        // status/handled_* are guarded (not fillable) — set explicitly, don't mass-assign.
        $submission->status = $status;
        $submission->handled_by = $status === ContactStatus::Handled ? $request->user()->id : null;
        $submission->handled_at = $status === ContactStatus::Handled ? now() : null;
        $submission->save();

        return back()->with('success', 'Status pesan diperbarui.');
    }

    public function destroy(ContactSubmission $submission): RedirectResponse
    {
        $submission->delete();

        return redirect()
            ->route('admin.kontak.index')
            ->with('success', 'Pesan dihapus.');
    }

    /**
     * @return array{id: int, name: string, company: string, email: string, service: string|null, status: string, statusLabel: string, createdAt: string}
     */
    private function toListItem(ContactSubmission $submission): array
    {
        return [
            'id' => $submission->id,
            'name' => $submission->name,
            'company' => $submission->company,
            'email' => $submission->email,
            'service' => $submission->service,
            'status' => $submission->status->value,
            'statusLabel' => $submission->status->label(),
            'createdAt' => $submission->created_at->toDateTimeString(),
        ];
    }
}
