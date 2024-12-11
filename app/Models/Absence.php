<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    protected $fillable = ['numAbs','impersoo','nomprenom','motifabs','duree','datedebut','datefin','lieu'];
}
