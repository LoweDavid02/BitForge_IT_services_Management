<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CalendarEventController extends Controller
{
    /**
     * GET /api/admin/calendar  (admin)
     * Filterable by year and month (e.g. ?year=2026&month=10)
     */
    public function index(Request $request): JsonResponse
    {
        $query = CalendarEvent::with('booking:id,client_name,status');

        if ($year = $request->get('year')) {
            $query->whereYear('event_date', $year);
        }

        if ($month = $request->get('month')) {
            $query->whereMonth('event_date', $month);
        }

        $events = $query->orderBy('event_date')->orderBy('start_time')->get();

        return response()->json(['data' => $events]);
    }

    /**
     * POST /api/admin/calendar  (admin)
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'client_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'booking_id'  => ['sometimes', 'nullable', 'exists:bookings,id'],
            'type'        => ['required', Rule::in(['kickoff', 'consultation', 'deadline'])],
            'start_time'  => ['sometimes', 'nullable', 'string', 'max:50'],
            'event_date'  => ['required', 'date'],
            'priority'    => ['sometimes', 'nullable', Rule::in(['HIGH', 'MEDIUM', 'LOW'])],
            'color_class' => ['sometimes', 'nullable', 'string', 'max:50'],
        ]);

        $event = CalendarEvent::create($data);

        return response()->json([
            'message' => 'Calendar event created.',
            'data'    => $event,
        ], 201);
    }

    /**
     * PUT /api/admin/calendar/{id}  (admin)
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $event = CalendarEvent::findOrFail($id);

        $data = $request->validate([
            'title'       => ['sometimes', 'string', 'max:255'],
            'client_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'booking_id'  => ['sometimes', 'nullable', 'exists:bookings,id'],
            'type'        => ['sometimes', Rule::in(['kickoff', 'consultation', 'deadline'])],
            'start_time'  => ['sometimes', 'nullable', 'string', 'max:50'],
            'event_date'  => ['sometimes', 'date'],
            'priority'    => ['sometimes', 'nullable', Rule::in(['HIGH', 'MEDIUM', 'LOW'])],
            'color_class' => ['sometimes', 'nullable', 'string', 'max:50'],
        ]);

        $event->update($data);

        return response()->json([
            'message' => 'Calendar event updated.',
            'data'    => $event->fresh(),
        ]);
    }

    /**
     * DELETE /api/admin/calendar/{id}  (admin)
     */
    public function destroy(int $id): JsonResponse
    {
        CalendarEvent::findOrFail($id)->delete();

        return response()->json(['message' => 'Calendar event deleted.']);
    }
}
