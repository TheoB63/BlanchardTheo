// ==========================================================================
// translations/index.ts — merges the small dictionaries into one.
// --------------------------------------------------------------------------
// You normally never edit this file. To add a text, open the file of the area
// it belongs to (common / home / projects / about) and add a key there.
//
// If you create a new area, for example `contact.ts`:
//   1. write `export const fr = { ... }` and `export const en: typeof fr = {...}`
//   2. import it below and add it to the two spreads
// ==========================================================================
import * as common from './common';
import * as home from './home';
import * as projects from './projects';
import * as about from './about';

/** One dictionary per language. TypeScript uses them to know every valid key
 *  (`keyof typeof fr`), which gives you autocompletion in <Bilingual k="…" />. */
export const fr = { ...common.fr, ...home.fr, ...projects.fr, ...about.fr };
export const en = { ...common.en, ...home.en, ...projects.en, ...about.en };

/** Every translation key of the site, as a type. */
export type TKey = keyof typeof fr;

/**
 * The same dictionary, flat, for the browser: src/i18n/i18n.js needs to look
 * a key up by name at runtime (for aria-label, title, alt...).
 */
export const all: Record<string, { fr: string; en: string }> = Object.fromEntries(
	Object.keys(fr).map((key) => [
		key,
		{ fr: fr[key as TKey], en: en[key as TKey] },
	]),
);
