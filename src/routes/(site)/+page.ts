import type { Tag } from '$lib/types/post.js';
import type Post from '$lib/types/post.js';

export const load = async ({ fetch }) => {
	const recentPostsRes = await fetch(`/api/posts/offset/0?limit=3`);
	const recentPosts = (await recentPostsRes.json()) as Post[];

	const allPostsRes = await fetch(`/api/posts/all`);
	const allPosts = (await allPostsRes.json()) as Post[];

	const popularPosts: Tag[] = allPosts
		.filter((post) => post.categories.includes('popular'))
		.map((post) => ({ slug: post.slug, title: post.title }));

	const allCategories = Array.from(new Set(allPosts.flatMap((p) => p.categories)));

	return {
		recentPosts,
		popularPosts,
		allCategories,
	};
};
