---
# ==========================================================================
# One .md file in this folder = one project on the site.
# --------------------------------------------------------------------------
# The file name is the URL:  voxel-engine.md  ->  /projects/voxel-engine/
#
# The fields are checked by src/content.config.ts: if one is missing or
# misspelled, the build tells you which file and which line.
#
# Bilingual fields end with _fr / _en. The body uses the markers
#     <!-- lang:fr --> ... <!-- /lang -->
# to separate the two versions (handled by src/plugins/rehype-lang-blocks.mjs).
# ==========================================================================

title_fr: Moteur de voxels
title_en: Voxel engine

summary_fr: Un petit moteur de voxels en C++ et OpenGL, écrit pour comprendre ce qui se passe vraiment entre une boucle sur des blocs et des pixels à l'écran.
summary_en: A small voxel engine in C++ and OpenGL, written to understand what really happens between a loop over blocks and pixels on screen.

alt_fr: Terrain voxel vu de dessus, avec le maillage affiché.
alt_en: Voxel terrain seen from above, with the wireframe on.

# Relative to THIS file. png, jpg, webp, avif and gif all work.
image: ./voxel-engine.jpg

# Square chips on the card. Same list for both languages; if a tag really
# needs translating, add it to `tagLabels` in src/i18n/index.ts.
tags: [cpp, opengl, cmake]

date: 2024-05-20

repo: https://github.com/your-username/voxel-engine
# demo: https://your-username.itch.io/voxel-engine
---

<!-- lang:fr -->

## Pourquoi

Je voulais comprendre le rendu d'un monde de blocs sans me reposer sur un
moteur existant. Tout est écrit à la main : fenêtre, entrées, stockage des
chunks, génération du maillage, rendu.

Les contraintes que je m'étais données :

- C++20, pas de moteur, seulement GLFW, glad et GLM.
- 8 chunks de distance de rendu, 60 images par seconde sur un GPU intégré.
- Tout modifiable à chaud, sans redémarrer pour voir un changement.

## Ce que ça fait

- Terrain généré par bruit de valeur 3D, avec une graine.
- Génération du maillage sur un pool de threads : creuser ne bloque jamais l'image.
- Fusion des faces coplanaires voisines pour réduire le nombre de triangles.
- Occlusion ambiante par bloc, calculée dans les couleurs de sommets.
- Un éditeur à la première personne et un format de sauvegarde `.vfworld`.

## Comment ça marche

Un chunk est un tableau de 32×32×32 octets, où la valeur est un index dans une
table de blocs. L'air vaut 0, donc un chunk intact ne coûte rien à mailler.

```cpp
struct Chunk {
    static constexpr int Size = 32;
    std::array<uint8_t, Size * Size * Size> blocks{};  // rempli de zéros = air
    glm::ivec3 origin;
    bool dirty = true;   // à remailler à l'image suivante
};
```

Le mailleur parcourt le chunk et n'émet une face que si le voisin est
transparent. Les faces sont ensuite fusionnées par axe.

| Étape                | Mailleur naïf | Mailleur glouton |
| -------------------- | ------------- | ---------------- |
| Triangles par chunk  | 182 400       | 41 200           |
| Temps de maillage    | 31 ms         | 12 ms            |

## Ce que je referais autrement

1. Le tri des chunks se fait par frustum uniquement ; un octree réduirait encore l'ensemble visible.
2. Le format de sauvegarde est un dump brut, sans version ni compression.
3. Il n'y a pas de multijoueur, même si le modèle de chunks s'y prêterait.

<!-- /lang -->

<!-- lang:en -->

## Why

I wanted to understand how a block world is rendered without leaning on an
existing engine. Everything is written by hand: window, input, chunk storage,
meshing, rendering.

The rules I gave myself:

- C++20, no engine, only GLFW, glad and GLM.
- 8 chunks of render distance, 60 frames per second on integrated graphics.
- Everything editable at runtime, no restart to see a change.

## What it does

- Terrain generated from seeded 3D value noise.
- Meshing on a worker thread pool: digging never stalls the frame.
- Coplanar neighbouring faces are merged to cut the triangle count.
- Per-block ambient occlusion baked into the vertex colours.
- A first-person editor and a `.vfworld` save format.

## How it works

A chunk is a 32×32×32 byte array where the value is an index into a block
table. Air is 0, so an untouched chunk costs nothing to mesh.

```cpp
struct Chunk {
    static constexpr int Size = 32;
    std::array<uint8_t, Size * Size * Size> blocks{};  // zero-filled = air
    glm::ivec3 origin;
    bool dirty = true;   // remesh on the next frame
};
```

The mesher walks the chunk and only emits a face when the neighbour is
transparent. Faces are then merged per axis.

| Stage             | Naive mesher | Greedy mesher |
| ----------------- | ------------ | ------------- |
| Triangles / chunk | 182 400      | 41 200        |
| Mesh time         | 31 ms        | 12 ms         |

## What I would change

1. Culling is per chunk only; an octree would cut the visible set further.
2. The save format is a raw dump, with no versioning and no compression.
3. No multiplayer, even though the chunk model would allow it.

<!-- /lang -->
