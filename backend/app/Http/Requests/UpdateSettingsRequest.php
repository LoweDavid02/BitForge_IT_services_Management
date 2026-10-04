<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'brand_name'    => ['sometimes', 'string', 'max:255'],
            'contact_email' => ['sometimes', 'nullable', 'email'],
            'timezone'      => ['sometimes', 'string', 'max:100'],
            'language'      => ['sometimes', 'string', 'max:20'],
        ];
    }
}
