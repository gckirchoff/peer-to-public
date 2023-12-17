import { json } from '@sveltejs/kit';

import { fetchGallery } from '$lib/utils/fetchGalleries.js';

export const GET = async ({ params }): Promise<Response> => {
	const galleryUrlParam = params.gallery;
	const gallery = fetchGallery(galleryUrlParam);
	return json(gallery);
};
