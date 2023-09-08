import { error, json } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import type { PostReqPostBody } from './types.js';
import { slugify } from '$lib/utils/logic.js';
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

		let post = `---
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
		Object.entries(usables).forEach(([id, usable]) => {
			if (!(usable.type in importedUsables)) {
				post = post.replace(
					'<script> // usables',
					`<script> // usables
  ${usableImports[usable.type]}`
				);
				importedUsables[usable.type] = true;
			}
			// switch (usable.type) {
			// 	case UsableType.RecipeCard:

			// }
		});

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
