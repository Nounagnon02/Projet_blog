<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'email',
        'email_subtitle',
        'phone',
        'phone_subtitle',
        'address',
        'address_subtitle',
        'social',
        'social_subtitle',
        'form_title',
        'form_subtitle',
        'faq_title',
        'faq_question_1',
        'faq_answer_1',
        'faq_question_2',
        'faq_answer_2',
        'faq_question_3',
        'faq_answer_3',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Récupérer la page Contact active
     */
    public static function getActive()
    {
        return self::where('is_active', true)->first();
    }

    /**
     * Créer ou mettre à jour la page Contact
     */
    public static function updateOrCreatePage(array $data)
    {
        $activePage = self::where('is_active', true)->first();

        if ($activePage) {
            $activePage->update($data);
            return $activePage;
        }

        return self::create(array_merge($data, ['is_active' => true]));
    }
}
