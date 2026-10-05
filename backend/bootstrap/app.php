<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\ForceJsonResponse;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        apiPrefix: 'api',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Ensure all /api/* responses are always JSON
        $middleware->prependToGroup('api', ForceJsonResponse::class);

        // NOTE: statefulApi() is intentionally NOT called here.
        // This app uses Sanctum API token auth (Bearer tokens in sessionStorage),
        // NOT cookie-based SPA auth. Calling statefulApi() would activate
        // EnsureFrontendRequestsAreStateful which enforces CSRF validation on
        // API routes, causing "CSRF token mismatch" errors for token-auth clients.

        // Register the 'admin' middleware alias
        $middleware->alias([
            'admin' => EnsureUserIsAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
    })->create();
