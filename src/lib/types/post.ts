export default interface Post {
	title: string;
	date: string;
	description: string;
	categories: string[];
	slug: string;
	published: boolean;
	coverImage: string;
	coverWidth?: number;
	coverHeight?: number;
	subtitle?: string;
	updated?: string;
}

export type Frontmatter = {
	title: string;
	description: string;
	categories: string;
	date: string;
	updated?: string;
	published: string;
	coverImage: string;
};

export type Tag = {
	title: string;
	slug: string;
};
