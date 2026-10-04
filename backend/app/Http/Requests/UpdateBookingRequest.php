<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name'    => ['sometimes', 'string', 'max:255'],
            'client_email'   => ['sometimes', 'email', 'max:255'],
            'service_name'   => ['sometimes', 'string', 'exists:services,title'],
            'scheduled_date' => ['sometimes', 'date'],
            'scheduled_time' => ['sometimes', 'string', 'max:20'],
            'status'         => ['sometimes', Rule::in(['PENDING', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED'])],
        ];
    }
}
