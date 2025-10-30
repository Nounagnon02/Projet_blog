<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Article;
use Illuminate\Support\Facades\Hash;

class DatabasePopulator extends Seeder
{
    public function run()
    {
        // 1. Créer un utilisateur admin
        $admin = User::create([
            'name' => 'Administrateur',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);

        // 2. Créer des catégories
        $categories = [
            ['name' => 'Aventure'],
            ['name' => 'Romance'], 
            ['name' => 'Mystère'],
            ['name' => 'Science-Fiction'],
            ['name' => 'Fantastique'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // 3. Créer des articles de démonstration
        $articles = [
            [
                'title' => 'L\'épopée de l\'explorateur perdu',
                'content1' => 'C\'est l\'histoire d\'un explorateur qui a disparu dans la jungle amazonienne...',
                'content2' => 'Après des semaines de recherches, il a finalement été retrouvé sain et sauf.',
                'short_description' => 'Une aventure palpitante dans la jungle.',
                'image1' => 'explorer1.jpg',
                'image2' => 'explorer2.jpg',
                'author_id' => $admin->id,
                'category_id' => Category::where('name', 'Aventure')->first()->id,
                'date_published' => now(),
            ],
            [
                'title' => 'Le mystère de la maison hantée',
                'content1' => 'Une vieille maison abandonnée recèle de nombreux secrets...',
                'content2' => 'Les habitants du village racontent des histoires effrayantes à son sujet.',
                'short_description' => 'Un récit captivant de mystère et de suspense.',
                'image1' => 'haunted1.jpg',
                'image2' => 'haunted2.jpg',
                'author_id' => $admin->id,
                'category_id' => Category::where('name', 'Mystère')->first()->id,
                'date_published' => now(),
            ],
            [
                'title' => 'Amour au clair de lune',
                'content1' => 'Deux âmes sœurs se rencontrent lors d\'une nuit étoilée...',
                'content2' => 'Leur histoire d\'amour transcende le temps et l\'espace.',
                'short_description' => 'Une romance touchante sous le ciel nocturne.',
                'image1' => 'romance1.jpg',
                'image2' => 'romance2.jpg',
                'author_id' => $admin->id,
                'category_id' => Category::where('name', 'Romance')->first()->id,
                'date_published' => now(),
            ],
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }

        $this->command->info('✅ Base de données peuplée avec succès !');
        $this->command->info('👤 Admin: admin@storyhub.com / admin123');
        $this->command->info('📝 3 articles de démo créés');
    }
}