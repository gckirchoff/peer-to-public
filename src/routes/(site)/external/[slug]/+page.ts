import { redirect } from '@sveltejs/kit';

export const prerender = true;

export const load = async ({ params }) => {
	redirect(302, `/tools/${params.slug}`);
};
