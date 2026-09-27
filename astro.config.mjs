// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeLangBlocks } from './src/plugins/rehype-lang-blocks.mjs';

// https://astro.build/config
export default defineConfig({
	markdown: {
		// Astro 7 uses a new markdown processor by default ("Sätteri"), which
		// has its own plugin API. We switch back to the classic remark/rehype
		// pipeline with `unified(...)` because that is what the language plugin
		// below is written for — and what every tutorial you will find uses.
		processor: unified({
			// Runs on EVERY markdown file of the site: the pages in src/pages/
			// and the projects in src/projects/.
			//
			// It turns the language markers you write in markdown:
			//
			//     <!-- lang:fr -->
			//     Bonjour
			//     <!-- /lang -->
			//
			// into <div lang="fr">Bonjour</div>, which the CSS in
			// src/layouts/BaseLayout.astro then shows or hides.
			// See src/plugins/rehype-lang-blocks.mjs.
			rehypePlugins: [rehypeLangBlocks],
		}),
	},

	i18n: {
		// Declares the two languages of the site. This does NOT create any
		// /fr/... or /en/... URL: the switch happens in place with the FR / EN
		// buttons of the header (src/i18n/i18n.js). It is still worth declaring
		// because it keeps the door open for URL-based routing later on.
		defaultLocale: 'en',
		locales: ['fr', 'en'],
	},

	server: {
		// Host names accepted by the dev server. `true` accepts anything, which
		// is what you want when the dev server is reached through a proxy or a
		// tunnel (some preview tools do that). For a stricter setup, list them:
		//   allowedHosts: ['localhost']
		// Remove this block entirely if you don't care.
		allowedHosts: true,
	},
});
