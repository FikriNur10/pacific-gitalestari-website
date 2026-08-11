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
        Schema::create('page_views', function (Blueprint $table) {
            $table->id();
            $table->string('path')->index();
            $table->string('referrer')->nullable();
            // Hashed, never raw — session id hash powers unique-visitor counts without storing PII.
            $table->string('session_hash', 64)->index();
            // Hashed IP (sha256 + app key salt) — retains uniqueness signal, drops the raw address.
            $table->string('ip_hash', 64)->nullable();
            $table->string('user_agent')->nullable();
            $table->string('device', 16)->nullable();
            $table->timestamp('viewed_at')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_views');
    }
};
