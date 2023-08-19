import { json } from '@sveltejs/kit';

import { postsPerPage } from '$lib/config.js';
import fetchPosts from '$lib/utils/fetchPosts.js';
import type PostsEndpointOptions from '$lib/types/PostsEndpointOptions.js';

export const GET = async ({ params, url }): Promise<Response> => {
	const options: PostsEndpointOptions = {
		offset: postsPerPage,
	};

	if (params.offset) {
		options.offset = Number(params.offset);
	}

	const limit = url.searchParams.get('limit');
	if (limit) {
		options.limit = Number(limit);
	}

	const posts = await fetchPosts({ ...options });
	return json(posts);
};
