<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    /**
     * GET /api/services  (public)
     * Returns only active services — used by the booking and feedback forms.
     */
    public function index(): JsonResponse
    {
        $services = Service::where('is_active', true)
            ->orderBy('title')
            ->get(['id', 'title', 'category', 'description', 'features', 'icon', 'pricing', 'timeline']);

        return response()->json(['data' => $services]);
    }

    /**
     * GET /api/services/{id}  (public)
     */
    public function show(int $id): JsonResponse
    {
        $service = Service::where('is_active', true)->findOrFail($id);

        return response()->json(['data' => $service]);
    }

    /**
     * POST /api/admin/services  (admin)
     */
    public function store(StoreServiceRequest $request): JsonResponse
    {
        $service = Service::create($request->validated());

        return response()->json([
            'message' => 'Service created successfully.',
            'data'    => $service,
        ], 201);
    }

    /**
     * PUT /api/admin/services/{id}  (admin)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        $data = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255', Rule::unique('services', 'title')->ignore($service->id)],
            'description' => ['sometimes', 'nullable', 'string'],
            'category'    => ['sometimes', Rule::in(['Development', 'Design', 'Infrastructure', 'Consulting'])],
            'features'    => ['sometimes', 'nullable', 'array'],
            'features.*'  => ['string'],
            'icon'        => ['sometimes', 'nullable', 'string', 'max:10'],
            'pricing'     => ['sometimes', 'nullable', 'string', 'max:100'],
            'timeline'    => ['sometimes', 'nullable', 'string', 'max:100'],
            'is_active'   => ['sometimes', 'boolean'],
        ]);

        $service->update($data);

        return response()->json([
            'message' => 'Service updated successfully.',
            'data'    => $service->fresh(),
        ]);
    }

    /**
     * DELETE /api/admin/services/{id}  (admin)
     * Soft-deletes by setting is_active = false.
     */
    public function destroy(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->update(['is_active' => false]);

        return response()->json(['message' => 'Service deactivated successfully.']);
    }
}
