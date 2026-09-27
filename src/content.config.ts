// ==========================================================================
// content.config.ts — where the projects are loaded from.
// --------------------------------------------------------------------------
// THE FOLDER IS src/projects/. Every .md file you drop in there becomes a
// project: a card on the home page, a card on /projects, and its own page at
// /projects/<file-name>. No code to touch, no list to update.
//
// The file name IS the URL:  voxel-engine.md  ->  /projects/voxel-engine
// Use lowercase and dashes: no spaces, no accents, no capitals.
//
// --------------------------------------------------------------------------
// A PROJECT IS NOT SHOWING? It is almost always one of these four:
//   1. the file is not in src/projects/ (a sub-folder is fine, anywhere else
//      is not)
//   2. the extension is not exactly .md
//   3. a field listed as REQUIRED below is missing from the frontmatter, or
//      the YAML is broken -> the build prints the file and the line, read it
//   4. Astro is using its cache -> delete node_modules/.astro and restart
//
// FIRST REFLEX: look at the terminal. src/project-list.ts prints one line per
// page load, for example
//     [projects] 2 project(s) found in src/projects/: level-editor, voxel-engine
// If your file is not in that list, Astro did not load it (cases 1 to 4).
// ==========================================================================
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	// `glob` reads a folder. `base` is relative to the root of the project,
	// `**/*.md` means "this folder and its sub-folders".
	loader: glob({ base: './src/projects', pattern: '**/*.md' }),

	// The schema describes the frontmatter: the block between the two `---`
	// lines at the top of a .md file. Astro checks every file against it.
	//
	// Only `title_fr` and `title_en` are required. Everything else is optional,
	// so a project file can be as short as:
	//
	//     ---
	//     title_fr: Mon jeu
	//     title_en: My game
	//     ---
	//
	// `({ image })` gives access to the image helper: it turns the path written
	// in the frontmatter into a real image object, and fails the build if the
	// file does not exist (which is what you want: a typo is caught
	// immediately instead of showing a broken image). Paths are relative to the
	// .md file itself.
	schema: ({ image }) =>
		z.object({
			// --- REQUIRED: one title per language ---------------------------
			title_fr: z.string(),
			title_en: z.string(),

			// --- Optional: the short text on the card -----------------------
			summary_fr: z.string().optional(),
			summary_en: z.string().optional(),

			// --- Optional: alt text / caption of the cover image -----------
			alt_fr: z.string().optional(),
			alt_en: z.string().optional(),

			// --- Optional: cover image, relative to the .md file -----------
			// png, jpg, jpeg, webp, avif and gif all work.
			image: image().optional(),

			// --- Optional: square chips on the card -------------------------
			// Free text, lowercase, and always spelled the same way:
			// cpp, c, csharp, unity, unreal, lua, python, opengl, tools...
			// One list for both languages. If a tag needs translating, add it
			// to `tagLabels` in src/i18n/index.ts.
			tags: z.array(z.string()).default([]),

			// --- Optional: ISO date, used to sort (newest first) -----------
			date: z.coerce.date().optional(),

			// --- Optional: buttons on the project page ---------------------
			// Any address works, including a relative one like "/files/demo".
			repo: z.string().optional(),
			demo: z.string().optional(),
		}),
});

// The key of this object ("projects") is the name used everywhere else:
//   getCollection('projects')   /   render(entry)
export const collections = { projects };
