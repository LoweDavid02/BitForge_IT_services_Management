<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_filter(array_unique([
        env('FRONTEND_URL', ''),                  // set on Render: https://bitforge-kappa.vercel.app
        rtrim(env('FRONTEND_URL', ''), '/'),       // same without trailing slash
        'https://bitforge-kappa.vercel.app',       // hardcoded fallback — your actual Vercel URL
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
    ])),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
