<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use App\Models\Faq;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        $faqs = Faq::query()
            ->orderBy('category')
            ->orderBy('sort_order')
            ->paginate(20)
            ->through(fn (Faq $faq): array => [
                'id' => $faq->id,
                'question' => $faq->question,
                'category' => $faq->category,
                'sortOrder' => $faq->sort_order,
                'status' => $faq->status->value,
                'statusLabel' => $faq->status->label(),
            ]);

        return Inertia::render('admin/faq/index', ['faqs' => $faqs]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/faq/create', [
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function store(StoreFaqRequest $request): RedirectResponse
    {
        Faq::create([
            ...$request->validated(),
            'sort_order' => $request->integer('sort_order'),
        ]);

        return redirect()
            ->route('admin.faq.index')
            ->with('success', 'FAQ dibuat.');
    }

    public function edit(Faq $faq): Response
    {
        return Inertia::render('admin/faq/edit', [
            'faq' => [
                'id' => $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer,
                'category' => $faq->category,
                'sortOrder' => $faq->sort_order,
                'status' => $faq->status->value,
            ],
            'statusOptions' => ContentStatus::options(),
        ]);
    }

    public function update(UpdateFaqRequest $request, Faq $faq): RedirectResponse
    {
        $faq->update([
            ...$request->validated(),
            'sort_order' => $request->integer('sort_order'),
        ]);

        return redirect()
            ->route('admin.faq.index')
            ->with('success', 'FAQ diperbarui.');
    }

    public function destroy(Faq $faq): RedirectResponse
    {
        $faq->delete();

        return redirect()
            ->route('admin.faq.index')
            ->with('success', 'FAQ dihapus.');
    }
}
