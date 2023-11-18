<?php

namespace App\Http\Controllers;

use App\Models\Absence;
use Illuminate\Http\Request;
use DB;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $abs = DB::table('absences')->orderBy('datedebut', 'asc')->get();

        return response($abs, 200);
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
        $validator = $request->validate([
            'numAbs' =>['required', 'unique:absences'],
            'impersoo' =>['string'],
            'nomprenom'=>['string'],
            'motifabs'=>['string'],
            'duree'=>['int'],
            'datedebut'=>['date'],
            'datefin'=>['string'],
            'lieu'=>['string'],
        ]);

        $absence = Absence::create([
            'numAbs' =>$validator['numAbs'],
            'impersoo' =>$validator['impersoo'],
            'nomprenom' =>$validator['nomprenom'],
            'motifabs' =>$validator['motifabs'],
            'duree' =>$validator['duree'],
            'datedebut' =>$validator['datedebut'],
            'datefin' =>$validator['datefin'],
            'lieu' =>$validator['lieu'],
        ]);

        $absence->save();

        return response($absence, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function show(Absence $absence)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $edit = Absence::find($id);

        if (!$edit) {
           return response(["message"=>"aucun id $id correspondre!!"],403);
        }
        return response($edit,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $valider = $request->validate([
            'numAbs' =>['int'],
            'impersoo' =>['string'],
            'nomprenom'=>['string'],
            'motifabs'=>['string'],
            'duree'=>['int'],
            'datedebut'=>['date'],
            'datefin'=>['string'],
            'lieu'=>['string'],
        ]);
        $modif = Absence::find($id);
        if (!$modif) {
            return response(["message"=>"id $id not found in table absences"], 403);
        }

        $modif->Update($valider);
        return response(["message"=>"Modification success!!"], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $verifier = Absence::find($id);

        if (!$verifier) {
            return response(["message"=>"id $id not found in table absences"], 404);
        }

        $verifier->delete();

        return response(["message"=>"bine supprimé!!"], 201);
    }
    function rechercheAbsence(Request $request, $imm){
        $q= request()->input('im');
        $search = Absence::where('numAbs', 'like', "%{$imm}%")
                            ->orWhere('impersoo','like', "%{$imm}%")
                            ->orWhere('nomprenom','like', "%{$imm}%")
                            ->orWhere('motifabs','like', "%{$imm}%")
                            ->orWhere('duree','like', "%{$imm}%")
                            ->orWhere('datedebut','like', "%{$imm}%")
                            ->orWhere('datefin','like', "%{$imm}%")
                            ->orWhere('lieu','like', "%{$imm}%")
                            ->get();

        return response($search, 200);
    }
    function countNbrjoursAbs($impersoo){
        $count = Absence::where('impersoo', $impersoo)
                    ->sum('duree');
        return response($count, 200);
    }
}
