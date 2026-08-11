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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category')->nullable()->index();
            $table->string('summary', 500)->nullable();
            $table->longText('description')->nullable(); // Markdown source
            $table->json('specs')->nullable(); // array of {label, value}
            $table->text('application')->nullable();
            $table->string('image_path')->nullable();
            $table->string('datasheet_path')->nullable();
            $table->string('status')->default('draft')->index();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
