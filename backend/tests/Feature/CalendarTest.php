<?php

namespace Tests\Feature;

use App\Models\CalendarEvent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for CalendarContent.jsx (admin calendar panel).
 */
class CalendarTest extends TestCase
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

    public function test_admin_can_list_calendar_events(): void
    {
        CalendarEvent::factory()->count(3)->create();

        $this->withToken($this->token)
             ->getJson('/api/admin/calendar')
             ->assertStatus(200)
             ->assertJsonCount(3, 'data');
    }

    public function test_admin_can_filter_events_by_month_and_year(): void
    {
        CalendarEvent::factory()->create(['event_date' => '2026-10-15']);
        CalendarEvent::factory()->create(['event_date' => '2026-11-01']);

        $response = $this->withToken($this->token)
                         ->getJson('/api/admin/calendar?year=2026&month=10')
                         ->assertStatus(200);

        $this->assertCount(1, $response->json('data'));
        $this->assertStringStartsWith('2026-10', $response->json('data.0.event_date'));
    }

    public function test_admin_can_create_calendar_event(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/calendar', [
                 'title'      => 'Project Kickoff',
                 'type'       => 'kickoff',
                 'event_date' => '2026-10-20',
                 'priority'   => 'HIGH',
             ])->assertStatus(201)
               ->assertJsonPath('data.title', 'Project Kickoff');
    }

    public function test_event_creation_requires_title_type_date(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/calendar', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['title', 'type', 'event_date']);
    }

    public function test_event_type_must_be_valid(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/calendar', [
                 'title'      => 'Test Event',
                 'type'       => 'birthday', // invalid
                 'event_date' => '2026-10-20',
             ])->assertStatus(422)->assertJsonValidationErrors(['type']);
    }

    public function test_admin_can_update_calendar_event(): void
    {
        $event = CalendarEvent::factory()->create(['title' => 'Old Title']);

        $this->withToken($this->token)
             ->putJson("/api/admin/calendar/{$event->id}", ['title' => 'New Title'])
             ->assertStatus(200)
             ->assertJsonPath('data.title', 'New Title');
    }

    public function test_admin_can_delete_calendar_event(): void
    {
        $event = CalendarEvent::factory()->create();

        $this->withToken($this->token)
             ->deleteJson("/api/admin/calendar/{$event->id}")
             ->assertStatus(200);

        $this->assertDatabaseMissing('calendar_events', ['id' => $event->id]);
    }

    public function test_unauthenticated_cannot_list_calendar_events(): void
    {
        $this->getJson('/api/admin/calendar')->assertStatus(401);
    }
}
