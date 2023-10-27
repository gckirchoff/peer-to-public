import { error, json } from '@sveltejs/kit';
import { writeFile, rename, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

import { escapeRegExp, slugify } from '$lib/utils/logic';
import { UsablesFactory, getPostTemplate } from './logic';
import { getPostEditorUploadAndHandleImageUpload } from '../utils';

const processContentImages = async (post: string, slug: string): Promise<string> => {
	try {
		const tempImageFinder = /(?<=\/images\/temp\/).+?(?=\))/g;
		const imagesToMove = [...post.matchAll(tempImageFinder)].map(([fileName]) => fileName);

		const newFolderPath = `postImages/${slug}`;

		if (!existsSync(`static/images/${newFolderPath}`)) {
			await mkdir(`static/images/${newFolderPath}`);
		}
		for (const image of imagesToMove) {
			await rename(`static/images/temp/${image}`, `static/images/${newFolderPath}/${image}`);
		}

		return post.replaceAll('/temp/', `/${newFolderPath}/`);
	} catch (err) {
		console.warn(err);
		throw new Error((err as { message: string })!.message);
	}
};

export const POST = async ({ request }) => {
	try {
		const body = await getPostEditorUploadAndHandleImageUpload(request);
		const { title, description, categories, published, coverImage, content, usables } = body;

		const fileName = slugify(title);

		const postTemplate = getPostTemplate({
			title,
			description,
			categories,
			coverImage,
			published,
			content,
		});
		const usablesFactory = new UsablesFactory();

		const postAfterComponentProcessing = Object.entries(usables).reduce((acc, [id, usable]) => {
			const dummyComponent = new RegExp(
				escapeRegExp(`[--Component type="${usable.type}" id="${usable.id}" --]`),
			);

			const usableBuilder = usablesFactory.createUsableBuilder(usable);
			const realComponent = usableBuilder.buildComponent();
			acc = acc.replace(dummyComponent, realComponent);

			return acc;
		}, postTemplate);

		const postAfterImageProcessing = await processContentImages(
			postAfterComponentProcessing,
			fileName,
		);

		const filePath = `src/lib/content/posts/${fileName}.md`;

		await writeFile(filePath, postAfterImageProcessing);

		return json({
			status: 'success',
		});
	} catch (err) {
		console.warn(err);
		throw error(500, 'Internal server error');
	}
};
