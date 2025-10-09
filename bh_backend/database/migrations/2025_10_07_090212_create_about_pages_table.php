<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title');
            $table->text('hero_subtitle');
            $table->string('mission_title');
            $table->text('mission_subtitle');
            $table->text('mission_inspire');
            $table->text('mission_connect');
            $table->text('mission_innovate');
            $table->string('team_title');
            $table->text('team_subtitle');
            $table->string('cta_title');
            $table->text('cta_subtitle');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_pages');
    }

};
