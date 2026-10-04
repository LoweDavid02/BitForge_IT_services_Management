<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for AdminLogin.jsx → POST /api/auth/login
 * and admin profile/password routes.
 */
class AuthTest extends TestCase
{
    use RefreshDatabase;

    private function makeAdmin(array $overrides = []): User
    {
        return User::factory()->create(array_merge([
            'role'     => 'admin',
            'password' => Hash::make('Secret123!'),
        ], $overrides));
    }

    // ── Login ──────────────────────────────────────────────────────────────

    public function test_admin_can_login_with_valid_credentials(): void
    {
        $user = $this->makeAdmin(['email' => 'admin@bitforge.io']);

        $response = $this->postJson('/api/auth/login', [
            'email'    => 'admin@bitforge.io',
            'password' => 'Secret123!',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['message', 'user', 'token'])
                 ->assertJsonPath('user.role', 'admin');
    }

    public function test_login_fails_with_wrong_password(): void
    {
        $this->makeAdmin(['email' => 'admin@bitforge.io']);

        $this->postJson('/api/auth/login', [
            'email'    => 'admin@bitforge.io',
            'password' => 'wrongpassword',
        ])->assertStatus(401)->assertJsonPath('message', 'Invalid credentials.');
    }

    public function test_login_fails_with_missing_fields(): void
    {
        $this->postJson('/api/auth/login', [])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['email', 'password']);
    }

    public function test_login_fails_with_invalid_email_format(): void
    {
        $this->postJson('/api/auth/login', [
            'email'    => 'not-an-email',
            'password' => 'Secret123!',
        ])->assertStatus(422)->assertJsonValidationErrors(['email']);
    }

    // ── Logout ─────────────────────────────────────────────────────────────

    public function test_admin_can_logout(): void
    {
        $user  = $this->makeAdmin();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->postJson('/api/admin/auth/logout')
             ->assertStatus(200)
             ->assertJsonPath('message', 'Logged out successfully.');
    }

    public function test_logout_requires_authentication(): void
    {
        $this->postJson('/api/admin/auth/logout')
             ->assertStatus(401);
    }

    // ── Me ─────────────────────────────────────────────────────────────────

    public function test_me_returns_authenticated_user(): void
    {
        $user  = $this->makeAdmin(['name' => 'Test Admin']);
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->getJson('/api/admin/auth/me')
             ->assertStatus(200)
             ->assertJsonPath('data.name', 'Test Admin')
             ->assertJsonMissing(['password']);
    }

    // ── Update Profile ─────────────────────────────────────────────────────

    public function test_admin_can_update_profile(): void
    {
        $user  = $this->makeAdmin();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->putJson('/api/admin/auth/profile', ['name' => 'Updated Name'])
             ->assertStatus(200)
             ->assertJsonPath('data.name', 'Updated Name');
    }

    // ── Change Password ────────────────────────────────────────────────────

    public function test_admin_can_change_password(): void
    {
        $user  = $this->makeAdmin();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->putJson('/api/admin/auth/password', [
                 'current_password'      => 'Secret123!',
                 'password'              => 'NewPass456!',
                 'password_confirmation' => 'NewPass456!',
             ])->assertStatus(200);
    }

    public function test_change_password_fails_with_wrong_current_password(): void
    {
        $user  = $this->makeAdmin();
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->putJson('/api/admin/auth/password', [
                 'current_password'      => 'wrongpassword',
                 'password'              => 'NewPass456!',
                 'password_confirmation' => 'NewPass456!',
             ])->assertStatus(422);
    }

    // ── Non-admin blocked ──────────────────────────────────────────────────

    public function test_non_admin_user_cannot_access_admin_routes(): void
    {
        $user  = User::factory()->create(['role' => 'guest']);
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->getJson('/api/admin/auth/me')
             ->assertStatus(403);
    }
}
