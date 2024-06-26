import { writeFile, unlink, rm } from 'node:fs/promises';
import { error, json } from '@sveltejs/kit';
import { UsablesFactory, getPostTemplate } from '../logic.js';
import { escapeRegExp, unescapeComponents } from '$lib/utils/logic.js';
import {
	getPostEditorUploadAndHandleImageUpload,
	processContentImages,
	type PostEditorUploadRet,
} from '../../../utils.js';
import { fetchPost } from '$lib/utils/fetchPosts.js';

export const PATCH = async ({ request, params }) => {
	try {
		const body = await getPostEditorUploadAndHandleImageUpload(request);
		const { slug } = params;
		const currentPost = await fetchPost(slug);

		if (!Object.hasOwn(body, 'date') || !currentPost) {
			error(500, 'Internal Server Error');
		}

		const {
			title,
			description,
			categories,
			authors,
			published,
			coverImage,
			content: preprocessedContent,
			usables,
		} = body as PostEditorUploadRet & { date: string };

		const content = unescapeComponents(preprocessedContent).trimStart();

		const postTemplate = getPostTemplate({
			title,
			description,
			categories,
			authors,
			coverImage,
			published,
			content,
			currentPostMeta: currentPost.meta,
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

		const postAfterImageProcessing = await processContentImages(postAfterComponentProcessing, slug);

		const filePath = `src/lib/content/posts/${slug}.md`;
		await writeFile(filePath, postAfterImageProcessing);

		return json({
			status: 'success',
		});
	} catch (err) {
		error(500, 'Internal server error');
	}
};
export const DELETE = async ({ params }) => {
	try {
		const { slug } = params;

		const filePath = `src/lib/content/posts/${slug}.md`;
		await unlink(filePath);

		const rootImageFolderPath = `static/images/postImages/${slug}`;

		await rm(rootImageFolderPath, { recursive: true });

		return json({
			status: 'success',
		});
	} catch (err) {
		console.log('err', err);
		error(500, 'Internal server error');
	}
};
