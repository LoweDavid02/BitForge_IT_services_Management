<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_name', 'client_email', 'service_id',
        'service_name', 'scheduled_date', 'scheduled_time',
        'status', 'avatar_initials'
    ];

    public function calendarEvents(): HasMany {
        return $this->hasMany(CalendarEvent::class, 'booking_id');
    } 
}
