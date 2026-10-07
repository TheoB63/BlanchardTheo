---
title_fr: ChessAI
title_en: ChessAI

summary_fr: Jeu d'echec fonctionnant avec un bitboard, et jouable avec une ia de 1200-1600 elo.
summary_en: A chess game that uses a bitboard and can be played against an AI with an Elo rating of 1200–1600.

alt_fr: ""
alt_en: ""

image: ./ChessAI/ChessAIIcon.png

tags: [C#, Unity]

date: 2026-03-02

repo: ""
---
<!--==================================================
  The Project 
==================================================-->
<!-- lang:fr -->
## Le projet

Voici un jeu d'échecs développé avec Unity en C#, avec pour objectif de reproduire une partie d'échecs complète tout en développant une intelligence artificielle capable de jouer contre le joueur.

Très vite durant la creation du projet des questions sur les performance et l'optimisation du jeu se sont posé, ce qui m'a ammener a un échiquier en **bitboard**, permettant de représenter efficacement les pièces et de générer plus rapidement les différents coups possibles.

L'IA a été conçue pour jouer à plusieurs niveaux de difficulté, est a réussi obtenir un niveau situé entre **1200 et 1600 Elo**.

Au-delà du jeu lui-même, ce projet m'a permis de mieux comprendre l'optimisation des performances et la structuration efficace des données, en particulier grâce à la génération et la recherche algorithmique de coups pour l'IA.
<!-- /lang -->
<!-- lang:en -->
## The project

Here is a chess game developed using Unity and C#, with the aim of recreating a full game of chess whilst developing an artificial intelligence capable of playing against the player.

Very early on in the project’s development, questions arose regarding the game’s performance and optimisation, which led me to adopt a **bitboard** chessboard, enabling the pieces to be represented efficiently and the various possible moves to be generated more quickly.

The AI was designed to play at several levels of difficulty and has achieved a rating of between **1200 and 1600 Elo**.

Beyond the game itself, this project has given me a better understanding of performance optimisation and efficient data structuring, particularly through the generation and algorithmic search for moves for the AI.
<!-- /lang -->
<!--==================================================
  The Goal
==================================================-->
<!-- lang:fr -->
## L'objectif

L'objectif principal était de construire un jeu d'échecs fonctionnel tout en
essayant de conserver une architecture suffisamment performante pour permettre
à l'IA d'analyser un grand nombre de positions.

Les échecs sont particulièrement intéressants pour cela : les règles sont
relativement déterministes, mais le nombre de positions possibles augmente
très rapidement dès que plusieurs coups sont envisagés.

J'ai donc dû faire des choix concernant la manière de représenter l'échiquier,
de générer les coups et d'évaluer les positions afin de limiter le coût des
calculs.
<!-- /lang -->
<!-- lang:en -->
## The goal

The main goal was to build a functional chess game while keeping the
architecture efficient enough for the AI to analyze a large number of
positions.

Chess is particularly interesting from that perspective: the rules are
relatively deterministic, but the number of possible positions grows very
quickly as more moves are considered.

I therefore had to make decisions about how to represent the board, generate
moves and evaluate positions in order to keep the computational cost under
control.
<!-- /lang -->
<!--==================================================
  Bitboard Representation
==================================================-->
<!-- lang:fr -->
## La représentation en bitboard

L'échiquier est représenté à l'aide de plusieurs **bitboards**.

Un bitboard est un entier dont chaque bit correspond à une case de l'échiquier.
Avec un échiquier de 64 cases, un entier de 64 bits permet donc de représenter
directement l'occupation d'un ensemble de cases.

Cette représentation permet notamment de manipuler plusieurs cases en une
seule opération binaire.

Les bitboards peuvent par exemple être utilisés pour représenter les cases
occupées par les pièces blanches, les pièces noires, ou encore les positions
d'un type de pièce particulier.

```csharp
// Exemple simplifié
ulong whitePieces;
ulong blackPieces;

ulong whitePawns;
ulong whiteKnights;
ulong whiteBishops;
ulong whiteRooks;
ulong whiteQueens;
ulong whiteKing;
```
Cette approche évite de devoir parcourir systématiquement les 64 cases de
l'échiquier pour effectuer certaines opérations.

Elle est particulièrement intéressante dans le cas de l'IA, puisque la même
position peut être analysée un très grand nombre de fois pendant la recherche
d'un coup.

## La génération des coups
Une partie importante du projet consiste à générer les coups légaux à partir
de la position actuelle.

Chaque type de pièce possède ses propres règles de déplacement :

Les pions avancent et capturent selon des règles différentes.

Les cavaliers peuvent atteindre un ensemble fixe de cases.

Les fous se déplacent sur les diagonales.

Les tours se déplacent horizontalement et verticalement.

Les dames combinent les déplacements des fous et des tours.

Le roi possède un déplacement limité et doit notamment éviter les cases
contrôlées par l'adversaire.

La génération des coups doit également prendre en compte les règles qui rendent
un coup illégal, notamment lorsqu'il laisse son propre roi en échec.

Une partie du travail consiste donc à séparer les coups possibles des coups
réellement légaux.

## La gestion des règles
Le jeu prend en charge les principales règles nécessaires au déroulement d'une
partie d'échecs.

La position doit notamment conserver les informations nécessaires pour gérer :

les tours de chaque joueur ;

les captures ;

l'échec et l'échec et mat ;

le pat ;

le roque ;

la promotion des pions ;

la prise en passant ;

la détection de fin de partie.

L'état de la partie doit pouvoir être modifié lorsqu'un coup est joué puis
restauré lorsque l'IA revient en arrière pendant son analyse.

Cette capacité à jouer et annuler rapidement des coups est particulièrement
importante pour la recherche de l'IA.

## L'intelligence artificielle
L'IA analyse les coups disponibles afin de sélectionner celui qui lui semble
être le meilleur.

La recherche explore plusieurs coups à l'avance et attribue une valeur aux
positions atteintes.

Une recherche naïve deviendrait rapidement trop coûteuse : chaque position
peut produire plusieurs nouveaux coups, qui produisent eux-mêmes de nouvelles
positions.

L'IA utilise donc une recherche de type Minimax, avec des optimisations
permettant de réduire le nombre de positions réellement analysées.

```
Position actuelle
       │
       ├── Coup A
       │    ├── Réponse adverse
       │    └── Réponse adverse
       │
       ├── Coup B
       │    ├── Réponse adverse
       │    └── Réponse adverse
       │
       └── Coup C
            ├── Réponse adverse
            └── Réponse adverse
```

L'objectif est de considérer que l'adversaire cherchera lui aussi à jouer le
meilleur coup possible.

L'évaluation des positions
Lorsque la recherche atteint sa profondeur maximale, l'IA doit être capable
d'estimer la qualité de la position.

L'évaluation peut notamment prendre en compte la valeur des pièces présentes
sur l'échiquier.

Une position avec davantage de matériel favorable sera généralement considérée
comme meilleure, mais le matériel seul ne suffit pas à jouer correctement aux
échecs.

L'évaluation peut également prendre en compte différents éléments
positionnels, comme la mobilité des pièces, la sécurité du roi ou encore la
position des pièces sur l'échiquier.

Cela permet à l'IA de ne pas simplement chercher à capturer le plus de pièces
possible, mais de comparer les conséquences à plus long terme de ses choix.

## La recherche et les optimisations
La principale difficulté de l'IA vient du nombre de positions à analyser.

Plus la profondeur de recherche augmente, plus le nombre de positions explose.
Une grande partie du travail a donc consisté à réduire le nombre de calculs
inutiles.

L'algorithme peut notamment utiliser l'élagage alpha-bêta afin d'éviter
d'explorer certaines branches lorsqu'il est déjà possible de déterminer
qu'elles ne pourront pas produire un meilleur résultat.

```
                 Position
                /    |    \
              A      B      C
             / \    / \    / \
            ...    ...    ...
             ↑
      branches ignorées
      lorsqu'elles ne
      peuvent plus améliorer
      le résultat
```

Cette optimisation permet d'augmenter la profondeur de recherche tout en
conservant un temps de réflexion raisonnable pour le joueur.

## Une IA adaptée au jeu
L'objectif n'était pas de créer un moteur d'échecs capable de rivaliser avec
les moteurs les plus puissants existants.

Je cherchais plutôt à obtenir une IA suffisamment intéressante pour proposer
une vraie partie à un joueur humain, avec une difficulté située autour de
1200 à 1600 Elo.

Le niveau de l'IA peut donc être ajusté en fonction de la profondeur de
recherche et/ou des paramètres utilisés pour l'évaluation des positions.

Cela permet également de rendre le jeu plus accessible et de proposer une
progression plutôt qu'une IA systématiquement trop forte.

## L'intégration dans Unity
Unity est principalement utilisé pour toute la partie visuelle et
interactive du projet.

L'échiquier est affiché dans la scène et les interactions du joueur permettent
de sélectionner une pièce puis de choisir une case de destination.

La logique du jeu reste cependant indépendante autant que possible de la
présentation.

Cette séparation permet notamment à l'IA de manipuler une représentation
interne de la partie sans avoir besoin d'interagir directement avec les
GameObjects de Unity.

## Jouer un coup
Lorsqu'un joueur sélectionne une pièce, le jeu peut déterminer les cases vers
lesquelles elle peut se déplacer.

Après sélection de la destination, le coup est vérifié puis appliqué à l'état
interne de la partie.

La représentation visuelle de l'échiquier est ensuite mise à jour afin de
refléter ce nouvel état.

Cette séparation entre état du jeu, règles et affichage permet
également à l'IA d'utiliser les mêmes mécanismes que le joueur pour simuler
des coups.

## Les difficultés rencontrées
La difficulté principale du projet vient du fait que plusieurs systèmes
doivent fonctionner ensemble correctement.

Une erreur dans la génération des coups peut par exemple entraîner une
mauvaise décision de l'IA, mais elle peut également rendre une position
illégale ou provoquer une erreur plusieurs coups plus tard.

Les règles particulières des échecs rendent également certains cas plus
complexes que de simples déplacements sur une grille.

L'optimisation a constitué un autre aspect important du projet. Une opération
qui semble négligeable lorsqu'elle est exécutée une seule fois peut devenir
très coûteuse lorsqu'elle est répétée des milliers ou des millions de fois
pendant une recherche.

Cela m'a amené à faire davantage attention à la structure des données et au
coût réel des différentes opérations.

## Ce que j'en retiens
ChessAI m'a surtout permis de travailler sur des problématiques différentes de
celles rencontrées dans un jeu Unity classique.

Le projet m'a notamment permis d'approfondir :

la représentation de données avec des bitboards ;

les opérations binaires et la manipulation de bits ;

la génération et la validation de coups ;

l'implémentation de règles complexes ;

les algorithmes de recherche ;

le Minimax et l'élagage alpha-bêta ;

l'évaluation heuristique d'une position ;

l'optimisation de code exécuté très fréquemment ;

la séparation entre logique de jeu et représentation visuelle.

Le projet m'a également fait prendre conscience de l'importance de la
représentation des données : une structure adaptée peut avoir un impact
important lorsque les mêmes opérations sont exécutées en très grand nombre.

<!-- /lang -->

<!-- lang:en -->




Bitboard representation
The chessboard is represented using several bitboards.

A bitboard is an integer where each bit corresponds to one square of the
chessboard. With 64 squares, a 64-bit integer can therefore represent a set of
board positions directly.

This makes it possible to manipulate multiple squares through a single
bitwise operation.

Bitboards can, for example, be used to represent the squares occupied by white
pieces, black pieces, or a specific type of piece.
```csharp
// Simplified example
ulong whitePieces;
ulong blackPieces;

ulong whitePawns;
ulong whiteKnights;
ulong whiteBishops;
ulong whiteRooks;
ulong whiteQueens;
ulong whiteKing;
```
This approach avoids having to systematically iterate over all 64 squares for
certain operations.

It is particularly useful for the AI, since the same position may be analyzed
many times while searching for a move.

Move generation
A major part of the project is generating legal moves from the current
position.

Each piece has its own movement rules:

Pawns move and capture according to different rules.

Knights can reach a fixed set of squares.

Bishops move along diagonals.

Rooks move horizontally and vertically.

Queens combine bishop and rook movement.

Kings have limited movement and must avoid squares controlled by the
opponent.

Move generation must also take into account rules that make a move illegal,
especially when the move leaves the player's own king in check.

The system therefore needs to distinguish between possible piece movements and
moves that are actually legal.

Rule handling
The game implements the main rules required for a complete chess game.

The game state needs to keep track of information required for:

whose turn it is;

captures;

check and checkmate;

stalemate;

castling;

pawn promotion;

en passant;

game termination.

The state must also be modified when a move is played and restored when the AI
needs to undo a move during its search.

Being able to make and undo moves efficiently is especially important for the
AI.

The artificial intelligence
The AI analyzes the available moves and selects the one it considers the best.

The search explores several moves ahead and assigns a value to the resulting
positions.

A naïve search quickly becomes too expensive: every position can produce
several new moves, which themselves produce additional positions.

The AI therefore uses a Minimax-style search, combined with optimizations
to reduce the number of positions that actually need to be evaluated.

```
Current position
       │
       ├── Move A
       │    ├── Opponent response
       │    └── Opponent response
       │
       ├── Move B
       │    ├── Opponent response
       │    └── Opponent response
       │
       └── Move C
            ├── Opponent response
            └── Opponent response
```

The idea is to assume that the opponent will also try to play the best move
available.

Position evaluation
When the search reaches its maximum depth, the AI needs to estimate how good
the resulting position is.

The evaluation can take into account the material remaining on the board.

A position with more favorable material will generally be considered better,
but material alone is not enough to play chess effectively.

The evaluation can also consider positional factors such as piece mobility,
king safety and piece placement.

This allows the AI to do more than simply capture as many pieces as possible
and instead compare the longer-term consequences of its decisions.

Search and optimization
The main challenge of the AI is the number of positions that need to be
analyzed.

As the search depth increases, the number of positions grows rapidly. A large
part of the implementation therefore focuses on avoiding unnecessary
calculations.

The algorithm can use alpha-beta pruning to skip branches when it is
already possible to determine that they cannot produce a better result.

```
                 Position
                /    |    \
              A      B      C
             / \    / \    / \
            ...    ...    ...
             ↑
       branches skipped
       when they can no
       longer improve
       the result
```

This makes it possible to search deeper while keeping the AI's thinking time
reasonable for the player.

An AI designed for the game
The goal was not to create a chess engine capable of competing with the
strongest existing engines.

Instead, I wanted to create an AI that would provide an interesting game for a
human player, with a playing strength around 1200 to 1600 Elo.

The AI difficulty can therefore be adjusted through the search depth and/or
the parameters used by the position evaluation.

This also makes the game more accessible and allows the player to progress
rather than always facing an opponent that is significantly stronger.

Unity integration
Unity is mainly used for the visual and interactive aspects of the project.

The chessboard is displayed in the scene, and player interaction allows a
piece to be selected and moved to a destination square.

The game logic is kept as independent as possible from the presentation.

This separation allows the AI to manipulate an internal representation of the
game without having to interact directly with Unity GameObjects.

Playing a move
When the player selects a piece, the game determines the squares to which it
can move.

Once a destination is selected, the move is validated and applied to the
internal game state.

The visual representation of the board is then updated to reflect the new
state.

Keeping the game state, rules and presentation separated also
allows the AI to use the same mechanisms as the player when simulating moves.

Challenges
The main difficulty of the project comes from making several systems work
correctly together.

An error in move generation can, for example, lead to an incorrect AI
decision, but it can also create an illegal position or cause an error several
moves later.

The special rules of chess also make some cases more complex than simple
movement on a grid.

Optimization was another important aspect of the project. An operation that
seems negligible when executed once can become expensive when repeated
thousands or millions of times during a search.

This made me pay more attention to data structures and the actual cost of
frequently executed operations.

What I learned
ChessAI gave me the opportunity to work on problems that are quite different
from those found in a typical Unity game.

The project allowed me to deepen my understanding of:

bitboard data representation;

bitwise operations and bit manipulation;

move generation and validation;

implementation of complex rules;

search algorithms;

Minimax and alpha-beta pruning;

heuristic position evaluation;

optimization of frequently executed code;

separation between game logic and visual representation.

The project also showed me how important data representation can be: choosing
the right structure can have a significant impact when the same operations are
executed a very large number of times.

<!-- /lang -->