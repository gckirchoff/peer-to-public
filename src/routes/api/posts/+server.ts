import { error, json } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import type { PostReqPostBody } from './types.js';
import { escapeRegExp, slugify } from '$lib/utils/logic.js';
import { UsableType } from '../../(site)/dev/admin/create-post/UsablesModal/constants.js';

export const POST = async ({ request }) => {
	try {
		const body = (await request.json()) as PostReqPostBody;
		const {
			title,
			description,
			categories,
			published = true,
			coverImage = 'ascidian.png',
			content,
			usables,
		} = body;

		const now = new Date();
		const offset = now.getTimezoneOffset();
		const adjustedDate = new Date(now.getTime() - offset * 60 * 1000);
		const finalDate = adjustedDate.toISOString().split('T')[0];

		const postTemplate = `---
title: "${title}"
description: "${description}"
categories:
${categories.map((category) => `  - "${category}"\r`).join('')}
coverImage: "${coverImage}"
date: '${finalDate}'
published: ${published}
---
<script> // usables

</script>

${content}`;

		const usableImports: Record<UsableType, string> = {
			[UsableType.RecipeCard]:
				"import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte'",
			[UsableType.PhotoGallery]: 'TODO', // ! TODO
		};
		const importedUsables: Partial<Record<UsableType, true>> = {};
		const post = Object.entries(usables).reduce((acc, [id, usable]) => {
			if (!(usable.type in importedUsables)) {
				acc = acc.replace(
					'<script> // usables',
					`<script> // usables
    ${usableImports[usable.type]}`
				);
				importedUsables[usable.type] = true;
			}

			const componentMatcher = new RegExp(
				escapeRegExp(`[--Component type="${usable.type}" id="${usable.id}" --]`)
			);
			switch (usable.type) {
				case UsableType.RecipeCard:
					const { title, description, prepTime, cookTime, servings, ingredients, steps } = usable;
					const recipeComponent = `<RecipeCard
    img="markdown-tutorial/irish-soda-bread.jpg"
    title="${title}"
    description="${description}"
    prepTime="{${prepTime}}"
    cookTime="{${cookTime}}"
    result="{${servings}}"
    ingredients="{[]}"
    steps="{[]}"
/>`;
					acc = acc.replace(componentMatcher, recipeComponent);
			}
			return acc;
		}, postTemplate);

		const fileName = slugify(title);
		const filePath = `src/lib/content/posts/${fileName}.md`;

		await writeFile(filePath, post);

		return json({
			status: 'success',
		});
	} catch (err) {
		throw error(500, 'Internal server error');
	}
};
