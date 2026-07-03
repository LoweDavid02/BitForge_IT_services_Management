<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role', 'department',
        'is_featured', 'image_url', 'phone',
        'email', 'portfolio_url', 'access_level',
        'last_modified'
    ];
}
