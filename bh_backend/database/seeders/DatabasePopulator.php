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
            'email' => 'admin@storyhub.com',
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

        // 3. Créer des articles d'exemple
        $articles = [
            [
                'title' => 'Le Secret de la Forêt Enchantée',
                'short_description' => 'Une aventure magique au cœur d\'une forêt mystérieuse peuplée de créatures fantastiques.',
                'content' => 'Il était une fois, dans une forêt enchantée où les arbres murmuraient des secrets anciens...',
                'image' => 'histoires_images/foret_enchantee.jpg',
                'author_id' => $admin->id,
                'category_id' => 1,
                'date_published' => now(),
            ],
            [
                'title' => 'L\'Amour aux Temps Modernes', 
                'short_description' => 'Une histoire d\'amour contemporaine entre deux âmes perdues qui se retrouvent.',
                'content' => 'Dans l\'effervescence de la ville, deux destins se croisent par hasard...',
                'image' => 'histoires_images/amour_modernes.jpg',
                'author_id' => $admin->id,
                'category_id' => 2,
                'date_published' => now()->subDays(2),
            ],
            [
                'title' => 'Le Mystère du Manoir Hanté',
                'short_description' => 'Une enquête palpitante dans un manoir aux secrets bien gardés.',
                'content' => 'La porte grinça sinistrement lorsqu\'elle s\'ouvrit sur l\'obscurité du manoir...',
                'image' => 'histoires_images/manoir_hante.jpg', 
                'author_id' => $admin->id,
                'category_id' => 3,
                'date_published' => now()->subDays(5),
            ]
        ];

        foreach ($articles as $article) {
            Article::create($article);
        }

        $this->command->info('✅ Base de données peuplée avec succès !');
        $this->command->info('👤 Admin: admin@storyhub.com / admin123');
        $this->command->info('📝 3 articles de démo créés');
    }
}