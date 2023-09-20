import { error, json } from '@sveltejs/kit';
import { writeFile } from 'node:fs/promises';
import { usableImports } from './constants';
import type { PostReqPostBody } from './constants';

import { escapeRegExp, slugify } from '$lib/utils/logic';
import type { UsableType } from '../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import { UsablesFactory, getPostTemplate } from './logic';

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

		const postTemplate = getPostTemplate({
			title,
			description,
			categories,
			coverImage,
			published,
			content,
		});

		const importedUsables: Partial<Record<UsableType, true>> = {};
		const usablesFactory = new UsablesFactory();

		const post = Object.entries(usables).reduce((acc, [id, usable]) => {
			if (!(usable.type in importedUsables)) {
				acc = acc.replace(
					'<script> // usables',
					`<script> // usables
    ${usableImports[usable.type]}`
				);
				importedUsables[usable.type] = true;
			}

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
