<?php

namespace Tests\Feature;

use App\Models\Feedback;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for Feedback.jsx (public form) and AdminFeedback.jsx (admin panel).
 */
class FeedbackTest extends TestCase
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

    // ── Public store (Feedback.jsx) ────────────────────────────────────────

    public function test_client_can_submit_feedback(): void
    {
        $this->postJson('/api/feedback', [
            'fullName' => 'John Doe',
            'email'    => 'john@example.com',
            'service'  => 'Web Development',
            'rating'   => 5,
            'message'  => 'Excellent service, very professional team.',
        ])->assertStatus(201)
          ->assertJsonPath('data.full_name', 'John Doe')
          ->assertJsonPath('data.status', 'new')
          ->assertJsonPath('data.rating', 5)
          ->assertJsonPath('data.avatar_initials', 'JD');
    }

    public function test_feedback_fails_without_required_fields(): void
    {
        $this->postJson('/api/feedback', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['fullName', 'email', 'service', 'rating', 'message']);
    }

    public function test_feedback_fails_with_rating_out_of_range(): void
    {
        $this->postJson('/api/feedback', [
            'fullName' => 'John Doe',
            'email'    => 'john@example.com',
            'service'  => 'Web Development',
            'rating'   => 6,
            'message'  => 'Good service experience here.',
        ])->assertStatus(422)->assertJsonValidationErrors(['rating']);
    }

    public function test_feedback_fails_with_invalid_service(): void
    {
        $this->postJson('/api/feedback', [
            'fullName' => 'John Doe',
            'email'    => 'john@example.com',
            'service'  => 'Fake Service',
            'rating'   => 4,
            'message'  => 'This is a test feedback message.',
        ])->assertStatus(422)->assertJsonValidationErrors(['service']);
    }

    public function test_feedback_fails_with_short_message(): void
    {
        $this->postJson('/api/feedback', [
            'fullName' => 'John Doe',
            'email'    => 'john@example.com',
            'service'  => 'Web Development',
            'rating'   => 3,
            'message'  => 'Short',
        ])->assertStatus(422)->assertJsonValidationErrors(['message']);
    }

    // ── Admin index (AdminFeedback.jsx) ────────────────────────────────────

    public function test_admin_can_list_feedback(): void
    {
        Feedback::factory()->count(3)->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->getJson('/api/admin/feedback')
             ->assertStatus(200)
             ->assertJsonStructure(['data', 'meta']);
    }

    public function test_admin_can_filter_feedback_by_status(): void
    {
        Feedback::factory()->create(['service_id' => $this->service->id, 'status' => 'new']);
        Feedback::factory()->create(['service_id' => $this->service->id, 'status' => 'resolved']);

        $response = $this->withToken($this->token)
                         ->getJson('/api/admin/feedback?status=new')
                         ->assertStatus(200);

        $statuses = collect($response->json('data'))->pluck('status')->unique()->values()->toArray();
        $this->assertEquals(['new'], $statuses);
    }

    // ── Admin show ─────────────────────────────────────────────────────────

    public function test_admin_can_view_single_feedback(): void
    {
        $feedback = Feedback::factory()->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->getJson("/api/admin/feedback/{$feedback->id}")
             ->assertStatus(200)
             ->assertJsonPath('data.id', $feedback->id);
    }

    // ── Admin update status ────────────────────────────────────────────────

    public function test_admin_can_update_feedback_status(): void
    {
        $feedback = Feedback::factory()->create([
            'service_id' => $this->service->id,
            'status'     => 'new',
        ]);

        $this->withToken($this->token)
             ->patchJson("/api/admin/feedback/{$feedback->id}/status", ['status' => 'in-progress'])
             ->assertStatus(200)
             ->assertJsonPath('data.status', 'in-progress');
    }

    public function test_update_status_rejects_invalid_value(): void
    {
        $feedback = Feedback::factory()->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->patchJson("/api/admin/feedback/{$feedback->id}/status", ['status' => 'approved'])
             ->assertStatus(422);
    }

    // ── Admin delete ───────────────────────────────────────────────────────

    public function test_admin_can_delete_feedback(): void
    {
        $feedback = Feedback::factory()->create(['service_id' => $this->service->id]);

        $this->withToken($this->token)
             ->deleteJson("/api/admin/feedback/{$feedback->id}")
             ->assertStatus(200);

        $this->assertDatabaseMissing('feedbacks', ['id' => $feedback->id]);
    }

    // ── Auth guards ────────────────────────────────────────────────────────

    public function test_unauthenticated_user_cannot_list_feedback(): void
    {
        $this->getJson('/api/admin/feedback')->assertStatus(401);
    }
}
