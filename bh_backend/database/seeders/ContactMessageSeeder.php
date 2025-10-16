<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactMessage;

class ContactMessageSeeder extends Seeder
{
    public function run(): void
    {
        ContactMessage::create([
            'name' => 'Jean Dupont',
            'email' => 'jean.dupont@email.com',
            'subject' => 'Problème de connexion',
            'message' => 'Je n\'arrive pas à me connecter à mon compte depuis hier.',
            'read' => false,
            'replied' => false
        ]);

        ContactMessage::create([
            'name' => 'Marie Martin',
            'email' => 'marie.martin@email.com',
            'subject' => 'Suggestion de livre',
            'message' => 'Serait-il possible d\'ajouter plus de livres de science-fiction ?',
            'read' => true,
            'replied' => true,
            'reply_text' => 'Merci pour votre suggestion !',
            'replied_at' => now()
        ]);
    }
}
