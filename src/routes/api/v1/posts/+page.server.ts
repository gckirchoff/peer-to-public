import { redirect } from '@sveltejs/kit';

export const load = (): RequestRedirect => {
	redirect(302, '/api/v1/posts/all');
};
