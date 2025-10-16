<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commentaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'article_id',
        'utilisateur_id',
        'content',
        'date_creation',
        'statut',
    ];
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function utilisateur()
    {
        return $this->belongsTo(User::class);
    }
}
