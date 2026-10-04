<?php

namespace App\Services;

use App\Models\Feedback;
use App\Models\Service;
use Illuminate\Validation\ValidationException;

class FeedbackService
{
    public function __construct(private AvatarService $avatarService) {}

    /**
     * Create a new feedback submission.
     *
     * @param array{fullName:string, email:string, service:string, rating:int, message:string} $data
     */
    public function createFeedback(array $data): Feedback
    {
        $service = Service::where('title', $data['service'])->firstOrFail();

        return Feedback::create([
            'full_name'       => $data['fullName'],
            'email'           => $data['email'],
            'service_id'      => $service->id,
            'service_name'    => $service->title,
            'rating'          => $data['rating'],
            'message'         => $data['message'],
            'status'          => 'new',
            'avatar_initials' => $this->avatarService->generateInitials($data['fullName']),
        ]);
    }

    /**
     * Transition feedback status: new → in-progress → resolved.
     * Allows any valid status value regardless of current state.
     */
    public function updateStatus(Feedback $feedback, string $status): Feedback
    {
        $valid = ['new', 'in-progress', 'resolved'];

        if (!in_array($status, $valid)) {
            throw ValidationException::withMessages([
                'status' => ['Invalid status. Must be one of: ' . implode(', ', $valid)],
            ]);
        }

        $feedback->update(['status' => $status]);

        return $feedback->fresh();
    }
}
