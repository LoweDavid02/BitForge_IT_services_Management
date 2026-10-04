<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\PortfolioProjectController;
use App\Http\Controllers\CalendarEventController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\AnalyticsController;

/*
|--------------------------------------------------------------------------
| Public Routes — no authentication required
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

// Public reads (used by frontend booking form, team page, portfolio page)
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}',   [ServiceController::class, 'show']);
Route::get('/team',            [TeamMemberController::class, 'index']);
Route::get('/team/{id}',       [TeamMemberController::class, 'show']);
Route::get('/portfolio',       [PortfolioProjectController::class, 'index']);

// Public writes (client-facing forms)
Route::post('/bookings',       [BookingController::class, 'store']);
Route::post('/feedback',       [FeedbackController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Protected Routes — requires valid Sanctum token + admin role
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

    // --- Auth / Profile ---
    Route::post('/auth/logout',          [AuthController::class, 'logout']);
    Route::get('/auth/me',               [AuthController::class, 'me']);
    Route::put('/auth/profile',          [AuthController::class, 'updateProfile']);
    Route::put('/auth/password',         [AuthController::class, 'changePassword']);

    // --- Bookings ---
    Route::get('/bookings/export',       [BookingController::class, 'export']);   // before {id} to avoid conflict
    Route::get('/bookings',              [BookingController::class, 'index']);
    Route::get('/bookings/{id}',         [BookingController::class, 'show']);
    Route::put('/bookings/{id}',         [BookingController::class, 'update']);
    Route::delete('/bookings/{id}',      [BookingController::class, 'destroy']);

    // --- Feedback ---
    Route::get('/feedback',              [FeedbackController::class, 'index']);
    Route::get('/feedback/{id}',         [FeedbackController::class, 'show']);
    Route::patch('/feedback/{id}/status',[FeedbackController::class, 'updateStatus']);
    Route::delete('/feedback/{id}',      [FeedbackController::class, 'destroy']);

    // --- Services (catalog management) ---
    Route::post('/services',             [ServiceController::class, 'store']);
    Route::put('/services/{id}',         [ServiceController::class, 'update']);
    Route::delete('/services/{id}',      [ServiceController::class, 'destroy']);

    // --- Team Members ---
    Route::post('/team',                 [TeamMemberController::class, 'store']);
    Route::put('/team/{id}',             [TeamMemberController::class, 'update']);
    Route::delete('/team/{id}',          [TeamMemberController::class, 'destroy']);
    Route::patch('/team/{id}/access',    [TeamMemberController::class, 'updateAccess']);

    // --- Portfolio Projects ---
    Route::post('/portfolio',            [PortfolioProjectController::class, 'store']);
    Route::put('/portfolio/{id}',        [PortfolioProjectController::class, 'update']);
    Route::delete('/portfolio/{id}',     [PortfolioProjectController::class, 'destroy']);

    // --- Calendar Events ---
    Route::get('/calendar',              [CalendarEventController::class, 'index']);
    Route::post('/calendar',             [CalendarEventController::class, 'store']);
    Route::put('/calendar/{id}',         [CalendarEventController::class, 'update']);
    Route::delete('/calendar/{id}',      [CalendarEventController::class, 'destroy']);

    // --- Audit Logs (read-only) ---
    Route::get('/audit-logs',            [AuditLogController::class, 'index']);

    // --- Settings ---
    Route::get('/settings',              [SettingsController::class, 'show']);
    Route::put('/settings',              [SettingsController::class, 'update']);

    // --- Analytics ---
    Route::get('/analytics/dashboard',   [AnalyticsController::class, 'dashboard']);
    Route::get('/analytics/bookings',    [AnalyticsController::class, 'bookings']);
    Route::get('/analytics/feedback',    [AnalyticsController::class, 'feedback']);
});
