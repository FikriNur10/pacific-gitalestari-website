<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Database\Factories\DownloadFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * A downloadable document (catalog, datasheet, MSDS, certificate, …). The file
 * itself lives on the `public` disk; downloads are served through a counting
 * route ({@see self::fileUrl()}) so each fetch bumps {@see $download_count}.
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string|null $category
 * @property string $file_path
 * @property string $file_name
 * @property int|null $file_size
 * @property string|null $mime
 * @property int $download_count
 * @property ContentStatus $status
 * @property Carbon|null $published_at
 */
class Download extends Model
{
    /** @use HasFactory<DownloadFactory> */
    use HasFactory;

    protected $table = 'downloads';

    protected $fillable = [
        'title',
        'description',
        'category',
        'file_path',
        'file_name',
        'file_size',
        'mime',
        'status',
        'published_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ContentStatus::class,
            'published_at' => 'datetime',
        ];
    }

    /**
     * @param  Builder<Download>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published)
            ->where('published_at', '<=', now());
    }

    /**
     * Public download URL — the counting route, not a direct storage link, so
     * every fetch is tallied. Bound by id (default route key).
     */
    public function fileUrl(): string
    {
        return route('download.file', $this);
    }

    /**
     * Human-readable file size derived from the stored byte count (e.g. "2.4 MB").
     */
    public function humanSize(): string
    {
        $bytes = $this->file_size ?? 0;

        if ($bytes <= 0) {
            return '—';
        }

        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $power = min((int) floor(log($bytes, 1024)), count($units) - 1);
        $value = $bytes / (1024 ** $power);

        // Bytes are whole; KB and up read cleaner with one decimal.
        $formatted = $power === 0 ? (string) $value : number_format($value, 1);

        return "{$formatted} {$units[$power]}";
    }
}
