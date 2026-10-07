---
# Second example project. Copy this file to create your own:
# rename it, change the frontmatter, write the body. That is all.

title_fr: Éditeur de niveaux
title_en: Level editor

summary_fr: Un éditeur de niveaux 2D en C# et Unity, avec export binaire et validation, pour que les level designers n'aient plus jamais à me demander un changement.
summary_en: A 2D level editor in C# and Unity, with binary export and validation, so level designers never had to ask me for a change again.

alt_fr: L'éditeur avec ses trois panneaux et un chemin de navigation.
alt_en: The editor with its three panels and a navigation path.

image: ./level-editor.jpg

tags: [csharp, unity, tools]

date: 2021-01-10

repo: https://github.com/your-username/level-editor
---

<!-- lang:fr -->

## Le contexte

Les niveaux étaient dessinés dans un outil externe, puis recopiés à la main dans
le jeu. Chaque modification demandait une conversion, et les deux versions
finissaient par diverger.

## Ce que fait l'outil

- Une fenêtre d'édition Unity qui peint directement sur la Scene view.
- Détection automatique des zones praticables à partir des collisions.
- Liens à sens unique (échelles, sauts, portes) dessinés à la flèche.
- Export en binaire : un octet par case, 4 bits de coût et 4 bits de drapeaux.
- Un lecteur runtime d'environ 80 lignes, sans dépendance à l'éditeur.

## Le format

```csharp
// bits 0-3 : classe de coût (0 = bloquant, 1 = normal, 2 = lent, ...)
// bit 4    : un lien à sens unique est présent
// bit 5    : point de saut
public static byte Encode(Cell c) =>
    (byte)((c.cost & 0x0F) | (c.link ? 0x10 : 0) | (c.jump ? 0x20 : 0));
```

Un niveau de 256×256 tient dans 64 ko, ce qui reste confortable pour le cache.

## Ce que j'en retiens

- L'export est incrémental : seules les cases modifiées sont réencodées, ce qui
  garde l'opération sous la milliseconde.
- Chaque trait de pinceau forme un groupe d'annulation, donc un Ctrl+Z retire
  toute la zone peinte et pas une seule case.
- Le temps passé sur cet éditeur a été rentabilisé en deux semaines.

<!-- /lang -->

<!-- lang:en -->

## Context

Levels were drawn in an external tool, then copied by hand into the game. Every
change needed a conversion, and the two versions ended up drifting apart.

## What the tool does

- A Unity editor window that paints directly over the Scene view.
- Automatic walkable-area detection from the tile collisions.
- One-way links (ladders, drops, doors) drawn as arrows.
- Binary export: one byte per cell, 4 bits of cost and 4 bits of flags.
- A runtime reader of about 80 lines, with no dependency on the editor.

## The format

```csharp
// bits 0-3 : cost class (0 = blocked, 1 = normal, 2 = slow, ...)
// bit 4    : a one-way link is present
// bit 5    : jump point
public static byte Encode(Cell c) =>
    (byte)((c.cost & 0x0F) | (c.link ? 0x10 : 0) | (c.jump ? 0x20 : 0));
```

A 256×256 level fits in 64 kB, which stays comfortable for the cache.

## What I take from it

- The export is incremental: only the dirty cells are re-encoded, which keeps it
  under a millisecond.
- Each brush stroke is one undo group, so Ctrl+Z removes the whole painted
  region instead of a single cell.
- The time spent on this editor paid for itself in two weeks.

<!-- /lang -->
