// ==========================================================================
// projects.ts — the ONE place that reads the project files.
// --------------------------------------------------------------------------
// Both the home page and /projects call `listProjects()` instead of reading the
// collection themselves, so the sorting rule and the diagnostic message live in
// a single file.
//
// The diagnostic is the important part: every time the site is built or served,
// the terminal prints how many projects were found and what they are. When a
// new file does not show up on the page, look there first — it tells you
// immediately whether Astro saw the file or not.
//
// (This is a plain .ts file, not a page: it never becomes a URL.)
// ==========================================================================
import { getCollection, type CollectionEntry } from 'astro:content';

// What a project is, everywhere in the site.
export type Project = CollectionEntry<'projects'>;

/**
 * Returns every project found in src/projects/, newest first.
 *
 * `date` is optional in the frontmatter, so undated projects fall back to 0
 * and end up at the bottom of the list.
 */
export async function listProjects(): Promise<Project[]> {
	const projects = await getCollection('projects');

	// --- Diagnostic, printed in the terminal ------------------------------
	const found = projects.map((p) => p.id).sort();
	if (found.length === 0) {
		console.log(
			'\n[projects] No project found in src/projects/.\n' +
				'[projects] Check: a .md file, in src/projects/, with at least\n' +
				'[projects] `title_fr:` and `title_en:` in its frontmatter.\n' +
				'[projects] If the file IS there, delete node_modules/.astro and restart.\n'
		);
	} else {
		console.log(
			`[projects] ${found.length} project(s) found in src/projects/: ${found.join(', ')}`
		);
	}

	return projects.sort((a, b) => {
		const da = a.data.date?.getTime() ?? 0;
		const db = b.data.date?.getTime() ?? 0;
		return db - da;
	});
}
