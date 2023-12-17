import type { Tag } from '$lib/types/post.js';
import type Post from '$lib/types/post.js';

export const load = async ({ fetch }) => {
	const res = await fetch(`/api/v1/posts/all`);
	const resJSON = (await res.json()) as Post[];

	const featuredPosts: Tag[] = resJSON
		.filter((post) => post.categories.includes('featured'))
		.map((post) => ({ slug: post.slug, title: post.title }));

	const allCategories = Array.from(new Set(resJSON.flatMap((p) => p.categories)));

	return {
		featuredPosts,
		allCategories,
	};
};
