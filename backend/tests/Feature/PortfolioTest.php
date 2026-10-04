<?php

namespace Tests\Feature;

use App\Models\PortfolioProject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for Portfolio.jsx (public page) and admin portfolio management.
 */
class PortfolioTest extends TestCase
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

    // ── Public index (Portfolio.jsx) ───────────────────────────────────────

    public function test_public_can_list_active_portfolio_projects(): void
    {
        PortfolioProject::factory()->create(['is_active' => true]);
        PortfolioProject::factory()->create(['is_active' => false]);

        $response = $this->getJson('/api/portfolio')->assertStatus(200);

        $this->assertCount(1, $response->json('data'));
    }

    public function test_public_portfolio_does_not_require_auth(): void
    {
        $this->getJson('/api/portfolio')->assertStatus(200);
    }

    // ── Admin create ───────────────────────────────────────────────────────

    public function test_admin_can_create_portfolio_project(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/portfolio', [
                 'name'        => 'BitForge Dashboard',
                 'description' => 'Admin management dashboard.',
                 'tags'        => ['React', 'Laravel', 'Tailwind'],
                 'image_url'   => 'https://example.com/image.jpg',
             ])->assertStatus(201)
               ->assertJsonPath('data.name', 'BitForge Dashboard');
    }

    public function test_project_creation_requires_name(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/portfolio', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['name']);
    }

    public function test_tags_must_be_array(): void
    {
        $this->withToken($this->token)
             ->postJson('/api/admin/portfolio', [
                 'name' => 'Test Project',
                 'tags' => 'not-an-array',
             ])->assertStatus(422)->assertJsonValidationErrors(['tags']);
    }

    // ── Admin update ───────────────────────────────────────────────────────

    public function test_admin_can_update_portfolio_project(): void
    {
        $project = PortfolioProject::factory()->create(['name' => 'Old Name']);

        $this->withToken($this->token)
             ->putJson("/api/admin/portfolio/{$project->id}", ['name' => 'New Name'])
             ->assertStatus(200)
             ->assertJsonPath('data.name', 'New Name');
    }

    // ── Admin delete ───────────────────────────────────────────────────────

    public function test_admin_can_delete_portfolio_project(): void
    {
        $project = PortfolioProject::factory()->create();

        $this->withToken($this->token)
             ->deleteJson("/api/admin/portfolio/{$project->id}")
             ->assertStatus(200);

        $this->assertDatabaseMissing('portfolio_projects', ['id' => $project->id]);
    }

    public function test_unauthenticated_cannot_create_portfolio_project(): void
    {
        $this->postJson('/api/admin/portfolio', ['name' => 'Test'])
             ->assertStatus(401);
    }
}
