import { writeFile } from 'node:fs/promises';
import { error, json } from '@sveltejs/kit';
import { usableImports, type PatchReqPostBody } from '../constants.js';
import { UsablesFactory, getPostTemplate } from '../logic.js';
import type { UsableType } from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants.js';
import { escapeRegExp } from '$lib/utils/logic.js';

export const PATCH = async ({ request, params }) => {
	try {
		const body = (await request.json()) as PatchReqPostBody;
		const { slug } = params;

		const {
			title,
			description,
			categories,
			published = true,
			coverImage = 'ascidian.png',
			content,
			usables,
		} = body;

		// TODO add published date and upated date
		const postTemplate = getPostTemplate({
			title,
			description,
			categories,
			coverImage,
			published,
			content,
			update: true,
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

		const filePath = `src/lib/content/posts/${slug}.md`;

		await writeFile(filePath, post);

		return json({
			status: 'success',
		});
	} catch (err) {
		throw error(500, 'Internal server error');
	}
};
