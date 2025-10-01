<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\ArticleController;

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
