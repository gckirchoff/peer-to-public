import type Post from '$lib/types/post.js';
import type { CountRes } from '../../api/posts/count/types.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const res = await fetch(`/api/posts/offset/0`);
	const posts = (await res.json()) as Post[];

	const count = await fetch(`/api/posts/count`);
	const { total } = (await count.json()) as CountRes;

	return {
		posts,
		total,
	};
};
