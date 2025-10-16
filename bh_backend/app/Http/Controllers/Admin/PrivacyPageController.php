<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrivacyPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrivacyPageController extends Controller
{
    /**
     * Récupérer les données de la page Privacy
     */
    public function show()
    {
        $privacyPage = PrivacyPage::getActive();

        if (!$privacyPage) {
            // Créer des données par défaut
            $privacyPage = PrivacyPage::create([
                'hero_title' => '🔒 Politique de Confidentialité',
                'hero_subtitle' => 'Bienvenue sur StoryHub',
                'hero_description' => 'La confidentialité de nos visiteurs est très importante. Cette politique explique comment nous traitons vos informations.',
                'collecte_title' => 'Collecte d\'Informations',
                'collecte_description' => 'Pour les lecteurs : Aucune information personnelle n\'est collectée. Vous pouvez lire nos histoires librement sans créer de compte.',
                'tech_info_1' => 'Adresse IP (anonymisée)',
                'tech_info_2' => 'Type de navigateur',
                'tech_info_3' => 'Pages visitées',
                'tech_info_4' => 'Durée de lecture',
                'auteurs_info_1' => 'Nom et prénom',
                'auteurs_info_2' => 'Adresse email',
                'auteurs_info_3' => 'Historique des publications',
                'auteurs_info_4' => 'Photos de profil (optionnelles)',
                'cookies_title' => 'Cookies et Services Tiers',
                'cookies_warning' => 'Important : Nous utilisons des services tiers pour améliorer votre expérience.',
                'analytics_title' => 'Google Analytics',
                'analytics_desc' => 'Analyse anonyme du trafic pour comprendre les préférences de lecture',
                'adsense_title' => 'Google AdSense',
                'adsense_desc' => 'Publicités pertinentes pour soutenir financièrement la plateforme',
                'cookie_control_text' => 'Vous pouvez désactiver les cookies publicitaires en visitant :',
                'protection_title' => 'Protection des Données',
                'protection_feature_1' => 'Chiffrement SSL',
                'protection_desc_1' => 'Toutes les connexions sont sécurisées',
                'protection_feature_2' => 'Respect des œuvres',
                'protection_desc_2' => 'Les histoires publiées restent la propriété de leurs auteurs',
                'protection_feature_3' => 'Transparence totale',
                'protection_desc_3' => 'Nous ne vendons ni ne partageons vos données',
                'liens_title' => 'Liens Externes',
                'liens_description' => 'Notre bibliothèque peut contenir des liens vers des sites externes :',
                'lien_1' => 'Plateformes de musique',
                'lien_2' => 'Réseaux sociaux des auteurs',
                'lien_3' => 'Autres ressources littéraires',
                'liens_disclaimer' => 'Note : Nous ne sommes pas responsables des pratiques de confidentialité de ces sites tiers.',
                'consent_title' => 'Consentement',
                'consent_text' => 'En utilisant StoryHub, vous acceptez notre politique de confidentialité.',
                'consent_note' => 'Lecture libre et anonyme - Aucune inscription requise',
                'contact_title' => 'Contact',
                'contact_text' => 'Pour toute question concernant la confidentialité :',
                'contact_email' => 'privacy@storyhub.com',
                'contact_method' => 'Via notre page de contact',
                'update_title' => 'Dernière mise à jour',
                'update_date' => '15 Janvier 2024',
                'update_note' => 'Nous révisons régulièrement cette politique pour garantir votre protection.',
                'is_active' => true
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $privacyPage
        ]);
    }

    /**
     * Mettre à jour la page Privacy
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'heroTitle' => 'required|string|max:255',
            'heroSubtitle' => 'required|string|max:255',
            'heroDescription' => 'required|string',
            'collecteTitle' => 'required|string|max:255',
            'collecteDescription' => 'required|string',
            'techInfo1' => 'required|string|max:255',
            'techInfo2' => 'required|string|max:255',
            'techInfo3' => 'required|string|max:255',
            'techInfo4' => 'required|string|max:255',
            'auteursInfo1' => 'required|string|max:255',
            'auteursInfo2' => 'required|string|max:255',
            'auteursInfo3' => 'required|string|max:255',
            'auteursInfo4' => 'required|string|max:255',
            'cookiesTitle' => 'required|string|max:255',
            'cookiesWarning' => 'required|string',
            'analyticsTitle' => 'required|string|max:255',
            'analyticsDesc' => 'required|string',
            'adsenseTitle' => 'required|string|max:255',
            'adsenseDesc' => 'required|string',
            'cookieControlText' => 'required|string',
            'protectionTitle' => 'required|string|max:255',
            'protectionFeature1' => 'required|string|max:255',
            'protectionDesc1' => 'required|string',
            'protectionFeature2' => 'required|string|max:255',
            'protectionDesc2' => 'required|string',
            'protectionFeature3' => 'required|string|max:255',
            'protectionDesc3' => 'required|string',
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
            'hero_description' => $request->heroDescription,
            'collecte_title' => $request->collecteTitle,
            'collecte_description' => $request->collecteDescription,
            'tech_info_1' => $request->techInfo1,
            'tech_info_2' => $request->techInfo2,
            'tech_info_3' => $request->techInfo3,
            'tech_info_4' => $request->techInfo4,
            'auteurs_info_1' => $request->auteursInfo1,
            'auteurs_info_2' => $request->auteursInfo2,
            'auteurs_info_3' => $request->auteursInfo3,
            'auteurs_info_4' => $request->auteursInfo4,
            'cookies_title' => $request->cookiesTitle,
            'cookies_warning' => $request->cookiesWarning,
            'analytics_title' => $request->analyticsTitle,
            'analytics_desc' => $request->analyticsDesc,
            'adsense_title' => $request->adsenseTitle,
            'adsense_desc' => $request->adsenseDesc,
            'cookie_control_text' => $request->cookieControlText,
            'protection_title' => $request->protectionTitle,
            'protection_feature_1' => $request->protectionFeature1,
            'protection_desc_1' => $request->protectionDesc1,
            'protection_feature_2' => $request->protectionFeature2,
            'protection_desc_2' => $request->protectionDesc2,
            'protection_feature_3' => $request->protectionFeature3,
            'protection_desc_3' => $request->protectionDesc3,
        ];

        // Ajouter les champs optionnels s'ils existent
        $optionalFields = [
            'liensTitle' => 'liens_title',
            'liensDescription' => 'liens_description',
            'lien1' => 'lien_1',
            'lien2' => 'lien_2',
            'lien3' => 'lien_3',
            'liensDisclaimer' => 'liens_disclaimer',
            'consentTitle' => 'consent_title',
            'consentText' => 'consent_text',
            'consentNote' => 'consent_note',
            'contactTitle' => 'contact_title',
            'contactText' => 'contact_text',
            'contactEmail' => 'contact_email',
            'contactMethod' => 'contact_method',
            'updateTitle' => 'update_title',
            'updateDate' => 'update_date',
            'updateNote' => 'update_note',
        ];

        foreach ($optionalFields as $requestKey => $dbKey) {
            if ($request->has($requestKey)) {
                $data[$dbKey] = $request->$requestKey;
            }
        }

        $privacyPage = PrivacyPage::updateOrCreatePage($data);

        return response()->json([
            'success' => true,
            'message' => 'Politique de confidentialité mise à jour avec succès',
            'data' => $privacyPage
        ]);
    }

    public function index(){
        return PrivacyPage::all();
    }
}
