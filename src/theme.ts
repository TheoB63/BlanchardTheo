// ==========================================================================
// theme.ts — EVERY colour and EVERY size of the site, in ONE place.
// --------------------------------------------------------------------------
// Nothing in this file is about your content (that is src/site.ts): this is the
// "skin" of the site. Change a value here, save, and the whole site follows —
// header, buttons, cards, tags, hero, footer and the markdown pages. You never
// have to open a .astro file to change a colour.
//
// HOW IT REACHES THE CSS
//   1. `themeCss` below turns this object into a block of CSS variables:
//
//          :root { --c-primary: #7a49c5; --header-h: 60px; ... }
//
//   2. src/layouts/BaseLayout.astro prints that block once, at the top of every
//      page, because BaseLayout is the shell of the whole site.
//
//   3. Every component then writes `var(--c-primary)` instead of a hard-coded
//      colour, e.g.
//
//          .button { background: var(--c-primary); }
//
//   That is the whole trick: one source of truth -> CSS variables -> every
//   style on the site. Add a colour here, add its `--c-...` line in themeCss,
//   then use it anywhere.
//
// NAMING
//   --c-...   a colour
//   --r-...   a border radius
//   --w-...   a width
//   --hero-.. a hero-specific measure
//   --...     layout measures (header height, section spacing, font)
// ==========================================================================

export const theme = {
	// ------------------------------------------------------------------------
	// 1. COLOURS
	// ------------------------------------------------------------------------
	colors: {
		// --- Brand -----------------------------------------------------------
		// `primary` is the purple used by every button, link, tag border and
		// focus ring. `primaryHover` is what they turn into under the mouse.
		primary: '#7a49c5',
		primaryHover: '#965ee9',
		// Text colour inside a primary button.
		primaryContrast: '#ffffff',

		// --- Text ------------------------------------------------------------
		text: '#333333', // normal text
		textMuted: '#6b6478', // secondary text (subtitles, summaries)
		textSoft: '#8a8398', // small text (dates, footer line)
		textFaint: '#a9a2b8', // very quiet text ("no image yet")

		// --- Backgrounds -----------------------------------------------------
		pageBg: '#ffffff', // the page behind everything
		surface: '#ffffff', // cards, buttons, panels
		tint: '#f9f6fc', // the light purple used by alternating sections
		tintSoft: '#fbfaff', // an even lighter tint (placeholder boxes)

		// --- Borders ---------------------------------------------------------
		border: '#e6e0f2', // the normal border
		borderSoft: '#ece6f6', // a lighter one (header bottom, section separators)
		borderStrong: '#e2dcf0', // buttons, link chips
		borderDashed: '#cfc5e2', // the dashed boxes (placeholders, empty state)
		borderAccent: '#d8cfe8', // borders of accent elements (language switch)
		accentSoft: '#ddd0f2', // hover borders on accent elements
		accentSoft2: '#c9b8e8', // hover border of a project card

		// --- Good/bad states -------------------------------------------------
		success: '#4a9d5f', // the "copied!" tick next to the email
		successBorder: '#bfe0c7',
		successBg: '#f2faf4',

		// --- The hero (text and links drawn ON TOP of your pictures) ---------
		// The hero is a dark zone: white text, and a semi-transparent veil
		// between the pictures and the text so the text stays readable.
		heroText: '#ffffff',
		heroTextMuted: 'rgba(255, 255, 255, 0.80)',
		// `heroVeil` is laid over the pictures. Raise the last number (0 to 1)
		// for a darker, more readable hero; lower it to show more of the media.
		heroVeil: 'rgba(16, 10, 28, 0.56)',
		// A slightly stronger veil at the top and bottom, where the header and
		// the scroll cue sit.
		heroVeilEdge: 'rgba(16, 10, 28, 0.35)',
		// The "glass" links and dots of the hero.
		heroSurface: 'rgba(255, 255, 255, 0.1)',
		heroSurfaceHover: 'rgba(255, 255, 255, 0.22)',
		heroBorder: 'rgba(255, 255, 255, 0.30)',
		// Shown behind the text when there is NO picture at all (see
		// `hero.slides` in src/site.ts): a soft purple gradient.
		heroFallback: 'linear-gradient(135deg, #100a1c8f 0%, #ffffff1a 55%, #ffffff38 100%)',

		// --- Header and footer ------------------------------------------------
		headerBg: 'rgba(255, 255, 255, 0.86)', // translucent: the page shows through
		footerBg: '#f9f6fc',
	},

	// ------------------------------------------------------------------------
	// 2. TYPE
	// ------------------------------------------------------------------------
	font: {
		// Used by the `*` rule at the bottom of BaseLayout.astro.
		family: '"Poppins", sans-serif',
		// The Google Fonts stylesheet loaded in <head>. Replace it by any other
		// family URL and change `family` to match — that is all it takes.
		googleUrl:
			'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap',
	},

	// ------------------------------------------------------------------------
	// 3. SIZES AND SPACING
	// ------------------------------------------------------------------------
	layout: {
		contentWidth: '1200px', // the width of the text column of the site
		columnWidth: '820px', // the narrower column (about text, project pages)
		headerHeight: '60px', // used to offset the anchors: see scroll-margin-top
		sectionGap: '84px', // space above and below a section title
		radius: '4px', // cards, buttons, boxes
		radiusSmall: '3px', // tags, copy button
		radiusButton: '2px', // the big purple buttons
	},

	// ------------------------------------------------------------------------
	// 4. THE HERO — the measures of the first screen
	// ------------------------------------------------------------------------
	// (What the hero *contains* — your pictures, the delay between them — is in
	// src/site.ts, in the `hero` block. Here it is only about how tall it is.)
	hero: {
		minHeight: '92vh', // it fills the screen...
		maxHeight: '980px', // ...but stops growing on a very tall screen
		zoom: '1.06', // a very slow zoom on each picture (Ken Burns effect)
	},
};

// ==========================================================================
// From the object above to CSS.
// --------------------------------------------------------------------------
// One line per variable. The long names are literal on purpose: if you add a
// colour to `theme.colors`, add its line here too, then use var(--c-your-name)
// in any component style.
// ==========================================================================
export const themeCss = `
:root {
	/* --- Brand --------------------------------------------------------- */
	--c-primary: ${theme.colors.primary};
	--c-primary-hover: ${theme.colors.primaryHover};
	--c-on-primary: ${theme.colors.primaryContrast};

	/* --- Text ---------------------------------------------------------- */
	--c-text: ${theme.colors.text};
	--c-text-muted: ${theme.colors.textMuted};
	--c-text-soft: ${theme.colors.textSoft};
	--c-text-faint: ${theme.colors.textFaint};

	/* --- Backgrounds --------------------------------------------------- */
	--c-page: ${theme.colors.pageBg};
	--c-surface: ${theme.colors.surface};
	--c-tint: ${theme.colors.tint};
	--c-tint-soft: ${theme.colors.tintSoft};

	/* --- Borders ------------------------------------------------------- */
	--c-border: ${theme.colors.border};
	--c-border-soft: ${theme.colors.borderSoft};
	--c-border-strong: ${theme.colors.borderStrong};
	--c-border-dashed: ${theme.colors.borderDashed};
	--c-border-accent: ${theme.colors.borderAccent};
	--c-accent-soft: ${theme.colors.accentSoft};
	--c-accent-soft-2: ${theme.colors.accentSoft2};

	/* --- States -------------------------------------------------------- */
	--c-success: ${theme.colors.success};
	--c-success-border: ${theme.colors.successBorder};
	--c-success-bg: ${theme.colors.successBg};

	/* --- Hero ---------------------------------------------------------- */
	--c-hero-text: ${theme.colors.heroText};
	--c-hero-text-muted: ${theme.colors.heroTextMuted};
	--c-hero-veil: ${theme.colors.heroVeil};
	--c-hero-veil-edge: ${theme.colors.heroVeilEdge};
	--c-hero-surface: ${theme.colors.heroSurface};
	--c-hero-surface-hover: ${theme.colors.heroSurfaceHover};
	--c-hero-border: ${theme.colors.heroBorder};
	--c-hero-fallback: ${theme.colors.heroFallback};
	--hero-min-h: ${theme.hero.minHeight};
	--hero-max-h: ${theme.hero.maxHeight};
	--hero-zoom: ${theme.hero.zoom};

	/* --- Header / footer ------------------------------------------------ */
	--c-header-bg: ${theme.colors.headerBg};
	--c-footer-bg: ${theme.colors.footerBg};

	/* --- Measures ------------------------------------------------------ */
	--font-family: ${theme.font.family};
	--w-content: ${theme.layout.contentWidth};
	--w-column: ${theme.layout.columnWidth};
	--header-h: ${theme.layout.headerHeight};
	--section-gap: ${theme.layout.sectionGap};
	--r-sm: ${theme.layout.radius};
	--r-xs: ${theme.layout.radiusSmall};
	--r-btn: ${theme.layout.radiusButton};
}
`;
