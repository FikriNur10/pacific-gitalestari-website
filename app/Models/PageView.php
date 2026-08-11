<?php

declare(strict_types=1);

namespace App\Models;

use App\Http\Middleware\RecordPageView;
use Database\Factories\PageViewFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * A single first-party page-view hit on a public marketing page.
 *
 * Recorded by {@see RecordPageView}. Contains no raw PII:
 * IP and session id are stored hashed. Powers the admin analytics dashboard.
 *
 * @property int $id
 * @property string $path
 * @property string|null $referrer
 * @property string $session_hash
 * @property string|null $ip_hash
 * @property string|null $user_agent
 * @property string|null $device
 * @property Carbon $viewed_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class PageView extends Model
{
    /** @use HasFactory<PageViewFactory> */
    use HasFactory;

    protected $fillable = [
        'path',
        'referrer',
        'session_hash',
        'ip_hash',
        'user_agent',
        'device',
        'viewed_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'viewed_at' => 'datetime',
        ];
    }
}
