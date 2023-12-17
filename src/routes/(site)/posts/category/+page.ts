import type Post from '$lib/types/post.js';

export const load = async ({ fetch }) => {
	const postsRes = await fetch('/api/v1/posts/all');
	const posts: Post[] = await postsRes.json();

	const sortedPosts = [...posts].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	const uniqueCategories = sortedPosts.reduce(
		(acc: { [category: string]: { count: number; image: string } }, post) => {
			post.categories.forEach((category) => {
				if (!(category in acc)) {
					acc[category] = { count: 0, image: `${post.slug}/${post.coverImage}` };
				}
				acc[category].image = `${post.slug}/${post.coverImage}`;
				acc[category].count++;
			});

			return acc;
		},
		{},
	);

	const categoriesWithCounts = Object.entries(uniqueCategories)
		.map(([category, data]) => ({
			title: category,
			count: data.count,
			recentImage: data.image,
		}))
		.sort((a, b) => b.count - a.count);

	return {
		categoriesWithCounts,
	};
};
