import { json } from '@sveltejs/kit';

import { fetchGalleries } from '$lib/utils/fetchGalleries';

export const GET = async (): Promise<Response> => {
	const galleries = fetchGalleries();
	return json(galleries);
};
