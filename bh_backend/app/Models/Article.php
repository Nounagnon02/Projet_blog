<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PharIo\Manifest\Author;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'short_description',
        'image1',
        'image2',
        'category_id',
        'author_id',
        'date_published',
    ];

    public function Auteur(){
        return $this->belongsTo(User::class, 'author_id');
    }

    public function Categories(){
        return $this->belongsTo(Category::class);
    }

    public function Tags(){
        return $this->belongsToMany(Tag::class, 'article_tags');
    }

    public function Commentaire(){
        return $this->hasMany(Commentaire::class);
    }
 }
