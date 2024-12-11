<?php

namespace App\Http\Controllers;

use App\Models\Personnel;
use Illuminate\Http\Request;
use DB;

class PersonnelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $aff = Personnel::all();
        return response($aff, 200);
        /*$aff = Personnel::orderBy('im', 'asc')->paginate(1);
        $count = DB::table('personnels')->count();
        return response(compact('aff', 'count'));*/
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
        $verifypers = $request->validate([
            'im'=>["required", "unique:personnels"],
            'nomperson'=>['required'],
            'fonction'=>['required'],
            'indice'=>['required'],
            'grade'=>['required'],
            'corps'=>['required'],
            'dateAffect'=>['required'],
            'budget'=>['required'],
            'imputbudget'=>['required'],
            'lieuService'=>['required'],
        ]);
        $personnes = Personnel::create([
            'im'=>$verifypers['im'],
            'nomperson'=>$verifypers['nomperson'],
            'fonction'=>$verifypers['fonction'],
            'indice'=>$verifypers['indice'],
            'grade'=>$verifypers['grade'],
            'corps'=>$verifypers['corps'],
            'dateAffect'=>$verifypers['dateAffect'],
            'budget'=>$verifypers['budget'],
            'imputbudget'=>$verifypers['imputbudget'],
            'lieuService'=>$verifypers['lieuService'],
        ]); 

        $personnes->save();
        return response(["message"=>"Ajout reussi!!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $im)
    {
        $q= request()->input('im');
        $search = Personnel::where('im', 'like', "%{$im}%")
                            ->orWhere('nomperson','like', "%{$im}%")
                            ->orWhere('fonction','like', "%{$im}%")
                            ->orWhere('indice','like', "%{$im}%")
                            ->orWhere('grade','like', "%{$im}%")
                            ->orWhere('corps','like', "%{$im}%")
                            ->orWhere('dateAffect','like', "%{$im}%")
                            ->orWhere('budget','like', "%{$im}%")
                            ->orWhere('imputbudget','like', "%{$im}%")
                            ->orWhere('lieuService','like', "%{$im}%")
                            ->get();

        return response($search, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $personneles = Personnel::find($id);

        if (!$personneles) {
            return response(["message"=>"aucun personnel corresponds à ce numéro!!"], 404);
        }

        return response($personneles, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $verify = $request->validate([
            'im'=>["int"],
            'nomperson'=>['string'],
            'fonction'=>['string'],
            'indice'=>['int'],
            'grade'=>['string'],
            'corps'=>['string'],
            'dateAffect'=>['date'],
            'budget'=>['string'],
            'imputbudget'=>['string'],
            'lieuService'=>['string'],
        ]);
        $modif = Personnel::find($id);
        if (!$modif) {
            return response(["message"=>"id $id not found "], 404);
        }
        $modif->Update($verify);
        return response(["message"=>"Modification success!!"], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Personnel  $personnel
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pers = Personnel::find($id);

        if (!$pers) {
            
            return response(["message"=>"id $id not found in table personnels"], 404);
        }
        $pers->delete();
        return response(["message"=>"bien supprimé!!"], 201);
    }
}
