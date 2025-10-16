<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivacyPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'collecte_title',
        'collecte_description',
        'tech_info_1',
        'tech_info_2',
        'tech_info_3',
        'tech_info_4',
        'auteurs_info_1',
        'auteurs_info_2',
        'auteurs_info_3',
        'auteurs_info_4',
        'cookies_title',
        'cookies_warning',
        'analytics_title',
        'analytics_desc',
        'adsense_title',
        'adsense_desc',
        'cookie_control_text',
        'protection_title',
        'protection_feature_1',
        'protection_desc_1',
        'protection_feature_2',
        'protection_desc_2',
        'protection_feature_3',
        'protection_desc_3',
        'liens_title',
        'liens_description',
        'lien_1',
        'lien_2',
        'lien_3',
        'liens_disclaimer',
        'consent_title',
        'consent_text',
        'consent_note',
        'contact_title',
        'contact_text',
        'contact_email',
        'contact_method',
        'update_title',
        'update_date',
        'update_note',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Récupérer la page Privacy active
     */
    public static function getActive()
    {
        return self::where('is_active', true)->first();
    }

    /**
     * Créer ou mettre à jour la page Privacy
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
