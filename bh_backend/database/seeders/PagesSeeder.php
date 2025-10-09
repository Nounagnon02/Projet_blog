<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AboutPage;
use App\Models\ContactPage;
use App\Models\PrivacyPage;
use App\Models\Announcement;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seeder pour la page About
        AboutPage::create([
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

        // Seeder pour la page Contact
        ContactPage::create([
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

        // Seeder pour la page Privacy
        PrivacyPage::create([
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

        // Seeder pour les annonces
        Announcement::create([
            'title' => '🎉 Nouveautés du mois',
            'content' => 'Découvrez nos nouvelles histoires publiées ce mois-ci !',
            'type' => 'promotion',
            'active' => true,
            'order' => 1
        ]);

        Announcement::create([
            'title' => '📢 Concours d\'écriture',
            'content' => 'Participez à notre concours mensuel et gagnez des prix !',
            'type' => 'event',
            'active' => true,
            'order' => 2
        ]);
    }
}
