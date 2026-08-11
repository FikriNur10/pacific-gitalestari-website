<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Enums\ContentStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreGalleryItemRequest extends FormRequest
{
    /**
     * Route is already gated by the `admin` middleware.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'category' => ['nullable', 'string', 'max:80'],
            'status' => ['required', new Enum(ContentStatus::class)],
            'sort_order' => ['nullable', 'integer'],
            // Image is mandatory on create — a gallery item IS its photo.
            'image' => ['required', 'image', 'max:4096'],
        ];
    }
}
