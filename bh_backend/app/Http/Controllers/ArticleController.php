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
                'has_file' => $request->hasFile('image'),
                'all_data' => $request->all(),
                'files' => $request->allFiles()
            ]);
            // Validation complète incluant l'image
            $validated = $request->validate([
                'title' => 'required|string|min:2|unique:articles,title',
                'content' => 'required|string|min:10',
                'short_description' => 'string|max:1000',
                'image' => 'required|file|image|mimes:jpeg,png,jpg|max:5120',
                'category_id' => 'required|exists:categories,id',
                'author_id' => 'required|exists:users,id',
                'date_published' => 'nullable|date',
            ]);

            // Vérification du dossier de stockage
            $uploadPath = storage_path('app/public/histoires_images');
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0775, true);
            }

            // Traitement de l'image
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                // Vérifier que le fichier est valide
                if ($file->isValid()) {
                    $filename = time() . '_' . Str::slug($request->title)
                            . '.' . $file->getClientOriginalExtension();

                    // Upload du fichier
                    $path = $file->storeAs('histoires_images', $filename, 'public');

                    if (!Storage::disk('public')->exists($path)) {
                        throw new \Exception('L\'enregistrement du fichier a échoué');
                    }

                    // Ajout du chemin de l'image aux données validées
                    $validated['image'] = $path;
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Erreur de validation',
                        'errors' => ['image' => ['Le fichier image n\'est pas valide']]
                    ], 422);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur de validation',
                    'errors' => ['image' => ['Aucun fichier image fourni']]
                ], 422);
            }

            // Création de la chambre
            $histoires = Article::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Histoire créée avec succès',
                'data' => $histoires,
                'image_url' => asset('storage/' . $path)
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

    // Method to update room details
    public function updateHistory(Request $request, $id)
    {
        try {
            $histoires = Article::find($id);
            if (!$histoires) {
                return response()->json(['success' => false, 'message' => 'History not found'], 404);
            }

            // Validate the request data
            $validated = $request->validate([
                'title' => 'required|string|min:2|unique:articles,title',
                'content' => 'required|string|min:10',
                'short_description' => 'string|max:1000',
                'image' => 'required|file|image|mimes:jpeg,png,jpg|max:5120',
                'category_id' => 'required|exists:categories,id',
                'author_id' => 'required|exists:users,id',
                'date_published' => 'nullable|date',
            ]);

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $file = $request->file('image');

                if ($file->isValid()) {
                    // Delete old image if exists
                    if ($histoires->image && Storage::disk('public')->exists($histoires->image)) {
                        Storage::disk('public')->delete($histoires->image);
                    }

                    $filename = time() . '_' . Str::slug($request->title ?? $histoires->title)
                            . '.' . $file->getClientOriginalExtension();

                    $path = $file->storeAs('histoires_images', $filename, 'public');
                    $validated['image'] = $path;
                }
            }

            $histoires->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'History updated successfully',
                'data' => $histoires
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('History update error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'An error occurred during room update.'
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
