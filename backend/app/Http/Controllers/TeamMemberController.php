<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamMemberRequest;
use App\Http\Requests\UpdateAccessLevelRequest;
use App\Models\TeamMember;
use App\Services\AuditLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TeamMemberController extends Controller
{
    public function __construct(private AuditLogService $auditLogService) {}

    /**
     * GET /api/team  (public)
     */
    public function index(Request $request): JsonResponse
    {
        $query = TeamMember::query();

        if ($dept = $request->get('department')) {
            $query->where('department', $dept);
        }

        $members = $query->orderByDesc('is_featured')->orderBy('name')->get();

        return response()->json(['data' => $members]);
    }

    /**
     * GET /api/team/{id}  (public)
     */
    public function show(int $id): JsonResponse
    {
        return response()->json(['data' => TeamMember::findOrFail($id)]);
    }

    /**
     * POST /api/admin/team  (admin)
     */
    public function store(StoreTeamMemberRequest $request): JsonResponse
    {
        $member = TeamMember::create($request->validated());

        return response()->json([
            'message' => 'Team member added successfully.',
            'data'    => $member,
        ], 201);
    }

    /**
     * PUT /api/admin/team/{id}  (admin)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $member = TeamMember::findOrFail($id);

        $data = $request->validate([
            'name'          => ['sometimes', 'string', 'max:255'],
            'role'          => ['sometimes', 'string', 'max:150'],
            'department'    => ['sometimes', Rule::in(['Management', 'Design', 'Development', 'QA'])],
            'is_featured'   => ['sometimes', 'boolean'],
            'image_url'     => ['sometimes', 'nullable', 'string'],
            'phone'         => ['sometimes', 'nullable', 'string', 'max:50'],
            'email'         => ['sometimes', 'nullable', 'email', 'max:255'],
            'portfolio_url' => ['sometimes', 'nullable', 'string'],
            'access_level'  => ['sometimes', 'nullable', Rule::in(['ADMIN', 'DEVELOPER', 'QA'])],
        ]);

        $member->update($data);

        return response()->json([
            'message' => 'Team member updated.',
            'data'    => $member->fresh(),
        ]);
    }

    /**
     * DELETE /api/admin/team/{id}  (admin)
     */
    public function destroy(int $id): JsonResponse
    {
        TeamMember::findOrFail($id)->delete();

        return response()->json(['message' => 'Team member removed.']);
    }

    /**
     * PATCH /api/admin/team/{id}/access  (admin)
     * Change access_level only, and write to audit_logs.
     */
    public function updateAccess(UpdateAccessLevelRequest $request, int $id): JsonResponse
    {
        $member = TeamMember::findOrFail($id);
        $old    = $member->access_level;
        $new    = $request->access_level;

        $member->update([
            'access_level'  => $new,
            'last_modified' => now()->toDateString(),
        ]);

        $actor = $request->user();
        $this->auditLogService->log(
            action:      'Access Level Changed',
            performedBy: $actor->name,
            userId:      $actor->id,
            details:     "{$member->name} access level changed from {$old} to {$new}",
        );

        return response()->json([
            'message' => 'Access level updated.',
            'data'    => $member->fresh(),
        ]);
    }
}
