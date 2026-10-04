<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFeedbackRequest;
use App\Models\Feedback;
use App\Services\FeedbackService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function __construct(private FeedbackService $feedbackService) {}

    /**
     * POST /api/feedback  (public)
     */
    public function store(StoreFeedbackRequest $request): JsonResponse
    {
        $feedback = $this->feedbackService->createFeedback($request->validated());

        return response()->json([
            'message' => 'Thank you! Your feedback has been submitted.',
            'data'    => $feedback,
        ], 201);
    }

    /**
     * GET /api/admin/feedback  (admin)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Feedback::query();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('service_name', 'like', "%{$search}%");
            });
        }

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        if ($rating = $request->get('rating')) {
            $query->where('rating', $rating);
        }

        $paginator = $query->orderBy('created_at', 'desc')
                           ->paginate($request->get('per_page', 15));

        return response()->json([
            'data' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
                'last_page'    => $paginator->lastPage(),
            ],
        ]);
    }

    /**
     * GET /api/admin/feedback/{id}  (admin)
     */
    public function show(int $id): JsonResponse
    {
        return response()->json(['data' => Feedback::findOrFail($id)]);
    }

    /**
     * PATCH /api/admin/feedback/{id}/status  (admin)
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'status' => ['required', 'in:new,in-progress,resolved'],
        ]);

        $feedback = Feedback::findOrFail($id);
        $updated  = $this->feedbackService->updateStatus($feedback, $request->status);

        return response()->json([
            'message' => 'Feedback status updated.',
            'data'    => $updated,
        ]);
    }

    /**
     * DELETE /api/admin/feedback/{id}  (admin)
     */
    public function destroy(int $id): JsonResponse
    {
        Feedback::findOrFail($id)->delete();

        return response()->json(['message' => 'Feedback deleted successfully.']);
    }
}
