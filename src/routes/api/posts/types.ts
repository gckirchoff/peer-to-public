export type PostReqPostBody = {
	title: string;
	description: string;
	categories: string[];
	content: string;
	coverImage?: string;
	published?: boolean;
};

export type PostReqResponse = {
	status: 'success';
};
