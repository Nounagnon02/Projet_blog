# Configuration du Tracking des Vues

## Comment ça marche

Le système enregistre automatiquement chaque visite de page dans la base de données avec :
- Page visitée
- Article ID (si c'est un article)
- Navigateur, OS, Type d'appareil
- Adresse IP et pays
- Date et heure

## Utilisation dans vos composants

### Option 1: Hook usePageTracking

Dans n'importe quelle page :

```jsx
import { usePageTracking } from '../hooks/usePageTracking';

function MaPage() {
  usePageTracking('/ma-page'); // Pour une page normale
  
  return <div>Contenu de ma page</div>;
}
```

Pour une page d'article :

```jsx
import { usePageTracking } from '../hooks/usePageTracking';

function ArticlePage({ articleId }) {
  usePageTracking(`/article/${articleId}`, articleId);
  
  return <div>Contenu de l'article</div>;
}
```

### Option 2: Composant ArticleViewTracker

Enveloppez votre contenu d'article :

```jsx
import ArticleViewTracker from '../components/ArticleViewTracker';

function ArticlePage({ article }) {
  return (
    <ArticleViewTracker articleId={article.id}>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </ArticleViewTracker>
  );
}
```

## Exemples d'intégration

### Page d'accueil
```jsx
function HomePage() {
  usePageTracking('/');
  return <div>Accueil</div>;
}
```

### Page À propos
```jsx
function AboutPage() {
  usePageTracking('/about');
  return <div>À propos</div>;
}
```

### Liste d'articles (ne pas tracker)
```jsx
function ArticlesList() {
  // Pas de tracking ici, seulement sur les pages individuelles
  return <div>Liste des articles</div>;
}
```

### Page d'article individuel
```jsx
function ArticleDetail({ match }) {
  const articleId = match.params.id;
  usePageTracking(`/article/${articleId}`, articleId);
  
  return <div>Article {articleId}</div>;
}
```

## Vérification

Les statistiques sont visibles dans :
- Dashboard Admin > Statistiques
- Section "Top 10 Histoires les Plus Lues"
- Tableau détaillé avec vues par article

## Test manuel

Testez avec curl :
```bash
curl -X POST http://localhost:8000/api/track-view \
  -H "Content-Type: application/json" \
  -d '{"page":"/article/1","article_id":1}'
```

Vérifiez dans la base de données :
```sql
SELECT * FROM page_views ORDER BY created_at DESC LIMIT 10;
```
