<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = [
        'full_name', 'email', 'service_id', 
        'service_name', 'rating', 'messge', 
        'status', 'avatar_initials'
    ];
}
