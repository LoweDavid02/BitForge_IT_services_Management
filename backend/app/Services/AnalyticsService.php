<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Feedback;
use App\Models\TeamMember;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    /**
     * Summary KPIs for the admin dashboard.
     */
    public function getDashboardStats(): array
    {
        $bookingCounts = Booking::selectRaw('
            COUNT(*) as total,
            SUM(CASE WHEN status = "PENDING"     THEN 1 ELSE 0 END) as pending,
            SUM(CASE WHEN status = "CONFIRMED"   THEN 1 ELSE 0 END) as confirmed,
            SUM(CASE WHEN status = "COMPLETED"   THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = "CANCELLED"   THEN 1 ELSE 0 END) as cancelled,
            SUM(CASE WHEN status = "RESCHEDULED" THEN 1 ELSE 0 END) as rescheduled
        ')->first();

        $feedbackStats = Feedback::selectRaw('
            COUNT(*) as total,
            ROUND(AVG(rating), 2) as avg_rating
        ')->first();

        return [
            'bookings' => [
                'total'       => (int) $bookingCounts->total,
                'pending'     => (int) $bookingCounts->pending,
                'confirmed'   => (int) $bookingCounts->confirmed,
                'completed'   => (int) $bookingCounts->completed,
                'cancelled'   => (int) $bookingCounts->cancelled,
                'rescheduled' => (int) $bookingCounts->rescheduled,
            ],
            'feedback' => [
                'total'      => (int) $feedbackStats->total,
                'avg_rating' => (float) $feedbackStats->avg_rating,
            ],
            'team_members' => TeamMember::count(),
        ];
    }

    /**
     * Booking counts grouped by date for the last N days.
     */
    public function getBookingTrend(int $days = 30): array
    {
        return Booking::selectRaw('DATE(scheduled_date) as date, COUNT(*) as count')
            ->where('scheduled_date', '>=', now()->subDays($days)->toDateString())
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(fn ($row) => [
                'date'  => $row->date,
                'count' => (int) $row->count,
            ])
            ->toArray();
    }

    /**
     * Bookings broken down by service.
     */
    public function getServiceBreakdown(): array
    {
        return Booking::selectRaw('service_name, COUNT(*) as count')
            ->groupBy('service_name')
            ->orderBy('count', 'desc')
            ->get()
            ->map(fn ($row) => [
                'service' => $row->service_name,
                'count'   => (int) $row->count,
            ])
            ->toArray();
    }

    /**
     * Feedback aggregated by rating (1-5) and status.
     */
    public function getFeedbackStats(): array
    {
        $byRating = Feedback::selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->orderBy('rating', 'asc')
            ->get()
            ->map(fn ($row) => [
                'rating' => (int) $row->rating,
                'count'  => (int) $row->count,
            ])
            ->toArray();

        $byStatus = Feedback::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->get()
            ->map(fn ($row) => [
                'status' => $row->status,
                'count'  => (int) $row->count,
            ])
            ->toArray();

        return [
            'by_rating' => $byRating,
            'by_status' => $byStatus,
        ];
    }
}
