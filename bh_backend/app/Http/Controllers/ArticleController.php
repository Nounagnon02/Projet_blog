<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllHistories()
    {
        return Article::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function storeHistory(Request $request)
{
    try {
        Log::info('Incoming request data:', [
            'has_file1' => $request->hasFile('image1'),
            'has_file2' => $request->hasFile('image2'),
            'all_data' => $request->all(),
            'files' => $request->allFiles()
        ]);

        $validated = $request->validate([
            'title' => 'required|string|min:2|unique:articles,title',
            'content' => 'required|string|min:10',
            'short_description' => 'required|string|max:1000',
            'image1' => 'required|file|image|mimes:jpeg,png,jpg|max:5120',
            'image2' => 'required|file|image|mimes:jpeg,png,jpg|max:5120',
            'category_id' => 'required|exists:categories,id',
            'author_id' => 'required|exists:users,id',
            'date_published' => 'nullable|date',
        ]);

        // CORRECTION : Formater la date pour MySQL
        if (!empty($validated['date_published'])) {
            $validated['date_published'] = \Carbon\Carbon::parse($validated['date_published'])->format('Y-m-d H:i:s');
        } else {
            $validated['date_published'] = now()->format('Y-m-d H:i:s');
        }

        // Vérification du dossier de stockage
        $uploadPath = storage_path('app/public/histoires_images');
        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0775, true);
        }

        // CORRECTION : Simplifier le traitement des images
        if (!$request->hasFile('image1') || !$request->hasFile('image2')) {
            return response()->json([
                'success' => false,
                'message' => 'Les deux images sont requises',
                'errors' => ['image' => ['Veuillez sélectionner deux images']]
            ], 422);
        }

        $file1 = $request->file('image1');
        $file2 = $request->file('image2');

        if (!$file1->isValid() || !$file2->isValid()) {
            return response()->json([
                'success' => false,
                'message' => 'Fichiers image non valides',
                'errors' => ['image' => ['Les fichiers image ne sont pas valides']]
            ], 422);
        }

        // CORRECTION : Générer des noms de fichiers différents pour chaque image
        $timestamp = time();
        $sluggedTitle = Str::slug($request->title);
        
        $filename1 = $timestamp . '_1_' . $sluggedTitle . '.' . $file1->getClientOriginalExtension();
        $filename2 = $timestamp . '_2_' . $sluggedTitle . '.' . $file2->getClientOriginalExtension();

        // Upload des fichiers
        $path1 = $file1->storeAs('histoires_images', $filename1, 'public');
        $path2 = $file2->storeAs('histoires_images', $filename2, 'public');

        // Vérification des uploads
        if (!Storage::disk('public')->exists($path1)) {
            throw new \Exception('L\'enregistrement de la première image a échoué');
        }
        if (!Storage::disk('public')->exists($path2)) {
            throw new \Exception('L\'enregistrement de la seconde image a échoué');
        }

        // Ajout des chemins d'images
        $validated['image1'] = $path1;
        $validated['image2'] = $path2;

        Log::info('Images uploaded successfully', ['path1' => $path1, 'path2' => $path2]);

        // Création de l'article
        $histoires = Article::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Histoire créée avec succès',
            'data' => $histoires,
            'image_url1' => asset('storage/' . $path1),
            'image_url2' => asset('storage/' . $path2),
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        Log::error('Validation failed', ['errors' => $e->errors()]);
        return response()->json([
            'success' => false,
            'message' => 'Erreur de validation',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        Log::error('History registration error', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la création de l\'histoire: ' . $e->getMessage()
        ], 500);
    }
}

    /*public function storeHistory(Request $request)
    {
        try {
            Log::info('Incoming request data:', [
                'has_file1' => $request->hasFile('image1'),
                'has_file2' => $request->hasFile('image2'),
                'all_data' => $request->all(),
                'files' => $request->allFiles()
            ]);

            $validated = $request->validate([
                'title' => 'required|string|min:2|unique:articles,title',
                'content' => 'required|string|min:10',
                'short_description' => 'required|string|max:1000',
                'image1' => 'required|file|image|mimes:jpeg,png,jpg|max:5120',
                'image2' => 'required|file|image|mimes:jpeg,png,jpg|max:5120',
                'category_id' => 'required|exists:categories,id',
                'author_id' => 'required|exists:users,id',
                'date_published' => 'nullable|date',
            ]);

            // Format the date for MySQL
            if (!empty($validated['date_published'])) {
                $validated['date_published'] = \Carbon\Carbon::parse($validated['date_published'])->format('Y-m-d H:i:s');
            }

            $uploadPath = storage_path('app/public/histoires_images');
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0775, true);
            }

            // Initialize image paths
            $path1 = null;
            $path2 = null;

            // Vérifier que les deux images sont présentes
            if (!$request->hasFile('image1') || !$request->hasFile('image2')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Les deux images sont requises',
                    'errors' => ['image' => ['Veuillez sélectionner deux images']]
                ], 422);
            }

            $file1 = $request->file('image1');
            $file2 = $request->file('image2');

            // Vérifier que les fichiers sont valides
            if (!$file1->isValid() || !$file2->isValid()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Fichiers image non valides',
                    'errors' => ['image' => ['Les fichiers image ne sont pas valides']]
                ], 422);
            }

            // Generate unique filenames for each image
            $timestamp = time();
            $sluggedTitle = Str::slug($request->title);
            
            $filename1 = $timestamp . '_1_' . $sluggedTitle . '.' . $file1->getClientOriginalExtension();
            $filename2 = $timestamp . '_2_' . $sluggedTitle . '.' . $file2->getClientOriginalExtension();

            $path1 = $file1->storeAs('histoires_images', $filename1, 'public');
            $path2 = $file2->storeAs('histoires_images', $filename2, 'public');

            // Vérifier que les fichiers ont été uploadés
            if (!Storage::disk('public')->exists($path1)) {
                throw new \Exception('L\'enregistrement de la première image a échoué');
            }
            if (!Storage::disk('public')->exists($path2)) {
                throw new \Exception('L\'enregistrement de la seconde image a échoué');
            }

            // Add image paths to validated data - THIS IS CRITICAL
            $validated['image1'] = $path1;
            $validated['image2'] = $path2;

            Log::info('Images uploaded successfully', [
                'path1' => $path1, 
                'path2' => $path2
            ]);

            // Debug: log what will be inserted
            Log::info('Data to be inserted:', $validated);

            // Création de l'article
            $histoire = Article::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Histoire créée avec succès',
                'data' => $histoire,
                'image_url1' => asset('storage/' . $path1),
                'image_url2' => asset('storage/' . $path2),
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            Log::error('History registration error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de l\'histoire: ' . $e->getMessage()
            ], 500);
        }
    }*/

    // Method to update history details
    public function updateHistory(Request $request, $id)
    {
        try {
            $histoires = Article::find($id);
            if (!$histoires) {
                return response()->json(['success' => false, 'message' => 'History not found'], 404);
            }

            // Validate the request data
            $validated = $request->validate([
                'title' => 'required|string|min:2|unique:articles,title,' . $id,
                'content' => 'required|string|min:10',
                'short_description' => 'string|max:1000',
                'image1' => 'nullable|file|image|mimes:jpeg,png,jpg|max:5120',
                'image2' => 'nullable|file|image|mimes:jpeg,png,jpg|max:5120',
                'category_id' => 'required|exists:categories,id',
                'author_id' => 'required|exists:users,id',
                'date_published' => 'nullable|date',
            ]);

            // Format the date for MySQL
            if (!empty($validated['date_published'])) {
                $validated['date_published'] = \Carbon\Carbon::parse($validated['date_published'])->format('Y-m-d H:i:s');
            }

            // Handle image uploads separately
            if ($request->hasFile('image1')) {
                $file1 = $request->file('image1');
                
                // Delete old image if exists
                if ($histoires->image1 && Storage::disk('public')->exists($histoires->image1)) {
                    Storage::disk('public')->delete($histoires->image1);
                }

                $timestamp = time();
                $sluggedTitle = Str::slug($request->title ?? $histoires->title);
                $filename1 = $timestamp . '_1_' . $sluggedTitle . '.' . $file1->getClientOriginalExtension();
                
                $path1 = $file1->storeAs('histoires_images', $filename1, 'public');
                $validated['image1'] = $path1;
            }
            
            if ($request->hasFile('image2')) {
                $file2 = $request->file('image2');
                
                // Delete old image if exists
                if ($histoires->image2 && Storage::disk('public')->exists($histoires->image2)) {
                    Storage::disk('public')->delete($histoires->image2);
                }

                $timestamp = time();
                $sluggedTitle = Str::slug($request->title ?? $histoires->title);
                $filename2 = $timestamp . '_2_' . $sluggedTitle . '.' . $file2->getClientOriginalExtension();
                
                $path2 = $file2->storeAs('histoires_images', $filename2, 'public');
                $validated['image2'] = $path2;
            }

            $histoires->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Histoire mise à jour avec succès',
                'data' => $histoires,
                'image_url1' => $histoires->image1 ? asset('storage/' . $histoires->image1) : null,
                'image_url2' => $histoires->image2 ? asset('storage/' . $histoires->image2) : null,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('History update error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour de l\'histoire: ' . $e->getMessage()
            ], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroyHistory(Article $article)
    {
        //
        $histoires = Article::find($article);
        if (!$histoires) {
            return response()->json(['success' => false, 'message' => 'History not found'], 404);
        }
        $histoires->delete();
        return response()->json(['message' => 'Histoire supprimée'], 200);

    }
}
