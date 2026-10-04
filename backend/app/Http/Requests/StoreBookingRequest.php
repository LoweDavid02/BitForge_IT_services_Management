<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'service' => ['required', 'string', 'exists:services,title'],
            'date'    => ['required', 'date'],
            'time'    => ['required', 'string', 'max:20'],
            'name'    => ['required', 'string', 'max:255'],
            'email'   => ['required', 'email', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'service.exists' => 'The selected service does not exist.',
            'date.date'      => 'Please provide a valid date.',
        ];
    }
}
