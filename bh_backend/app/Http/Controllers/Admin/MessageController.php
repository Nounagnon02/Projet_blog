<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReplyMessage;

class MessageController extends Controller
{
    public function index()
    {
        try {
            $messages = ContactMessage::orderBy('created_at', 'desc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $messages
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des messages',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $message = ContactMessage::findOrFail($id);
            
            // Marquer comme lu
            if (!$message->read) {
                $message->update(['read' => true]);
            }
            
            return response()->json([
                'success' => true,
                'data' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Message non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function reply(Request $request, $id)
    {
        try {
            $request->validate([
                'reply' => 'required|string'
            ]);

            $message = ContactMessage::findOrFail($id);
            
            // Envoyer l'email de réponse
            Mail::to($message->email)->send(new ReplyMessage($message, $request->reply));
            
            $message->update([
                'replied' => true,
                'reply_text' => $request->reply,
                'replied_at' => now()
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Réponse envoyée avec succès par email',
                'data' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de la réponse',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $message = ContactMessage::findOrFail($id);
            $message->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Message supprimé avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function markAsRead($id)
    {
        try {
            $message = ContactMessage::findOrFail($id);
            $message->update(['read' => true]);
            
            return response()->json([
                'success' => true,
                'data' => $message
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getStats()
    {
        try {
            $total = ContactMessage::count();
            $unread = ContactMessage::where('read', false)->count();
            $replied = ContactMessage::where('replied', true)->count();
            
            return response()->json([
                'success' => true,
                'data' => [
                    'total' => $total,
                    'unread' => $unread,
                    'replied' => $replied
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des statistiques',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
