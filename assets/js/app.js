/* ==========================================================================
   app.js : construit les pages à partir de content.js.
   En principe tu n'as jamais besoin de modifier ce fichier.

   Trois pages partagent ce fichier :
     index.html   (data-page="home")     accueil + liste des projets
     projet.html  (data-page="project")  une fiche projet, via ?id=…
     about.html   (data-page="about")    la présentation détaillée

   Deux langues : le texte est choisi au rendu, toute la page est reconstruite
   au clic sur EN / FR, et le choix est mémorisé dans le navigateur.
   ========================================================================== */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var el = function (tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };

  /* Icône Phosphor (voir icons.js). */
  function icon(name, cls) {
    var s = el("span", cls || "ico");
    s.innerHTML = (window.ICONS && ICONS[name]) || "";
    return s;
  }

  var PAGE = document.body.getAttribute("data-page") || "home";

  /* --- Langue ------------------------------------------------------------ */
  var LANGS = ["en", "fr"];
  var STORE = "portfolio-lang";

  function param(name) {
    var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function initialLang() {
    var asked = param("lang").toLowerCase();
    if (LANGS.indexOf(asked) !== -1) return asked;
    var saved = null;
    try { saved = localStorage.getItem(STORE); } catch (e) { /* mode privé */ }
    if (LANGS.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : "en";
  }

  var lang = initialLang();

  /* t(valeur) : accepte "texte" ou { en:"…", fr:"…" } et renvoie la bonne
     langue, avec repli sur l'autre si une seule est renseignée. */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v.map(t).join(" ");
    if (v[lang] != null && v[lang] !== "") return v[lang];
    for (var i = 0; i < LANGS.length; i++) {
      if (v[LANGS[i]] != null && v[LANGS[i]] !== "") return v[LANGS[i]];
    }
    return "";
  }

  /* tList(valeur) : même chose pour une liste de paragraphes. */
  function tList(v) {
    if (!v) return [];
    if (Array.isArray(v)) return v.map(t);
    var arr = (v[lang] && v[lang].length) ? v[lang] : null;
    if (!arr) {
      for (var i = 0; i < LANGS.length; i++) {
        if (v[LANGS[i]] && v[LANGS[i]].length) { arr = v[LANGS[i]]; break; }
      }
    }
    return (arr || []).map(t);
  }

  var UI = (CONTENT.ui || {});
  function ui(key) { return t(UI[key]); }

  /* --- Catégories -------------------------------------------------------- */
  var CATS = CONTENT.categories || [];
  function cat(id) {
    for (var i = 0; i < CATS.length; i++) { if (CATS[i].id === id) return CATS[i]; }
    return null;
  }

  function projectById(id) {
    var list = CONTENT.projects || [];
    for (var i = 0; i < list.length; i++) { if (list[i].id === id) return list[i]; }
    return null;
  }

  function projectUrl(p) { return "projet.html?id=" + encodeURIComponent(p.id); }

  /* --- Image avec repli si le fichier manque ---------------------------- */
  function media(src, alt, holder, letter) {
    if (!src) { holder.classList.add("card__media--empty");
                holder.setAttribute("data-letter", letter); return; }
    var img = new Image();
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.onerror = function () {
      img.remove();
      holder.classList.add("card__media--empty");
      holder.setAttribute("data-letter", letter);
    };
    holder.appendChild(img);
  }

  /* Barre moteur / équipe / durée. labelled = version détaillée (fiche).
     Une valeur vide est simplement absente. */
  function specs(p) {
    var shell = el("div", "shell");
    var box = el("div", "core specs");
    [["spec_engine", p.engine], ["spec_team", p.team], ["spec_duration", p.duration]]
      .forEach(function (pair) {
        var value = t(pair[1]);
        if (!value) return;
        var row = el("div", "specs__row");
        row.appendChild(el("span", "specs__label", ui(pair[0])));
        row.appendChild(el("span", "specs__value", value));
        box.appendChild(row);
      });
    shell.appendChild(box);
    return shell;
  }

  /* --- Couleurs d'ambiance tirées des captures --------------------------
     Une ou plusieurs images sont réduites à quelques pixels dans un canvas.
     Agrandie par le navigateur, cette mini-image devient une lumière douce
     aux couleurs du jeu. Ouvert en double-clic (file://), le navigateur
     refuse la lecture du canvas : on n'affiche alors simplement rien.     */
  var ambCache = {};
  function ambientURL(srcs, done) {
    srcs = (srcs || []).filter(Boolean);
    if (!srcs.length) return;
    var key = srcs.join("|") + (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "#d" : "#l");
    if (ambCache[key]) { done(ambCache[key]); return; }
    var imgs = [], left = srcs.length, failed = false;
    srcs.forEach(function (src, i) {
      var im = new Image();
      im.decoding = "async";
      im.onload = function () { if (--left === 0 && !failed) paint(); };
      im.onerror = function () { failed = true; };
      im.src = src;
      imgs[i] = im;
    });
    function paint() {
      try {
        /* 1. chaque image réduite à 6 x 4 pixels, côte à côte */
        var w = 6, h = 4, n = imgs.length;
        var tiny = document.createElement("canvas");
        tiny.width = w * n; tiny.height = h;
        var tctx = tiny.getContext("2d");
        imgs.forEach(function (im, i) { tctx.drawImage(im, i * w, 0, w, h); });

        /* 2. agrandie et floutée : les raccords entre images disparaissent.
           On déborde du cadre pour que les bords ne s'assombrissent pas. */
        var W = 64 * n, H = 64, pad = 24;
        var c = document.createElement("canvas");
        c.width = W; c.height = H;
        var ctx = c.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        /* En mode clair, les captures sombres saliraient le fond : on éclaircit. */
        var dark = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
        if ("filter" in ctx) ctx.filter = "blur(" + (10 + 4 * n) + "px) " +
          (dark ? "saturate(1.8) brightness(1.05)" : "saturate(2.1) brightness(1.45)");
        ctx.drawImage(tiny, -pad, -pad, W + pad * 2, H + pad * 2);

        ambCache[key] = "url(" + c.toDataURL("image/jpeg", 0.82) + ")";
        done(ambCache[key]);
      } catch (e) { /* canvas refusé (file://) : pas d'ambiance */ }
    }
  }

  /* Lumière d'ambiance derrière une section. */
  function ambientLayer(host, srcs) {
    if (!host) return;
    var key = (srcs || []).filter(Boolean).join("|");
    var layer = $(":scope > .ambient", host);
    if (layer && layer.getAttribute("data-key") === key) return;   /* déjà en place */
    if (layer) layer.remove();
    if (!key) return;
    layer = el("div", "ambient");
    layer.setAttribute("aria-hidden", "true");
    layer.setAttribute("data-key", key);
    host.insertBefore(layer, host.firstChild);
    ambientURL(srcs, function (url) {
      layer.style.backgroundImage = url;
      requestAnimationFrame(function () { layer.classList.add("is-on"); });
    });
  }

  /* Bordure colorée d'une carte ou d'un cadre. */
  function bezel(node, src) {
    if (!src) return;
    node.classList.add("has-amb");
    ambientURL([src], function (url) {
      node.style.setProperty("--amb-img", url);
      requestAnimationFrame(function () { node.classList.add("amb-on"); });
    });
  }

  /* Cadre « double-bezel » autour d'une image. */
  function frame(src, alt, tag) {
    var f = el(tag || "div", "frame");
    var core = el("span", "frame__core");
    var img = new Image();
    img.src = src; img.alt = alt || ""; img.loading = "lazy"; img.decoding = "async";
    img.onerror = function () { f.remove(); };
    core.appendChild(img);
    f.appendChild(core);
    bezel(f, src);
    return f;
  }

  /* --- Réapparition au défilement + petites animations ------------------- */
  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  var watcher = null;

  /* Après le premier affichage (changement de langue, filtre…), le contenu
     déjà vu ne rejoue pas son entrée : on ne répète pas une animation que le
     visiteur a déjà eue. */
  var firstRender = true;

  function reveal(node, index) {
    if (!firstRender) return node;
    node.classList.add("reveal");
    if (index != null) node.style.setProperty("--d", index);
    return node;
  }

  function watchReveals() {
    var pending = $$(".reveal:not(.is-in)");
    if (REDUCED || !("IntersectionObserver" in window)) {
      pending.forEach(function (n) { n.classList.add("is-in"); onShown(n); });
      return;
    }
    if (!watcher) {
      watcher = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          onShown(e.target);
          watcher.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    pending.forEach(function (n) { watcher.observe(n); });
  }

  /* Compteur qui grimpe, pour les chiffres de l'accueil. */
  var raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : function (cb) { return setTimeout(function () { cb(Date.now()); }, 16); };

  function onShown(node) {
    var target = parseInt(node.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    node.removeAttribute("data-count");
    var out = $(".stat__value", node) || node;
    if (REDUCED) { out.textContent = target; return; }
    var start = null, dur = 900;
    function step(ts) {
      if (start === null) start = ts;
      var k = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - k, 3);
      out.textContent = Math.round(target * eased);
      if (k < 1) raf(step);
    }
    out.textContent = "0";
    raf(step);
  }

  /* --- YouTube : vignette cliquable, le lecteur ne charge qu'au clic ----- */
  function youtubeId(url) {
    if (!url) return "";
    var m = /(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/.exec(url);
    return m ? m[1] : "";
  }

  function videoBlock(p) {
    var id = youtubeId(p.video);
    if (!id) return null;

    var wrap = el("div", "video-wrap");
    var shell = el("div", "shell");
    var box = el("div", "video");
    var btn = el("button", "video__poster");
    btn.type = "button";
    btn.setAttribute("aria-label", ui("play_video") + " : " + p.title);

    var thumb = new Image();
    thumb.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    thumb.alt = "";
    thumb.loading = "lazy";
    /* Vignette YouTube indisponible : on retombe sur l'image du projet. */
    thumb.onerror = function () {
      if (p.cover && thumb.getAttribute("src") !== p.cover) { thumb.src = p.cover; }
      else { thumb.remove(); }
    };
    btn.appendChild(thumb);
    var play = el("span", "video__play");
    var inner = el("span");
    inner.appendChild(icon("play", "ico"));
    play.appendChild(inner);
    btn.appendChild(play);

    btn.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1";
      frame.title = p.title;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.setAttribute("frameborder", "0");
      box.textContent = "";
      box.appendChild(frame);
    });

    box.appendChild(btn);
    shell.appendChild(box);
    wrap.appendChild(shell);

    /* Sortie de secours : si l'intégration est bloquée (vidéo privée, page
       ouverte en file://…), ce lien marche toujours. */
    var out = el("a", "video__out");
    out.appendChild(icon("youtube-logo"));
    out.appendChild(el("span", null, ui("watch_on_youtube")));
    out.href = "https://www.youtube.com/watch?v=" + id;
    out.target = "_blank";
    out.rel = "noopener";
    wrap.appendChild(out);

    return wrap;
  }

  /* --- Carte projet (lien vers la fiche) --------------------------------- */
  function card(p) {
    var a = el("a", "card");
    a.href = projectUrl(p);
    a.setAttribute("data-cat", p.category);
    a.setAttribute("data-id", p.id);

    var core = el("div", "card__core");
    var m = el("div", "card__media");
    media(p.cover, p.title, m, p.title.charAt(0));
    core.appendChild(m);

    var body = el("div", "card__body");
    var row = el("div", "card__row");
    row.appendChild(el("h4", "card__title", p.title));
    row.appendChild(icon("arrow-up-right", "card__go"));
    body.appendChild(row);
    body.appendChild(el("p", "card__summary", t(p.summary)));

    var meta = el("p", "card__meta");
    [t(p.date || p.year), t(p.engine), t(p.team)].forEach(function (v) {
      if (v) meta.appendChild(el("span", null, v));
    });
    body.appendChild(meta);
    core.appendChild(body);
    a.appendChild(core);
    bezel(a, p.cover);

    return a;
  }

  /* Bento : autant de cellules que de projets, jamais de trou.
     Trio = une grande carte (2 rangées) + deux petites ; paire = 7/5 ;
     projet seul = carte large. Le côté de la grande carte alterne. */
  function bentoSpans(n) {
    var out = [], flip = false;
    while (n > 0) {
      if (n === 1)      { out.push("span-12"); n -= 1; }
      else if (n === 2 || n === 4) {
        out.push(flip ? "span-5" : "span-7", flip ? "span-7" : "span-5"); n -= 2;
      } else {
        out.push("span-7 row-2", "span-5", "span-5"); n -= 3;
      }
      flip = !flip;
    }
    return out;
  }

  /* --- Contact (présent sur plusieurs pages) ----------------------------- */
  var CHANNELS = [
    { key: "email",    label: "Email",    what: "ch_email",    icon: "envelope-simple", href: function (v) { return "mailto:" + v; } },
    { key: "itch",     label: "itch.io",  what: "ch_itch",     icon: "game-controller" },
    { key: "github",   label: "GitHub",   what: "ch_github",   icon: "github-logo" },
    { key: "linkedin", label: "LinkedIn", what: "ch_linkedin", icon: "linkedin-logo" },
    { key: "cv",       label: null,       what: "ch_cv",       icon: "file-text" }   /* label = ui.cv_label */
  ];

  function buildContact() {
    var host = $("#contact-list");
    if (!host) return;
    host.textContent = "";
    host.className = "contact__list";

    CHANNELS.forEach(function (c) {
      var v = ((CONTENT.contact && CONTENT.contact[c.key]) || "").trim();
      if (!v) return;
      var a = el("a");
      a.href = c.href ? c.href(v) : v;
      if (!c.href) { a.target = "_blank"; a.rel = "noopener"; }
      a.appendChild(icon(c.icon, "contact__ico"));
      var txt = el("span");
      txt.appendChild(el("span", "contact__name", c.label || ui("cv_label")));
      txt.appendChild(document.createTextNode(" "));
      txt.appendChild(el("span", "contact__what", ui(c.what)));
      a.appendChild(txt);
      a.appendChild(icon(c.href ? "arrow-right" : "arrow-up-right", "btn__icon"));
      var li = el("li");
      li.appendChild(a);
      host.appendChild(li);
    });

    if (!host.children.length) {
      host.className = "contact__list contact__list--empty";
      var li = el("li");
      li.appendChild(el("p", "contact__lead", ui("contact_soon")));
      host.appendChild(li);
    }
  }

  /* ======================================================================
     PAGE D'ACCUEIL
     ====================================================================== */
  var filter = "all";          /* type de projet actif (conservé au changement de langue) */
  var engine = "all";          /* moteur actif */

  var ENGINES = CONTENT.engines || [];
  function engineById(id) {
    for (var i = 0; i < ENGINES.length; i++) { if (ENGINES[i].id === id) return ENGINES[i]; }
    return null;
  }
  function matchesEngine(p) {
    if (engine === "all") return true;
    var e = engineById(engine);
    var needle = ((e && (e.match || e.id)) || engine).toLowerCase();
    return String(t(p.engine)).toLowerCase().indexOf(needle) !== -1;
  }

  function buildBoard() {
    var board = $("#board");
    if (!board || board.children.length) return;      /* images seules : une fois */
    /* Trois captures de projets mis en avant, posées en pile. */
    var picked = CONTENT.projects.filter(function (p) { return p.featured && p.cover; })
      .concat(CONTENT.projects.filter(function (p) { return !p.featured && p.cover; }))
      .slice(0, 3);

    picked.forEach(function (p, i) {
      var f = frame(p.cover, "", "a");
      f.href = projectUrl(p);
      f.setAttribute("aria-label", p.title);
      f.style.setProperty("--i", i);
      var img = f.querySelector("img");
      img.loading = "eager";
      if (i === 0) img.fetchPriority = "high";
      board.appendChild(f);
    });
    ambientLayer($(".hero"), picked.map(function (p) { return p.cover; }));
  }

  /* Les catégories, chacune avec ses projets du moteur choisi.
     Reconstruites à chaque changement de moteur, pour que la grille bento
     garde toujours autant de cases que de projets visibles.               */
  function buildGroups(animate) {
    var host = $("#groups");
    if (!host) return;
    host.textContent = "";

    CATS.forEach(function (c) {
      var list = CONTENT.projects.filter(function (p) {
        return p.category === c.id && matchesEngine(p);
      });
      if (!list.length) return;

      var sec = el("section", "group");
      sec.setAttribute("data-group", c.id);
      sec.id = "work-" + c.id;

      var head = el("div", "group__head");
      var h = el("h3", "group__title", t(c.title));
      h.appendChild(el("span", "group__count",
        list.length + " " + ui(list.length > 1 ? "projects_many" : "projects_one")));
      head.appendChild(h);
      var note = t(c.note);
      if (note) head.appendChild(el("p", "group__note", note));
      sec.appendChild(reveal(head));

      var grid = el("div", "bento");
      var spans = bentoSpans(list.length);
      list.forEach(function (p, i) {
        var k = card(p);
        spans[i].split(" ").forEach(function (cl) { k.classList.add(cl); });
        grid.appendChild(reveal(k, i % 3));
      });
      sec.appendChild(grid);
      ambientLayer(sec, list.slice(0, 3).map(function (p) { return p.cover; }));

      host.appendChild(sec);

      /* Nouveau tri : les cartes montent doucement, en léger décalage. */
      if (animate && !REDUCED && grid.animate) {
        Array.prototype.forEach.call(grid.children, function (k, i) {
          k.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }],
                    { duration: 280, delay: Math.min(i, 5) * 40, easing: "cubic-bezier(.23,1,.32,1)", fill: "backwards" });
        });
      }
    });
  }

  /* Pilule active d'un groupe de filtres : copie des boutons, découpée au
     clip-path sur le bouton choisi. */
  function moveClip(host, active) {
    var overlay = host && $(".filters__active", host);
    if (!overlay) return;
    var btn = $('.filter[data-filter="' + active + '"]', host);
    if (!btn || !overlay.offsetWidth) return;
    var ow = overlay.offsetWidth, oh = overlay.offsetHeight;
    var left = btn.offsetLeft - overlay.offsetLeft;
    var right = ow - left - btn.offsetWidth;
    var first = !overlay.hasAttribute("data-ready");
    if (first) overlay.style.transition = "none";          /* pas de glissement au chargement */
    overlay.style.clipPath = "inset(0 " + right + "px " + (oh - btn.offsetHeight) + "px " + left + "px round 999px)";
    if (first) { void overlay.offsetWidth; overlay.style.transition = ""; overlay.setAttribute("data-ready", ""); }
  }
  function moveFilterClip() {
    moveClip($("#filters"), filter);
    moveClip($("#filters-engine"), engine);
  }

  function markPills(host, active) {
    $$(":scope > .filter", host).forEach(function (b) {
      var on = b.getAttribute("data-filter") === active;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function applyFilter(animate) {
    if (!$("#groups")) return;
    var shown = 0;
    $$("#groups .group").forEach(function (sec) {
      var ok = (filter === "all" || sec.getAttribute("data-group") === filter);
      var wasHidden = sec.hidden;
      sec.hidden = !ok;
      if (ok) shown++;
      /* Une section qui réapparaît monte doucement au lieu de surgir. */
      if (ok && wasHidden && animate && !REDUCED && sec.animate) {
        sec.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }],
                    { duration: 280, easing: "cubic-bezier(.23,1,.32,1)" });
      }
    });

    /* État vide : on dit pourquoi, et on propose d'en sortir. */
    var empty = $("#empty");
    if (empty) {
      empty.hidden = shown > 0;
      if (!shown) {
        var e = engineById(engine);
        var engineHasNone = engine !== "all" && !CONTENT.projects.some(matchesEngine);
        $("#empty-text").textContent = engineHasNone
          ? ui("empty_engine").replace("{engine}", e ? e.label : engine)
          : (filter !== "all" && engine === "all" ? ui("empty") : ui("empty_combo"));
      }
    }

    markPills($("#filters"), filter);
    markPills($("#filters-engine"), engine);
    moveFilterClip();
  }

  /* Un groupe de filtres en pilule, avec sa copie « active » découpée. */
  function buildPills(host, items, onPick) {
    if (!host) return;
    host.textContent = "";
    items.forEach(function (it) {
      var b = el("button", "filter", it.label);
      b.type = "button";
      b.setAttribute("data-filter", it.id);
      b.addEventListener("click", function () { onPick(it.id); });
      host.appendChild(b);
    });
    var overlay = el("div", "filters__active");
    overlay.setAttribute("aria-hidden", "true");
    items.forEach(function (it) { overlay.appendChild(el("span", "filter", it.label)); });
    host.appendChild(overlay);
    host.classList.add("has-clip");
  }

  function buildFilters() {
    var types = [{ id: "all", label: ui("filter_all") }];
    CATS.forEach(function (c) {
      var has = CONTENT.projects.some(function (p) { return p.category === c.id; });
      if (has) types.push({ id: c.id, label: t(c.title) });
    });
    buildPills($("#filters"), types, function (id) {
      if (filter === id) return;
      filter = id; applyFilter(true);
    });

    /* Les moteurs s'affichent même sans projet (Unreal, pour l'instant). */
    var engines = [{ id: "all", label: ui("engine_all") }].concat(
      ENGINES.map(function (e) { return { id: e.id, label: t(e.label) }; }));
    buildPills($("#filters-engine"), engines, function (id) {
      if (engine === id) return;
      engine = id; buildGroups(true); applyFilter(false);
    });
  }

  /* ======================================================================
     BANNIÈRE VIDÉO (fond du hero de l'accueil)
     Vidéo locale si elle existe, sinon la vidéo YouTube du projet, muette et
     en boucle. L'image du projet reste dessous tant que la vidéo ne joue pas
     (chargement, page ouverte en double-clic, « moins d'animations »…).
     ====================================================================== */
  var feature = { built: false, player: null, video: null, paused: false, playing: false, visible: true };

  function featureProject() {
    var b = CONTENT.banner || {};
    return b.project ? projectById(b.project) : null;
  }

  function setToggle(isPlaying) {
    var btn = $("#feature-toggle");
    if (!btn) return;
    btn.hidden = false;
    btn.innerHTML = "";
    btn.appendChild(icon(isPlaying ? "pause" : "play", "ico"));
    btn.setAttribute("aria-label", ui(isPlaying ? "pause_video" : "play_video"));
    btn.setAttribute("data-state", isPlaying ? "playing" : "paused");
  }

  function featurePlay()  {
    if (feature.video) feature.video.play().catch(function () {});
    if (feature.player && feature.player.playVideo) feature.player.playVideo();
  }
  function featurePause() {
    if (feature.video) feature.video.pause();
    if (feature.player && feature.player.pauseVideo) feature.player.pauseVideo();
  }
  /* Joue seulement si le visiteur n'a pas mis en pause, si la bannière est
     à l'écran et si l'onglet est visible : on n'use pas la batterie pour rien. */
  function featureSync() {
    var should = !feature.paused && feature.visible && !document.hidden;
    if (should) featurePlay(); else featurePause();
  }

  function shown(media) {
    requestAnimationFrame(function () { media.classList.add("is-playing"); });
  }

  function buildFeatureVideo(p, media) {
    var b = CONTENT.banner || {};

    /* 1. Fichier local : lecture native, aucune interface tierce. */
    if (Array.isArray(b.video) ? b.video.length : b.video) {
      var v = document.createElement("video");
      v.className = "feature__video";
      v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.preload = "metadata";
      /* Un fichier, ou une liste (ex. WebM puis MP4) : le navigateur prend
         le premier qu'il sait lire. */
      var files = Array.isArray(b.video) ? b.video : [b.video];
      var last = null;
      files.forEach(function (f) {
        var src = document.createElement("source");
        src.src = f;
        if (/\.webm($|\?)/i.test(f)) src.type = "video/webm";
        else if (/\.mp4($|\?)/i.test(f)) src.type = "video/mp4";
        v.appendChild(src);
        last = src;
      });
      function drop() {
        v.remove(); feature.video = null;
        var t2 = $("#feature-toggle"); if (t2) t2.hidden = true;
      }
      if (last) last.addEventListener("error", drop);
      v.addEventListener("error", drop);
      v.addEventListener("playing", function () { feature.playing = true; shown(v); setToggle(true); });
      v.addEventListener("pause",   function () { setToggle(false); });
      media.appendChild(v);
      feature.video = v;
      featureSync();
      return;
    }

    /* 2. YouTube : seulement sur un vrai serveur (YouTube refuse file://). */
    var id = youtubeId(b.youtube || p.video);
    if (!id || !/^https?:$/.test(location.protocol)) return;

    var slot = el("div", "feature__yt");
    var target = el("div");
    target.id = "feature-yt";
    slot.appendChild(target);
    media.appendChild(slot);

    function create() {
      feature.player = new YT.Player("feature-yt", {
        host: "https://www.youtube-nocookie.com",
        videoId: id,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0,
          loop: 1, playlist: id, start: b.start || 0,
          modestbranding: 1, rel: 0, iv_load_policy: 3, playsinline: 1,
          origin: location.origin
        },
        events: {
          onReady: function (e) {
            e.target.mute();
            var f = e.target.getIframe && e.target.getIframe();
            if (f) { f.setAttribute("tabindex", "-1"); f.setAttribute("title", p.title); }
            featureSync();
          },
          onStateChange: function (e) {
            if (e.data === 1) { feature.playing = true; shown(slot); setToggle(true); }
            if (e.data === 2) setToggle(false);
            /* Fin de la vidéo : retour au début sans laisser voir l'écran de fin. */
            if (e.data === 0) { e.target.seekTo(b.start || 0); e.target.playVideo(); }
          },
          /* Vidéo privée, intégration refusée… : on retire le lecteur,
             l'image du projet reste, et le bouton disparaît. */
          onError: function () {
            slot.remove(); feature.player = null;
            var t2 = $("#feature-toggle"); if (t2) t2.hidden = true;
          }
        }
      });
    }

    if (window.YT && window.YT.Player) { create(); return; }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (prev) prev(); create(); };
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = function () { slot.remove(); };
    document.head.appendChild(tag);
  }

  function buildFeature() {
    var sec = $("#feature");
    var p = featureProject();
    if (!sec || !p) return;
    sec.hidden = false;

    /* Textes : refaits à chaque changement de langue. */
    $("#feature-title").textContent = p.title;
    var sum = $("#feature-summary");
    if (sum) sum.textContent = t(p.summary);
    var meta = $("#feature-meta");
    meta.textContent = "";
    [t(p.date || p.year), t(p.engine), t(p.team)].forEach(function (v) {
      if (v) meta.appendChild(el("span", null, v));
    });
    $("#feature-cta").href = projectUrl(p);
    if (feature.built) { setToggle(feature.playing && !feature.paused); return; }

    /* Le reste, une seule fois. */
    feature.built = true;
    var media = $("#feature-media");
    var poster = el("div", "feature__poster");
    if (p.cover) poster.style.backgroundImage = "url(\"" + p.cover + "\")";
    media.appendChild(poster);

    var btn = $("#feature-toggle");
    /* Rien à lire (pas de vidéo, ou page ouverte en double-clic) : la
       bannière reste une belle image fixe, sans bouton inutile. */
    var bn = CONTENT.banner || {};
    var canPlay = (Array.isArray(bn.video) ? bn.video.length > 0 : !!bn.video) || (!!youtubeId(bn.youtube || p.video) && /^https?:$/.test(location.protocol));
    if (!canPlay) return;

    btn.addEventListener("click", function () {
      feature.paused = !feature.paused;
      if (feature.paused) { featurePause(); setToggle(false); }
      else { featureSync(); setToggle(true); }
    });

    /* « Moins d'animations » ou économie de données : pas de lecture
       automatique, l'image reste et le bouton permet de lancer la vidéo. */
    var saveData = navigator.connection && navigator.connection.saveData;
    if (REDUCED || saveData) {
      feature.paused = true;
      setToggle(false);
      var start = function () {
        btn.removeEventListener("click", start);
        if (!feature.video && !feature.player) buildFeatureVideo(p, media);
      };
      btn.addEventListener("click", start);
    } else {
      /* Après le chargement de la page : la vidéo ne retarde pas le reste. */
      var go = function () { buildFeatureVideo(p, media); };
      if (document.readyState === "complete") setTimeout(go, 100);
      else window.addEventListener("load", function () { setTimeout(go, 100); });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        feature.visible = entries[0].isIntersecting;
        if (feature.video || feature.player) featureSync();
      }, { threshold: 0.05 }).observe($("#hero") || sec);
    }
    document.addEventListener("visibilitychange", function () {
      if (feature.video || feature.player) featureSync();
    });
  }

  /* Trois chiffres qui grimpent, calculés depuis la liste des projets. */
  function buildStats() {
    var host = $("#stats");
    if (!host) return;
    host.textContent = "";

    var list = CONTENT.projects || [];
    var engines = {};
    var biggest = 1;
    list.forEach(function (p) {
      String(t(p.engine)).split(/[,(]/)[0].trim().split(/\s+/).slice(0, 1)
        .forEach(function (name) { if (name) engines[name] = true; });
      var found = /\d+/.exec(String((p.team && p.team.en) || t(p.team)));
      if (found) biggest = Math.max(biggest, parseInt(found[0], 10));
    });

    [[list.length, "stat_projects"],
     [Object.keys(engines).length, "stat_engines"],
     [biggest, "stat_team"]
    ].forEach(function (pair, i) {
      /* Le compteur ne grimpe qu'au premier affichage. Après un changement
         de langue, les chiffres sont écrits directement à leur valeur. */
      var count = firstRender && !REDUCED;
      var li = el("li", "stat");
      if (count) li.setAttribute("data-count", pair[0]);
      li.appendChild(el("span", "stat__value", count ? "0" : String(pair[0])));
      li.appendChild(el("span", "stat__label", ui(pair[1])));
      host.appendChild(reveal(li, i));
    });
  }

  function renderHome() {
    $("#hero-name").textContent    = CONTENT.name;
    $("#hero-tagline").textContent = t(CONTENT.tagline);

    buildBoard();
    buildStats();
    buildFeature();
    buildFilters();
    buildGroups(false);
    applyFilter(false);

    var reset = $("#empty-reset");
    if (reset && !reset.hasAttribute("data-bound")) {
      reset.setAttribute("data-bound", "");
      reset.addEventListener("click", function () {
        filter = "all"; engine = "all";
        buildGroups(true); applyFilter(false);
      });
    }
  }

  /* ======================================================================
     FICHE PROJET  (projet.html?id=…)
     ====================================================================== */
  function renderProject() {
    var list = CONTENT.projects || [];
    var p = projectById(param("id"));

    if (!p) {
      $("#pj-article").hidden = true;
      $("#pj-missing").hidden = false;
      $("#pj-missing-text").textContent = ui("not_found");
      document.title = CONTENT.name;
      return;
    }
    $("#pj-article").hidden = false;
    $("#pj-missing").hidden = true;

    document.title = p.title + " - " + CONTENT.name;

    $("#pj-title").textContent = p.title;
    ambientLayer($(".page"), [p.cover]);
    var c = cat(p.category);
    $("#pj-meta").textContent =
      [c ? t(c.tag) : "", t(p.date || p.year)].filter(Boolean).join(" · ");
    $("#pj-summary").textContent = t(p.summary);

    var specsBox = $("#pj-specs");
    specsBox.textContent = "";
    specsBox.appendChild(reveal(specs(p)));

    var mediaBox = $("#pj-media");
    mediaBox.textContent = "";
    (p.media || []).forEach(function (item) {
      var src     = (typeof item === "string") ? item : item.src;
      var caption = (typeof item === "string") ? ""   : t(item.caption);
      if (!src) return;
      var fig = el("figure", "pj__shot");
      var f = frame(src, caption || p.title);
      f.querySelector("img").onerror = function () { fig.remove(); };
      fig.appendChild(f);
      if (caption) fig.appendChild(el("figcaption", null, caption));
      mediaBox.appendChild(reveal(fig, mediaBox.children.length));
    });

    var videoBox = $("#pj-video");
    videoBox.textContent = "";
    var vid = videoBlock(p);
    if (vid) {
      videoBox.hidden = false;
      videoBox.appendChild(el("h2", "pj__video-title", ui("walkthrough")));
      videoBox.appendChild(vid);
      reveal(videoBox);
    } else {
      videoBox.hidden = true;
    }

    var txt = $("#pj-text");
    txt.textContent = "";
    tList(p.description).forEach(function (para, i) { txt.appendChild(reveal(el("p", null, para), i)); });

    /* « Ma contribution » : masqué si le projet n'en déclare pas */
    var contribList = tList(p.contributions);
    var contribBox  = $("#pj-contrib");
    contribBox.hidden = !contribList.length;
    var ul = $("#pj-contrib-list");
    ul.textContent = "";
    contribList.forEach(function (item, i) {
      ul.appendChild(reveal(el("li", "chip", item), i % 6));
    });

    var links = $("#pj-links");
    links.textContent = "";
    (p.links || []).forEach(function (l) {
      var a = el("a", "btn");
      a.appendChild(el("span", null, t(l.label)));
      a.appendChild(icon("arrow-up-right", "btn__icon"));
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      links.appendChild(a);
    });

    /* Projet précédent / suivant, dans l'ordre de content.js */
    var i = list.indexOf(p);
    function sibling(holder, other, labelKey) {
      holder.textContent = "";
      if (!other) { holder.hidden = true; return; }
      holder.hidden = false;
      var a = el("a", "pj__sibling shell");
      a.href = projectUrl(other);
      bezel(a, other.cover);
      var core = el("span", "core");
      var th = el("span", "pj__sibling-thumb");
      if (other.cover) {
        var img = new Image(); img.src = other.cover; img.alt = ""; img.loading = "lazy";
        img.onerror = function () { img.remove(); };
        th.appendChild(img);
      }
      var txt = el("span", "pj__sibling-text");
      txt.appendChild(el("span", "pj__sibling-label", ui(labelKey)));
      txt.appendChild(el("span", "pj__sibling-title", other.title));
      var prev = labelKey === "prev_project";
      var arrow = icon(prev ? "arrow-left" : "arrow-right", "card__go");
      /* précédent : flèche, vignette, texte ; suivant : texte, vignette, flèche */
      (prev ? [arrow, th, txt] : [txt, th, arrow]).forEach(function (n) { core.appendChild(n); });
      a.appendChild(core);
      holder.appendChild(reveal(a));
    }
    sibling($("#pj-prev"), list[i - 1], "prev_project");
    sibling($("#pj-next"), list[i + 1], "next_project");
  }

  /* ======================================================================
     PAGE « À PROPOS »
     ====================================================================== */
  function renderAbout() {
    var pr = CONTENT.profile || {};

    $("#ab-name").textContent = CONTENT.name;
    $("#ab-role").textContent = t(pr.role);
    $("#ab-lead").textContent = t(pr.lead);

    var photoBox = $("#ab-photo");
    if (photoBox && !photoBox.children.length) {
      if (pr.photo) {
        var core = el("span", "frame__core");
        var img = new Image();
        img.src = pr.photo;
        img.alt = CONTENT.name;
        img.onerror = function () { photoBox.remove(); };
        core.appendChild(img);
        photoBox.appendChild(core);
        bezel(photoBox, pr.photo);
      } else { photoBox.remove(); }
    }
    ambientLayer($(".ab__hero"), [pr.photo]);

    var story = $("#ab-story");
    story.textContent = "";
    tList(pr.story).forEach(function (para, i) { story.appendChild(reveal(el("p", null, para), i)); });

    var edu = $("#ab-education");
    edu.textContent = "";
    (pr.education || []).forEach(function (e) {
      var li = el("li", "shell");
      var inner = el("div", "core timeline__item");
      inner.appendChild(el("span", "timeline__period", e.period));
      var box = el("div");
      box.appendChild(el("h3", "timeline__title", t(e.title)));
      if (e.place) box.appendChild(el("p", "timeline__place", e.place));
      var note = t(e.note);
      if (note) box.appendChild(el("p", "timeline__note", note));
      inner.appendChild(box);
      li.insertBefore(inner, li.firstChild);
      edu.appendChild(reveal(li, edu.children.length));
    });

    var sk = $("#ab-skills");
    sk.textContent = "";
    (pr.skills || []).forEach(function (group) {
      var box = el("div", "skills__group shell");
      var inner = el("div", "core");
      box.appendChild(inner);
      inner.appendChild(el("h3", "skills__title", t(group.title)));
      var ul = el("ul", "tags");
      (group.items || []).forEach(function (item) {
        ul.appendChild(el("li", "tag", t(item)));
      });
      inner.appendChild(ul);
      sk.appendChild(reveal(box, sk.children.length % 2));
    });

    var facts = $("#ab-facts");
    facts.textContent = "";
    (pr.facts || []).forEach(function (f) {
      var row = el("div", "facts__row");
      row.appendChild(el("dt", null, t(f.label)));
      row.appendChild(el("dd", null, t(f.value)));
      facts.appendChild(reveal(row, facts.children.length));
    });
  }

  /* ======================================================================
     RENDU COMMUN
     ====================================================================== */
  function render() {
    document.documentElement.lang = lang;

    $$("[data-i18n]").forEach(function (n) {
      n.textContent = ui(n.getAttribute("data-i18n"));
    });
    $$("[data-i18n-aria-label]").forEach(function (n) {
      n.setAttribute("aria-label", ui(n.getAttribute("data-i18n-aria-label")));
    });

    if ($("#year")) $("#year").textContent = new Date().getFullYear();
    buildContact();

    if (PAGE === "home")    { renderHome();    document.title = CONTENT.name + " - " +
                              (lang === "fr" ? "Game design & programmation" : "Game design & programming"); }
    if (PAGE === "project") { renderProject(); }
    if (PAGE === "about")   { renderAbout();   document.title = ui("about_page") + " - " + CONTENT.name; }

    var mb = $("#menu-btn");
    if (mb) mb.setAttribute("aria-label", ui(document.body.classList.contains("menu-open") ? "menu_close" : "menu_open"));

    $$("#lang-switch .lang__btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    /* Les sections écrites en dur dans le HTML s'animent aussi. */
    if (firstRender) $$("[data-reveal]").forEach(function (n) { n.classList.add("reveal"); });
    watchReveals();
    firstRender = false;
  }

  /* Icônes écrites en dur dans le HTML (data-icon="…"). */
  $$("[data-icon]").forEach(function (n) {
    if (!n.children.length && window.ICONS) n.innerHTML = ICONS[n.getAttribute("data-icon")] || "";
  });

  /* Menu mobile : plein écran, fermé par le bouton, Échap ou un lien. */
  var menuBtn = $("#menu-btn"), menu = $("#menu");
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    document.body.classList.toggle("menu-open", open);
    menu.classList.toggle("is-open", open);
    if (open) menu.removeAttribute("inert"); else menu.setAttribute("inert", "");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", ui(open ? "menu_close" : "menu_open"));
    if (open) { var first = $(".menu__link", menu); if (first) first.focus({ preventScroll: true }); }
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(!document.body.classList.contains("menu-open"));
    });
    $$(".menu__link").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) { setMenu(false); menuBtn.focus(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768 && document.body.classList.contains("menu-open")) setMenu(false);
    });
  }

  $$("#lang-switch .lang__btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = b.getAttribute("data-lang");
      if (next === lang) return;
      lang = next;
      try { localStorage.setItem(STORE, lang); } catch (e) { /* mode privé */ }
      /* Le texte change d'un coup : un flou très bref masque la bascule. */
      if (REDUCED) { render(); return; }
      document.body.classList.add("is-switching");
      setTimeout(function () {
        render();
        requestAnimationFrame(function () { document.body.classList.remove("is-switching"); });
      }, 120);
    });
  });

  render();

  /* La pilule des filtres suit les changements de taille et le chargement des polices. */
  window.addEventListener("resize", moveFilterClip);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveFilterClip);
})();
