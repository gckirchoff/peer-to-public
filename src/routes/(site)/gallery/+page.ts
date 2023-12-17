import type { Gallery } from '$lib/types/gallery';

export const load = async ({ fetch }) => {
	const res = await fetch('/api/v1/gallery');
	const galleries = (await res.json()) as Gallery[];

	return {
		galleries,
	};
};
