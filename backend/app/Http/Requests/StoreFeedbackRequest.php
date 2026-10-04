<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fullName' => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255'],
            'service'  => ['required', 'string', 'exists:services,title'],
            'rating'   => ['required', 'integer', 'min:1', 'max:5'],
            'message'  => ['required', 'string', 'min:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'service.exists'  => 'The selected service does not exist.',
            'rating.min'      => 'Rating must be at least 1 star.',
            'rating.max'      => 'Rating cannot exceed 5 stars.',
            'message.min'     => 'Feedback message must be at least 10 characters.',
        ];
    }
}
