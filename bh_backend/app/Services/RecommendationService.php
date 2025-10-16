<?php

namespace App\Services;

use App\Models\Article;
use App\Models\PageView;
use Illuminate\Support\Facades\DB;

class RecommendationService
{
    public function getRecommendations($articleId, $limit = 5)
    {
        $article = Article::findOrFail($articleId);
        
        return Article::where('id', '!=', $articleId)
            ->where('category_id', $article->category_id)
            ->inRandomOrder()
            ->limit($limit)
            ->get();
    }
    
    public function getTrendingArticles($days = 7, $limit = 10)
    {
        return Article::select('articles.*', DB::raw('COUNT(page_views.id) as views_count'))
            ->leftJoin('page_views', 'articles.id', '=', 'page_views.article_id')
            ->where('page_views.created_at', '>=', now()->subDays($days))
            ->groupBy('articles.id')
            ->orderByDesc('views_count')
            ->limit($limit)
            ->get();
    }
}
