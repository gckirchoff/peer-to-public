import { UsableType } from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import type { Usable } from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';

export type PostReqPostBody = {
	title: string;
	description: string;
	categories: string[];
	authors: string[];
	content: string;
	usables: { [id: string]: Usable };
	published: boolean;
	coverImage?: string;
};

export interface PatchReqPostBody extends PostReqPostBody {
	slug: string;
	date: string;
}

export type PostReqResponse = {
	status: 'success';
};

export interface GetPostTemplateParams {
	title: string;
	description: string;
	categories: string[];
	authors: string[];
	coverImage: string;
	published: boolean;
	content: string;
	publishDate?: string;
	update?: boolean;
}

export interface ComponentBuilder {
	buildComponent: () => string;
}

export const usableImports: Record<UsableType, string> = {
	[UsableType.RecipeCard]:
		"import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte'",
	[UsableType.PhotoGallery]: 'TODO', // ! TODO
};

export const defaultScript = `<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';
</script>`;

export const scriptContentMatcher = /<script>([\s\S]*?)<\/script>/;
export const hasDefaultScriptMatcher = /\/\/ usables/;
