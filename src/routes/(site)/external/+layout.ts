import { redirect } from '@sveltejs/kit';

export const prerender = true;

export const load = async (req) => {
	console.log('params', req);
	const { pathname } = req.url;
	const slug = pathname.split('/').at(-1);
	redirect(301, `/tools/${slug}`);
};
