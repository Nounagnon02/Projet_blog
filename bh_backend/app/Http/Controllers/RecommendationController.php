<?php

namespace App\Http\Controllers;

use App\Services\RecommendationService;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    protected $recommendationService;

    public function __construct(RecommendationService $recommendationService)
    {
        $this->recommendationService = $recommendationService;
    }

    public function getRecommendations($articleId)
    {
        try {
            $recommendations = $this->recommendationService->getRecommendations($articleId, 5);
            
            return response()->json([
                'success' => true,
                'data' => $recommendations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des recommandations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTrending(Request $request)
    {
        try {
            $days = $request->get('days', 7);
            $limit = $request->get('limit', 10);
            
            $trending = $this->recommendationService->getTrendingArticles($days, $limit);
            
            return response()->json([
                'success' => true,
                'data' => $trending
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des tendances',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
