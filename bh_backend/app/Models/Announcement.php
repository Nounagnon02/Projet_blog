<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'type',
        'active',
        'order'
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Scope pour récupérer seulement les annonces actives
     */
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    /**
     * Scope pour récupérer les annonces par type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Récupérer toutes les annonces actives ordonnées
     */
    public static function getActiveOrdered()
    {
        return self::active()->orderBy('order')->orderBy('created_at', 'desc')->get();
    }

    /**
     * Récupérer l'icône selon le type
     */
    public function getIconAttribute()
    {
        return match($this->type) {
            'info' => 'ℹ️',
            'promotion' => '🎉',
            'event' => '📢',
            'warning' => '⚠️',
            default => 'ℹ️'
        };
    }
}
