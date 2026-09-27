// ==========================================================================
// site.ts — personal information, in one place.
// ==========================================================================

//Name shown in the header, in the intro of the home page and in the footer. */
export const siteName = 'Blanchard Theo';

// ---------------------------------------------------------------------------
// The image zone of the home page.
//
//   1. put your file in src/assets/  (any name, any folder you like)
//   2. uncomment the import line below and point it at your file
//   3. replace `null` by the imported name
//
// While it is `null`, the home page shows a dashed box that says what to do,
// so nothing is ever broken.
// ---------------------------------------------------------------------------
import introPhoto from './assets/Intro.png';
export const introImage = introPhoto;

/** Text inside that dashed box. Change it freely. */
export const introImageHint = {
	fr: 'Ajoutez une image dans src/assets/ puis renseignez introImage dans src/site.ts',
	en: 'Drop an image in src/assets/ then set introImage in src/site.ts',
};

/** The short line under your name. One version per language. */
export const introSubtitle = {
	fr: 'Développeur Moteur et Gameplay ',
	en: 'Engine and Gameplay developer',
};

// ==========================================================================
// 1. MY CONTACT DETAILS  <- the only block you really have to fill in
// --------------------------------------------------------------------------
// Write the VALUE, not the whole address: the links below are built from it
// automatically, and they appear everywhere at once (intro of the home page,
// about page, footer).
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
// 2. MY CV
// --------------------------------------------------------------------------
// The CV page (/cv) shows the text written in src/pages/cv.md, a download
// button, and the PDF displayed inside the page. The about page shows the
// same PDF.
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
// Everything about the CV lives on /cv now: the about page only has the row
// of links, and the "Mon CV" link points here.
//
//   'image' mode (the default) shows a plain PICTURE of your CV: no border,
//   no toolbar, no scrollbar — nothing betrays a reader. The frame is exactly
//   as tall as the picture needs to be (its real proportions are read at
//   build time) and it never moves on its own.
//
//       -> drop a picture of your CV in src/assets/, named cv.png / cv.jpg /
//          cv.webp (page 1 of the PDF exported as an image is perfect).
//          It is found automatically, exactly like the intro image.
//
//   'reader' mode shows the PDF itself in the browser's built-in reader, with
//   the toolbar, the panel and the scrollbar turned off and no border. It is
//   also the automatic fallback when there is no cv.* picture in src/assets/.
//   Use it when your CV has several pages.
//
// Both modes keep the real PDF (public/cv.pdf) for the download link.
// --------------------------------------------------------------------------
import cvPicture from './assets/cv.png';
export const cvImage = cvPicture;

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
// 3. HOW THE LINKS ARE BUILT  (nothing to edit to get started)
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

/** The phone number as it should be displayed (only used by the about page). */
export const phoneDisplay = has(contact.phone) ? prettyPhone(contact.phone) : null;
