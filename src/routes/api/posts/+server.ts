import { error, json } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import type { PostReqPostBody } from './constants';

import { escapeRegExp, slugify } from '$lib/utils/logic';
import { UsablesFactory, getPostTemplate } from './logic';

export const POST = async ({ request }) => {
	try {
		const body = (await request.json()) as PostReqPostBody;
		const {
			title,
			description,
			categories,
			published,
			coverImage = 'ascidian.png',
			content,
			usables,
		} = body;

		const postTemplate = getPostTemplate({
			title,
			description,
			categories,
			coverImage,
			published,
			content,
		});

		const usablesFactory = new UsablesFactory();

		const post = Object.entries(usables).reduce((acc, [id, usable]) => {
			const dummyComponent = new RegExp(
				escapeRegExp(`[--Component type="${usable.type}" id="${usable.id}" --]`)
			);

			const usableBuilder = usablesFactory.createUsableBuilder(usable);
			const realComponent = usableBuilder.buildComponent();
			acc = acc.replace(dummyComponent, realComponent);

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
