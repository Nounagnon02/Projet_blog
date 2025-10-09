<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AnnouncementController extends Controller
{
    /**
     * Récupérer toutes les annonces
     */
    public function index()
    {
        $announcements = Announcement::orderBy('order')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $announcements
        ]);
    }

    /**
     * Récupérer les annonces actives seulement
     */
    public function active()
    {
        $announcements = Announcement::getActiveOrdered();

        return response()->json([
            'success' => true,
            'data' => $announcements
        ]);
    }

    /**
     * Créer une nouvelle annonce
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'type' => 'required|in:info,promotion,event,warning',
            'active' => 'boolean',
            'order' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'type' => $request->type,
            'active' => $request->active ?? true,
            'order' => $request->order ?? 0
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Annonce créée avec succès',
            'data' => $announcement
        ], 201);
    }

    /**
     * Mettre à jour une annonce
     */
    public function update(Request $request, $id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'success' => false,
                'message' => 'Annonce non trouvée'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'type' => 'sometimes|required|in:info,promotion,event,warning',
            'active' => 'sometimes|boolean',
            'order' => 'sometimes|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $announcement->update($request->only(['title', 'content', 'type', 'active', 'order']));

        return response()->json([
            'success' => true,
            'message' => 'Annonce mise à jour avec succès',
            'data' => $announcement
        ]);
    }

    /**
     * Basculer le statut actif/inactif
     */
    public function toggleActive($id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'success' => false,
                'message' => 'Annonce non trouvée'
            ], 404);
        }

        $announcement->active = !$announcement->active;
        $announcement->save();

        return response()->json([
            'success' => true,
            'message' => 'Statut modifié avec succès',
            'data' => $announcement
        ]);
    }

    /**
     * Supprimer une annonce
     */
    public function destroy($id)
    {
        $announcement = Announcement::find($id);

        if (!$announcement) {
            return response()->json([
                'success' => false,
                'message' => 'Annonce non trouvée'
            ], 404);
        }

        $announcement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Annonce supprimée avec succès'
        ]);
    }

    /**
     * Mettre à jour l'ordre de plusieurs annonces
     */
    public function updateOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'announcements' => 'required|array',
            'announcements.*.id' => 'required|exists:announcements,id',
            'announcements.*.order' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->announcements as $item) {
            Announcement::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Ordre des annonces mis à jour avec succès'
        ]);
    }
}
