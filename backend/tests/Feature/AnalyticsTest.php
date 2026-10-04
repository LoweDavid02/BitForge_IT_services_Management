<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Feedback;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for AnalyticsContent.jsx — admin analytics dashboard.
 */
class AnalyticsTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $token;
    private Service $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'role'     => 'admin',
            'password' => Hash::make('Secret123!'),
        ]);

        $this->token = $this->admin->createToken('test')->plainTextToken;

        $this->service = Service::create([
            'title'    => 'Web Development',
            'category' => 'Development',
            'is_active' => true,
        ]);
    }

    public function test_dashboard_returns_booking_and_feedback_counts(): void
    {
        Booking::factory()->count(3)->create([
            'service_id' => $this->service->id,
            'status'     => 'PENDING',
        ]);
        Booking::factory()->count(2)->create([
            'service_id' => $this->service->id,
            'status'     => 'CONFIRMED',
        ]);
        Feedback::factory()->count(4)->create([
            'service_id' => $this->service->id,
        ]);
        TeamMember::factory()->count(5)->create(['department' => 'Development']);

        $response = $this->withToken($this->token)
                         ->getJson('/api/admin/analytics/dashboard')
                         ->assertStatus(200);

        $data = $response->json('data');
        $this->assertEquals(5, $data['bookings']['total']);
        $this->assertEquals(3, $data['bookings']['pending']);
        $this->assertEquals(2, $data['bookings']['confirmed']);
        $this->assertEquals(4, $data['feedback']['total']);
        $this->assertEquals(5, $data['team_members']);
    }

    public function test_booking_analytics_returns_trend_and_breakdown(): void
    {
        Booking::factory()->count(3)->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->getJson('/api/admin/analytics/bookings')
             ->assertStatus(200)
             ->assertJsonStructure(['data' => ['trend', 'service_breakdown']]);
    }

    public function test_booking_analytics_clamps_days_parameter(): void
    {
        // days=500 should be clamped to 365 (won't error)
        $this->withToken($this->token)
             ->getJson('/api/admin/analytics/bookings?days=500')
             ->assertStatus(200);
    }

    public function test_feedback_analytics_returns_rating_and_status_breakdown(): void
    {
        Feedback::factory()->create(['service_id' => $this->service->id, 'rating' => 5]);
        Feedback::factory()->create(['service_id' => $this->service->id, 'rating' => 4]);

        $this->withToken($this->token)
             ->getJson('/api/admin/analytics/feedback')
             ->assertStatus(200)
             ->assertJsonStructure(['data' => ['by_rating', 'by_status']]);
    }

    public function test_unauthenticated_cannot_access_analytics(): void
    {
        $this->getJson('/api/admin/analytics/dashboard')->assertStatus(401);
    }
}
