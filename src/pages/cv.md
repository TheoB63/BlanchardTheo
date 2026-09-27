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

<!-- lang:fr -->

## Théo Blanchard

Développeur jeux vidéo — moteurs, outils, rendu.
Marseille, France · theo.blanchard@example.com · github.com/your-username

### Profil

Dix ans de C++, cinq ans d’Unity. Je préfère les problèmes mesurables : un
temps de build qui passe de 14 minutes à 90 secondes, un outil qui fait gagner
dix minutes par jour à une équipe.

### Expérience

**Programmeur moteur — Studio Exemple**
*2023 — aujourd’hui*

- Maintenance du renderer maison (C++/Vulkan) sur trois titres sortis.
- Réécriture du pipeline d’assets : build divisé par neuf.
- Overlay de profiling utilisé par toute l’équipe.

**Développeur outils — Petite Équipe, à distance**
*2021 — 2023*

- Outils d’édition Unity pour les level designers.
- Mise en place des tests sur l’outillage : deux bloqueurs de release évités.

**Freelance**
*2019 — 2021*

- Features gameplay, portages, passes de performance pour de petits studios.

### Études

**Master informatique** — Université Exemple, 2019
Spécialité image et jeu vidéo. Projet de fin d’études : un rasteriseur logiciel.

**Licence informatique** — Université Exemple, 2017

### Compétences

C++ (17/20), C#, Lua, Python, GLSL, Unity, Unreal (notions), CMake, Git,
Linux, Windows, profiling, écriture technique.

### Langues

Français (langue maternelle), anglais (courant, C1).

<!-- /lang -->

<!-- lang:en -->

## Theo Blanchard

Game developer — engines, tools, rendering.
Marseille, France · theo.blanchard@example.com · github.com/your-username

### Profile

Ten years of C++, five of Unity. I like measurable problems: a build that goes
from 14 minutes to 90 seconds, a tool that gives ten minutes back to a team
every day.

### Experience

**Engine programmer — Example Studio**
*2023 — now*

- Maintained the in-house renderer (C++/Vulkan) across three shipped titles.
- Rewrote the asset pipeline: build times divided by nine.
- Profiling overlay used by the whole team.

**Tools developer — Small Team, remote**
*2021 — 2023*

- Unity editor tooling for level designers.
- Introduced tests on the tooling; avoided two release blockers.

**Freelance**
*2019 — 2021*

- Gameplay features, porting work and performance passes for small studios.

### Education

**MSc Computer Science** — Example University, 2019
Graphics and games track. Final project: a software rasteriser.

**BSc Computer Science** — Example University, 2017

### Skills

C++ (17/20), C#, Lua, Python, GLSL, Unity, Unreal (reading level), CMake, Git,
Linux, Windows, profiling, technical writing.

### Languages

French (native), English (fluent, C1).

<!-- /lang -->
