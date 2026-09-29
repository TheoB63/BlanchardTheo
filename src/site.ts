// ==========================================================================
// site.ts — YOUR content, in one place.
// --------------------------------------------------------------------------
// Two files rule the site, and only two:
//
//   src/theme.ts   the skin: colours, sizes, spacing        (how it LOOKS)
//   src/site.ts    your content: name, hero, menu, sections, links
//                                                          (what it SAYS)
//
// This file is read at BUILD time by the components, so every change here
// applies to the whole site (one-page home, project pages, CV page, footer).
// ==========================================================================

// ==========================================================================
// 1. WHO YOU ARE
// ==========================================================================

/** Name shown in the hero, in the header and in the footer. */
export const siteName = 'Blanchard Theo';

/** The short line under your name in the hero. One version per language. */
export const heroSubtitle = {
	fr: 'Développeur Moteur et Gameplay ',
	en: 'Engine and Gameplay developer',
};

// ==========================================================================
// 2. THE HERO — the first screen of the one-page site
// --------------------------------------------------------------------------
// The hero shows a BACKGROUND that cycles through your pictures, GIFs and
// videos, and, on top of it: your name, your subtitle, two buttons and your
// coordinates (GitHub, LinkedIn, mail, phone, CV — built from `contact` below).
//
// WHERE THE FILES GO
//   a) simple: drop them in  public/hero/  and write their address in the list
//      below, starting with a slash:
//          public/hero/shot.jpg      ->  '/hero/shot.jpg'
//          public/hero/capture.mp4   ->  '/hero/capture.mp4'
//          public/hero/anim.gif      ->  '/hero/anim.gif'
//      Anything in public/ is copied to the site as it is: no size limit, and
//      videos and GIFs keep their animation.
//   b) or, for a picture you want Astro to optimise (resize + WebP), put it in
//      src/assets/, import it at the top of this file and use the imported
//      name in the list. `introImage` below is exactly that.
//
// The kind of each slide (image or video) is detected from the file extension:
// .mp4 .webm .ogv .mov = video, everything else = image.
// ==========================================================================
// --------------------------------------------------------------------------
// A picture you drop in src/assets/ is found AUTOMATICALLY: no import to write,
// and nothing breaks while the folder is empty. The line below looks for
// src/assets/Intro.png (also .jpg, .jpeg, .webp), keeps the first one it finds
// and gives `null` when there is none. `import.meta.glob` is a Vite feature:
// it is resolved at build time, which is why the picture can still be
// optimised by Astro.
// --------------------------------------------------------------------------
const introPictures = import.meta.glob('./assets/Intro.{png,jpg,jpeg,webp,avif}', {
	eager: true,
	import: 'default',
}) as Record<string, { src: string; width?: number; height?: number }>;

/** The first picture found in src/assets/, or `null` if there is none yet. */
export const introImage = Object.values(introPictures)[0] ?? null;

export const hero = {
	/**
	 * The list of slides, in order. Add as many as you want.
	 * Empty list (`[]`) = no background picture: the hero shows a purple
	 * gradient instead (see `colors.heroFallback` in src/theme.ts).
	 *
	 * THE THREE '/hero/demo-*.jpg' BELOW ARE DEMONSTRATION PICTURES that came
	 * with this version of the site. Delete these three lines and the three
	 * files in public/hero/ as soon as you have your own screenshots — this
	 * block is the only place you have to list them.
	 */
	slides: [
		'/hero/demo-1.jpg', // a file from public/hero/
		'/hero/demo-2.jpg',
		'/hero/demo-3.jpg',
		'/hero/demo-4.mp4',
		'/hero/demo-5.gif',

		// Your own pictures: put the file in public/hero/ and write its address.
		// '/hero/screenshot.jpg',
		// '/hero/title-screen.png',
		// '/hero/anim.gif',        // an animated GIF works like a picture

		// A video: same thing, the extension is enough (.mp4 .webm .ogv .mov).
		// It is muted and looped, and only the visible one plays.
		// '/hero/gameplay.mp4',

		// A picture imported from src/assets/ (see `introImage` above) also
		// works: uncomment the next line.
		// introPhoto,
	] as (string | { src: string } | null | undefined)[], // `as ...` helps TypeScript

	/** How long each slide stays on screen, in milliseconds. 1000 = 1 second. */
	intervalMs: 6000,

	/**
	 * Length of the fade between two slides, in milliseconds. Keep it smaller
	 * than `intervalMs` or you will never see a picture fully.
	 */
	transitionMs: 1400,

	/** Show the small dots under the coordinates (one per slide)? */
	dots: true,

	/** Show the little arrow at the bottom that scrolls to "About"? */
	scrollCue: true,

	/**
	 * The two buttons in the middle of the hero. `href` can be:
	 *   '#projects'            an anchor of the one-page site (smooth scroll)
	 *   '/cv'                  an internal page
	 *   'mailto:you@mail.com'  an e-mail, 'tel:+33...' a phone number, or any
	 *                          https:// address
	 * Delete a line to remove the button, or leave `buttons: []` for none.
	 * `style: 'solid'` = filled, `'ghost'` = just an outline.
	 */
	buttons: [
		{
			href: '#projects',
			style: 'solid',
			label: { fr: 'Voir mes projets', en: 'See my projects' },
		},
		{
			href: 'mailto:theo.blanchard63@gmail.com',
			style: 'ghost',
			label: { fr: 'Me contacter', en: 'Contact me' },
		},
	],
};

// ==========================================================================
// 3. THE MENU — the buttons of the header
// --------------------------------------------------------------------------
// `anchor` is the `id` of a section of the one-page home (see `sections`
// below). The header turns it into '/#about', so the same button works from
// every page: it always brings the visitor back to the home page, at the right
// section. Adding a fourth section later = adding a section with that id +
// one line here.
// ==========================================================================
export const menu = [
	{ id: 'home', anchor: '#home', label: { fr: 'Accueil', en: 'Home' } },
	{ id: 'projects', anchor: '#projects', label: { fr: 'Projets', en: 'Projects' } },
	{ id: 'about', anchor: '#about', label: { fr: 'À propos', en: 'About' } },
];

// ==========================================================================
// 4. THE SECTIONS — the titles of the one-page home
// --------------------------------------------------------------------------
// Each block writes three texts, in both languages:
//   eyebrow  the small line above the title (a number, a category...)
//   title    the big title of the section
//   lead     one sentence under the title (optional: '' = nothing)
//
// `id` MUST stay the same as the `anchor` used in `menu` above.
//
// The BODY of the about section (the paragraphs, the studies, the skills) is
// written in src/components/AboutSection.astro, because it is prose, not a
// setting. The projects section reads src/projects/*.md, like before.
// ==========================================================================
export const sections = {
	projects: {
		id: 'projects',
		eyebrow: { fr: '01 — Projets', en: '01 — Projects' },
		title: { fr: 'Mes projets', en: 'My projects' },
		lead: {
			fr: 'Du plus récent au plus ancien.',
			en: 'Newest first.',
		},
		/**
		 * How the projects are shown in that section:
		 *   'rail' the horizontal, draggable row of the old home page, with
		 *          the two arrows under it (ProjectRail.astro) — the default
		 *   'grid' all the projects in a grid, one under the other
		 * One word, and the section changes. Both use the same cards.
		 */
		layout: 'rail' as 'grid' | 'rail',

		/**
		 * Show the small line under the rail ("drag the cards, or use the
		 * arrows")? The text is in src/i18n/translations/home.ts.
		 * Only useful in 'rail' mode: the grid has nothing to explain.
		 */
		hint: true,
	},
	about: {
		id: 'about',
		eyebrow: { fr: '02 — À propos', en: '02 — About' },
		title: { fr: 'Qui je suis', en: 'Who I am' },
		lead: {
			fr: 'Étudiant en dernière année à Créajeux, programmeur gameplay et moteur.',
			en: 'Final-year student at Créajeux, gameplay and engine programmer.',
		},
	},
	
};

// ==========================================================================
// 5. MY CONTACT DETAILS  <- the only block you really have to fill in
// --------------------------------------------------------------------------
// Write the VALUE, not the whole address: the links below are built from it
// automatically, and they appear everywhere at once (hero of the home page,
// about section, footer).
//
// Leave a field empty ('' or null) and its button simply does not appear.
// ==========================================================================
export const contact = {
	//GitHub: username
	github: 'TheoB63',

	// LinkedIn: the end of profile URL. linkedin.com/in/<this>
	linkedin: 'théo-blanchard-b43655367/',

	//Your email address
	email: 'theo.blanchard63@gmail.com',

	/**
	 * `true`  -> the email is NOT a link: it is shown as plain text, with a
	 *           small "copy" button next to it (no mailbox opens, and the
	 *           address is a little harder for spam robots to read).
	 * `false` -> the email is a link that opens the visitor's mailbox.
	 */
	emailAsText: false,

	//Your phone number, in international format
	phone: '+33621844569',

	/** Text shown under the phone icon. */
	phoneLabel: { fr: 'Téléphone', en: 'Phone' },
};

// ==========================================================================
// 6. MY CV
// --------------------------------------------------------------------------
// The CV page (/cv) shows the text written in src/pages/cv.md, a download
// button, and the PDF displayed inside the page. It is still a page of its own:
// it is reachable from the "Mon CV" link of the hero / about section / footer.
//
//   1. export your CV as a PDF
//   2. put it in the public/ folder, for example public/cv.pdf
//   3. write its path here, starting with a slash: '/cv.pdf'
//
// Files in public/ are copied to the site as they are, so '/cv.pdf' is the
// address of public/cv.pdf. Set this to null to hide everything CV-related.
// ==========================================================================
export const cvPdf: string | null = '/cv.pdf';

/** Text of the download button, and of the filename the browser suggests. */
export const cvPdfLabel = {
	fr: 'Télécharger le PDF',
	en: 'Download the PDF',
};

// --------------------------------------------------------------------------
// HOW THE CV IS DISPLAYED on its own page (/cv).
//
//   'image' mode (the default) shows a plain PICTURE of your CV: no border,
//   no toolbar, no scrollbar — nothing betrays a reader. The frame is exactly
//   as tall as the picture needs to be (its real proportions are read at
//   build time) and it never moves on its own.
//
//       -> drop a picture of your CV in src/assets/, named cv.png / cv.jpg /
//          cv.webp (page 1 of the PDF exported as an image is perfect).
//
//   'reader' mode shows the PDF itself in the browser's built-in reader, with
//   the toolbar, the panel and the scrollbar turned off and no border. It is
//   also the automatic fallback when there is no cv.* picture in src/assets/.
//   Use it when your CV has several pages.
//
// Both modes keep the real PDF (public/cv.pdf) for the download link.
// --------------------------------------------------------------------------
// Found automatically, exactly like introImage above: drop src/assets/cv.png
// (or .jpg / .jpeg / .webp) and it is used. While there is no picture, this
// stays `null` and CvViewer.astro quietly falls back to 'reader' mode.
const cvPictures = import.meta.glob('./assets/cv.{png,jpg,jpeg,webp,avif}', {
	eager: true,
	import: 'default',
}) as Record<string, { src: string; width?: number; height?: number }>;

export const cvImage = Object.values(cvPictures)[0] ?? null;

// 'image' -> the picture above, plain, no border, no toolbar.
// 'reader' -> the PDF in the browser's reader, chrome turned off.
export const cvDisplay: 'image' | 'reader' = 'reader';

/**
 * Height of the reader, as a percentage of its width, in 'reader' mode.
 * 141.4 = an A4 page standing up (297 / 210 x 100). In 'image' mode this is
 * ignored: the real proportions of the picture are used instead.
 */
export const cvReaderRatio = 141.4;

// ==========================================================================
// 7. HOW THE LINKS ARE BUILT  (nothing to edit to get started)
// --------------------------------------------------------------------------
// `links` is the list rendered by LinkBar.astro. It is generated from
// `contact` above, in this order: GitHub, LinkedIn, email, phone, CV.
//
// Want one more (itch.io, ArtStation, Discord, X...)? Add it to `extraLinks`
// at the bottom of this file — one object, four values, done.
//
//   id     unique name, also used for the CSS class
//   href   the address. A path starting with "/" is internal (no new tab).
//   label  the two texts, one per language
//   icon   raw SVG markup drawn in a 24x24 box, using currentColor so it
//          follows the text colour. Copy any icon from https://lucide.dev
// ==========================================================================
export interface SiteLink {
	id: string;
	href: string;
	label: { fr: string; en: string };
	icon: string;
	/** 'link' opens the address, 'text' just displays it (used for the email
	 *  when contact.emailAsText is true). */
	kind?: 'link' | 'text';
	/** For kind 'text': the value to display and to copy. */
	value?: string;
}

// Small helpers so the block below stays readable.
const has = (v: string | null | undefined) => Boolean(v && v.trim());

/** Turns '+33 6 12 34 56 78' into '+33612345678' (what a tel: link needs). */
const telHref = (v: string) => `tel:${v.replace(/[^\d+]/g, '')}`;

/**
 * Groups a French number for display: '+33612345678' -> '+33 6 12 34 56 78'.
 * Any other format is returned exactly as you wrote it (the tel: link uses the
 * raw value, so the display never breaks the call).
 */
const prettyPhone = (v: string) => {
	const digits = v.replace(/[^\d]/g, '');
	// +33 followed by the 9 national digits = 10 digits in total after the 3.
	if (v.startsWith('+33') && digits.length === 11 && digits.startsWith('33')) {
		return `+33 ${digits.slice(2).replace(/(\d)(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}`;
	}
	return v;
};

// --- The icons (24x24, stroke = currentColor) -----------------------------
const icons = {
	github: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
	linkedin: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="2"/>`,
	email: `<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 7 9 6 9-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
	phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
	cv: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 2v6h6M9 13h6M9 17h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
};

// --- The generated list ----------------------------------------------------
const generated: SiteLink[] = [];

if (has(contact.github)) {
	generated.push({
		id: 'github',
		href: `https://github.com/${contact.github.trim()}`,
		label: { fr: 'GitHub', en: 'GitHub' },
		icon: icons.github,
	});
}

if (has(contact.linkedin)) {
	generated.push({
		id: 'linkedin',
		href: `https://www.linkedin.com/in/${contact.linkedin.trim()}`,
		label: { fr: 'LinkedIn', en: 'LinkedIn' },
		icon: icons.linkedin,
	});
}

if (has(contact.email)) {
	const address = contact.email.trim();
	generated.push({
		id: 'email',
		// mailto: opens the visitor's default mailbox, already addressed to you.
		href: `mailto:${address}`,
		label: { fr: 'M’écrire', en: 'Email me' },
		icon: icons.email,
		// ...unless you prefer to simply display the address + a copy button.
		kind: contact.emailAsText ? 'text' : 'link',
		value: address,
	});
}

if (has(contact.phone)) {
	generated.push({
		id: 'phone',
		href: telHref(contact.phone),
		label: contact.phoneLabel,
		icon: icons.phone,
	});
}

if (cvPdf) {
	generated.push({
		id: 'cv',
		// Internal page: src/pages/cv.md (written CV + PDF).
		href: '/cv',
		label: { fr: 'Mon CV', en: 'My CV' },
		icon: icons.cv,
	});
}

// ---------------------------------------------------------------------------
// extraLinks — add anything else here, one object per link.
// Copy the commented example, change the four values, save.
// ---------------------------------------------------------------------------
export const extraLinks: SiteLink[] = [
	// {
	// 	id: 'itch',
	// 	href: 'https://your-username.itch.io',
	// 	label: { fr: 'itch.io', en: 'itch.io' },
	// 	icon: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>`,
	// },
];

/** The final list, used by LinkBar.astro. Order = order of the buttons. */
export const links: SiteLink[] = [...generated, ...extraLinks];

/** The phone number as it should be displayed (about section). */
export const phoneDisplay = has(contact.phone) ? prettyPhone(contact.phone) : null;
