<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\PageView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    public function getDashboard()
    {
        try {
            $stats = [
                'articles' => [
                    'total' => Article::count(),
                    'published' => Article::count(),
                    'draft' => 0,
                ],
                'categories' => [
                    'total' => Category::count(),
                ],
                'messages' => [
                    'total' => ContactMessage::count(),
                    'unread' => ContactMessage::where('read', false)->count(),
                    'replied' => ContactMessage::where('replied', true)->count(),
                ],
                'views' => [
                    'total' => PageView::count(),
                    'today' => PageView::whereDate('created_at', today())->count(),
                    'week' => PageView::whereBetween('created_at', [now()->subDays(7), now()])->count(),
                    'month' => PageView::whereBetween('created_at', [now()->subDays(30), now()])->count(),
                ]
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPageViews(Request $request)
    {
        try {
            $days = $request->get('days', 7);
            
            $views = PageView::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->whereBetween('created_at', [now()->subDays($days), now()])
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $views
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des vues',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getTopArticles(Request $request)
    {
        try {
            $limit = $request->get('limit', 10);
            
            $topArticles = PageView::select('article_id', DB::raw('COUNT(*) as views'))
                ->whereNotNull('article_id')
                ->groupBy('article_id')
                ->orderBy('views', 'desc')
                ->limit($limit)
                ->with('article:id,title')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $topArticles
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des articles populaires',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getDeviceStats()
    {
        try {
            $devices = PageView::select('device', DB::raw('COUNT(*) as count'))
                ->groupBy('device')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $devices
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques d\'appareils',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getBrowserStats()
    {
        try {
            $browsers = PageView::select('browser', DB::raw('COUNT(*) as count'))
                ->groupBy('browser')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $browsers
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques de navigateurs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getOsStats()
    {
        try {
            $os = PageView::select('os', DB::raw('COUNT(*) as count'))
                ->groupBy('os')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $os
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques d\'OS',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getCountryStats()
    {
        try {
            $countries = PageView::select('country', DB::raw('COUNT(*) as count'))
                ->whereNotNull('country')
                ->groupBy('country')
                ->orderBy('count', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $countries
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques de pays',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
