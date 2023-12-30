import { siteConfig } from '$lib/config';
import type Post from '$lib/types/post';

export const getAllAuthors = (posts: Post[]): string[] => {
	const uniqueAuthors = new Set<string>();
	uniqueAuthors.add(siteConfig.author);
	posts.forEach((post) => {
		const { authors } = post;
		if (!authors) {
			return;
		}
		authors.forEach((author) => {
			uniqueAuthors.add(author);
		});
	});
	const allAuthors = Array.from(uniqueAuthors);
	if (!allAuthors.length) {
		allAuthors.push(siteConfig.author);
	}
	return allAuthors;
};
