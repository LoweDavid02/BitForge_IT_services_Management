<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $fillable = [
        'name', 'description', 'tags',
        'image_url', 'is_active'
    ];
}
