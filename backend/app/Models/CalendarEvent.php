<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $fillable = [
        'title', 'client_name', 'booking_id',
        'type', 'start_time', 'priority', 
        'color_class'
    ];  
}
