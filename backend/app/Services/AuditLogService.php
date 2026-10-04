<?php

namespace App\Services;

use App\Models\AuditLog;

class AuditLogService
{
    /**
     * Write an audit log entry.
     *
     * @param string   $action      e.g. "Access Level Changed"
     * @param string   $performedBy Name snapshot of the actor
     * @param int|null $userId      ID of the authenticated user (nullable)
     * @param string   $details     Human-readable description of what changed
     */
    public function log(
        string $action,
        string $performedBy,
        ?int $userId,
        string $details
    ): AuditLog {
        return AuditLog::create([
            'action'       => $action,
            'performed_by' => $performedBy,
            'user_id'      => $userId,
            'details'      => $details,
            'timestamp'    => now(),
        ]);
    }
}
