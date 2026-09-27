// ==========================================================================
// common.ts — texts shared by every page: menu, footer, language buttons.
// --------------------------------------------------------------------------
// One file per "area" of the site, so you edit a small file instead of one
// giant dictionary:
//   common.ts   menu, footer, language buttons   (this file)
//   home.ts     the home page
//   projects.ts project cards, projects page, project pages
//   about.ts    the about page and the CV page
//
// Rule: one key = one line with `fr` and `en`. Nothing else to do, the key is
// then available everywhere as <Bilingual k="nav.home" />.
// ==========================================================================
export const fr = {
	// Menu
	'nav.home': 'Accueil',
	'nav.projects': 'Projets',
	'nav.about': 'À propos',

	// Footer
	'footer.rights': 'Tous droits réservés.',

	// Language buttons (aria-labels, for screen readers)
	'lang.group': 'Langue',
};

export const en: typeof fr = {
	'nav.home': 'Home',
	'nav.projects': 'Projects',
	'nav.about': 'About',

	'footer.rights': 'All rights reserved.',

	'lang.group': 'Language',
};
