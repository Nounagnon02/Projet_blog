#!/bin/bash

# Démarrer PHP-FPM en arrière-plan
php-fpm -D

# Exécuter les migrations
php artisan migrate --force

# Optimiser l'application
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Créer le lien symbolique pour le storage
php artisan storage:link

# Démarrer Nginx au premier plan
nginx -g 'daemon off;'