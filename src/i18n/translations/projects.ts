// ==========================================================================
// projects.ts — texts of the project cards, the projects page and the pages
// generated from the .md files of src/projects/.
// ==========================================================================
export const fr = {
	'projects.title': 'Projets',
	'projects.intro': 'Voici mes projets, du plus récent au plus ancien.',
	'projects.empty':
		'Aucun projet détecté : le dossier src/projects/ ne contient pas de fichier .md utilisable.',
	'projects.emptyHint':
		'Copiez un des fichiers d’exemple et modifiez-le, ou vérifiez ceci : le fichier est bien dans src/projects/, l’extension est .md, et le frontmatter contient au moins title_fr et title_en. Le terminal affiche à chaque lancement la liste des projets trouvés (ligne [projects]). En cas de doute, supprimez node_modules/.astro puis relancez.',

	'project.repo': 'Code source',
	'project.demo': 'Démo',
	'project.noImage': 'Pas encore d’image',
	'project.backToList': '← Retour aux projets',

	'rail.scrollLeft': 'Faire défiler vers la gauche',
	'rail.scrollRight': 'Faire défiler vers la droite',
	'rail.label': 'Liste de projets',
};

export const en: typeof fr = {
	'projects.title': 'Projects',
	'projects.intro': 'Here are my projects, from the most recent to the oldest.',
	'projects.empty':
		'No project found: src/projects/ has no usable .md file.',
	'projects.emptyHint':
		'Copy one of the example files and edit it, or check this: the file is inside src/projects/, the extension is .md, and the frontmatter has at least title_fr and title_en. The terminal prints the list of detected projects on every start (line starting with [projects]). When in doubt, delete node_modules/.astro and start again.',

	'project.repo': 'Source code',
	'project.demo': 'Demo',
	'project.noImage': 'No image yet',
	'project.backToList': '← Back to projects',

	'rail.scrollLeft': 'Scroll left',
	'rail.scrollRight': 'Scroll right',
	'rail.label': 'Project list',
};
