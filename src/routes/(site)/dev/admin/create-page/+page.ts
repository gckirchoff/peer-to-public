import type Post from '$lib/types/post.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const allPostsRes = await fetch('/api/posts/all');
	const allPosts = (await allPostsRes.json()) as Post[];

	const allCategories = Array.from(new Set(allPosts.flatMap((p) => p.categories)));

	return {
		allCategories,
	};
};
