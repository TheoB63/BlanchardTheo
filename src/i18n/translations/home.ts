// ==========================================================================
// home.ts — the texts of the ONE-PAGE home that are not in src/site.ts.
// --------------------------------------------------------------------------
// The titles of the sections ("Qui je suis", "Mes projets"), their small line
// above and their lead sentence are in src/site.ts (`sections`), together with
// the hero and the menu: everything you are likely to reword lives there.
// Only the little interface texts stay here.
// ==========================================================================
export const fr = {
	// Shown under the projects when `sections.projects.layout` is 'rail' in
	// src/site.ts (the horizontal, draggable row).
	'home.projectsHint': 'Faites glisser les cartes, ou utilisez les flèches.',

	// ---- The hero (aria-labels only: they cannot be written twice, so the
	// small script src/i18n/i18n.js swaps them when you click FR / EN) -------
	'hero.slideGroup': 'Images d’arrière-plan',
	'hero.scrollDown': 'Aller à la section suivante',
};

export const en: typeof fr = {
	'home.projectsHint': 'Drag the cards, or use the arrows.',

	'hero.slideGroup': 'Background slides',
	'hero.scrollDown': 'Go to the next section',
};
