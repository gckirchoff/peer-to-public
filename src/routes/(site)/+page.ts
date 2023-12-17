import type { Tag } from '$lib/types/post.js';
import type Post from '$lib/types/post.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const postsRes = await fetch('/api/v1/posts/offset/0');
	const posts = (await postsRes.json()) as Post[];
	const recentPosts = posts.slice(0, 3);

	const allPostsRes = await fetch('/api/v1/posts/all');
	const allPosts = (await allPostsRes.json()) as Post[];

	const featuredPosts: Tag[] = allPosts
		.filter((post) => post.categories.includes('featured'))
		.map((post) => ({ slug: post.slug, title: post.title }));

	const allCategories = Array.from(new Set(allPosts.flatMap((p) => p.categories)));

	return {
		recentPosts,
		featuredPosts,
		allCategories,
	};
};
