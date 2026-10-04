<?php

namespace App\Policies;

use App\Models\Setting;
use App\Models\User;

class SettingsPolicy
{
    public function view(User $user): bool   { return $user->role === 'admin'; }
    public function update(User $user): bool { return $user->role === 'admin'; }
}
