<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'action', 'performed_by', 'user_id',
        'details', 'timestamp',
    ];
}
