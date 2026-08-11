<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    /**
     * Public FAQ page — published questions grouped by category.
     */
    public function index(): Response
    {
        $groups = Faq::query()
            ->published()
            ->orderBy('sort_order')
            ->get()
            ->groupBy(fn (Faq $faq): string => $faq->category ?? 'Umum')
            ->map(fn ($items, string $category): array => [
                'category' => $category,
                'slug' => Str::slug($category),
                'items' => $items
                    ->map(fn (Faq $faq): array => [
                        'question' => $faq->question,
                        'answerHtml' => $faq->answerHtml(),
                    ])
                    ->values()
                    ->all(),
            ])
            ->values()
            ->all();

        return Inertia::render('faq', ['groups' => $groups]);
    }
}
