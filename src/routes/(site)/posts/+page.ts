import type Post from '$lib/types/post.js';
import type { CountRes } from '../../api/v1/posts/count/types.js';

export const prerender = true;

export const load = async ({ fetch }) => {
	const res = await fetch(`/api/v1/posts/offset/0`);
	const posts = (await res.json()) as Post[];

	const count = await fetch(`/api/v1/posts/count`);
	const { total } = (await count.json()) as CountRes;

	return {
		posts,
		total,
	};
};
