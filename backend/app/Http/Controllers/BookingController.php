<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookingController extends Controller
{
    public function __construct(private BookingService $bookingService) {}

    /**
     * POST /api/bookings  (public)
     * Client submits a new booking from the 3-step form.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        $booking = $this->bookingService->createBooking($request->validated());

        return response()->json([
            'message' => 'Booking submitted successfully. We will contact you soon.',
            'data'    => $booking,
        ], 201);
    }

    /**
     * GET /api/admin/bookings  (admin)
     * List bookings with optional search, status, service, sort, pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $paginator = $this->bookingService->getFilteredBookings($request->all());

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
     * GET /api/admin/bookings/{id}  (admin)
     */
    public function show(int $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);

        return response()->json(['data' => $booking]);
    }

    /**
     * PUT /api/admin/bookings/{id}  (admin)
     */
    public function update(UpdateBookingRequest $request, int $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        $updated = $this->bookingService->updateBooking($booking, $request->validated());

        return response()->json([
            'message' => 'Booking updated successfully.',
            'data'    => $updated,
        ]);
    }

    /**
     * DELETE /api/admin/bookings/{id}  (admin)
     */
    public function destroy(int $id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        $this->bookingService->deleteBooking($booking);

        return response()->json(['message' => 'Booking deleted successfully.']);
    }

    /**
     * GET /api/admin/bookings/export  (admin)
     * Download all (filtered) bookings as a CSV file.
     */
    public function export(Request $request): StreamedResponse
    {
        // Use same filters but retrieve all records (no pagination limit)
        $filters           = $request->all();
        $filters['per_page'] = 9999;

        $paginator = $this->bookingService->getFilteredBookings($filters);

        return $this->bookingService->exportToCsv($paginator);
    }
}
