<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'role', 'department',
        'is_featured', 'image_url', 'phone',
        'email', 'portfolio_url', 'access_level',
        'last_modified',
    ];

    protected $casts = [
        'is_featured'   => 'boolean',
        'last_modified' => 'date',
    ];
}
