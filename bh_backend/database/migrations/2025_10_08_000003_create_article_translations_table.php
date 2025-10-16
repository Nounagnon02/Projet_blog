<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->onDelete('cascade');
            $table->string('language', 5); // fr, en, es, de, etc.
            $table->string('title');
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->timestamps();
            
            $table->unique(['article_id', 'language']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_translations');
    }
};
