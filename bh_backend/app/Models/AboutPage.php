<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'mission_title',
        'mission_subtitle',
        'mission_inspire',
        'mission_connect',
        'mission_innovate',
        'team_title',
        'team_subtitle',
        'cta_title',
        'cta_subtitle',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Récupérer la page About active
     */
    public static function getActive()
    {
        return self::where('is_active', true)->first();
    }

    /**
     * Créer ou mettre à jour la page About
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
