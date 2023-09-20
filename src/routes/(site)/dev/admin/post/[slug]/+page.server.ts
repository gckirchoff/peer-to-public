import { readFile } from 'node:fs/promises';
import { redirect } from '@sveltejs/kit';

import type Post from '$lib/types/post.js';

export const load = async ({ params }) => {
	const { slug } = params;

	try {
		const post = await import(`../../../../../../lib/content/posts/${slug}.md`);
		const postContent = await readFile(`src/lib/content/posts/${slug}.md`, 'utf-8');

		return {
			postContent,
			meta: { ...(post.metadata as Post), slug: params.slug },
		};
	} catch (err) {
		throw redirect(301, '/posts');
	}
};
