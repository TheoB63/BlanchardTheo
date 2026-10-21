---
# ==========================================================================
# cv.md — the CV page  (URL: /cv)
# --------------------------------------------------------------------------
# It holds TWO things, as asked:
#   1. the CV written here, in markdown, in both languages
#   2. a download button for the PDF
#
# The page is reached through the "My CV" link (intro of the home page, about
# page, footer) — it is NOT a button in the top menu.
# The same PDF is also displayed directly inside the about page.
#
# `cv: true` below is what asks MarkdownLayout.astro for that button. Its
# address comes from `cvPdf` in src/site.ts, so you only have to drop your
# file in public/cv.pdf. If `cvPdf` is null, the button does not appear.
#
# The `layout` field is what wraps this text with the header, the footer and
# the language switch.
#
# The body is bilingual thanks to the markers:
#     <!-- lang:fr --> ... <!-- /lang -->
#     <!-- lang:en --> ... <!-- /lang -->
# They work in every markdown file of the project, including src/projects/.
# ==========================================================================
layout: ../layouts/MarkdownLayout.astro
title: CV — Blanchard Theo
cv: true
---

---
<!-- lang:fr -->

## Théo Blanchard

Programmeur Moteur et Gameplay  
Nîmes, France · theo.blanchard63@gmail.com · 06 21 84 45 69  
[theob63.github.io/BlanchardTheo/](https://theob63.github.io/BlanchardTheo/)

### Profil

Étudiant en 4ème et dernière année dans le développement de jeux vidéo (C/C++/C#), passionné par la programmation bas niveau et la conception de moteurs. Habitué au travail d'équipe et aux projets de groupe.

### Expériences

**Projet personnel — Equinox**
*07/2026 — En cours*

- Création d’un moteur de jeu en C++, utilisant Vulkan et OpenGL.

**Projets de 3ème année — Fish N’Ship, Friend-Slop**
*01/2026 — 06/2026*

- Programmation et gestion d’un bateau modulaire.
- Développement de la physique et du gameplay liés au bateau en réseau.
- Level Building et création d’effets visuels pour l’environnement.

**Projets de 2ème année — Godbreak, Sandbox**
*01/2025 — 06/2025*

- Génération procédurale du terrain, des structures et des loots.
- Système de construction.
- Sauvegarde du terrain et des inventaires.

**Job d’été — Burger King, Aire des Volcans d’Auvergne**
*06/2025 — 09/2025*

**Stages de première et deuxième année de BTS — Fiat Powertrain Technologies, Bourbon-Lancy**
*06/2022 — 07/2022 & 01/2021 — 02/2021*

**Stage de terminale — Symbo, Syndicat de rivière, Saint-Jean-d’Angély**
*04/2019 — 05/2019 & 06/2019 — 07/2019*

### Formation

**Préparation d’un titre RNCP de niveau 6 : Programmeur Jeux Vidéo**
*2022 — 2027*  
Creajeux — L'École des Métiers du Jeu Vidéo, Nîmes

**BTS Moteur à Combustion Interne (MCI)**
*2020 — 2022*  
Lycée Isaac de l’Étoile, Poitiers

**Baccalauréat STAV**
*2017 — 2020*  
Lycée Louis Pasteur Marmilhat, Lempdes

### Compétences

- Développement orienté objet : C, C++, C#
- Architecture et programmation moteur
- Programmation gameplay et graphique
- Travail en équipe et gestion de projets

### Logiciels

- **Moteurs :** Unreal Engine, Unity
- **IDE :** Visual Studio, Rider
- **Versioning :** GitHub, SVN

### Langues

Français (langue maternelle)  
Anglais (B1)

### Centres d’intérêts

Sports · Lecture · Jeux de stratégie · Jeux vidéo · Dessin

<!-- /lang -->

<!-- lang:en -->

## Theo Blanchard

Engine & Gameplay Programmer  
Nîmes, France · theo.blanchard63@gmail.com · +33 6 21 84 45 69  
[theob63.github.io/BlanchardTheo/](https://theob63.github.io/BlanchardTheo/)

### Profile

Fourth-year and final-year student in video game development (C/C++/C#), passionate about low-level programming and engine development. Experienced in teamwork and group projects.

### Experience

**Personal Project — Equinox**
*07/2026 — Present*

- Developing a game engine in C++ using Vulkan and OpenGL.

**Third-Year Projects — Fish N’Ship, Friend-Slop**
*01/2026 — 06/2026*

- Programming and management of a modular boat.
- Development of networked boat-related physics and gameplay.
- Level building and environmental visual effects.

**Second-Year Projects — Godbreak, Sandbox**
*01/2025 — 06/2025*

- Procedural generation of terrain, structures and loot.
- Building system.
- Terrain and inventory saving systems.

**Summer Job — Burger King, Aire des Volcans d’Auvergne**
*06/2025 — 09/2025*

**First and Second-Year BTS Internships — Fiat Powertrain Technologies, Bourbon-Lancy**
*06/2022 — 07/2022 & 01/2021 — 02/2021*

**Final-Year High School Internship — Symbo, River Syndicate, Saint-Jean-d’Angély**
*04/2019 — 05/2019 & 06/2019 — 07/2019*

### Education

**RNCP Level 6 Qualification in Video Game Programming**
*2022 — 2027*  
Creajeux — School of Video Game Professions, Nîmes

**BTS Internal Combustion Engine (MCI)**
*2020 — 2022*  
Lycée Isaac de l’Étoile, Poitiers

**STAV Baccalaureate**
*2017 — 2020*  
Lycée Louis Pasteur Marmilhat, Lempdes

### Skills

- Object-oriented programming: C, C++, C#
- Engine architecture and programming
- Gameplay and graphics programming
- Teamwork and project management

### Software

- **Game Engines:** Unreal Engine, Unity
- **IDEs:** Visual Studio, Rider
- **Version Control:** GitHub, SVN

### Languages

French (native)  
English (B1)

### Interests

Sports · Reading · Strategy Games · Video Games · Drawing

<!-- /lang -->
---