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
    });

    // Gestion de la page "Contact"
    Route::prefix('contact')->group(function () {
        Route::put('/', [ContactPageController::class, 'update']);
    });

    // Gestion de la page "Politique de confidentialité"
    Route::prefix('privacy')->group(function () {
        Route::put('/', [PrivacyPageController::class, 'update']);
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
});
