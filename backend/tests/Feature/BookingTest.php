<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for Booking.jsx (public 3-step form) and BookingsContent.jsx (admin panel).
 */
class BookingTest extends TestCase
{
    use RefreshDatabase;

    private Service $service;
    private User $admin;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = Service::create([
            'title'    => 'Web Development',
            'category' => 'Development',
            'is_active' => true,
        ]);

        $this->admin = User::factory()->create([
            'role'     => 'admin',
            'password' => Hash::make('Secret123!'),
        ]);

        $this->token = $this->admin->createToken('test')->plainTextToken;
    }

    // ── Public store (Booking.jsx form) ────────────────────────────────────

    public function test_client_can_submit_a_booking(): void
    {
        $this->postJson('/api/bookings', [
            'service' => 'Web Development',
            'date'    => now()->addWeek()->toDateString(),
            'time'    => '09:00 AM',
            'name'    => 'Nexus Tech',
            'email'   => 'nexus@example.com',
        ])->assertStatus(201)
          ->assertJsonPath('data.client_name', 'Nexus Tech')
          ->assertJsonPath('data.status', 'PENDING')
          ->assertJsonPath('data.avatar_initials', 'NT');
    }

    public function test_booking_fails_with_invalid_service(): void
    {
        $this->postJson('/api/bookings', [
            'service' => 'Nonexistent Service',
            'date'    => now()->addWeek()->toDateString(),
            'time'    => '09:00 AM',
            'name'    => 'Test User',
            'email'   => 'test@example.com',
        ])->assertStatus(422)->assertJsonValidationErrors(['service']);
    }

    public function test_booking_fails_without_required_fields(): void
    {
        $this->postJson('/api/bookings', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['service', 'date', 'time', 'name', 'email']);
    }

    public function test_booking_fails_with_invalid_email(): void
    {
        $this->postJson('/api/bookings', [
            'service' => 'Web Development',
            'date'    => now()->addWeek()->toDateString(),
            'time'    => '09:00 AM',
            'name'    => 'Test User',
            'email'   => 'not-an-email',
        ])->assertStatus(422)->assertJsonValidationErrors(['email']);
    }

    // ── Admin index (BookingsContent.jsx) ──────────────────────────────────

    public function test_admin_can_list_bookings(): void
    {
        Booking::factory()->count(3)->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->getJson('/api/admin/bookings')
             ->assertStatus(200)
             ->assertJsonStructure(['data', 'meta']);
    }

    public function test_admin_can_filter_bookings_by_status(): void
    {
        Booking::factory()->create(['service_id' => $this->service->id, 'status' => 'PENDING']);
        Booking::factory()->create(['service_id' => $this->service->id, 'status' => 'CONFIRMED']);

        $response = $this->withToken($this->token)
                         ->getJson('/api/admin/bookings?status=PENDING')
                         ->assertStatus(200);

        $statuses = collect($response->json('data'))->pluck('status')->unique()->values()->toArray();
        $this->assertEquals(['PENDING'], $statuses);
    }

    public function test_admin_can_search_bookings(): void
    {
        Booking::factory()->create([
            'service_id'  => $this->service->id,
            'client_name' => 'Unique Corp',
        ]);

        $this->withToken($this->token)
             ->getJson('/api/admin/bookings?search=Unique Corp')
             ->assertStatus(200)
             ->assertJsonPath('meta.total', 1);
    }

    // ── Admin show ─────────────────────────────────────────────────────────

    public function test_admin_can_view_single_booking(): void
    {
        $booking = Booking::factory()->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->getJson("/api/admin/bookings/{$booking->id}")
             ->assertStatus(200)
             ->assertJsonPath('data.id', $booking->id);
    }

    public function test_show_returns_404_for_missing_booking(): void
    {
        $this->withToken($this->token)
             ->getJson('/api/admin/bookings/9999')
             ->assertStatus(404);
    }

    // ── Admin update (edit modal in BookingsContent.jsx) ───────────────────

    public function test_admin_can_update_booking_status(): void
    {
        $booking = Booking::factory()->create([
            'service_id' => $this->service->id,
            'status'     => 'PENDING',
        ]);

        $this->withToken($this->token)
             ->putJson("/api/admin/bookings/{$booking->id}", ['status' => 'CONFIRMED'])
             ->assertStatus(200)
             ->assertJsonPath('data.status', 'CONFIRMED');
    }

    public function test_update_rejects_invalid_status(): void
    {
        $booking = Booking::factory()->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->putJson("/api/admin/bookings/{$booking->id}", ['status' => 'INVALID'])
             ->assertStatus(422);
    }

    // ── Admin delete ───────────────────────────────────────────────────────

    public function test_admin_can_delete_booking(): void
    {
        $booking = Booking::factory()->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->deleteJson("/api/admin/bookings/{$booking->id}")
             ->assertStatus(200);

        $this->assertDatabaseMissing('bookings', ['id' => $booking->id]);
    }

    // ── Export ─────────────────────────────────────────────────────────────

    public function test_admin_can_export_bookings_as_csv(): void
    {
        Booking::factory()->count(2)->create(['service_id' => $this->service->id]);

        $response = $this->withToken($this->token)
                         ->get('/api/admin/bookings/export');

        $response->assertStatus(200);
        $this->assertStringContainsString('text/csv', $response->headers->get('Content-Type'));
    }

    // ── Auth guards ────────────────────────────────────────────────────────

    public function test_unauthenticated_user_cannot_list_bookings(): void
    {
        $this->getJson('/api/admin/bookings')->assertStatus(401);
    }
}
