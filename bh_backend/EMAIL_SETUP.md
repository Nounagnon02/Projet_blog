# Configuration Email pour l'envoi de réponses

## Option 1: Gmail (Recommandé pour les tests)

1. **Activer l'authentification à 2 facteurs** sur votre compte Gmail
2. **Générer un mot de passe d'application**:
   - Allez sur https://myaccount.google.com/security
   - Cliquez sur "Mots de passe des applications"
   - Sélectionnez "Mail" et "Autre"
   - Copiez le mot de passe généré (16 caractères)

3. **Modifier le fichier .env**:
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=votre-email@gmail.com
MAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx  # Mot de passe d'application
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@bloghistoire.com"
MAIL_FROM_NAME="Blog Histoire"
```

## Option 2: Mailtrap (Pour les tests en développement)

1. Créez un compte sur https://mailtrap.io
2. Copiez les identifiants SMTP

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=votre-username-mailtrap
MAIL_PASSWORD=votre-password-mailtrap
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@bloghistoire.com"
MAIL_FROM_NAME="Blog Histoire"
```

## Option 3: SendGrid (Pour la production)

1. Créez un compte sur https://sendgrid.com
2. Générez une clé API

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=votre-cle-api-sendgrid
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@bloghistoire.com"
MAIL_FROM_NAME="Blog Histoire"
```

## Test de l'envoi d'email

Après configuration, testez avec:

```bash
php artisan tinker
```

Puis dans tinker:
```php
Mail::raw('Test email', function($message) {
    $message->to('votre-email@test.com')->subject('Test');
});
```

## Vérification des logs

Les erreurs d'envoi sont dans:
```
storage/logs/laravel.log
```
