#!/usr/bin/env bash

echo "Début du build..."

# Installation des dépendances
composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Génération de la clé si elle n'existe pas
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Cache des configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Créer les liens symboliques pour le storage
php artisan storage:link

echo "Build terminé avec succès!"
