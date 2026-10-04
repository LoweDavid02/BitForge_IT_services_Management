<?php

namespace App\Policies;

use App\Models\TeamMember;
use App\Models\User;

class TeamMemberPolicy
{
    public function viewAny(?User $user): bool { return true; } // public
    public function view(?User $user, TeamMember $member): bool { return true; } // public
    public function create(User $user): bool   { return $user->role === 'admin'; }
    public function update(User $user, TeamMember $member): bool { return $user->role === 'admin'; }
    public function delete(User $user, TeamMember $member): bool { return $user->role === 'admin'; }
    public function updateAccess(User $user, TeamMember $member): bool { return $user->role === 'admin'; }
}
