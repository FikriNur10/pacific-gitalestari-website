<?php

declare(strict_types=1);

namespace App\Models;

use App\Console\Commands\RollupPageViews;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Pre-aggregated daily page-view rollup (one row per day + path), produced by
 * {@see RollupPageViews} so dashboard trend queries stay
 * cheap at scale.
 *
 * @property int $id
 * @property Carbon $date
 * @property string $path
 * @property int $views
 * @property int $uniques
 */
class PageViewDaily extends Model
{
    protected $table = 'page_view_daily';

    protected $fillable = [
        'date',
        'path',
        'views',
        'uniques',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }
}
