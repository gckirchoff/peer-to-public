import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	redirect(302, `/tools/${params.slug}`);
};
