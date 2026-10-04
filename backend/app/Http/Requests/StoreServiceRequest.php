<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreServiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'       => ['required', 'string', 'max:255', 'unique:services,title'],
            'description' => ['sometimes', 'nullable', 'string'],
            'category'    => ['required', Rule::in(['Development', 'Design', 'Infrastructure', 'Consulting'])],
            'features'    => ['sometimes', 'nullable', 'array'],
            'features.*'  => ['string'],
            'icon'        => ['sometimes', 'nullable', 'string', 'max:10'],
            'pricing'     => ['sometimes', 'nullable', 'string', 'max:100'],
            'timeline'    => ['sometimes', 'nullable', 'string', 'max:100'],
            'is_active'   => ['sometimes', 'boolean'],
        ];
    }
}
