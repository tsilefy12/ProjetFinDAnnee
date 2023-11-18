<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;
    protected $fillable = ['im', 'nomperson', 'fonction','indice', 'grade', 'corps', 'dateAffect', 'budget', 'imputbudget', 'lieuService'];
}
