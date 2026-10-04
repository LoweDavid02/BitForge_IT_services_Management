<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for Services.jsx (public page) and admin service management.
 * The services list also drives the Booking.jsx and Feedback.jsx dropdowns.
 */
class ServiceTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'role'     => 'admin',
            'password' => Hash::make('Secret123!'),
        ]);

        $this->token = $this->admin->createToken('test')->plainTextToken;
    }

    // ── Public index (Services.jsx / Booking.jsx / Feedback.jsx dropdown) ─

    public function test_public_can_list_active_services(): void
    {
        Service::create(['title' => 'Web Development', 'category' => 'Development', 'is_active' => true]);
        Service::create(['title' => 'Old Service',     'category' => 'Consulting',  'is_active' => false]);

        $response = $this->getJson('/api/services')->assertStatus(200);

        $titles = collect($response->json('data'))->pluck('title')->toArray();
        $this->assertContains('Web Development', $titles);
        $this->assertNotContains('Old Service', $titles);
    }

    public function test_public_can_view_single_service(): void
    {
        $service = Service::create([
            'title'    => 'IT Consulting',
            'category' => 'Consulting',
            'is_active' => true,
        ]);

        $this->getJson("/api/services/{$service->id}")
             ->assertStatus(200)
             ->assertJsonPath('data.title', 'IT Consulting');
    }

    public function test_show_returns_404_for_inactive_service(): void
    {
        $service = Service::create([
            'title'    => 'Hidden Service',
            'category' => 'Consulting',
            'is_active' => false,
        ]);

        $this->getJson("/api/services/{$service->id}")->assertStatus(404);
    }

    // ── Admin create ───────────────────────────────────────────────────────

    public function test_admin_can_create_a_service(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/services', [
                 'title'    => 'New Service',
                 'category' => 'Development',
             ])->assertStatus(201)
               ->assertJsonPath('data.title', 'New Service');
    }

    public function test_service_creation_requires_title_and_category(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/services', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['title', 'category']);
    }

    public function test_service_title_must_be_unique(): void
    {
        Service::create(['title' => 'Web Development', 'category' => 'Development', 'is_active' => true]);

        $this->withToken($this->token)
             ->postJson('/api/admin/services', [
                 'title'    => 'Web Development',
                 'category' => 'Development',
             ])->assertStatus(422)->assertJsonValidationErrors(['title']);
    }

    public function test_service_category_must_be_valid(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/services', [
                 'title'    => 'Test Service',
                 'category' => 'InvalidCategory',
             ])->assertStatus(422)->assertJsonValidationErrors(['category']);
    }

    // ── Admin update ───────────────────────────────────────────────────────

    public function test_admin_can_update_a_service(): void
    {
        $service = Service::create([
            'title'    => 'Old Title',
            'category' => 'Development',
            'is_active' => true,
        ]);

        $this->withToken($this->token)
             ->putJson("/api/admin/services/{$service->id}", ['title' => 'New Title'])
             ->assertStatus(200)
             ->assertJsonPath('data.title', 'New Title');
    }

    // ── Admin soft-delete ──────────────────────────────────────────────────

    public function test_admin_can_deactivate_a_service(): void
    {
        $service = Service::create([
            'title'    => 'To Be Removed',
            'category' => 'Consulting',
            'is_active' => true,
        ]);

        $this->withToken($this->token)
             ->deleteJson("/api/admin/services/{$service->id}")
             ->assertStatus(200);

        $this->assertDatabaseHas('services', ['id' => $service->id, 'is_active' => false]);
    }

    // ── Auth guards ────────────────────────────────────────────────────────

    public function test_unauthenticated_cannot_create_service(): void
    {
        $this->postJson('/api/admin/services', [
            'title'    => 'Test',
            'category' => 'Development',
        ])->assertStatus(401);
    }
}
