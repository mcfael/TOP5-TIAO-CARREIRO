<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MusicaController;
use Illuminate\Support\Facades\Route;
use App\Models\User;


// Autenticação
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// Músicas
Route::get('/musicas', [MusicaController::class, 'index']);
Route::post('/musicas', [MusicaController::class, 'store'])->middleware('auth:sanctum');
Route::put('/musicas/{id}', [MusicaController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/musicas/{id}', [MusicaController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/test', function(){
    return User::all();
});