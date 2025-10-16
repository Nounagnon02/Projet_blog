<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleTranslation extends Model
{
    protected $fillable = [
        'article_id',
        'language',
        'title',
        'content',
        'excerpt'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
