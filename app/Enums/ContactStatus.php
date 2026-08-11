<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * Lifecycle of a contact-form submission in the admin inbox.
 */
enum ContactStatus: string
{
    case New = 'new';
    case Read = 'read';
    case Handled = 'handled';
    case Spam = 'spam';

    public function label(): string
    {
        return match ($this) {
            self::New => 'Baru',
            self::Read => 'Dibaca',
            self::Handled => 'Ditangani',
            self::Spam => 'Spam',
        };
    }

    /**
     * @return array<int, array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $status): array => ['value' => $status->value, 'label' => $status->label()],
            self::cases(),
        );
    }
}
