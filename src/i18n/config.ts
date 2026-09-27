// ==========================================================================
// config.ts — every piece of text of the interface, in both languages.
// --------------------------------------------------------------------------
// This file is used at BUILD time by the components (through src/i18n/index.ts)
// and at RUNTIME by src/i18n/i18n.js (for attributes such as aria-label).
//
// To translate something new:
//   1. add a key in `translations` below, with its `fr` and `en` values
//   2. use it in a component:  <Bilingual k="projects.title" />
//      or, for an attribute:   aria-label={t('rail.scrollLeft', 'en')}
//
// Keep the two objects the same shape: a missing value falls back to English.
// ==========================================================================

/** The languages of the site. `defaultLang` is what a first-time visitor sees. */
export const languages = ['fr', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

export const translations = {
	// --- Menu -------------------------------------------------------------
	'nav.home': { fr: 'Accueil', en: 'Home' },
	'nav.projects': { fr: 'Projets', en: 'Projects' },
	'nav.about': { fr: 'À propos', en: 'About' },

	// --- Home page --------------------------------------------------------
	'home.projectsTitle': { fr: 'Mes projets', en: 'My projects' },
	'home.projectsHint': {
		fr: 'Faites glisser les cartes, ou utilisez les flèches.',
		en: 'Drag the cards, or use the arrows.',
	},
	'home.allProjects': { fr: 'Voir tous les projets', en: 'See all projects' },

	// --- Projects page ----------------------------------------------------
	'projects.title': { fr: 'Projets', en: 'Projects' },
	'projects.intro': {
		fr: 'Tout ce que j’ai construit, du plus récent au plus ancien.',
		en: 'Everything I have built, from the most recent to the oldest.',
	},
	'projects.empty': {
		fr: 'Aucun projet pour le moment. Ajoutez un fichier .md dans src/projects/.',
		en: 'No project yet. Add a .md file in src/projects/.',
	},

	// --- Project card / page ----------------------------------------------
	'project.repo': { fr: 'Code source', en: 'Source code' },
	'project.demo': { fr: 'Démo', en: 'Demo' },
	'project.noImage': { fr: 'Pas encore d’image', en: 'No image yet' },
	'project.backToList': { fr: '← Retour aux projets', en: '← Back to projects' },
	// --- Footer -----------------------------------------------------------
	'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.' },

	// --- Project rail (accessibility labels) ------------------------------
	'rail.scrollLeft': { fr: 'Faire défiler vers la gauche', en: 'Scroll left' },
	'rail.scrollRight': { fr: 'Faire défiler vers la droite', en: 'Scroll right' },
	'rail.label': { fr: 'Liste de projets', en: 'Project list' },

	// --- About page -------------------------------------------------------
	'about.title': { fr: 'À propos', en: 'About' },
	'about.studies': { fr: 'Études', en: 'Education' },
	'about.skills': { fr: 'Compétences', en: 'Skills' },
	'about.cv': { fr: 'Voir mon CV', en: 'View my CV' },
	'about.links': { fr: 'Mes liens', en: 'My links' },

} as const;

/** Every key of `translations`, as a type. Gives you autocompletion + errors
 *  on a typo when you call t('...'). */
export type TKey = keyof typeof translations;

// ---------------------------------------------------------------------------
// Tag labels.
// ---------------------------------------------------------------------------
// Most tags are the same word in both languages (cpp, unity, lua...), so the
// `tags` field of a project is a single list. When a tag really needs a
// translation, add it here; otherwise the tag is displayed as written.
export const tagLabels: Record<string, { fr: string; en: string }> = {
	tools: { fr: 'outils', en: 'tools' },
	'game-jam': { fr: 'game jam', en: 'game jam' },
};
