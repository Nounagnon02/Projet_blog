<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('privacy_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title');
            $table->string('hero_subtitle');
            $table->text('hero_description');
            $table->string('collecte_title');
            $table->text('collecte_description');
            $table->string('tech_info_1');
            $table->string('tech_info_2');
            $table->string('tech_info_3');
            $table->string('tech_info_4');
            $table->string('auteurs_info_1');
            $table->string('auteurs_info_2');
            $table->string('auteurs_info_3');
            $table->string('auteurs_info_4');
            $table->string('cookies_title');
            $table->text('cookies_warning');
            $table->string('analytics_title');
            $table->text('analytics_desc');
            $table->string('adsense_title');
            $table->text('adsense_desc');
            $table->text('cookie_control_text');
            $table->string('protection_title');
            $table->string('protection_feature_1');
            $table->text('protection_desc_1');
            $table->string('protection_feature_2');
            $table->text('protection_desc_2');
            $table->string('protection_feature_3');
            $table->text('protection_desc_3');
            $table->string('liens_title');
            $table->text('liens_description');
            $table->string('lien_1');
            $table->string('lien_2');
            $table->string('lien_3');
            $table->text('liens_disclaimer');
            $table->string('consent_title');
            $table->text('consent_text');
            $table->string('consent_note');
            $table->string('contact_title');
            $table->text('contact_text');
            $table->string('contact_email');
            $table->string('contact_method');
            $table->string('update_title');
            $table->string('update_date');
            $table->text('update_note');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('privacy_pages');
    }
};
