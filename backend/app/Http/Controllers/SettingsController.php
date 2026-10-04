<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSettingsRequest;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    /**
     * GET /api/admin/settings  (admin)
     * Always returns the singleton row (id = 1).
     */
    public function show(): JsonResponse
    {
        $settings = Setting::firstOrCreate(
            ['id' => 1],
            [
                'brand_name'    => 'BitForge IT',
                'contact_email' => 'admin@bitforge.io',
                'timezone'      => 'UTC',
                'language'      => 'en-US',
            ]
        );

        return response()->json(['data' => $settings]);
    }

    /**
     * PUT /api/admin/settings  (admin)
     */
    public function update(UpdateSettingsRequest $request): JsonResponse
    {
        $settings = Setting::firstOrCreate(
            ['id' => 1],
            [
                'brand_name'    => 'BitForge IT',
                'contact_email' => 'admin@bitforge.io',
                'timezone'      => 'UTC',
                'language'      => 'en-US',
            ]
        );

        $settings->update($request->validated());

        return response()->json([
            'message' => 'Settings saved successfully.',
            'data'    => $settings->fresh(),
        ]);
    }
}
