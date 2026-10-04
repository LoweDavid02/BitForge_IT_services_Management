<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTeamMemberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'          => ['required', 'string', 'max:255'],
            'role'          => ['required', 'string', 'max:150'],
            'department'    => ['required', Rule::in(['Management', 'Design', 'Development', 'QA'])],
            'is_featured'   => ['sometimes', 'boolean'],
            'image_url'     => ['sometimes', 'nullable', 'string'],
            'phone'         => ['sometimes', 'nullable', 'string', 'max:50'],
            'email'         => ['sometimes', 'nullable', 'email', 'max:255'],
            'portfolio_url' => ['sometimes', 'nullable', 'string'],
            'access_level'  => ['sometimes', 'nullable', Rule::in(['ADMIN', 'DEVELOPER', 'QA'])],
        ];
    }
}
