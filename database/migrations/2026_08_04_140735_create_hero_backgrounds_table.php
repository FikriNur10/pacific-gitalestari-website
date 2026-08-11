<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A row exists ONLY when an admin has uploaded a per-page override; pages
     * without a row fall back to the bundled default (App\Enums\HeroPage).
     * Hence `image_path` is NOT nullable — no row means "use the default".
     */
    public function up(): void
    {
        Schema::create('hero_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->string('page')->unique(); // App\Enums\HeroPage value
            $table->string('image_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_backgrounds');
    }
};
