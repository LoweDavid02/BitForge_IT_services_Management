<?php

namespace Tests\Feature;

use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for Team.jsx (public page) and Admin team-access management.
 */
class TeamMemberTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'name'     => 'Admin User',
            'role'     => 'admin',
            'password' => Hash::make('Secret123!'),
        ]);

        $this->token = $this->admin->createToken('test')->plainTextToken;
    }

    private function makeMember(array $overrides = []): TeamMember
    {
        return TeamMember::factory()->create(array_merge([
            'department'   => 'Development',
            'access_level' => 'DEVELOPER',
        ], $overrides));
    }

    // ── Public index (Team.jsx) ────────────────────────────────────────────

    public function test_public_can_list_team_members(): void
    {
        TeamMember::factory()->count(3)->create(['department' => 'Development']);

        $this->getJson('/api/team')
             ->assertStatus(200)
             ->assertJsonStructure(['data'])
             ->assertJsonCount(3, 'data');
    }

    public function test_public_can_filter_by_department(): void
    {
        TeamMember::factory()->create(['department' => 'Design']);
        TeamMember::factory()->create(['department' => 'QA']);

        $response = $this->getJson('/api/team?department=Design')->assertStatus(200);

        $depts = collect($response->json('data'))->pluck('department')->unique()->values()->toArray();
        $this->assertEquals(['Design'], $depts);
    }

    public function test_public_can_view_single_team_member(): void
    {
        $member = $this->makeMember();

        $this->getJson("/api/team/{$member->id}")
             ->assertStatus(200)
             ->assertJsonPath('data.id', $member->id);
    }

    // ── Admin create ───────────────────────────────────────────────────────

    public function test_admin_can_add_a_team_member(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/team', [
                 'name'       => 'New Member',
                 'role'       => 'Backend Developer',
                 'department' => 'Development',
             ])->assertStatus(201)
               ->assertJsonPath('data.name', 'New Member');
    }

    public function test_team_member_creation_requires_name_role_department(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/team', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['name', 'role', 'department']);
    }

    public function test_department_must_be_valid_enum(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/team', [
                 'name'       => 'Test',
                 'role'       => 'Dev',
                 'department' => 'Marketing', // invalid
             ])->assertStatus(422)->assertJsonValidationErrors(['department']);
    }

    // ── Admin update ───────────────────────────────────────────────────────

    public function test_admin_can_update_team_member(): void
    {
        $member = $this->makeMember(['name' => 'Old Name']);

        $this->withToken($this->token)
             ->putJson("/api/admin/team/{$member->id}", ['name' => 'New Name'])
             ->assertStatus(200)
             ->assertJsonPath('data.name', 'New Name');
    }

    // ── Admin delete ───────────────────────────────────────────────────────

    public function test_admin_can_delete_team_member(): void
    {
        $member = $this->makeMember();

        $this->withToken($this->token)
             ->deleteJson("/api/admin/team/{$member->id}")
             ->assertStatus(200);

        $this->assertDatabaseMissing('team_members', ['id' => $member->id]);
    }

    // ── Update access level (Team Access section in Admin.jsx) ────────────

    public function test_admin_can_update_access_level(): void
    {
        $member = $this->makeMember(['access_level' => 'DEVELOPER']);

        $this->withToken($this->token)
             ->patchJson("/api/admin/team/{$member->id}/access", ['access_level' => 'ADMIN'])
             ->assertStatus(200)
             ->assertJsonPath('data.access_level', 'ADMIN');

        // Verify audit log was written
        $this->assertDatabaseHas('audit_logs', [
            'action'      => 'Access Level Changed',
            'performed_by' => 'Admin User',
        ]);
    }

    public function test_update_access_rejects_invalid_level(): void
    {
        $member = $this->makeMember();

        $this->withToken($this->token)
             ->patchJson("/api/admin/team/{$member->id}/access", ['access_level' => 'SUPERUSER'])
             ->assertStatus(422);
    }

    // ── Auth guards ────────────────────────────────────────────────────────

    public function test_unauthenticated_cannot_add_team_member(): void
    {
        $this->postJson('/api/admin/team', [
            'name' => 'Test', 'role' => 'Dev', 'department' => 'Development',
        ])->assertStatus(401);
    }
}
