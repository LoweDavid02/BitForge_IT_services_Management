<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnalyticsMetric extends Model
{
    protected $fillable = [
        'label', 'value', 'change',
        'trend', 'period', 'recorded_at'
    ];
}
