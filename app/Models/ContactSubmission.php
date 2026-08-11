<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ContactStatus;
use Database\Factories\ContactSubmissionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A message sent through the public contact form, managed from the admin inbox.
 *
 * @property int $id
 * @property string $name
 * @property string $company
 * @property string $email
 * @property string|null $phone
 * @property string|null $service
 * @property string|null $message
 * @property ContactStatus $status
 * @property int|null $handled_by
 * @property Carbon|null $handled_at
 * @property string|null $ip_hash
 * @property string|null $user_agent
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class ContactSubmission extends Model
{
    /** @use HasFactory<ContactSubmissionFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'company',
        'email',
        'phone',
        'service',
        'message',
        'ip_hash',
        'user_agent',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => ContactStatus::class,
            'handled_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }
}
