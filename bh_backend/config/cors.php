<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register', 'cinetpay/*', '*'],
    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
        'https://your-app.vercel.app',
        'https://*.vercel.app',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => ['*'],
    'max_age' => 0,
    'supports_credentials' => true,
];

