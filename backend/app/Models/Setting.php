<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'brand_name', 'contact_email', 'timezone',
        'language', 
    ];
}
