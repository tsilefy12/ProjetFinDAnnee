<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonnelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();
            $table->integer('im');
            $table->string('nomperson');
            $table->string('fonction');
            $table->string('indice');
            $table->string('grade');
            $table->string('corps');
            $table->date('dateAffect');
            $table->string('budget');
            $table->string('imputbudget');
            $table->string('lieuService');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personnels');
    }
}
