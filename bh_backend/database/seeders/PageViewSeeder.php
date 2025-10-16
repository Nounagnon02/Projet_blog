<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PageView;
use App\Models\Article;

class PageViewSeeder extends Seeder
{
    public function run(): void
    {
        $articles = Article::all();
        
        foreach ($articles as $article) {
            $viewCount = rand(10, 100);
            
            for ($i = 0; $i < $viewCount; $i++) {
                PageView::create([
                    'page' => '/article/' . $article->id,
                    'article_id' => $article->id,
                    'type' => 'article_view',
                    'browser' => ['Chrome', 'Firefox', 'Safari', 'Edge'][rand(0, 3)],
                    'os' => ['Windows', 'macOS', 'Linux', 'Android', 'iOS'][rand(0, 4)],
                    'device' => ['Desktop', 'Mobile', 'Tablet'][rand(0, 2)],
                    'country' => ['France', 'Canada', 'Belgique', 'Suisse'][rand(0, 3)],
                    'ip_address' => rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255) . '.' . rand(1, 255),
                    'created_at' => now()->subDays(rand(0, 30))
                ]);
            }
        }
    }
}
