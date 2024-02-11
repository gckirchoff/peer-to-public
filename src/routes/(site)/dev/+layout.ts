import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const load = async () => {
	if (!dev) {
		redirect(301, '/');
	}
};
