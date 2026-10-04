<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name'       => ['sometimes', 'string', 'max:255'],
            'email'      => ['sometimes', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'phone'      => ['sometimes', 'nullable', 'string', 'max:50'],
            'department' => ['sometimes', 'nullable', 'string', 'max:100'],
            'location'   => ['sometimes', 'nullable', 'string', 'max:255'],
            'bio'        => ['sometimes', 'nullable', 'string'],
            'avatar'     => ['sometimes', 'nullable', 'string'],
        ];
    }
}
