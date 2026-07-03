<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'client_name', 'client_email', 'service_id',
        'service_name', 'scheduled_date', 'scheduled_time',
        'status', 'avatar_initials'
    ];
}
