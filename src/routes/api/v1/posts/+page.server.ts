import { redirect } from '@sveltejs/kit';

export const load = (): RequestRedirect => {
	redirect(301, '/api/v1/posts/all');
};
