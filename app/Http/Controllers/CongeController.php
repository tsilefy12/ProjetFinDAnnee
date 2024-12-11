<?php

namespace App\Http\Controllers;

use App\Models\Conge;
use App\Models\Personnel;
use Illuminate\Http\Request;
use DB;
class CongeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $conge = DB::table('conges')->orderBy('datedebut', 'asc')->get();
        return response($conge, 200);
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
    public function store(Request $request)
    {
        $valid = $request->validate([
            'num' =>['required', 'unique:conges'],
            'impers' =>['string'],
            'nbrjrs' =>['required','max:2'],
            'datedebut' =>['date'],
            'datefin' =>['string'],
            'destination' =>['string'],
        ]);
        $conges = Conge::create([
            'num'=>$valid['num'],
            'impers'=>$valid['impers'],
            'nbrjrs'=>$valid['nbrjrs'],
            'datedebut'=>$valid['datedebut'],
            'datefin'=>$valid['datefin'],
            'destination'=>$valid['destination'],
        ]); 
        $conges->save();

        return response(["message"=>"Ajout avec succèss!!"], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Conge  $conge
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $aff = Conge::find($id);
        $q= request()->input('idd');
        if (!$aff) {
            return response(["message"=>"id $id not found in table conges"], 404);
        }
        return response($aff, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Conge  $conge
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $edit = Conge::find($id);

        if (!$edit) {
           return response(["message"=>"aucun id $id correspondre!!"],403);
        }
        return response($edit,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Conge  $conge
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $valider = $request->validate([
            'num' =>['int'],
            'impers' =>['string'],
            'nbrjrs' =>['int'],
            'datedebut' =>['date'],
            'datefin' =>['string'],
            'destination' =>['string'],
        ]);

        $modif = Conge::find($id);
        if (!$modif) {
            return response(["message"=>"id $id not found in table conges"], 403);
        }

        $modif->Update($valider);
        return response(["message"=>"Modification success!!"], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Conge  $conge
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $valid = Conge::find($id);

        if (!$valid) {
            return response(["message"=>"the id $id is not exists"], 404);
        }
        $valid->delete();

        return response(["message"=>"bien supprimé!!"], 201);
    }

    function selectIm(){
        $im=Personnel::all('im');

        if (!$im) {
            return response(["message"=>"im not found"], 404);
        }

        return response($im, 200);
    }

    function countNbrjours($im){
        $count = Conge::where('impers', $im)
                    ->sum('nbrjrs');
        return response($count, 200);
    }
    function rechercheConge(Request $request, $im){
        $q= request()->input('im');
        $search = Conge::where('num', 'like', "%{$im}%")
                            ->orWhere('impers','like', "%{$im}%")
                            ->orWhere('nbrjrs','like', "%{$im}%")
                            ->orWhere('datedebut','like', "%{$im}%")
                            ->orWhere('datefin','like', "%{$im}%")
                            ->orWhere('destination','like', "%{$im}%")
                            ->get();

        return response($search, 200);
    }
}