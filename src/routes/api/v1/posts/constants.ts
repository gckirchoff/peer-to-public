import { UsableType } from '../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import type { Usable } from '../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';

export type PostReqPostBody = {
	title: string;
	description: string;
	categories: string[];
	content: string;
	usables: { [id: string]: Usable };
	published: boolean;
	coverImage?: string;
};

export type PatchReqPostBody = PostReqPostBody & { slug: string; date: string };

export type PostReqResponse = {
	status: 'success';
};

export interface ComponentBuilder {
	buildComponent: () => string;
}

export const usableImports: Record<UsableType, string> = {
	[UsableType.RecipeCard]:
		"import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte'",
	[UsableType.PhotoGallery]: 'TODO', // ! TODO
};
