<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\PageView;
use App\Models\PageViewDaily;
use Carbon\CarbonImmutable;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('analytics:rollup {--date= : Date (Y-m-d) to roll up; defaults to yesterday}')]
#[Description('Aggregate raw page views into the daily page_view_daily rollup table')]
class RollupPageViews extends Command
{
    public function handle(): int
    {
        $option = $this->option('date');
        $date = is_string($option) && $option !== ''
            ? CarbonImmutable::parse($option)->toDateString()
            : today()->subDay()->toDateString();

        $rows = PageView::query()
            ->whereDate('viewed_at', $date)
            ->selectRaw('path, COUNT(*) as views, COUNT(DISTINCT session_hash) as uniques')
            ->groupBy('path')
            ->get();

        foreach ($rows as $row) {
            PageViewDaily::updateOrCreate(
                ['date' => $date, 'path' => $row->path],
                ['views' => (int) $row->views, 'uniques' => (int) $row->uniques],
            );
        }

        $this->info("Rolled up {$rows->count()} path(s) for {$date}.");

        return self::SUCCESS;
    }
}
