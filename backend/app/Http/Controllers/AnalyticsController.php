<?php

namespace App\Http\Controllers;

use App\Services\AnalyticsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function __construct(private AnalyticsService $analyticsService) {}

    /**
     * GET /api/admin/analytics/dashboard  (admin)
     * Summary KPIs for the admin dashboard header cards.
     */
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'data' => $this->analyticsService->getDashboardStats(),
        ]);
    }

    /**
     * GET /api/admin/analytics/bookings  (admin)
     * Booking trend and service breakdown for charts.
     */
    public function bookings(Request $request): JsonResponse
    {
        $days = (int) $request->get('days', 30);
        $days = min(max($days, 7), 365); // clamp 7–365

        return response()->json([
            'data' => [
                'trend'             => $this->analyticsService->getBookingTrend($days),
                'service_breakdown' => $this->analyticsService->getServiceBreakdown(),
            ],
        ]);
    }

    /**
     * GET /api/admin/analytics/feedback  (admin)
     * Feedback ratings distribution and status breakdown.
     */
    public function feedback(): JsonResponse
    {
        return response()->json([
            'data' => $this->analyticsService->getFeedbackStats(),
        ]);
    }
}
