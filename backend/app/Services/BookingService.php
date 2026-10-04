<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookingService
{
    public function __construct(private AvatarService $avatarService) {}

    /**
     * Create a new booking from validated client data.
     *
     * @param array{service:string, date:string, time:string, name:string, email:string} $data
     */
    public function createBooking(array $data): Booking
    {
        $service = Service::where('title', $data['service'])->firstOrFail();

        return Booking::create([
            'client_name'     => $data['name'],
            'client_email'    => $data['email'],
            'service_id'      => $service->id,
            'service_name'    => $service->title,
            'scheduled_date'  => $data['date'],
            'scheduled_time'  => $data['time'],
            'status'          => 'PENDING',
            'avatar_initials' => $this->avatarService->generateInitials($data['name']),
        ]);
    }

    /**
     * Update an existing booking with provided fields.
     */
    public function updateBooking(Booking $booking, array $data): Booking
    {
        // If service title is changing, resolve the new service_id
        if (isset($data['service_name'])) {
            $service = Service::where('title', $data['service_name'])->first();
            if ($service) {
                $data['service_id'] = $service->id;
            }
        }

        $booking->update($data);

        return $booking->fresh();
    }

    /**
     * Delete a booking (calendar events cascade via DB constraint).
     */
    public function deleteBooking(Booking $booking): void
    {
        $booking->delete();
    }

    /**
     * Return a filtered, sorted, paginated list of bookings.
     */
    public function getFilteredBookings(array $filters): LengthAwarePaginator
    {
        $query = Booking::query();

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('client_name', 'like', "%{$search}%")
                  ->orWhere('service_name', 'like', "%{$search}%")
                  ->orWhere('client_email', 'like', "%{$search}%");
            });
        }

        if (!empty($filters['status']) && $filters['status'] !== 'all') {
            $query->where('status', strtoupper($filters['status']));
        }

        if (!empty($filters['service']) && $filters['service'] !== 'all') {
            $query->where('service_name', 'like', "%{$filters['service']}%");
        }

        $sort    = $filters['sort'] ?? 'scheduled_date';
        $dir     = $filters['dir']  ?? 'desc';
        $allowed = ['scheduled_date', 'client_name', 'status', 'created_at'];
        $sort    = in_array($sort, $allowed) ? $sort : 'scheduled_date';
        $dir     = in_array(strtolower($dir), ['asc', 'desc']) ? $dir : 'desc';

        $query->orderBy($sort, $dir);

        $perPage = min((int) ($filters['per_page'] ?? 15), 100);

        return $query->paginate($perPage);
    }

    /**
     * Stream a CSV download of the given bookings collection.
     */
    public function exportToCsv(LengthAwarePaginator|iterable $bookings): StreamedResponse
    {
        $filename = 'bookings-' . now()->timestamp . '.csv';

        return response()->streamDownload(function () use ($bookings) {
            $handle = fopen('php://output', 'w');

            // Header row
            fputcsv($handle, ['ID', 'Client', 'Email', 'Service', 'Date', 'Time', 'Status', 'Created']);

            foreach ($bookings as $booking) {
                fputcsv($handle, [
                    $booking->id,
                    $booking->client_name,
                    $booking->client_email,
                    $booking->service_name,
                    $booking->scheduled_date,
                    $booking->scheduled_time,
                    $booking->status,
                    $booking->created_at?->toDateTimeString(),
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }
}
