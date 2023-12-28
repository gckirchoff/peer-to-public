import type Post from '$lib/types/post.js';
import { getAllAuthors } from './logic.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const allPostsRes = await fetch('/api/v1/posts/all');
	const allPosts = (await allPostsRes.json()) as Post[];

	const allCategories = Array.from(new Set(allPosts.flatMap((p) => p.categories)));
	const allAuthors = getAllAuthors(allPosts);

	return {
		allCategories,
		allAuthors,
	};
};
