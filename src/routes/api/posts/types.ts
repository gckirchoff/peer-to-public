import type { Usable } from '../../(site)/dev/admin/create-post/UsablesModal/constants';

export type PostReqPostBody = {
	title: string;
	description: string;
	categories: string[];
	content: string;
	usables: { [id: string]: Usable };
	coverImage?: string;
	published?: boolean;
};

export type PostReqResponse = {
	status: 'success';
};
