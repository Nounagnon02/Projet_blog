import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, User, Clock, ArrowRight, Search, X, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import './ArticleList.css';
import api from '../services/Api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [categories, setCategories] = useState(['all']);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadArticles();
  }, []);


  /*const loadArticles = async () => {
    try {
        setLoading(true);
        
        const response = await fetch('https://projet-blog-wg7g.onrender.com/api/articles');
        
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des articles dans le try');
            
        }
        console.log('Détails de l erreur:', error.response);
        
        const data = await response.json();
        
        // Ajouter des valeurs par défaut pour éviter les erreurs
        const articlesWithDefaults = data.map(article => ({
            ...article,
            category: article.category || { id: 0, name: 'Non catégorisé' },
            author: article.author || { id: 0, name: 'Auteur inconnu' },
            reading_time: article.reading_time || '5 min'
        }));
        
        setArticles(articlesWithDefaults);
        
        // Extraire les catégories uniques
        const uniqueCategories = ['all', ...new Set(articlesWithDefaults.map(article => article.category?.name).filter(Boolean))];
        setCategories(uniqueCategories);
        
    } catch (err) {
        console.error('Erreur API:', err);
        setError('Erreur lors du chargement des articles');
        console.log('Détails de l erreur:', error.response);
        
        // Données de démonstration...
        const mockArticles = [
        {
          id: 1,
          title: "La Légende de Prométhée",
          short_description: "L'histoire du titan qui déroba le feu aux dieux pour l'offrir aux hommes, défiant ainsi la volonté de Zeus et s'attirant un châtiment éternel.",
          content1: "Dans les temps anciens, lorsque les dieux régnaient sur l'Olympe et que les hommes vivaient dans l'obscurité, Prométhée, le titan visionnaire, observait avec compassion la souffrance des mortels. Contrairement à ses frères, il voyait en l'humanité un potentiel inexploité, une étincelle de divinité qui ne demandait qu'à briller.\n\nUn jour, pris de pitié devant le sort misérable des hommes qui grelottaient dans le froid et l'ignorance, Prométhée prit une décision qui changerait le destin de l'humanité à jamais. Il se rendit sur l'Olympe, attendit que les dieux soient plongés dans leur sommeil, et déroba une braise du feu sacré d'Héphaïstos.\n\nCachant cette flamme divine dans une tige de fenouil creux, il descendit sur terre et offrit ce présent inestimable aux hommes. Le feu leur permit de se chauffer, de cuire leurs aliments, de forger des outils et des armes. C'était le début de la civilisation.\n\nMais Zeus, roi des dieux, découvrit rapidement ce vol sacrilège. Sa colère fut terrible. Pour punir Prométhée de son audace, il ordonna qu'on l'enchaîne au sommet du Caucase. Chaque jour, un aigle venait dévorer son foie, qui se régénérait chaque nuit pour que le supplice recommence à l'infini.\n\nAinsi, Prométhée souffrit pendant des millénaires, mais jamais il ne regretta son geste. Car grâce à lui, l'humanité avait reçu la lumière de la connaissance et le pouvoir de façonner son propre destin.",
          content2: "Dans les temps anciens, lorsque les dieux régnaient sur l'Olympe et que les hommes vivaient dans l'obscurité, Prométhée, le titan visionnaire, observait avec compassion la souffrance des mortels. Contrairement à ses frères, il voyait en l'humanité un potentiel inexploité, une étincelle de divinité qui ne demandait qu'à briller.\n\nUn jour, pris de pitié devant le sort misérable des hommes qui grelottaient dans le froid et l'ignorance, Prométhée prit une décision qui changerait le destin de l'humanité à jamais. Il se rendit sur l'Olympe, attendit que les dieux soient plongés dans leur sommeil, et déroba une braise du feu sacré d'Héphaïstos.\n\nCachant cette flamme divine dans une tige de fenouil creux, il descendit sur terre et offrit ce présent inestimable aux hommes. Le feu leur permit de se chauffer, de cuire leurs aliments, de forger des outils et des armes. C'était le début de la civilisation.\n\nMais Zeus, roi des dieux, découvrit rapidement ce vol sacrilège. Sa colère fut terrible. Pour punir Prométhée de son audace, il ordonna qu'on l'enchaîne au sommet du Caucase. Chaque jour, un aigle venait dévorer son foie, qui se régénérait chaque nuit pour que le supplice recommence à l'infini.\n\nAinsi, Prométhée souffrit pendant des millénaires, mais jamais il ne regretta son geste. Car grâce à lui, l'humanité avait reçu la lumière de la connaissance et le pouvoir de façonner son propre destin.",
          image_url1: "https://images.unsplash.com/photo-1533854775446-95c4609da544?w=800&auto=format&fit=crop",
          image_url2: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&auto=format&fit=crop",
          category: { id: 1, name: "Mythologie Grecque" },
          author: { id: 1, name: "Hésiode" },
          date_published: "2024-10-01",
          reading_time: "8 min"
        },
        {
          id: 2,
          title: "Odin et les Runes",
          short_description: "Le sacrifice d'Odin sur l'arbre Yggdrasil pendant neuf jours et neuf nuits pour obtenir la connaissance des runes mystiques.",
          content1: "Au commencement des temps nordiques, Odin, le Père de Toutes Choses, régnait sur Asgard avec sagesse. Mais malgré toute sa puissance et sa connaissance, il savait qu'il manquait quelque chose d'essentiel : la maîtrise des runes, ces symboles mystiques qui contenaient les secrets de l'univers.\n\nLes runes n'appartenaient à personne, elles existaient au-delà des neuf mondes, dans un royaume de pure connaissance accessible seulement par le sacrifice ultime. Odin comprit que pour les obtenir, il devrait offrir quelque chose de précieux : lui-même.\n\nIl se rendit au pied d'Yggdrasil, l'arbre-monde qui reliait tous les royaumes, et prit sa lance Gungnir. Dans un geste de détermination absolue, il se transperça le flanc et se pendit à une branche de l'arbre cosmique. Là, suspendu entre la vie et la mort, sans nourriture ni eau, Odin entama son épreuve.\n\nPendant neuf jours et neuf nuits, le Père des Dieux souffrit en silence. Il regarda dans les profondeurs du vide, dans le puits de Mimir où réside toute sagesse. La douleur était insupportable, la solitude écrasante, mais Odin persévéra.\n\nAu crépuscule du neuvième jour, alors qu'il touchait aux frontières de la mort, les runes lui apparurent enfin. Dans un cri de triomphe et d'agonie, il les saisit et tomba de l'arbre. Les runes étaient siennes, et avec elles, le pouvoir de lire le destin, de jeter des sorts et de comprendre les mystères les plus profonds de l'existence.",
          content1: "Dans les temps anciens, lorsque les dieux régnaient sur l'Olympe et que les hommes vivaient dans l'obscurité, Prométhée, le titan visionnaire, observait avec compassion la souffrance des mortels. Contrairement à ses frères, il voyait en l'humanité un potentiel inexploité, une étincelle de divinité qui ne demandait qu'à briller.\n\nUn jour, pris de pitié devant le sort misérable des hommes qui grelottaient dans le froid et l'ignorance, Prométhée prit une décision qui changerait le destin de l'humanité à jamais. Il se rendit sur l'Olympe, attendit que les dieux soient plongés dans leur sommeil, et déroba une braise du feu sacré d'Héphaïstos.\n\nCachant cette flamme divine dans une tige de fenouil creux, il descendit sur terre et offrit ce présent inestimable aux hommes. Le feu leur permit de se chauffer, de cuire leurs aliments, de forger des outils et des armes. C'était le début de la civilisation.\n\nMais Zeus, roi des dieux, découvrit rapidement ce vol sacrilège. Sa colère fut terrible. Pour punir Prométhée de son audace, il ordonna qu'on l'enchaîne au sommet du Caucase. Chaque jour, un aigle venait dévorer son foie, qui se régénérait chaque nuit pour que le supplice recommence à l'infini.\n\nAinsi, Prométhée souffrit pendant des millénaires, mais jamais il ne regretta son geste. Car grâce à lui, l'humanité avait reçu la lumière de la connaissance et le pouvoir de façonner son propre destin.",
          image_url1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop",
          image_url2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
          category: { id: 2, name: "Mythologie Nordique" },
          author: { id: 2, name: "Snorri Sturluson" },
          date_published: "2024-09-28",
          reading_time: "12 min"
        },
        {
          id: 3,
          title: "Le Dragon Céleste",
          short_description: "L'empereur jaune et sa quête pour dompter le dragon céleste qui contrôlait les pluies et les récoltes de l'empire du milieu.",
          content: "Sous le règne de l'empereur Huangdi, l'Empire du Milieu connaissait une terrible sécheresse. Les rivières s'asséchaient, les récoltes mouraient, et le peuple souffrait. Les sages de la cour consultèrent les oracles et découvrirent que le Dragon Céleste, gardien des pluies, était en colère.\n\nCe dragon majestueux, Long, vivait dans les nuages et contrôlait les eaux du ciel. Sa colère venait d'une offense commise par un ancien empereur qui avait négligé les rituels sacrés. Pour sauver son peuple, Huangdi devait entreprendre une quête périlleuse : monter au sommet de la montagne Kunlun et obtenir le pardon du dragon.\n\nL'empereur se prépara pendant quarante jours, jeûnant et méditant. Il gravit ensuite la montagne sacrée, affrontant des tempêtes terribles et des épreuves qui auraient brisé n'importe quel mortel. Mais sa détermination était inébranlable.\n\nAu sommet, entouré de nuages tourbillonnants, l'empereur rencontra enfin le Dragon Céleste. La créature était immense, ses écailles brillaient comme des émeraudes, et ses yeux contenaient la sagesse des âges. Le dragon interrogea Huangdi sur sa compréhension du Tao, de l'harmonie entre le ciel et la terre.\n\nL'empereur répondit avec humilité et sagesse, démontrant qu'il comprenait que l'homme et la nature devaient vivre en équilibre. Impressionné, le Dragon Céleste accepta de restaurer les pluies, à condition que l'empereur et ses descendants honorent toujours le pacte entre le ciel et la terre.",
          image_url1: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop",
          image_url2: "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?w=800&auto=format&fit=crop",
          category: { id: 3, name: "Mythologie Chinoise" },
          author: { id: 3, name: "Li Bai" },
          date_published: "2024-09-25",
          reading_time: "10 min"
        }
      ];
        
        setArticles(mockArticles);
        const uniqueCategories = ['all', ...new Set(mockArticles.map(article => article.category?.name).filter(Boolean))];
        setCategories(uniqueCategories);
        
    } finally {
        setLoading(false);
    }
};*/

const loadArticles = async () => {
    try {
        setLoading(true);
        
        const response = await fetch('https://projet-blog-wg7g.onrender.com/api/articles');
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Ajouter des valeurs par défaut pour éviter les erreurs
        const articlesWithDefaults = data.map(article => ({
            ...article,
            category: article.category || { id: 0, name: 'Non catégorisé' },
            author: article.author || { id: 0, name: 'Auteur inconnu' },
            reading_time: article.reading_time || '5 min'
        }));
        
        setArticles(articlesWithDefaults);
        
        // Extraire les catégories uniques
        const uniqueCategories = ['all', ...new Set(articlesWithDefaults.map(article => article.category?.name).filter(Boolean))];
        setCategories(uniqueCategories);
        
    } catch (err) {
        console.error('Erreur API:', err);
        console.error('Message d erreur:', err.message);
        console.error('Stack trace:', err.stack);
        setError('Erreur lors du chargement des articles');
        
        // Données de démonstration...
        const mockArticles = [
        {
          id: 1,
          title: "La Légende de Prométhée",
          short_description: "L'histoire du titan qui déroba le feu aux dieux pour l'offrir aux hommes, défiant ainsi la volonté de Zeus et s'attirant un châtiment éternel.",
          content1: "Dans les temps anciens, lorsque les dieux régnaient sur l'Olympe et que les hommes vivaient dans l'obscurité, Prométhée, le titan visionnaire, observait avec compassion la souffrance des mortels. Contrairement à ses frères, il voyait en l'humanité un potentiel inexploité, une étincelle de divinité qui ne demandait qu'à briller.\n\nUn jour, pris de pitié devant le sort misérable des hommes qui grelottaient dans le froid et l'ignorance, Prométhée prit une décision qui changerait le destin de l'humanité à jamais. Il se rendit sur l'Olympe, attendit que les dieux soient plongés dans leur sommeil, et déroba une braise du feu sacré d'Héphaïstos.\n\nCachant cette flamme divine dans une tige de fenouil creux, il descendit sur terre et offrit ce présent inestimable aux hommes. Le feu leur permit de se chauffer, de cuire leurs aliments, de forger des outils et des armes. C'était le début de la civilisation.\n\nMais Zeus, roi des dieux, découvrit rapidement ce vol sacrilège. Sa colère fut terrible. Pour punir Prométhée de son audace, il ordonna qu'on l'enchaîne au sommet du Caucase. Chaque jour, un aigle venait dévorer son foie, qui se régénérait chaque nuit pour que le supplice recommence à l'infini.\n\nAinsi, Prométhée souffrit pendant des millénaires, mais jamais il ne regretta son geste. Car grâce à lui, l'humanité avait reçu la lumière de la connaissance et le pouvoir de façonner son propre destin.",
          content2: "Dans les temps anciens, lorsque les dieux régnaient sur l'Olympe et que les hommes vivaient dans l'obscurité, Prométhée, le titan visionnaire, observait avec compassion la souffrance des mortels. Contrairement à ses frères, il voyait en l'humanité un potentiel inexploité, une étincelle de divinité qui ne demandait qu'à briller.\n\nUn jour, pris de pitié devant le sort misérable des hommes qui grelottaient dans le froid et l'ignorance, Prométhée prit une décision qui changerait le destin de l'humanité à jamais. Il se rendit sur l'Olympe, attendit que les dieux soient plongés dans leur sommeil, et déroba une braise du feu sacré d'Héphaïstos.\n\nCachant cette flamme divine dans une tige de fenouil creux, il descendit sur terre et offrit ce présent inestimable aux hommes. Le feu leur permit de se chauffer, de cuire leurs aliments, de forger des outils et des armes. C'était le début de la civilisation.\n\nMais Zeus, roi des dieux, découvrit rapidement ce vol sacrilège. Sa colère fut terrible. Pour punir Prométhée de son audace, il ordonna qu'on l'enchaîne au sommet du Caucase. Chaque jour, un aigle venait dévorer son foie, qui se régénérait chaque nuit pour que le supplice recommence à l'infini.\n\nAinsi, Prométhée souffrit pendant des millénaires, mais jamais il ne regretta son geste. Car grâce à lui, l'humanité avait reçu la lumière de la connaissance et le pouvoir de façonner son propre destin.",
          image_url1: "https://images.unsplash.com/photo-1533854775446-95c4609da544?w=800&auto=format&fit=crop",
          image_url2: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&auto=format&fit=crop",
          category: { id: 1, name: "Mythologie Grecque" },
          author: { id: 1, name: "Hésiode" },
          date_published: "2024-10-01",
          reading_time: "8 min"
        },
        {
          id: 2,
          title: "Odin et les Runes",
          short_description: "Le sacrifice d'Odin sur l'arbre Yggdrasil pendant neuf jours et neuf nuits pour obtenir la connaissance des runes mystiques.",
          content1: "Au commencement des temps nordiques, Odin, le Père de Toutes Choses, régnait sur Asgard avec sagesse. Mais malgré toute sa puissance et sa connaissance, il savait qu'il manquait quelque chose d'essentiel : la maîtrise des runes, ces symboles mystiques qui contenaient les secrets de l'univers.\n\nLes runes n'appartenaient à personne, elles existaient au-delà des neuf mondes, dans un royaume de pure connaissance accessible seulement par le sacrifice ultime. Odin comprit que pour les obtenir, il devrait offrir quelque chose de précieux : lui-même.\n\nIl se rendit au pied d'Yggdrasil, l'arbre-monde qui reliait tous les royaumes, et prit sa lance Gungnir. Dans un geste de détermination absolue, il se transperça le flanc et se pendit à une branche de l'arbre cosmique. Là, suspendu entre la vie et la mort, sans nourriture ni eau, Odin entama son épreuve.\n\nPendant neuf jours et neuf nuits, le Père des Dieux souffrit en silence. Il regarda dans les profondeurs du vide, dans le puits de Mimir où réside toute sagesse. La douleur était insupportable, la solitude écrasante, mais Odin persévéra.\n\nAu crépuscule du neuvième jour, alors qu'il touchait aux frontières de la mort, les runes lui apparurent enfin. Dans un cri de triomphe et d'agonie, il les saisit et tomba de l'arbre. Les runes étaient siennes, et avec elles, le pouvoir de lire le destin, de jeter des sorts et de comprendre les mystères les plus profonds de l'existence.",
          content2: "Dans les temps anciens, lorsque les dieux régnaient sur l'Olympe et que les hommes vivaient dans l'obscurité, Prométhée, le titan visionnaire, observait avec compassion la souffrance des mortels. Contrairement à ses frères, il voyait en l'humanité un potentiel inexploité, une étincelle de divinité qui ne demandait qu'à briller.\n\nUn jour, pris de pitié devant le sort misérable des hommes qui grelottaient dans le froid et l'ignorance, Prométhée prit une décision qui changerait le destin de l'humanité à jamais. Il se rendit sur l'Olympe, attendit que les dieux soient plongés dans leur sommeil, et déroba une braise du feu sacré d'Héphaïstos.\n\nCachant cette flamme divine dans une tige de fenouil creux, il descendit sur terre et offrit ce présent inestimable aux hommes. Le feu leur permit de se chauffer, de cuire leurs aliments, de forger des outils et des armes. C'était le début de la civilisation.\n\nMais Zeus, roi des dieux, découvrit rapidement ce vol sacrilège. Sa colère fut terrible. Pour punir Prométhée de son audace, il ordonna qu'on l'enchaîne au sommet du Caucase. Chaque jour, un aigle venait dévorer son foie, qui se régénérait chaque nuit pour que le supplice recommence à l'infini.\n\nAinsi, Prométhée souffrit pendant des millénaires, mais jamais il ne regretta son geste. Car grâce à lui, l'humanité avait reçu la lumière de la connaissance et le pouvoir de façonner son propre destin.",
          image_url1: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop",
          image_url2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
          category: { id: 2, name: "Mythologie Nordique" },
          author: { id: 2, name: "Snorri Sturluson" },
          date_published: "2024-09-28",
          reading_time: "12 min"
        },
        {
          id: 3,
          title: "Le Dragon Céleste",
          short_description: "L'empereur jaune et sa quête pour dompter le dragon céleste qui contrôlait les pluies et les récoltes de l'empire du milieu.",
          content1: "Sous le règne de l'empereur Huangdi, l'Empire du Milieu connaissait une terrible sécheresse. Les rivières s'asséchaient, les récoltes mouraient, et le peuple souffrait. Les sages de la cour consultèrent les oracles et découvrirent que le Dragon Céleste, gardien des pluies, était en colère.\n\nCe dragon majestueux, Long, vivait dans les nuages et contrôlait les eaux du ciel. Sa colère venait d'une offense commise par un ancien empereur qui avait négligé les rituels sacrés. Pour sauver son peuple, Huangdi devait entreprendre une quête périlleuse : monter au sommet de la montagne Kunlun et obtenir le pardon du dragon.\n\nL'empereur se prépara pendant quarante jours, jeûnant et méditant. Il gravit ensuite la montagne sacrée, affrontant des tempêtes terribles et des épreuves qui auraient brisé n'importe quel mortel. Mais sa détermination était inébranlable.\n\nAu sommet, entouré de nuages tourbillonnants, l'empereur rencontra enfin le Dragon Céleste. La créature était immense, ses écailles brillaient comme des émeraudes, et ses yeux contenaient la sagesse des âges. Le dragon interrogea Huangdi sur sa compréhension du Tao, de l'harmonie entre le ciel et la terre.\n\nL'empereur répondit avec humilité et sagesse, démontrant qu'il comprenait que l'homme et la nature devaient vivre en équilibre. Impressionné, le Dragon Céleste accepta de restaurer les pluies, à condition que l'empereur et ses descendants honorent toujours le pacte entre le ciel et la terre.",
          content2: "",
          image_url1: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&auto=format&fit=crop",
          image_url2: "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?w=800&auto=format&fit=crop",
          category: { id: 3, name: "Mythologie Chinoise" },
          author: { id: 3, name: "Li Bai" },
          date_published: "2024-09-25",
          reading_time: "10 min"
        }
      ];
        
        setArticles(mockArticles);
        const uniqueCategories = ['all', ...new Set(mockArticles.map(article => article.category?.name).filter(Boolean))];
        setCategories(uniqueCategories);
        
    } finally {
        setLoading(false);
    }
};




  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
});

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const handleShare = () => {
    alert('Fonctionnalité de partage à implémenter');
  };

  const handleBookmark = () => {
    alert('Article enregistré !');
  };

  // ARTICLE DETAIL VIEW
  if (selectedArticle) {
    return (
      <div className="article-detail-container">
        {/* Header */}
        <header className="article-detail-header">
          <div className="article-detail-header-content">
            <button
              onClick={() => setSelectedArticle(null)}
              className="back-button"
            >
              <ArrowLeft />
              <span>Retour aux articles</span>
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="article-detail-content">
          {/* Category Badge */}
          <div>
            <span className="article-category-badge">
              {selectedArticle.category.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="article-detail-title">
            {selectedArticle.title}
          </h1>

          {/* Meta Info */}
          <div className="article-meta">
            <div className="article-meta-item">
              <User />
              <span className="article-meta-author">{selectedArticle.author.name}</span>
            </div>
            <div className="article-meta-item">
              <Calendar />
              <span>{new Date(selectedArticle.date_published).toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="article-meta-item">
              <Clock />
              <span>{selectedArticle.reading_time}</span>
            </div>
          </div>

          {/* Content1 */}
          <div className="article-content-text">
            {selectedArticle.content1.split('\n\n').map((paragraph, index) => (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* First Image */}
          <div className="article-image-large">
            <img
              src={selectedArticle.image_url1}
              alt={selectedArticle.title}
            />
          </div>

          {/* Content */}
          <div className="article-content-text">
            {selectedArticle.content2.split('\n\n').map((paragraph, index) => (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Second Image */}
          <div className="article-image-large">
            <img
              src={selectedArticle.image_url2}
              alt={`${selectedArticle.title} - Image 2`}
            />
          </div>

          {/* Actions */}
          <div className="article-actions">
            <button 
              className="article-action-button article-action-share"
              onClick={handleShare}
            >
              <Share2 />
              <span>Partager</span>
            </button>
            <button 
              className="article-action-button article-action-bookmark"
              onClick={handleBookmark}
            >
              <Bookmark />
              <span>Enregistrer</span>
            </button>
          </div>
        </article>
      </div>
    );
  }

  // LOADING STATE
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Chargement des articles...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <p className="error-text">{error}</p>
        </div>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="article-list-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <BookOpen />
              <span>Collection de Légendes</span>
            </div>
            
            <p className="hero-title">
              Histoires <span className="hero-title-highlight">Légendaires</span>
            </p>
            
            <p className="hero-description">
              Explorez les mythes et récits épiques qui ont traversé les âges
            </p>

            {/* Search Bar */}
            <div className="search-container">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher une histoire..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="search-clear"
                  >
                    <X />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="category-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat === 'all' ? 'Toutes les catégories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-section">
        <div className="results-info">
          <p className="results-count">
            <span className="results-count-number">{filteredArticles.length}</span> {filteredArticles.length > 1 ? 'articles trouvés' : 'article trouvé'}
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={clearFilters}
              className="clear-filters-button"
            >
              <X />
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="articles-section">
        {filteredArticles.length > 0 ? (
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="article-card"
                onClick={() => setSelectedArticle(article)}
              >
                {/* Image */}
                <div className="article-image-wrapper">
                  <img
                    src={article.image_url1}
                    alt={article.title}
                    className="article-image"
                  />
                  <div className="article-image-overlay"></div>
                  
                  {/* Category Badge */}
                  <div className="article-card-category">
                    {article.category.name}
                  </div>
                </div>

                {/* Content */}
                <div className="article-card-content">
                  <h2 className="article-card-title">
                    {article.title}
                  </h2>
                  
                  <p className="article-card-description">
                    {article.short_description}
                  </p>

                  {/* Meta Info */}
                  <div className="article-card-meta">
                    <div className="article-card-meta-item">
                      <User />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="article-card-meta-item">
                      <Clock />
                      <span>{article.reading_time}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="article-card-footer">
                    <div className="article-card-date">
                      <Calendar />
                      <span>{new Date(article.date_published).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="article-read-more">
                      Lire l'article
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3 className="no-results-title">Aucun article trouvé</h3>
            <p className="no-results-description">Essayez de modifier vos critères de recherche</p>
            <button
              onClick={clearFilters}
              className="no-results-button"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;