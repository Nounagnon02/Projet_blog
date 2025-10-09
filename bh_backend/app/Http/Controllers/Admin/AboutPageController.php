<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AboutPageController extends Controller
{
    /**
     * Récupérer les données de la page About
     */
    public function show()
    {
        try {
            $aboutPage = AboutPage::getActive();

            if (!$aboutPage) {
                // Créer des données par défaut si aucune page n'existe
                $aboutPage = AboutPage::create([
                    'hero_title' => '👋 Bienvenue sur StoryHub',
                    'hero_subtitle' => 'Votre plateforme de partage d\'histoires captivantes',
                    'mission_title' => '🎯 Notre Mission',
                    'mission_subtitle' => 'Donner vie aux récits qui méritent d\'être partagés',
                    'mission_inspire' => 'Créer un espace où chaque voix peut s\'exprimer et inspirer des milliers de lecteurs',
                    'mission_connect' => 'Rassembler une communauté passionnée d\'auteurs et de lecteurs du monde entier',
                    'mission_innovate' => 'Révolutionner la façon dont les histoires sont découvertes et partagées',
                    'team_title' => '👥 Notre Équipe',
                    'team_subtitle' => 'Des passionnés dévoués à votre expérience de lecture',
                    'cta_title' => '📖 Prêt à commencer votre aventure ?',
                    'cta_subtitle' => 'Rejoignez notre communauté et découvrez des histoires extraordinaires',
                    'is_active' => true
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $aboutPage
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération de la page About: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des données',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour la page About
     */
    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'heroTitle' => 'required|string|max:255',
                'heroSubtitle' => 'required|string',
                'missionTitle' => 'required|string|max:255',
                'missionSubtitle' => 'required|string',
                'missionInspire' => 'required|string',
                'missionConnect' => 'required|string',
                'missionInnovate' => 'required|string',
                'teamTitle' => 'required|string|max:255',
                'teamSubtitle' => 'required|string',
                'ctaTitle' => 'required|string|max:255',
                'ctaSubtitle' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = [
                'hero_title' => $request->heroTitle,
                'hero_subtitle' => $request->heroSubtitle,
                'mission_title' => $request->missionTitle,
                'mission_subtitle' => $request->missionSubtitle,
                'mission_inspire' => $request->missionInspire,
                'mission_connect' => $request->missionConnect,
                'mission_innovate' => $request->missionInnovate,
                'team_title' => $request->teamTitle,
                'team_subtitle' => $request->teamSubtitle,
                'cta_title' => $request->ctaTitle,
                'cta_subtitle' => $request->ctaSubtitle,
            ];

            $aboutPage = AboutPage::updateOrCreatePage($data);

            return response()->json([
                'success' => true,
                'message' => 'Page "À Propos" mise à jour avec succès',
                'data' => $aboutPage
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour de la page About: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Erreur interne du serveur',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
