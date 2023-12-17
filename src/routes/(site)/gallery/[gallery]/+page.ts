import { error } from '@sveltejs/kit';

import type { Gallery } from '$lib/types/gallery.js';

export const load = async ({ params, fetch }) => {
	const res = await fetch(`/api/v1/gallery/${params.gallery}`);
	const gallery = (await res.json()) as Gallery;

	if (!gallery) {
		throw error(404, `Could not find ${params.gallery}`);
	}

	return {
		gallery,
	};
};
