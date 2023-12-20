import { json } from '@sveltejs/kit';
import fetchPosts from '$lib/utils/fetchPosts';

export const GET = async (): Promise<Response> => {
	const posts = await fetchPosts({ limit: -1 });
	return json(posts);
};
