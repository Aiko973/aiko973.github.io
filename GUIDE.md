# Guide du portfolio (notice technique)

> Ce fichier explique comment le site est construit et comment le modifier.
> La présentation de Dorian, affichée sur la page GitHub du dépôt, est dans
> `README.md`.

Site statique : du HTML, un CSS, deux JS, des images. Pas de base de données,
pas de PHP, pas de build. N'importe quel serveur web le sert tel quel, et il
s'ouvre même en double-cliquant sur `index.html`.

```
index.html                 l'accueil : hero, chiffres, projets, contact
projet.html                la fiche d'un projet  →  projet.html?id=rush
about.html                 la page « À propos de moi »
assets/css/style.css       le style
assets/js/content.js       ← TOUT le contenu est ici (le seul fichier à éditer)
assets/js/app.js           le rendu (à ne pas toucher)
assets/js/icons.js         les icônes Phosphor (générées, à ne pas toucher)
assets/fonts/              les polices Geist et Geist Mono (hébergées sur place)
assets/img/                les images (déjà incluses)
nginx.conf / Dockerfile / docker-compose.yml / Caddyfile
```

Les trois pages partagent le même `content.js` : une info saisie une fois
s'affiche partout où il faut.

## 1. Les images

Elles sont toutes dans `assets/img/` : plus rien à télécharger, le dossier se
suffit à lui-même. Une image manquante n'affiche pas d'erreur : la carte
retombe sur une tuile de repli.

Les captures ont été recompressées (JPEG pour les images riches, PNG pour les
écrans à aplats) : environ 500 Ko pour l'ensemble du site. Pour remplacer une
image, garde le même nom de fichier ; sinon, mets à jour `cover` et `media`
dans `content.js`.

## 2. Tester en local

```bash
python3 -m http.server 8000     # puis http://localhost:8000
```

## 3. Héberger

**Docker (le plus simple)**

```bash
docker compose up -d --build     # http://<ton-serveur>:8080
```

**nginx déjà en place**

```bash
sudo mkdir -p /var/www/dorian-portfolio
sudo rsync -a --delete ./ /var/www/dorian-portfolio/ --exclude .git
sudo cp nginx.conf /etc/nginx/sites-available/dorian-portfolio
sudo ln -s /etc/nginx/sites-available/dorian-portfolio /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Adapter `root` et `server_name` dans `nginx.conf`. Pour le HTTPS :
`sudo certbot --nginx -d portfolio.exemple.fr`.

**Caddy** — le `Caddyfile` fourni gère le certificat tout seul, il suffit de
remplacer le domaine.

**Sans serveur à soi** — le même dossier se dépose tel quel sur GitHub Pages,
Cloudflare Pages ou Netlify (glisser-déposer), gratuitement et en HTTPS.

## 4. Les trois pages

- **`index.html`** — l'accueil. Le hero, les chiffres, les projets rangés par
  catégorie et le contact. Tout ce qui concerne Dorian lui-même est sur
  `about.html`.
- **`projet.html?id=…`** — la fiche d'un projet. Plus de fenêtre qui s'ouvre
  par-dessus l'accueil : chaque projet a sa propre adresse, partageable et
  indexable (`projet.html?id=plink-town`, `projet.html?id=rush`…). L'`id` est
  celui écrit dans `content.js`. **Un seul fichier sert tous les projets** :
  ajouter un projet ne demande aucune page supplémentaire.
- **`about.html`** — la présentation détaillée : photo, parcours, compétences,
  langues, « en bref ». Tout se règle dans le bloc `profile` de `content.js`.

Sur la fiche projet, l'image reste dans une colonne étroite à droite (elle ne
mange plus la page), et deux liens en bas mènent au projet précédent et au
suivant.

## 5. Deux langues (EN / FR)

Un bouton `EN | FR` en haut à droite bascule tout le site. Le choix est
mémorisé dans le navigateur ; à la première visite, c'est la langue du
navigateur qui décide (français si le visiteur est en français, anglais
sinon).

Chaque texte s'écrit sous la forme `{ en: "…", fr: "…" }` :

```js
summary: {
  en: "One sentence.",
  fr: "Une phrase."
}
```

Si une seule langue est remplie, le site affiche celle qui existe — rien ne
casse, mais le bouton n'aura pas d'effet sur ce texte-là.

Les textes de l'interface (menu, boutons, titres de section) sont regroupés
tout en bas de `content.js`, dans `ui`.

## 6. Mettre à jour le site

Tout est dans `assets/js/content.js`. Ajouter un projet = copier un bloc
existant et changer le texte :

```js
{
  id: "mon-projet",            // identifiant unique, sans espace ni accent
  title: "Mon projet",         // le titre n'est pas traduit
  category: "3d",              // "3d" | "2d" | "prototype"
                               //   → décide dans QUELLE section il apparaît
  date: { en: "March 2026", fr: "Mars 2026" },
  featured: true,              // true = apparaît aussi dans la grille d'accueil
  engine: "Unity (C#)",
  team:     { en: "Solo",     fr: "Seul" },
  duration: { en: "3 weeks",  fr: "3 semaines" },
  cover: "assets/img/mon-projet.png",
  summary: { en: "One sentence.", fr: "Une phrase." },
  description: {
    en: ["A paragraph.", "Another one."],
    fr: ["Un paragraphe.", "Un autre."]
  },
  contributions: {              // ce que TU as fait ; [] ou absent = section masquée
    en: ["Input system", "UI"],
    fr: ["Système d'input", "UI"]
  },
  video: "https://youtu.be/XXXXXXXXXXX",   // vide ou absent = pas de lecteur
  media: ["assets/img/mon-projet.png"],
  links: [{ label: { en: "Play on itch.io", fr: "Jouer sur itch.io" },
            url: "https://..." }]
}
```

Les sections elles-mêmes (titre, sous-titre, pastille des cartes) se règlent
dans `categories`, juste après la liste des projets. Une catégorie sans projet
ne s'affiche pas, et son bouton de filtre disparaît avec elle.

Attention aux virgules entre les blocs et aux guillemets droits (`"`), pas
courbes. Si la page reste blanche après une modif : F12 > Console, l'erreur
indique la ligne.

Les liens de contact sont dans `contact`, en haut du même fichier : itch.io,
GitHub et LinkedIn sont remplis. Une valeur vide masque simplement la ligne —
c'est le cas de `email` et de `cv` pour l'instant. Ajouter une adresse mail
suffit à faire apparaître la ligne « Email » sur les deux pages ; pour le CV,
dépose le PDF dans `assets/` et mets son chemin dans `cv`.

## 7. Polices et icônes

Les polices (*Geist* pour le texte, *Geist Mono* pour les dates et les
chiffres) sont dans `assets/fonts/` et déclarées en `@font-face` au début de
`style.css`. Le site n'appelle plus Google Fonts : il fonctionne sans aucune
ressource externe (sauf les vidéos YouTube, au clic). Licence : SIL OFL 1.1.

Les icônes viennent de Phosphor (graisse *Light*, licence MIT) et sont
regroupées dans `assets/js/icons.js`. Pour en ajouter une, reprendre le SVG
sur <https://phosphoricons.com> et l'ajouter à la liste.

## 8. Mode sombre

Le site suit le réglage clair/sombre du système du visiteur. Toutes les
couleurs sont des variables en haut de `style.css` (`:root`), avec leur
version sombre juste en dessous.

## Bannière vidéo (projet à la une)

Tout en haut de l'accueil, la vidéo d'un projet tourne en boucle, sans le
son, en fond du hero : elle passe sous la barre de navigation et derrière le
nom, puis se fond dans le fond de la page en bas. Une petite carte « Projet à
la une » en bas à droite mène à la fiche du projet, avec le bouton pause à
côté. Tout se règle dans le bloc `banner` de `content.js` :

```js
banner: {
  project: "stjerne",   // id du projet mis en avant
  video:   "",          // fichier local (prioritaire), voir ci-dessous
  youtube: "",          // vide = la vidéo YouTube du projet
  start:   0            // seconde de départ de la boucle YouTube
}
```

**Sans rien faire**, la bannière lit la vidéo YouTube du projet (muette, en
boucle, sans commandes). Elle ne se charge qu'après le reste de la page et
tourne en permanence, même quand on a fait défiler la page : seul le bouton
pause l'arrête (si le navigateur la suspend de lui-même, elle repart). Si YouTube refuse (page ouverte en
double-clic, vidéo privée…), l'image du projet reste à la place.

**Le plus propre : un extrait vidéo local**, lu tout de suite, sans aucune
trace de YouTube. Un extrait de 10 à 20 secondes suffit. À partir de la
vidéo du walkthrough (ici de 0:30 à 0:45) :

```bash
mkdir -p assets/video
# MP4 (lu partout, Safari compris)
ffmpeg -ss 30 -t 15 -i walkthrough.mp4 -an -vf "scale=1280:-2" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart \
  assets/video/stjerne.mp4
# WebM (plus léger, et lu par les Chromium sans H.264)
ffmpeg -ss 30 -t 15 -i walkthrough.mp4 -an -vf "scale=1280:-2" \
  -c:v libvpx-vp9 -b:v 0 -crf 38 assets/video/stjerne.webm
```

puis dans `content.js` :
`video: ["assets/video/stjerne.webm", "assets/video/stjerne.mp4"],`
(un seul fichier marche aussi : `video: "assets/video/stjerne.mp4",`).

Si le visiteur a demandé moins d'animations (réglage du système), la vidéo
ne démarre pas toute seule : l'image reste, et le bouton permet de la lancer.

## Filtres

Deux rangées de filtres au-dessus des projets, qui se combinent :

- **type de projet** (Jeux 3D, Jeux 2D, Prototypes), tiré de `categories` ;
- **moteur** (Unity, Godot, Unreal), tiré de `engines` dans `content.js`.
  Un projet est rangé sous un moteur si son champ `engine` contient le mot
  indiqué dans `match` (« Unity 2D (C#) » → Unity). Les boutons de moteur
  restent affichés même sans projet : Unreal indique pour l'instant
  « Aucun projet Unreal pour l'instant », avec un bouton pour tout réafficher.
  Pour un futur projet Unreal, il suffit d'écrire `engine: "Unreal Engine 5"`.

## Mouvement (principes d'Emil Kowalski)

Les animations sont regroupées à la fin de `style.css` :

- boutons, filtres, cartes : léger enfoncement au clic (160 ms) ;
- survols (cartes qui se soulèvent, flèches qui avancent) uniquement avec
  une souris : rien de parasite au toucher sur téléphone ;
- durées de l'interface sous 300 ms, courbes « ease-out » marquées ;
- filtres de projets : la pilule active glisse d'un filtre à l'autre
  (découpage `clip-path`), et une catégorie qui réapparaît monte doucement ;
- menu mobile : ouverture en 400 ms, fermeture en 200 ms ;
- bouton EN / FR : un flou très bref masque le changement de texte, et le
  contenu déjà vu ne rejoue pas son animation d'entrée ;
- si le système demande moins d'animations, seuls les fondus restent.

## Habillage (couleurs et texture)

Le fond n'est plus un aplat : deux grands halos (ambre en haut, gris-bleu en
bas) et un grain léger, fixes pendant le défilement.

La couleur vient des jeux eux-mêmes. `app.js` réduit chaque capture à
quelques pixels, la floute et s'en sert comme lumière d'ambiance : derrière
les captures du hero, derrière chaque catégorie de projets, en haut de chaque
fiche (Chukul baigne dans le vert, Plink Town dans le jaune…) et derrière la
photo de la page « À propos ». La bordure de chaque carte prend aussi les
couleurs de son image. **Rien à faire quand tu ajoutes un projet** : c'est
calculé automatiquement depuis `cover`.

Deux réglages en haut de `style.css` : `--amb` (force des halos) et
`--bezel` (force des bordures colorées). Ouvert en double-clic (`file://`),
le navigateur bloque ce calcul : les couleurs n'apparaissent qu'avec un vrai
serveur (`python3 -m http.server 8000`), comme pour les vidéos.

## Refonte visuelle (septembre 2026)

Le contenu, les adresses des pages et `content.js` n'ont pas changé ; seul
l'habillage a été refait :

- fond gris argent, grande typographie Geist, un seul accent (l'ambre) ;
  mode sombre automatique ;
- barre de navigation flottante en forme de pilule ; sur mobile, un bouton
  ouvre un menu plein écran ;
- accueil : la vidéo du projet à la une en fond du hero (voir « Bannière
  vidéo »), les projets rangés en grille asymétrique qui
  s'adapte toute seule au nombre de projets de chaque catégorie
- cartes, captures et panneaux dans un double cadre (coque + cœur) ;
- fiche projet : contributions en pastilles, liens précédent / suivant avec
  vignette ; si la miniature YouTube ne charge pas, l'image du projet la
  remplace ;
- nouveaux textes d'interface dans `ui` : `hero_eyebrow` (la pastille
  « Ouvert aux stages » du hero), `skip_content`, `menu_open`, `menu_close`,
  `nav_projects`.

Pour l'aperçu des liens partagés (réseaux sociaux), ajouter dans le `<head>`
de `index.html` une balise `og:image` avec l'adresse **complète** d'une image,
par exemple `https://ton-domaine/assets/img/plink-town.jpg`.

## Ce qui a changé depuis la première version

- **trois pages** au lieu d'une : accueil, fiche projet (`projet.html?id=…`),
  et « À propos de moi » (`about.html`). Les pop-ups ont disparu, et l'image
  d'un projet ne s'affiche plus en grand format au milieu de l'écran ;
- bouton de langue `EN | FR` sur les trois pages, avec tous les textes en
  double dans `content.js`. Le choix suit d'une page à l'autre, et
  `?lang=fr` force une langue dans un lien ;
- les projets sont rangés par catégorie, chacune avec sa section (titre,
  sous-titre, nombre de projets) ;
- **Plink Town** ajouté (Unity 2D, 9 personnes dont 2 devs, avril 2026), avec
  sa key art ;
- toutes les captures livrées avec le site, et chaque projet daté au mois :
  Rush (novembre 2025), Worst Case Scenario (juin 2025), Recognize the Fake
  (mai 2025), Chukul (avril 2025), Stjerne et SpellBound (janvier 2025).
  Procedural Generation n'a que son année ;
- projets classés du plus récent au plus ancien ;
- chaque fiche projet a une section **« Ma contribution »** : la liste de ce
  que tu as fait, reprise de l'ancien site. Elle se remplit dans le champ
  `contributions` de `content.js` et disparaît toute seule si la liste est
  vide (c'est le cas de Recognize the Fake) ;
- **walkthrough YouTube** en haut de chaque fiche. Le lecteur ne se charge
  qu'au clic : tant que le visiteur ne lance pas la vidéo, la page n'appelle
  YouTube que pour la vignette, donc elle reste rapide. Un lien dans le champ
  `video` suffit, sous n'importe quelle forme (`youtu.be/…`, `watch?v=…`).
  Un lien « Voir sur YouTube » se glisse sous le lecteur : il marche même si
  l'intégration est refusée.

  **Si tu vois « Erreur 153 » à la place de la vidéo**, l'intégration est
  bloquée, pas cassée. Trois causes, dans l'ordre de fréquence :
  1. la page est ouverte en double-clic (`file:///…`). YouTube refuse les
     intégrations sans vrai domaine. Lance `python3 -m http.server 8000` et
     va sur `http://localhost:8000` ;
  2. la vidéo est **privée** sur YouTube. « Non répertoriée » fonctionne,
     « privée » non ;
  3. l'intégration est désactivée sur la vidéo : YouTube Studio > la vidéo >
     Détails > Afficher plus > cocher **Autoriser l'intégration**.

- **un peu de juiciness** : les cartes, les chiffres, les listes et les
  captures apparaissent au défilement avec un léger décalage, les cartes se
  soulèvent au survol, les boutons s'enfoncent au clic, les filtres font un
  petit pop. Trois compteurs animés en haut de l'accueil (projets, moteurs,
  plus grande équipe) se calculent tout seuls depuis la liste des projets :
  rien à tenir à jour. Tout est désactivé si le système du visiteur demande
  moins d'animations (`prefers-reduced-motion`) ;
- une image de fiche peut porter une légende :
  `{ src: "assets/img/…", caption: { en: "…", fr: "…" } }` — utilisé pour les
  captures d'inspecteur de Plink Town et Stjerne ;
- liens de contact remplis : itch.io, GitHub, LinkedIn ;
- la phrase d'accroche du hero (« Je construis des systèmes courts… ») a été
  retirée ;
- `fetch-assets.sh` supprimé : il n'y a plus rien à récupérer chez Wix.

## Ce qui change par rapport à Wix

- aucun bandeau publicitaire Wix ;
- `<meta name="robots" content="noindex">` supprimé — l'ancien site était
  invisible sur Google, celui-ci est indexable ;
- accessible au clavier, lisible sur mobile, `prefers-reduced-motion` respecté ;
- quelques coquilles corrigées dans les textes anglais (*developper*, *sockoban*,
  *plateformer*, *constitued*) ;
- chaque projet a sa propre page, avec une adresse qu'on peut envoyer.
