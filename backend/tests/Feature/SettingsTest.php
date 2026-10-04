<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Tests for SettingsContent.jsx (General tab form).
 */
class SettingsTest extends TestCase
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

    public function test_admin_can_view_settings(): void
    {
        $this->withToken($this->token)
             ->getJson('/api/admin/settings')
             ->assertStatus(200)
             ->assertJsonStructure(['data' => ['brand_name', 'contact_email', 'timezone', 'language']]);
    }

    public function test_settings_auto_created_if_missing(): void
    {
        $this->assertDatabaseCount('settings', 0);

        $this->withToken($this->token)
             ->getJson('/api/admin/settings')
             ->assertStatus(200);

        $this->assertDatabaseCount('settings', 1);
    }

    public function test_admin_can_update_settings(): void
    {
        Setting::create([
            'brand_name'    => 'BitForge IT',
            'contact_email' => 'admin@bitforge.io',
            'timezone'      => 'UTC',
            'language'      => 'en-US',
        ]);

        $this->withToken($this->token)
             ->putJson('/api/admin/settings', [
                 'brand_name'    => 'BitForge IT Suite',
                 'contact_email' => 'hello@bitforge.io',
                 'timezone'      => 'PST',
                 'language'      => 'en-GB',
             ])->assertStatus(200)
               ->assertJsonPath('data.brand_name', 'BitForge IT Suite')
               ->assertJsonPath('data.timezone', 'PST');
    }

    public function test_settings_update_validates_email(): void
    {
        $this->withToken($this->token)
             ->putJson('/api/admin/settings', ['contact_email' => 'not-an-email'])
             ->assertStatus(422)
             ->assertJsonValidationErrors(['contact_email']);
    }

    public function test_unauthenticated_cannot_view_settings(): void
    {
        $this->getJson('/api/admin/settings')->assertStatus(401);
    }

    public function test_non_admin_cannot_update_settings(): void
    {
        $user  = User::factory()->create(['role' => 'guest']);
        $token = $user->createToken('test')->plainTextToken;

        $this->withToken($token)
             ->putJson('/api/admin/settings', ['brand_name' => 'Hacked'])
             ->assertStatus(403);
    }
}
