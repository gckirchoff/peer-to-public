import { prettyDate } from '$lib/utils/logic';
import { UsableType } from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import type {
	Usable,
	RecipeCard,
	PhotoGallery,
} from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import type { ComponentBuilder } from './constants';

export class UsablesFactory {
	createUsableBuilder = (usable: Usable): ComponentBuilder => {
		const { type } = usable;
		switch (type) {
			case UsableType.RecipeCard:
				return new RecipeCardUsable(usable);
			case UsableType.PhotoGallery:
				return new PhotoGalleryUsable(usable);
			default:
				throw new Error(`Unsupported type: ${type}`);
		}
	};
}

class RecipeCardUsable implements ComponentBuilder {
	recipeCard: RecipeCard;

	constructor(recipeCard: RecipeCard) {
		this.recipeCard = recipeCard;
	}

	buildComponent = (): string => {
		const { title, description, prepTime, cookTime, servings, ingredients, steps, img } =
			this.recipeCard;
		const recipeComponent = `<RecipeCard
    img="${img}"
    title="${title}"
    description="${description}"
    prepTime="{${prepTime}}"
    cookTime="{${cookTime}}"
    result="{${servings}}"
    ingredients="{${JSON.stringify(ingredients)}}"
    steps="{${JSON.stringify(steps)}}"
/>`;

		return recipeComponent;
	};
}

class PhotoGalleryUsable implements ComponentBuilder {
	photoGallery: PhotoGallery;

	constructor(photoGallery: PhotoGallery) {
		this.photoGallery = photoGallery;
	}

	buildComponent = (): string => {
		const galleryComponent = 'TODO implement this'; // TODO

		return galleryComponent;
	};
}

interface GetPostTemplateParams {
	title: string;
	description: string;
	categories: string[];
	coverImage: string;
	published: boolean;
	content: string;
	publishDate?: string;
	update?: boolean;
}

const defaultScript = `<script> // usables
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';
</script>`;

const scriptContentMatcher = /<script>([\s\S]*?)<\/script>/;
const hasDefaultScriptMatcher = /\/\/ usables/;

const parseScript = (content: string): string => {
	const extractedScriptContent = content.match(scriptContentMatcher)?.[1];
	if (!extractedScriptContent) {
		return `${defaultScript}
${content}`;
	}

	const hasDefaultScript = hasDefaultScriptMatcher.test(content);
	if (!hasDefaultScript) {
		const combinedScript = defaultScript.replace(
			'</script>',
			`${extractedScriptContent}
</script>`,
		);
		const contentAfterOriginalScript = content.split('</script>')?.[1] ?? content;
		return `${combinedScript}
${contentAfterOriginalScript}`;
	}

	return content;
};

export const getPostTemplate = ({
	title,
	description,
	categories,
	coverImage,
	published,
	content,
	publishDate,
	update = false,
}: GetPostTemplateParams) => {
	const publishedDate = publishDate ?? prettyDate();
	const updateDate = update ? prettyDate() : null;
	const parsedContent = parseScript(content);

	const postTemplate = `---
title: "${title}"
description: "${description}"
categories: [ ${categories.map((category) => `"${category}"`).join(', ')} ]
coverImage: "${coverImage}"
date: '${publishedDate}'
published: ${published}
${update ? `updated: '${updateDate}'` : ''}
---
${parsedContent}`;

	return postTemplate;
};
