<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactPage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactPageController extends Controller
{
    /**
     * Récupérer les données de la page Contact
     */
    public function show()
    {
        $contactPage = ContactPage::getActive();

        if (!$contactPage) {
            // Créer des données par défaut si aucune page n'existe
            $contactPage = ContactPage::create([
                'hero_title' => '📞 Contactez-Nous',
                'hero_subtitle' => 'Nous sommes là pour répondre à toutes vos questions',
                'email' => 'contact@storyhub.com',
                'email_subtitle' => 'Réponse sous 24h',
                'phone' => '+33 1 23 45 67 89',
                'phone_subtitle' => 'Lun-Ven • 9h-18h',
                'address' => '123 Avenue des Histoires',
                'address_subtitle' => '75001 Paris, France',
                'social' => '@StoryHubOfficiel',
                'social_subtitle' => 'Message direct',
                'form_title' => '✏️ Envoyez-nous un message',
                'form_subtitle' => 'Remplissez le formulaire ci-dessous',
                'faq_title' => '❓ Questions Fréquentes',
                'faq_question_1' => 'Comment publier une histoire ?',
                'faq_answer_1' => 'Créez un compte auteur et soumettez votre manuscrit via notre plateforme.',
                'faq_question_2' => 'Est-ce gratuit ?',
                'faq_answer_2' => 'Oui ! La lecture et la publication sont entièrement gratuites.',
                'faq_question_3' => 'Qui peut lire mes histoires ?',
                'faq_answer_3' => 'Tous les utilisateurs inscrits peuvent découvrir vos créations.',
                'is_active' => true
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $contactPage
        ]);
    }

    //Recuperer les données

    public function  index (){
        return ContactPage::all();
    }

    /**
     * Mettre à jour la page Contact
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'heroTitle' => 'required|string|max:255',
            'heroSubtitle' => 'required|string',
            'email' => 'required|email|max:255',
            'emailSubtitle' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'phoneSubtitle' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'addressSubtitle' => 'required|string|max:255',
            'social' => 'required|string|max:255',
            'socialSubtitle' => 'required|string|max:255',
            'formTitle' => 'required|string|max:255',
            'formSubtitle' => 'required|string',
            'faqTitle' => 'required|string|max:255',
            'faqQuestion1' => 'required|string|max:255',
            'faqAnswer1' => 'required|string',
            'faqQuestion2' => 'required|string|max:255',
            'faqAnswer2' => 'required|string',
            'faqQuestion3' => 'required|string|max:255',
            'faqAnswer3' => 'required|string',
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
            'email' => $request->email,
            'email_subtitle' => $request->emailSubtitle,
            'phone' => $request->phone,
            'phone_subtitle' => $request->phoneSubtitle,
            'address' => $request->address,
            'address_subtitle' => $request->addressSubtitle,
            'social' => $request->social,
            'social_subtitle' => $request->socialSubtitle,
            'form_title' => $request->formTitle,
            'form_subtitle' => $request->formSubtitle,
            'faq_title' => $request->faqTitle,
            'faq_question_1' => $request->faqQuestion1,
            'faq_answer_1' => $request->faqAnswer1,
            'faq_question_2' => $request->faqQuestion2,
            'faq_answer_2' => $request->faqAnswer2,
            'faq_question_3' => $request->faqQuestion3,
            'faq_answer_3' => $request->faqAnswer3,
        ];

        $contactPage = ContactPage::updateOrCreatePage($data);

        return response()->json([
            'success' => true,
            'message' => 'Page "Contact" mise à jour avec succès',
            'data' => $contactPage
        ]);
    }
}
