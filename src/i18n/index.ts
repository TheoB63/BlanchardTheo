// ==========================================================================
// i18n/index.ts — the helpers used by the components.
// --------------------------------------------------------------------------
// How the bilingual system works, in one paragraph:
// Astro builds the HTML once, so a component cannot know which language the
// visitor will choose. Everything is therefore written TWICE in the HTML, each
// version tagged with lang="fr" or lang="en", and the CSS in BaseLayout.astro
// hides the one that does not match <html data-lang="...">. Switching language
// is then instant, with no reload and no server.
//
// Three helpers, pick the one that fits:
//   <Bilingual k="nav.home" />        a component, for most cases
//   bilingualHtml('nav.home')         the same two spans, as an HTML string,
//                                     for set:html={...}
//   t('rail.label', 'en')             ONE language only, for attributes that
//                                     cannot hold two values (aria-label...)
// ==========================================================================
import { fr, en, all, type TKey } from './translations/index';

export { fr, en, all };
export type { TKey };

export const languages = ['fr', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'en';

/**
 * The two <span> for one key, as an HTML string:
 *
 *     <h2 set:html={bilingualHtml('home.projectsTitle')} />
 *
 * Useful when a component cannot be nested (inside set:html, inside an
 * attribute...). Everywhere else, prefer <Bilingual k="..." />.
 */
export function bilingualHtml(key: TKey): string {
	const entry = all[key];
	if (!entry) {
		console.warn(`[i18n] Missing translation key: "${key}"`);
		return key;
	}
	return `<span lang="fr" class="bilingual">${entry.fr}</span><span lang="en" class="bilingual">${entry.en}</span>`;
}

/**
 * One translated string, for the cases where HTML is not allowed:
 * an attribute (aria-label, alt, title) or a value used in TypeScript.
 *
 *     aria-label={t('rail.scrollLeft', 'en')}
 */
export function t(key: TKey, lang: Lang): string {
	const entry = all[key];
	if (!entry) return key;
	return entry[lang] ?? entry.en;
}

// ---------------------------------------------------------------------------
// Tag labels.
// ---------------------------------------------------------------------------
// Most tags are the same word in both languages (cpp, unity, lua...), so a
// project has ONE `tags` list. When a tag really needs translating, add it
// here; otherwise the tag is displayed exactly as written in the .md file.
export const tagLabels: Record<string, { fr: string; en: string }> = {
	tools: { fr: 'outils', en: 'tools' },
	'game-jam': { fr: 'game jam', en: 'game jam' },
};

/** A tag as it should be displayed in a given language. */
export function tagLabel(tag: string, lang: Lang): string {
	return tagLabels[tag]?.[lang] ?? tag;
}
