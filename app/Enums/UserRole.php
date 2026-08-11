<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * Application access roles. Backed by string so the value persists directly in
 * `users.role` and casts cleanly on the model.
 */
enum UserRole: string
{
    case Admin = 'admin';
    case Editor = 'editor';

    /**
     * Human-readable label for admin UI.
     */
    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::Editor => 'Editor',
        };
    }
}
