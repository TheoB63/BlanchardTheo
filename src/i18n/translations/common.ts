// ==========================================================================
// common.ts — texts shared by every page: menu, footer, language buttons.
// --------------------------------------------------------------------------
// One file per "area" of the site, so you edit a small file instead of one
// giant dictionary:
//   common.ts   menu, footer, language buttons   (this file)
//   home.ts     the hero and the projects section
//   projects.ts project cards, projects page, project pages
//   about.ts    the about section and the CV page
//
// Rule: one key = one line with `fr` and `en`. Nothing else to do, the key is
// then available everywhere as <Bilingual k="nav.home" />.
//
// NOTE — WHERE DID THE MENU LABELS GO?
// The three buttons of the header (Home / About / Projects) are no longer here:
// they live in src/site.ts, in the `menu` list, next to the section they point
// at. It keeps "one button = one label + one target" in a single place. This
// file keeps the texts that are used inside pages.
// ==========================================================================
export const fr = {
	// The header menu (aria-label of the <nav>, for screen readers)
	'nav.menu': 'Menu',

	// Footer
	'footer.rights': 'Tous droits réservés.',

	// Language buttons (aria-label, for screen readers)
	'lang.group': 'Langue',
};

export const en: typeof fr = {
	'nav.menu': 'Menu',

	'footer.rights': 'All rights reserved.',

	'lang.group': 'Language',
};
