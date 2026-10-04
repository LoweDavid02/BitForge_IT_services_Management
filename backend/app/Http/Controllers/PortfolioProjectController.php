<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioProjectController extends Controller
{
    /**
     * GET /api/portfolio  (public)
     */
    public function index(): JsonResponse
    {
        $projects = PortfolioProject::where('is_active', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json(['data' => $projects]);
    }

    /**
     * POST /api/admin/portfolio  (admin)
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'tags'        => ['sometimes', 'nullable', 'array'],
            'tags.*'      => ['string'],
            'image_url'   => ['sometimes', 'nullable', 'string'],
            'is_active'   => ['sometimes', 'boolean'],
        ]);

        $project = PortfolioProject::create($data);

        return response()->json([
            'message' => 'Portfolio project created.',
            'data'    => $project,
        ], 201);
    }

    /**
     * PUT /api/admin/portfolio/{id}  (admin)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $project = PortfolioProject::findOrFail($id);

        $data = $request->validate([
            'name'        => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'tags'        => ['sometimes', 'nullable', 'array'],
            'tags.*'      => ['string'],
            'image_url'   => ['sometimes', 'nullable', 'string'],
            'is_active'   => ['sometimes', 'boolean'],
        ]);

        $project->update($data);

        return response()->json([
            'message' => 'Portfolio project updated.',
            'data'    => $project->fresh(),
        ]);
    }

    /**
     * DELETE /api/admin/portfolio/{id}  (admin)
     */
    public function destroy(int $id): JsonResponse
    {
        PortfolioProject::findOrFail($id)->delete();

        return response()->json(['message' => 'Portfolio project deleted.']);
    }
}
