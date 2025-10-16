<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\AboutPageController;
use App\Http\Controllers\Admin\ContactPageController;
use App\Http\Controllers\Admin\PrivacyPageController;
use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\StatisticsController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\TranslationController;
use App\Http\Controllers\PageViewController;
use App\Http\Controllers\EmailsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'articles'], function () {
    Route::get('/', [ArticleController::class , 'getAllHistories']);
    Route::post('/storage', [ArticleController::class,   'storeHistory']);
    Route::put('/update/{id}', [ArticleController::class, 'updateHistory']);
    Route::delete('/destroy/{id}', [ArticleController::class, 'destroyHistory']);
});

Route::group(['prefix' => 'categories'], function(){
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/store', [CategoryController::class, 'store']);
    Route::delete('/destroy/{id}', [CategoryController::class, 'destroy']);
    Route::put('/update/{id}', [CategoryController::class, 'update']);
});
Route::group(['prefix' => 'email'], function(){
    Route::get('/', [EmailsController::class, 'index']);
    Route::post('/store', [EmailsController::class, 'store']);
    Route::delete('/destroy/{id}', [EmailsController::class, 'destroy']);
    Route::put('/update/{id}', [EmailsController::class, 'update']);
});


// Routes publiques pour afficher les pages
Route::prefix('pages')->group(function () {
    Route::get('/about', [AboutPageController::class, 'show']);
    Route::get('/contact', [ContactPageController::class, 'show']);
    Route::get('/privacy', [PrivacyPageController::class, 'show']);
});

// Routes publiques pour les annonces actives
Route::get('/announcements/active', [AnnouncementController::class, 'active']);

// Routes protégées pour l'administration (temporairement sans auth pour les tests)
Route::prefix('admin')->group(function () {

    // Gestion de la page "À Propos"
    Route::prefix('about')->group(function () {
        Route::put('/', [AboutPageController::class, 'update']);
        Route::get('/',[AboutPageController::class, 'index']);
    });

    // Gestion de la page "Contact"
    Route::prefix('contact')->group(function () {
        Route::put('/', [ContactPageController::class, 'update']);
        Route::get('/',[ContactPageController::class, 'index']);
    });

    // Gestion de la page "Politique de confidentialité"
    Route::prefix('privacy')->group(function () {
        Route::put('/', [PrivacyPageController::class, 'update']);
        Route::get('/',[PrivacyPageController::class, 'index']);
    });

    // Gestion des annonces
    Route::prefix('announcements')->group(function () {
        Route::get('/', [AnnouncementController::class, 'index']);
        Route::post('/', [AnnouncementController::class, 'store']);
        Route::put('/{id}', [AnnouncementController::class, 'update']);
        Route::patch('/{id}/toggle', [AnnouncementController::class, 'toggleActive']);
        Route::delete('/{id}', [AnnouncementController::class, 'destroy']);
        Route::post('/reorder', [AnnouncementController::class, 'updateOrder']);
    });

    // Gestion des messages
    Route::prefix('messages')->group(function () {
        Route::get('/', [MessageController::class, 'index']);
        Route::get('/stats', [MessageController::class, 'getStats']);
        Route::get('/{id}', [MessageController::class, 'show']);
        Route::post('/{id}/reply', [MessageController::class, 'reply']);
        Route::patch('/{id}/read', [MessageController::class, 'markAsRead']);
        Route::delete('/{id}', [MessageController::class, 'destroy']);
    });

    // Statistiques
    Route::prefix('statistics')->group(function () {
        Route::get('/dashboard', [StatisticsController::class, 'getDashboard']);
        Route::get('/page-views', [StatisticsController::class, 'getPageViews']);
        Route::get('/top-articles', [StatisticsController::class, 'getTopArticles']);
        Route::get('/devices', [StatisticsController::class, 'getDeviceStats']);
        Route::get('/browsers', [StatisticsController::class, 'getBrowserStats']);
        Route::get('/os', [StatisticsController::class, 'getOsStats']);
        Route::get('/countries', [StatisticsController::class, 'getCountryStats']);
    });

    // Traductions
    Route::prefix('articles/{articleId}/translations')->group(function () {
        Route::post('/', [TranslationController::class, 'store']);
        Route::get('/languages', [TranslationController::class, 'getAvailableLanguages']);
        Route::get('/{language}', [TranslationController::class, 'getTranslation']);
    });
});

// Routes publiques pour recommandations
Route::prefix('recommendations')->group(function () {
    Route::get('/article/{articleId}', [RecommendationController::class, 'getRecommendations']);
    Route::get('/trending', [RecommendationController::class, 'getTrending']);
});

// Routes publiques pour traductions
Route::get('/articles/{articleId}/translations/{language}', [TranslationController::class, 'getTranslation']);

// Route pour tracker les vues
Route::post('/track-view', [PageViewController::class, 'track']);
