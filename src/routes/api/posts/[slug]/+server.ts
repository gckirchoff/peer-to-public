import { writeFile } from 'node:fs/promises';
import { error, json } from '@sveltejs/kit';
import type { PatchReqPostBody } from '../constants.js';
import { UsablesFactory, getPostTemplate } from '../logic.js';
import { escapeRegExp, unescapeComponents } from '$lib/utils/logic.js';

export const PATCH = async ({ request, params }) => {
	try {
		const body = (await request.json()) as PatchReqPostBody;
		const { slug } = params;

		const {
			title,
			description,
			categories,
			published,
			coverImage = 'ascidian.png',
			content: preprocessedContent,
			usables,
			date,
		} = body;

		const content = unescapeComponents(preprocessedContent);

		// TODO add published date and upated date
		const postTemplate = getPostTemplate({
			title,
			description,
			categories,
			coverImage,
			published,
			content,
			publishDate: date,
			update: true,
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

		const filePath = `src/lib/content/posts/${slug}.md`;

		await writeFile(filePath, post);

		return json({
			status: 'success',
		});
	} catch (err) {
		throw error(500, 'Internal server error');
	}
};
