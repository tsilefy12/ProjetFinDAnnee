<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CongeController;
use App\Http\Controllers\SortieController;
use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\PersonnelController;
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

//Route pour conges
Route::get('/indexConge', [CongeController::class, 'index']);
Route::post('/ajoutConge', [CongeController::class, 'store']);
Route::get('/affichConge/{id}', [CongeController::class, 'show']);
Route::delete('/suppConge/{id}', [CongeController::class, 'destroy']);
Route::put('/modifConge/{id}', [CongeController::class, 'update']);
Route::get('/editConge/{id}', [CongeController::class, 'edit']);
Route::get('/selectIm', [CongeController::class, 'selectIm']);
Route::get('/countnbrjrs/{im}', [CongeController::class, 'countNbrjours']);
Route::get('/searchConge/{im}', [CongeController::class, 'rechercheConge']);

//Route pour Sortie
Route::get('/indexSortie', [SortieController::class, 'index']);
Route::post('/ajoutSortie', [SortieController::class, 'insert']);
Route::delete('/suppSortie/{id}', [SortieController::class, 'destroy']);
Route::get('/editerSortie/{id}', [SortieController::class, 'edit']);
Route::put('/modifierSortie/{id}', [SortieController::class, 'update']);
Route::get('/searchSortie/{im}', [SortieController::class, 'rechercheSortie']);

//Route pour absence
Route::get('/indexAbsence', [AbsenceController::class, 'index']);
Route::post('/ajoutAbsence', [AbsenceController::class, 'store']);
Route::delete('/suppAbsence/{id}', [AbsenceController::class, 'destroy']);
Route::get('/editAbsence/{id}', [AbsenceController::class, 'edit']);
Route::put('/modifAbs/{id}', [AbsenceController::class, 'update']);
Route::get('/searchAbs/{imm}', [AbsenceController::class, 'rechercheAbsence']);
Route::get('/countNbrjoursAbs/{impersoo}', [AbsenceController::class, 'countNbrjoursAbs']);

//Route pour personnels
Route::get('/indexPersonnel', [PersonnelController::class, 'index']);
Route::post('/ajoutPersonnel', [PersonnelController::class, 'store']);
Route::delete('/suppPersonnel/{id}', [PersonnelController::class, 'destroy']);
Route::get('/editerPersonnele/{id}', [PersonnelController::class, 'edit']);
Route::put('/updatePersonnel/{id}', [PersonnelController::class, 'update']);
Route::get('/search/{im}', [PersonnelController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
