/* ==========================================================================
   content.js : TOUT le contenu du site est ici.
   Pour modifier le site, tu n'as besoin de toucher QUE ce fichier.

   BILINGUE : chaque texte s'écrit sous la forme  { en: "...", fr: "..." }
              (en = anglais, fr = français).
   Si tu ne mets qu'une seule langue, le site retombe automatiquement sur
   celle qui existe : rien ne casse, mais le bouton EN/FR n'aura plus d'effet
   sur ce texte-là.

   ORDRE : les projets s'affichent dans l'ordre de ce fichier. Stjerne est
   volontairement en tête pour être mis en avant ; les autres vont du plus
   récent au plus ancien. Pour remonter un projet, déplace son bloc plus haut.
   ========================================================================== */

const CONTENT = {

  /* --- Identité ---------------------------------------------------------- */
  name: "Dorian Simon",

  tagline: {
    en: "Game design and programming student at ISART Digital Paris.",
    fr: "Étudiant en game design et programmation à l'ISART Digital Paris."
  },

  /* --- Liens de contact --------------------------------------------------
     Laisse une valeur vide ("") pour masquer la ligne complètement.        */
  contact: {
    email: "dorian270706@gmail.com",
    itch: "https://dorianaiko.itch.io/",
    github: "https://github.com/Aiko973",
    linkedin: "https://www.linkedin.com/in/dorian-simon-5a45a7386/",
    cv: ""                     // ex : "assets/cv-dorian-simon.pdf"
  },

  /* --- Page « À propos » -------------------------------------------------
     Tout ce qui s'affiche sur about.html.                                  */
  profile: {
    photo: "assets/img/dorian.jpg",

    role: { en: "Game Designer & Game Programmer",
            fr: "Game Designer & Game Programmer" },

    lead: {
      en: "Passionate, rigorous and motivated, I put my skills at the service of ambitious " +
          "projects, and I'm looking for a team where I can be useful and keep growing.",
      fr: "Passionné, rigoureux et motivé, je mets mes compétences au service de projets " +
          "ambitieux et je cherche une équipe où apporter ma valeur et continuer à progresser."
    },

    story: {
      en: [
        "I'm a Game Design & Programming student at ISART Digital Paris, which I joined in " +
          "2025 after a general baccalaureate in Évian-les-Bains.",
        "Video games came to me through my older brother, and the urge to make my own never " +
          "left. What I enjoy is the moment a simple rule turns into a system. A grid you can " +
          "read at a glance, an economy that holds together, a boss pattern that lands on the " +
          "beat.",
        "I mostly work in C# with Unity and Godot, model and assemble assets in Blender, and " +
          "reach for Python, SQL or JSON whenever a project needs clean data behind it.",
        "I'm used to group projects, from small teams to a dozen people, and I like the part " +
          "of the job where you agree on what the game should teach before writing a line of " +
          "code. I'm serious, autonomous, and always up for learning something I don't know yet."
      ],
      fr: [
        "Je suis étudiant en Mastère Game Design & Programmation à l'ISART Digital Paris, que " +
          "j'ai rejoint en 2025 après un baccalauréat général à Évian-les-Bains.",
        "Les jeux vidéo, j'y suis venu par mon grand frère, et l'envie de faire les miens " +
          "n'est jamais partie. J'aime le moment où une règle simple devient un système. Une " +
          "grille qui se lit d'un coup d'œil, une économie qui tient debout, un pattern de " +
          "boss qui tombe pile sur le temps.",
        "Je travaille surtout en C# sous Unity et Godot, je modélise et j'assemble mes assets " +
          "sur Blender, et je passe au Python, au SQL ou au JSON dès qu'un projet a besoin de " +
          "données propres derrière lui.",
        "J'ai l'habitude des projets de groupe, des petites équipes jusqu'à une douzaine de " +
          "personnes, et j'aime la partie du métier où l'on se met d'accord sur ce que le jeu " +
          "doit faire comprendre avant d'écrire une ligne de code. Sérieux, autonome, et " +
          "toujours partant pour apprendre ce que je ne sais pas encore faire."
      ]
    },

    education: [
      {
        period: "2025-2029",
        title: { en: "Master's degree in Game Design & Programming",
                 fr: "Mastère Game Design & Programming" },
        place: "ISART Digital, Paris",
        note:  { en: "A reference school for video games, animation and interactive experiences.",
                 fr: "École de référence dans le jeu vidéo, l'animation et les expériences interactives." }
      },
      {
        period: "2024",
        title: { en: "General baccalaureate", fr: "Baccalauréat général" },
        place: "Lycée Anna de Noailles, Évian-les-Bains",
        note:  { en: "Specialisms: English in the contemporary world, mathematics, computer science.",
                 fr: "Spécialités : anglais monde contemporain, mathématiques, numérique et sciences informatiques." }
      }
    ],

    skills: [
      {
        title: { en: "Programming", fr: "Programmation" },
        items: ["C#", "Python", "SQL", "JSON"]
      },
      {
        title: { en: "Software", fr: "Logiciels" },
        items: ["Unity", "Godot", "Blender", "Git", "Photoshop", "Premiere Pro", "OBS"]
      },
      {
        title: { en: "Spoken languages", fr: "Langues" },
        items: [
          { en: "French (native)", fr: "Français (langue maternelle)" },
          { en: "English (B2)",    fr: "Anglais (B2)" },
          { en: "Spanish (A2)",    fr: "Espagnol (A2)" }
        ]
      },
      {
        title: { en: "Soft Skills", fr: "Soft Skills" },
        items: [
          { en: "Teamwork",         fr: "Travail en équipe" },
          { en: "Time management",  fr: "Gestion du temps" },
          { en: "Leadership",       fr: "Leadership" },
          { en: "People skills",    fr: "Relationnel" },
          { en: "Adaptability",     fr: "Adaptabilité" }
        ]
      }
    ],

    /* Petites lignes « en bref ». Supprime un bloc si tu ne veux pas l'afficher. */
    facts: [
      { label: { en: "Based in", fr: "Basé à" },
        value: { en: "Saint-Prix, Val-d'Oise (France)", fr: "Saint-Prix, Val-d'Oise" } },
      { label: { en: "Licence", fr: "Permis" },
        value: { en: "A1 (motorcycle)", fr: "A1 (moto)" } },
      { label: { en: "Outside work", fr: "En dehors" },
        value: { en: "Volleyball, travelling, tabletop role-playing games",
                 fr: "Volley-ball, voyages, jeux de rôles" } }
    ]
  },

  /* --- Projets -----------------------------------------------------------
     category : "3d" | "2d" | "prototype"
                → décide dans quelle section le projet apparaît
     date     : mois + année, affichés sur la carte et sur la fiche
     cover    : image de la carte (assets/img/…)
     media    : images affichées sur la fiche du projet
     contributions : ce que TU as fait sur le projet (liste à puces)
     video    : lien YouTube, affiché en haut de la fiche (vide = pas de lecteur)
     links    : boutons de la fiche, laisse [] si tu n'en as pas
     featured : true = la tuile apparaît aussi dans la grille d'accueil     */
  projects: [
    {
      id: "stjerne",
      video: "https://youtu.be/gkLrri_e56g",
      title: "Stjerne",
      category: "2d",
      date: { en: "January 2025", fr: "Janvier 2025" },
      featured: true,
      engine: "Unity (C#)",
      team: { en: "13 people", fr: "13 personnes" },
      duration: { en: "2 months", fr: "2 mois" },
      cover: "assets/img/stjerne.jpg",
      summary: {
        en: "A platformer inspired by The Little Match Girl, made with a 13-person team and a professional voice actor.",
        fr: "Un jeu de plateforme inspiré de La Petite Fille aux allumettes, réalisé à 13 avec un comédien de doublage professionnel."
      },
      description: {
        en: [
          "Stjerne is a platformer game inspired by the tale of The Little Match Girl.",
          "We had the chance to work with Alexis Tomassian, the French voice of Light Yagami " +
            "in Death Note and of Philip J. Fry in Futurama.",
          "Working in a team of thirteen meant most of the job was keeping the game readable. " +
            "We agreed on what a level should teach before building it, and cut anything that " +
            "pulled attention away from the light."
        ],
        fr: [
          "Stjerne est un jeu de plateforme inspiré du conte La Petite Fille aux allumettes.",
          "Nous avons eu la chance de travailler avec Alexis Tomassian, la voix française de " +
            "Light Yagami dans Death Note et de Philip J. Fry dans Futurama.",
          "À treize, l'essentiel du travail a consisté à garder le jeu lisible. On se mettait " +
            "d'accord sur ce qu'un niveau devait apprendre avant de le construire, et on " +
            "coupait tout ce qui détournait l'attention de la lumière."
        ]
      },
      contributions: {
        en: [
          "Input manager",
          "Parallax movement",
          "Forgiveness mechanics",
          "Level design of levels 1 and 2",
          "Level design bricks: boat, blizzard, brazier, platform",
          "Movement juiciness"
        ],
        fr: [
          "Input manager",
          "Déplacement en parallaxe",
          "Forgiveness mechanics",
          "Level design des niveaux 1 et 2",
          "Briques de level design : barque, blizzard, brasier, plateforme",
          "Juiciness du déplacement"
        ]
      },
      media: [
        "assets/img/stjerne.jpg",
        { src: "assets/img/stjerne-blizzard.png",
          caption: { en: "The blizzard brick: wind curves, forces and timings exposed in the inspector, so a level designer can retune a storm on the spot.",
                     fr: "La brique « blizzard » : courbes de vent, forces et timings exposés dans l'inspecteur, pour qu'un level designer rerègle une tempête sur place." } }
      ],
      links: []
    },

    {
      id: "rush",
      video: "https://youtu.be/sXp_q8HIOp8",
      title: "Rush",
      category: "3d",
      date: { en: "November 2025", fr: "Novembre 2025" },
      featured: true,
      engine: "Unity (C#)",
      team: { en: "Solo", fr: "Seul" },
      duration: { en: "6 weeks", fr: "6 semaines" },
      cover: "assets/img/rush.jpg",
      summary: {
        en: "A puzzle game about laying out arrows and conveyor belts to route cubes to their goals.",
        fr: "Un jeu de puzzle où l'on dispose flèches et convoyeurs pour amener des cubes jusqu'à leur objectif."
      },
      description: {
        en: [
          "Rush is a puzzle game focused on arranging elements such as arrows and conveyor " +
            "belts to efficiently guide cubes to their goals.",
          "The core of the project was the grid system. Every tile holds a direction, and the " +
            "cubes read that direction as they enter. Once the grid was reliable, level design " +
            "became a matter of composing simple rules into longer routes."
        ],
        fr: [
          "Rush est un jeu de puzzle centré sur l'agencement d'éléments comme les flèches et " +
            "les tapis roulants, pour guider efficacement des cubes jusqu'à leur objectif.",
          "Le cœur du projet, c'est le système de grille. Chaque case porte une direction, " +
            "et les cubes la lisent en y entrant. Une fois la grille fiable, le level design " +
            "s'est résumé à composer des règles simples en trajets plus longs."
        ]
      },
      contributions: {
        en: [
          "UI interaction",
          "Win screen",
          "Juiciness",
          "3D models (environment and assets)",
          "Animation of the appearing cubes",
          "Game design of the Easy and Medium levels",
          "Cubes and interaction bricks timed on the clock"
        ],
        fr: [
          "Interactions d'UI",
          "Écran de victoire",
          "Juiciness",
          "Modèles 3D (environnement et assets)",
          "Animation d'apparition des cubes",
          "Game design des niveaux Easy et Medium",
          "Cubes et briques d'interaction calés sur l'horloge"
        ]
      },
      media: ["assets/img/rush.jpg"],
      links: []
    },

    {
      id: "worst-case-scenario",
      video: "https://youtu.be/HLIaeN8ytAw",
      title: "Worst Case Scenario",
      category: "2d",
      date: { en: "June 2025", fr: "Juin 2025" },
      featured: false,
      engine: "Godot (C#)",
      team: { en: "4 people", fr: "4 personnes" },
      duration: { en: "3 days", fr: "3 jours" },
      cover: "assets/img/worst-case-scenario.png",
      summary: {
        en: "A narrative game set in the 2100s, designed and prototyped in three days for a Red Cross brief.",
        fr: "Un jeu narratif situé dans les années 2100, conçu et prototypé en trois jours pour un brief de la Croix-Rouge."
      },
      description: {
        en: [
          "Worst Case Scenario is a narrative-focused game set in the 2100s, developed in " +
            "response to a brief from the Red Cross.",
          "The project involved designing the concept and producing a playable prototype " +
            "within a very short time frame, which meant deciding early what to cut.",
          "I coded the whole thing in C# under Godot, set up the choice and answer system, " +
            "and worked alongside game artists on the feel of it."
        ],
        fr: [
          "Worst Case Scenario est un jeu à dominante narrative situé dans les années 2100, " +
            "développé en réponse à un brief de la Croix-Rouge.",
          "Il a fallu concevoir le concept et livrer un prototype jouable dans un délai très " +
            "court, ce qui obligeait à décider tôt de ce qu'on coupait.",
          "J'ai codé l'ensemble en C# sous Godot, mis en place le système de choix et de " +
            "réponses, et travaillé avec des game artistes sur la juiciness."
        ]
      },
      contributions: {
        en: [
          "UI interaction",
          "Database linked to Godot",
          "Every choice, its conditions and its impact on the player's stats"
        ],
        fr: [
          "Interactions d'UI",
          "Base de données reliée à Godot",
          "Tous les choix, leurs conditions et leur impact sur les statistiques du joueur"
        ]
      },
      media: ["assets/img/worst-case-scenario.png"],
      links: []
    },

    {
      id: "recognize-the-fake",
      video: "https://youtu.be/7RbexfzZLCY",
      title: "Recognize the Fake",
      category: "prototype",
      date: { en: "May 2025", fr: "Mai 2025" },
      featured: false,
      engine: "Godot (C#)",
      team: { en: "Solo", fr: "Seul" },
      duration: { en: "1 month", fr: "1 mois" },
      cover: "assets/img/recognize-the-fake.png",
      summary: {
        en: "A one-button serious game: decide whether the document in front of you is real or forged.",
        fr: "Un serious game à un seul input, décider si le document posé devant soi est vrai ou falsifié."
      },
      description: {
        en: [
          "A serious one-button game where the player must determine whether the document in " +
            "front of them is real or fake.",
          "With a single input available, all the difficulty sits in reading the document " +
            "rather than in the controls."
        ],
        fr: [
          "Un serious game à un seul input, où le joueur doit déterminer si le document " +
            "devant lui est authentique ou falsifié.",
          "Avec un seul input disponible, toute la difficulté se joue dans la lecture du " +
            "document et non dans la maniabilité."
        ]
      },
      media: ["assets/img/recognize-the-fake.png"],
      links: []
    },

    {
      id: "chukul",
      video: "https://youtu.be/gwQ5GuEsOn0",
      title: "Chukul",
      category: "2d",
      date: { en: "April 2025", fr: "Avril 2025" },
      featured: true,
      engine: "Godot (C#), JSON",
      team: { en: "4 people", fr: "4 personnes" },
      duration: { en: "2 months", fr: "2 mois" },
      cover: "assets/img/chukul.jpg",
      summary: {
        en: "A sokoban set inside a Mayan pyramid: five levels, four people, two months.",
        fr: "Un sokoban dans une pyramide maya : cinq niveaux, quatre personnes, deux mois."
      },
      description: {
        en: [
          "Chukul is a sokoban set in a Mayan region. The player takes the role of an explorer " +
            "trying to reach the end of a Mayan pyramid.",
          "In a group of four students from my class, we had two months to build a five-level " +
            "sokoban on a theme we picked ourselves.",
          "I built the universe and its assets in Blender, set up an encrypted password " +
            "system and handled the database side. Levels are described in JSON, so the " +
            "designers on the team could iterate on a room without touching the game code."
        ],
        fr: [
          "Chukul est un sokoban situé en région maya. Le joueur incarne un explorateur qui " +
            "cherche à atteindre le fond d'une pyramide.",
          "À quatre étudiants de ma classe, nous avions deux mois pour construire un sokoban " +
            "de cinq niveaux sur un thème choisi par nous.",
          "J'ai créé l'univers et ses assets sur Blender, mis en place un système de mot de " +
            "passe crypté et géré la base de données. Les niveaux sont décrits en JSON, donc " +
            "les game designers pouvaient retoucher une salle sans toucher au code du jeu."
        ]
      },
      contributions: {
        en: [
          "UI interaction",
          "Win screen",
          "Juiciness",
          "3D models: skull, objective crates, art direction of rooms 2 and 3",
          "Game design of the third room",
          "Real-time English/French translation",
          "Player pathfinding",
          "Animation of the appearing tiles",
          "Local high-score database in JSON, linked to Godot",
          "Account creation, stored in the database",
          "Password encryption",
          "Graphic design of the title card"
        ],
        fr: [
          "Interactions d'UI",
          "Écran de victoire",
          "Juiciness",
          "Modèles 3D : crâne, caisses d'objectif, direction artistique des salles 2 et 3",
          "Game design de la troisième salle",
          "Traduction anglais/français en temps réel",
          "Pathfinding du joueur",
          "Animation d'apparition des tuiles",
          "Base de données locale des meilleurs scores en JSON, reliée à Godot",
          "Création de compte, enregistrée en base",
          "Chiffrement des mots de passe",
          "Graphisme de la title card"
        ]
      },
      media: ["assets/img/chukul.jpg"],
      links: []
    },

    {
      id: "plink-town",
      video: "https://youtu.be/F6E6IsuBlXA",
      title: "Plink Town",
      category: "2d",
      date: { en: "April 2026", fr: "Avril 2026" },
      featured: true,
      engine: "Unity 2D (C#)",
      team: { en: "9 people", fr: "9 personnes" },
      duration: { en: "", fr: "" },       // ← durée du projet, à remplir
      cover: "assets/img/plink-town.jpg",
      summary: {
        en: "A finished plinko game: place obstacles the balls have to hit, cash in, buy more obstacles.",
        fr: "Un jeu de plinko terminé : on place des obstacles que les billes doivent toucher, on encaisse, on rachète des obstacles."
      },
      description: {
        en: [
          "Plink Town is a finished Unity 2D game built on a plinko board. The player places " +
            "obstacles on the board; every ball that hits one pays out, and that money buys " +
            "the next obstacles.",
          "The loop doubles as the difficulty curve. A board that earns well is a board the " +
            "player paid for, so the real question is always which obstacle to add next, and " +
            "where to put it.",
          "Nine people worked on the game, three of them on code. I took the systems " +
            "underneath: input, physics, inventory and shop, plus the tools the designers used " +
            "to tune the game themselves.",
          "Ball physics and brick behaviour live in Scriptable Objects, so a designer can " +
            "change what a bumper pays out, how hard it pushes or what it looks like without " +
            "opening the code once."
        ],
        fr: [
          "Plink Town est un jeu Unity 2D terminé, bâti sur un plateau de plinko. Le joueur " +
            "place des obstacles sur le plateau ; chaque bille qui en touche un rapporte de " +
            "l'argent, et cet argent sert à racheter les obstacles suivants.",
          "La boucle sert aussi de courbe de difficulté. Un plateau qui rapporte bien est un " +
            "plateau que le joueur a payé, donc la vraie question reste toujours quel obstacle " +
            "ajouter, et où le poser.",
          "Nous étions neuf sur le jeu, dont trois à la programmation. J'ai pris les systèmes " +
            "en dessous, input, physique, inventaire et boutique, plus les outils avec " +
            "lesquels les game designers réglaient le jeu eux-mêmes.",
          "La physique des billes et le comportement des briques vivent dans des Scriptable " +
            "Objects : un designer change ce que rapporte un bumper, la force avec laquelle il " +
            "repousse la bille ou son sprite sans jamais ouvrir le code."
        ]
      },
      contributions: {
        en: [
          "Input system",
          "Juiciness",
          "UI",
          "Models for the gameplay bricks",
          "Inventory system",
          "Physics",
          "Shop",
          "Designer tools: ball physics and brick behaviour driven by Scriptable Objects"
        ],
        fr: [
          "Système d'input",
          "Juiciness",
          "UI",
          "Modèles des briques de gameplay",
          "Système d'inventaire",
          "Physique",
          "Boutique",
          "Outils pour les game designers : physique des billes et comportement des briques pilotés par Scriptable Objects"
        ]
      },
      media: [
        "assets/img/plink-town.jpg",
        { src: "assets/img/plink-town-bumper.png",
          caption: { en: "The Scriptable Object of a bumper. Size, payout, knockback force and sprite, all tunable without code.",
                     fr: "Le Scriptable Object d'un bumper. Taille, gain, force de recul et sprite, réglables sans toucher au code." } },
        { src: "assets/img/plink-town-ressource.png",
          caption: { en: "A shop resource. Category, unlock cost, quantity and icon, gathered in a single asset.",
                     fr: "Une ressource de la boutique. Catégorie, coût de déblocage, quantité et icône, réunis dans un seul asset." } }
      ],
      links: []                            // ← ajoute le lien itch.io s'il existe
    },

    {
      id: "spellbound",
      video: "https://youtu.be/Lt5GHVLK8eQ",
      title: "SpellBound",
      category: "2d",
      date: { en: "January 2025", fr: "Janvier 2025" },
      featured: true,
      engine: "Godot (C#)",
      team: { en: "Solo", fr: "Seul" },
      duration: { en: "2 months", fr: "2 mois" },
      cover: "assets/img/spellbound.png",
      summary: {
        en: "A shoot 'em up built as a first project, with boss attacks timed to the soundtrack.",
        fr: "Un shoot 'em up réalisé comme premier projet, avec des attaques de boss calées sur la bande-son."
      },
      description: {
        en: [
          "SpellBound is a shoot 'em up developed as my first project, aimed at learning C# " +
            "and core game development concepts.",
          "The main challenge was timing the boss's attacks to match the music. The fight is " +
            "driven by the track rather than by a timer, so every pattern has to land on a beat.",
          "Everything is mine on this one. The C# code under Godot, but also the graphics, " +
            "the UI, the VFX and the animation."
        ],
        fr: [
          "SpellBound est un shoot 'em up développé comme premier projet, pour apprendre le C# " +
            "et les bases du développement de jeu.",
          "La principale difficulté a été de caler les attaques du boss sur la musique. Le " +
            "combat est piloté par le morceau et non par un timer, donc chaque pattern doit " +
            "tomber sur un temps.",
          "Tout est de moi sur ce projet. Le code C# sous Godot, mais aussi le graphisme, " +
            "l'UI, les VFX et l'animation."
        ]
      },
      contributions: {
        en: [
          "Solo developer",
          "Game design",
          "Special feature",
          "Graphic design",
          "Particles",
          "Boss patterns",
          "Boss attacks driven by the music"
        ],
        fr: [
          "Développement en solo",
          "Game design",
          "Feature spéciale",
          "Graphisme",
          "Particules",
          "Patterns du boss",
          "Attaques du boss pilotées par la musique"
        ]
      },
      media: ["assets/img/spellbound.png"],
      links: []
    },

    {
      id: "procedural-generation",
      title: "Procedural Generation",
      category: "prototype",
      date: { en: "2026", fr: "2026" },   // ← mois manquant, à compléter
      featured: false,
      engine: "Unity (C#)",
      team: { en: "Solo", fr: "Seul" },
      duration: { en: "2 weeks", fr: "2 semaines" },
      cover: "assets/img/procedural-generation.jpg",
      summary: {
        en: "A procedural world generator, and a first pass at tool coding: exposed parameters and optimisation.",
        fr: "Un générateur de monde procédural, et une première approche du tool coding : paramètres exposés et optimisation."
      },
      description: {
        en: [
          "A prototype of a procedurally generated world.",
          "It was my first step into tool coding: exposing several parameters so the world can " +
            "be tuned from the editor, then optimising the generation so changes are visible " +
            "almost immediately."
        ],
        fr: [
          "Un prototype de monde généré de façon procédurale.",
          "C'était mon premier pas dans le tool coding : exposer plusieurs paramètres pour " +
            "régler le monde depuis l'éditeur, puis optimiser la génération pour que les " +
            "changements soient visibles presque immédiatement."
        ]
      },
      contributions: {
        en: [
          "Noise map generator",
          "Endless world",
          "Threading",
          "Dynamic LOD",
          "Fall-off map",
          "Dynamic colliders",
          "Flat shading"
        ],
        fr: [
          "Générateur de noise map",
          "Monde infini",
          "Threads",
          "LOD dynamique",
          "Fall-off map",
          "Colliders dynamiques",
          "Flat shading"
        ]
      },
      media: ["assets/img/procedural-generation.jpg"],
      links: []
    }

  ],

  /* --- Bannière vidéo de l'accueil ----------------------------------------
     Un projet mis en avant, avec sa vidéo en boucle et sans son en fond.
     video   : fichier vidéo local (prioritaire), ex. "assets/video/stjerne.mp4",
               ou une liste ["assets/video/stjerne.webm", "assets/video/stjerne.mp4"].
               Le plus propre : pas d'interface YouTube, lecture immédiate.
               Voir le README (section « Bannière vidéo ») pour le préparer.
     youtube : vide = la vidéo YouTube du projet ; sinon un autre lien.
     start   : seconde à laquelle la boucle YouTube commence.             */
  banner: {
    project: "stjerne",
    video:   "",
    youtube: "",
    start:   0
  },

  /* --- Filtres par moteur -------------------------------------------------
     Un bouton par moteur, même sans projet (le visiteur voit alors un
     message « aucun projet pour l'instant »). Un projet est rangé sous un
     moteur si son champ « engine » contient le mot de « match ».           */
  engines: [
    { id: "unity",  label: "Unity",  match: "unity" },
    { id: "godot",  label: "Godot",  match: "godot" },
    { id: "unreal", label: "Unreal", match: "unreal" }
  ],

  /* --- Sections de la page « Projets » ------------------------------------
     Une section par catégorie. L'ordre ci-dessous = l'ordre sur la page.
     Une catégorie sans projet ne s'affiche pas.                            */
  categories: [
    {
      id: "3d",
      tag:   { en: "3D",  fr: "3D" },                      // pastille sur la carte
      title: { en: "3D games", fr: "Jeux 3D" },
      note:  { en: "Grid systems and spatial puzzles.",
               fr: "Systèmes de grille et puzzles dans l'espace." }
    },
    {
      id: "2d",
      tag:   { en: "2D",  fr: "2D" },
      title: { en: "2D games", fr: "Jeux 2D" },
      note:  { en: "Finished games, made solo or with a team.",
               fr: "Jeux terminés, réalisés seul ou en équipe." }
    },
    {
      id: "prototype",
      tag:   { en: "Prototype", fr: "Prototype" },
      title: { en: "Prototypes & experiments", fr: "Prototypes & expérimentations" },
      note:  { en: "Short projects built to try out one idea.",
               fr: "Projets courts, bâtis pour tester une seule idée." }
    }
  ],

  /* --- Textes de l'interface ---------------------------------------------
     Tout ce qui n'est pas un projet : menu, boutons, titres de section.    */
  ui: {
    skip:         { en: "Skip to the projects",      fr: "Aller aux projets" },
    skip_content: { en: "Skip to the content",       fr: "Aller au contenu" },
    menu_open:    { en: "Open the menu",             fr: "Ouvrir le menu" },
    menu_close:   { en: "Close the menu",            fr: "Fermer le menu" },
    nav_projects: { en: "Other projects",            fr: "Autres projets" },
    hero_eyebrow: { en: "Open to internships",       fr: "Ouvert aux stages" },
    nav_home:     { en: "Home",                      fr: "Accueil" },
    nav_work:     { en: "Work",                      fr: "Projets" },
    nav_about:    { en: "About",                     fr: "À propos" },
    nav_contact:  { en: "Contact",                   fr: "Contact" },
    lang_label:   { en: "Language",                  fr: "Langue" },
    hero_cta:     { en: "See the projects",          fr: "Voir les projets" },
    work_title:   { en: "Work",                      fr: "Projets" },
    filter_all:   { en: "All",                       fr: "Tout" },
    filter_type:  { en: "Project type",              fr: "Type de projet" },
    filter_engine:{ en: "Engine",                    fr: "Moteur" },
    engine_all:   { en: "All engines",               fr: "Tous les moteurs" },
    empty_engine: { en: "No {engine} project yet.",  fr: "Aucun projet {engine} pour l'instant." },
    empty_combo:  { en: "No project matches these filters.",
                    fr: "Aucun projet ne correspond à ces filtres." },
    reset_filters:{ en: "Show all projects",         fr: "Voir tous les projets" },
    banner_label: { en: "Featured project",          fr: "Projet à la une" },
    banner_cta:   { en: "See the project",           fr: "Voir le projet" },
    pause_video:  { en: "Pause the video",           fr: "Mettre la vidéo en pause" },
    empty:        { en: "No project in this category yet.",
                    fr: "Aucun projet dans cette catégorie pour l'instant." },
    about_page:   { en: "About me",                  fr: "À propos de moi" },
    education:    { en: "Education",                 fr: "Parcours" },
    skills:       { en: "Skills",                    fr: "Compétences" },
    facts:        { en: "Good to know",              fr: "En bref" },
    contact_title:{ en: "Get in touch",              fr: "Me contacter" },
    contact_lead: { en: "Open to internships and team projects.",
                    fr: "Ouvert aux stages et aux projets d'équipe." },
    contact_soon: { en: "Contact details coming soon.",
                    fr: "Coordonnées à venir." },
    back_work:    { en: "All projects",              fr: "Tous les projets" },
    next_project: { en: "Next project",              fr: "Projet suivant" },
    prev_project: { en: "Previous project",          fr: "Projet précédent" },
    not_found:    { en: "This project doesn't exist (any more).",
                    fr: "Ce projet n'existe pas (ou plus)." },
    projects_one: { en: "project",                   fr: "projet" },
    projects_many:{ en: "projects",                  fr: "projets" },
    contribution: { en: "My contribution",           fr: "Ma contribution" },
    walkthrough:  { en: "Walkthrough",               fr: "Walkthrough" },
    play_video:   { en: "Play the video",            fr: "Lancer la vidéo" },
    watch_on_youtube: { en: "Watch on YouTube",      fr: "Voir sur YouTube" },
    stat_projects:{ en: "projects shipped",          fr: "projets réalisés" },
    stat_engines: { en: "engines",                   fr: "moteurs" },
    stat_team:    { en: "biggest team",              fr: "plus grande équipe" },
    spec_engine:  { en: "Engine",                    fr: "Moteur" },
    spec_team:    { en: "Team",                      fr: "Équipe" },
    spec_duration:{ en: "Duration",                  fr: "Durée" },
    ch_email:     { en: "the quickest way",          fr: "le plus rapide" },
    ch_itch:      { en: "playable builds",           fr: "builds jouables" },
    ch_github:    { en: "source code",               fr: "code source" },
    ch_linkedin:  { en: "background",                fr: "parcours" },
    ch_cv:        { en: "PDF",                       fr: "PDF" },
    cv_label:     { en: "Résumé",                    fr: "CV" }
  }
};
