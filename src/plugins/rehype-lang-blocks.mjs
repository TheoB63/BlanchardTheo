// ==========================================================================
// rehype-lang-blocks.mjs — makes markdown bilingual.
// --------------------------------------------------------------------------
// A markdown file cannot contain Astro components, so there is no obvious way
// to write "this paragraph only in French". This plugin adds one.
//
// What you write in a .md file:
//
//     ## My project
//
//     <!-- lang:fr -->
//     Ce paragraphe n'existe qu'en francais.
//     <!-- /lang -->
//
//     <!-- lang:en -->
//     This paragraph only exists in English.
//     <!-- /lang -->
//
// What this plugin does: it finds those two HTML comments and wraps everything
// between them in <div lang="fr"> ... </div>. Both versions stay in the
// generated HTML; the CSS in src/layouts/BaseLayout.astro shows only the one
// matching the current language. That is why it works on a static site with no
// server: switching language never needs a new page.
//
// Rules:
//   - a block always starts with  <!-- lang:CODE -->  (CODE = fr, en, ...)
//   - it always ends with        <!-- /lang -->
//   - markdown inside the block is still markdown: lists, code blocks,
//     headings and images all work as usual
//   - blocks cannot be nested
//   - if you forget the closing marker, the block simply runs to the end of
//     the file (and the build prints a warning)
//
// A "rehype plugin" is just a function that receives the syntax tree of the
// document (an array of nodes) and returns a transformed tree. Nothing else.
// ==========================================================================

const OPEN = /^\s*lang:([a-zA-Z-]+)\s*$/;
const CLOSE = /^\s*\/lang\s*$/;

/** True when the node is an HTML comment, false for everything else.
 *  remark-rehype gives us comments as `raw` nodes (the whole `<!-- ... -->`
 *  as one string), and some pipelines give `comment` nodes (the text only),
 *  so both are handled. */
function isComment(node) {
	return node.type === 'raw' || node.type === 'comment';
}

/** The text inside a comment, without the `<!--` and `-->`. */
function commentText(node) {
	const value = node.value ?? '';
	if (node.type === 'raw') {
		return value.replace(/^<!--/, '').replace(/-->$/, '');
	}
	return value;
}

/** Walks every node list of the tree (root, then each element's children). */
function transformChildren(node) {
	const children = node.children;
	if (!Array.isArray(children)) return;

	const out = [];
	let i = 0;

	while (i < children.length) {
		const child = children[i];

		// First, go deeper: a block can live inside a list item or a blockquote.
		transformChildren(child);

		if (isComment(child)) {
			const open = OPEN.exec(commentText(child));

			if (open) {
				const lang = open[1].toLowerCase();
				const block = [];
				let closed = false;
				i++;

				// Collect every sibling until the closing marker.
				while (i < children.length) {
					const next = children[i];
					if (isComment(next) && CLOSE.test(commentText(next))) {
						closed = true;
						i++;
						break;
					}
					transformChildren(next);
					block.push(next);
					i++;
				}

				if (!closed) {
					console.warn(
						`[i18n] A "<!-- lang:${lang} -->" block is never closed with "<!-- /lang -->". ` +
							`It will run to the end of the file.`,
					);
				}

				// Replace the markers + content by a single <div lang="...">.
				out.push({
					type: 'element',
					tagName: 'div',
					properties: { lang },
					children: block,
				});
				continue;
			}

			// A closing marker with no opening one: drop it, it would show up
			// as text in the page otherwise.
			if (CLOSE.test(commentText(child))) {
				console.warn('[i18n] Found a "<!-- /lang -->" with no opening marker. Ignored.');
				i++;
				continue;
			}
		}

		out.push(child);
		i++;
	}

	node.children = out;
}

export function rehypeLangBlocks() {
	return (tree) => transformChildren(tree);
}

export default rehypeLangBlocks;
