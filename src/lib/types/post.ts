export default interface Post {
	title: string;
	date: string;
	description: string;
	categories: string[];
	authors?: string[];
	slug: string;
	published: boolean;
	coverImage: string;
	coverWidth?: number;
	coverHeight?: number;
	subtitle?: string;
	updated?: string;
}

export interface PostMetadata extends Post {
	slug: string;
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PostEditorMetaData = PartialBy<PostMetadata, 'coverImage' | 'slug' | 'date'>;

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
