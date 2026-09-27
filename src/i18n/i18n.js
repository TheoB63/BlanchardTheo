// ==========================================================================
// i18n.js — the language switch, in the browser.
// --------------------------------------------------------------------------
// Imported by src/layouts/BaseLayout.astro, so it runs on every page.
//
// Everything it does:
//   1. read the saved language (or the browser language on the first visit)
//   2. write it on <html> as data-lang="fr" | "en"
//   3. update the FR / EN buttons (which one looks active)
//   4. translate the attributes marked with data-i18n / data-i18n-aria /
//      data-i18n-title / data-i18n-alt
//   5. remember the choice in localStorage
//
// The TEXT itself is not touched here: both languages are already in the HTML
// and the CSS in BaseLayout.astro shows the right one. That is what makes the
// switch instant, with no reload and no server.
// ==========================================================================
import { all as translations, defaultLang } from './index.ts';

const STORAGE_KEY = 'lang';

function detectLang() {
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'fr' || saved === 'en') return saved;
	} catch {
		// localStorage can be blocked (private browsing): fall through.
	}
	// First visit: follow the browser language.
	return (navigator.language ?? 'en').toLowerCase().startsWith('fr') ? 'fr' : defaultLang;
}

function applyLang(lang) {
	const root = document.documentElement;

	// The CSS keys everything off this attribute.
	root.dataset.lang = lang;
	// And this one is for screen readers, search engines and hyphenation.
	root.lang = lang;

	// Browser tab: a page can give one title per language through the
	// title_fr / title_en props of BaseLayout.astro.
	const pageTitle = root.dataset[`title${lang[0].toUpperCase()}${lang.slice(1)}`];
	if (pageTitle) document.title = pageTitle;

	// Buttons: mark the active one, both for the style and for accessibility.
	document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
		const active = btn.dataset.langBtn === lang;
		btn.classList.toggle('is-active', active);
		btn.setAttribute('aria-pressed', String(active));
	});

	// Attributes that cannot be written twice in the HTML.
	// Example:  <button data-i18n-aria="rail.scrollLeft">
	document.querySelectorAll('[data-i18n]').forEach((el) => {
		const entry = translations[el.dataset.i18n];
		if (entry) el.textContent = entry[lang] ?? entry.en;
	});
	document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
		const entry = translations[el.dataset.i18nAria];
		if (entry) el.setAttribute('aria-label', entry[lang] ?? entry.en);
	});
	document.querySelectorAll('[data-i18n-title]').forEach((el) => {
		const entry = translations[el.dataset.i18nTitle];
		if (entry) el.setAttribute('title', entry[lang] ?? entry.en);
	});
	document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
		const entry = translations[el.dataset.i18nAlt];
		if (entry) el.setAttribute('alt', entry[lang] ?? entry.en);
	});
	document.querySelectorAll('[data-title-fr]').forEach((el) => {
		const text = el.getAttribute(`data-title-${lang}`);
		if (text) el.setAttribute('title', text);
	});
	document.querySelectorAll('[data-aria-fr]').forEach((el) => {
		const text = el.getAttribute(`data-aria-${lang}`);
		if (text) el.setAttribute('aria-label', text);
	});

	try {
		localStorage.setItem(STORAGE_KEY, lang);
	} catch {
		// Not critical: the choice just will not be remembered.
	}
}

// --- Boot ------------------------------------------------------------------
applyLang(detectLang());

// --- Click handlers --------------------------------------------------------
document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
	btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
});
