<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleTranslation;
use Illuminate\Http\Request;

class TranslationController extends Controller
{
    public function store(Request $request, $articleId)
    {
        $request->validate([
            'language' => 'required|string|max:5',
            'title' => 'required|string',
            'content' => 'required|string',
            'excerpt' => 'nullable|string'
        ]);

        $translation = ArticleTranslation::updateOrCreate(
            [
                'article_id' => $articleId,
                'language' => $request->language
            ],
            [
                'title' => $request->title,
                'content' => $request->content,
                'excerpt' => $request->excerpt
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $translation
        ]);
    }

    public function getTranslation($articleId, $language)
    {
        $translation = ArticleTranslation::where('article_id', $articleId)
            ->where('language', $language)
            ->first();

        if (!$translation) {
            return response()->json([
                'success' => false,
                'message' => 'Traduction non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $translation
        ]);
    }

    public function getAvailableLanguages($articleId)
    {
        $languages = ArticleTranslation::where('article_id', $articleId)
            ->pluck('language');

        return response()->json([
            'success' => true,
            'data' => $languages
        ]);
    }
}
