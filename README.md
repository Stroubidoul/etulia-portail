# Etulia — portail (faron.etulia.fr)

Page d'accueil installable (PWA) qui donne accès aux applications Etulia :
CRM (app.etulia.fr), Chantiers (chantiers.etulia.fr), Métré (metre.etulia.fr), Photos (photos.etulia.fr).

Fichiers : `index.html` (page + styles + script), `manifest.json`, `service-worker.js`, `icons/`, `img/`, `_headers`.

Déploiement : Cloudflare (projet statique, racine du dépôt) — chaque push sur `main` redéploie.
À chaque modification visible : bumper `APP_VERSION` dans `index.html` et `CACHE_NAME` dans `service-worker.js`.
