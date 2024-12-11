<?php

namespace App\Http\Controllers;

use App\Models\Sortie;
use Illuminate\Http\Request;
use DB;

class SortieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $affich = DB::table('sorties')->orderBy('id', 'asc')->get();

        return response($affich, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function insert(Request $request)
    {
        $valid = $request->validate([
            'numSortie' =>['int'],
            'imperso' =>['string'],
            'nompers' =>['string'],
            'duree' =>['int'],
            'fonction' =>['string'],
            'motif' =>['string'],
            'heurdebut' =>['string'],
            'heurefin' =>['string'],
            'daty' =>['date'],
        ]);

        $sortie = Sortie::create([
            'numSortie'=>$valid['numSortie'],
            'imperso'=>$valid['imperso'],
            'nompers'=>$valid['nompers'],
            'duree'=>$valid['duree'],
            'fonction'=>$valid['fonction'],
            'motif'=>$valid['motif'],
            'heurdebut'=>$valid['heurdebut'],
            'heurefin'=>$valid['heurefin'],
            'daty'=>$valid['daty'],
        ]);

        $sortie->save();
        return response($sortie, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sortie  $sortie
     * @return \Illuminate\Http\Response
     */
    public function show(Sortie $sortie)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sortie  $sortie
     * @return \Illuminate\Http\Response
     */
    public function edit(Sortie $sortie, $id)
    {
        
        $edit = Sortie::find($id);

        if (!$edit) {
           return response(["message"=>"aucun id $id correspondre!!"],403);
        }
        return response($edit,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sortie  $sortie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $valid = $request->validate([
            'numSortie' =>['int'],
            'imperso' =>['string'],
            'nompers' =>['string'],
            'duree' =>['int'],
            'fonction' =>['string'],
            'motif' =>['string'],
            'heurdebut' =>['string'],
            'heurefin' =>['string'],
            'daty' =>['date'],
        ]);
        $modif = Sortie::find($id);
        if (!$modif) {
            return response(["message"=>"id $id not found in table sorties"], 403);
        }

        $modif->Update($valid);
        return response(["message"=>"Modification success!!"], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sortie  $sortie
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $id_sortie = Sortie::find($id);
       
        if (!$id_sortie) {
            return response(["message"=>"the id $id is not exists"], 404);
        }
        $id_sortie->delete();

        return response(["message"=>"bien supprimé!!"], 201);
    }
    function rechercheSortie(Request $request, $im){
        $q= request()->input('im');
        $search = Sortie::where('numSortie', 'like', "%{$im}%")
                            ->orWhere('imperso','like', "%{$im}%")
                            ->orWhere('nompers','like', "%{$im}%")
                            ->orWhere('duree','like', "%{$im}%")
                            ->orWhere('fonction','like', "%{$im}%")
                            ->orWhere('motif','like', "%{$im}%")
                            ->orWhere('heurdebut','like', "%{$im}%")
                            ->orWhere('heurefin','like', "%{$im}%")
                            ->orWhere('daty','like', "%{$im}%")
                            ->get();
        return response($search, 200);
    }
}
