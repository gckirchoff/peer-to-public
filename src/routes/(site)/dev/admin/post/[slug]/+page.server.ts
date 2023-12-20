import { readFile } from 'node:fs/promises';
import { redirect } from '@sveltejs/kit';

import type Post from '$lib/types/post.js';
import { escapeComponents } from '$lib/utils/logic.js';

export const load = async ({ params, fetch }) => {
	const { slug } = params;

	try {
		const post = await import(`../../../../../../lib/content/posts/${slug}.md`);
		const contentString = await readFile(`src/lib/content/posts/${slug}.md`, 'utf-8');

		const contentAfterFrontMatter = contentString.split('</script>')?.[1] ?? contentString;
		const postContent = escapeComponents(contentAfterFrontMatter);

		const allPostsRes = await fetch('/api/v1/posts/all');
		const allPosts = (await allPostsRes.json()) as Post[];

		const allCategories = Array.from(new Set(allPosts.flatMap((p) => p.categories)));

		return {
			postContent,
			meta: { ...(post.metadata as Post), slug: params.slug },
			allCategories,
		};
	} catch (err) {
		throw redirect(301, '/posts');
	}
};
