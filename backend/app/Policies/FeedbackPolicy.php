<?php

namespace App\Policies;

use App\Models\Feedback;
use App\Models\User;

class FeedbackPolicy
{
    public function viewAny(User $user): bool  { return $user->role === 'admin'; }
    public function view(User $user, Feedback $feedback): bool { return $user->role === 'admin'; }
    public function create(?User $user): bool  { return true; } // public
    public function updateStatus(User $user, Feedback $feedback): bool { return $user->role === 'admin'; }
    public function delete(User $user, Feedback $feedback): bool { return $user->role === 'admin'; }
}
