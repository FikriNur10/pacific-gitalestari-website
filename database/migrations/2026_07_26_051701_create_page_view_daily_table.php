<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('page_view_daily', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('path');
            $table->unsignedInteger('views')->default(0);
            $table->unsignedInteger('uniques')->default(0);
            $table->timestamps();

            // One rollup row per (day, path) — lets the command upsert idempotently.
            $table->unique(['date', 'path']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_view_daily');
    }
};
