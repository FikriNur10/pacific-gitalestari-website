<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContentStatus;
use Carbon\CarbonInterface;
use Database\Factories\LegalDocumentFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

/**
 * A legal/compliance document (izin usaha, sertifikat ISO/K3, dll.) surfaced on the
 * public Legalitas page as a credibility signal for tenders. Id-bound, no slug.
 *
 * @property int $id
 * @property string $title
 * @property string|null $category
 * @property string|null $issuer
 * @property string|null $document_number
 * @property CarbonInterface|null $issued_at
 * @property CarbonInterface|null $expires_at
 * @property string|null $file_path
 * @property string|null $image_path
 * @property ContentStatus $status
 * @property int $sort_order
 */
class LegalDocument extends Model
{
    /** @use HasFactory<LegalDocumentFactory> */
    use HasFactory;

    protected $table = 'legal_documents';

    protected $fillable = [
        'title',
        'category',
        'issuer',
        'document_number',
        'issued_at',
        'expires_at',
        'file_path',
        'image_path',
        'status',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ContentStatus::class,
            'issued_at' => 'date',
            'expires_at' => 'date',
        ];
    }

    /**
     * @param  Builder<LegalDocument>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('status', ContentStatus::Published);
    }

    public function fileUrl(): ?string
    {
        return $this->file_path !== null ? Storage::url($this->file_path) : null;
    }

    public function imageUrl(): ?string
    {
        return $this->image_path !== null ? Storage::url($this->image_path) : null;
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->isPast();
    }
}
