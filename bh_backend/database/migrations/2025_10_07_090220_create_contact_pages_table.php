<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
      public function up(): void
    {
        Schema::create('contact_pages', function (Blueprint $table) {
            $table->id();
            $table->string('hero_title');
            $table->text('hero_subtitle');
            $table->string('email');
            $table->string('email_subtitle');
            $table->string('phone');
            $table->string('phone_subtitle');
            $table->string('address');
            $table->string('address_subtitle');
            $table->string('social');
            $table->string('social_subtitle');
            $table->string('form_title');
            $table->text('form_subtitle');
            $table->string('faq_title');
            $table->string('faq_question_1');
            $table->text('faq_answer_1');
            $table->string('faq_question_2');
            $table->text('faq_answer_2');
            $table->string('faq_question_3');
            $table->text('faq_answer_3');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_pages');
    }

};
