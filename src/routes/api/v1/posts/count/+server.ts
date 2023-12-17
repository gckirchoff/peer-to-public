import { json } from '@sveltejs/kit';

import fetchPosts from '$lib/utils/fetchPosts.js';

export const GET = async (): Promise<Response> => {
	const posts = await fetchPosts({ limit: -1 });
	const total = posts.length;

	return json({ total });
};
