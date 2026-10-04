<?php

namespace App\Services;

class AvatarService
{
    /**
     * Generate 2-character uppercase initials from a full name.
     * "Nexus Tech Solutions" → "NT"
     * "John" → "JO"
     */
    public function generateInitials(string $name): string
    {
        $parts = array_filter(explode(' ', trim($name)));

        if (count($parts) >= 2) {
            return strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1));
        }

        if (count($parts) === 1) {
            return strtoupper(mb_substr($parts[0], 0, 2));
        }

        return '??';
    }
}
