<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;

class BookingPolicy
{
    public function viewAny(User $user): bool   { return $user->role === 'admin'; }
    public function view(User $user, Booking $booking): bool { return $user->role === 'admin'; }
    public function create(?User $user): bool   { return true; } // public
    public function update(User $user, Booking $booking): bool { return $user->role === 'admin'; }
    public function delete(User $user, Booking $booking): bool { return $user->role === 'admin'; }
    public function export(User $user): bool    { return $user->role === 'admin'; }
}
