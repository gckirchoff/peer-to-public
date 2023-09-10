import { prettyDate } from '$lib/utils/logic';
import { UsableType } from '../../(site)/dev/admin/create-post/UsablesModal/constants';
import type {
	Usable,
	RecipeCard,
	PhotoGallery,
} from '../../(site)/dev/admin/create-post/UsablesModal/constants';
import type { UsableComponent } from './constants';

export class UsablesFactory {
	private usable: Usable;

	constructor(usable: Usable) {
		this.usable = usable;
	}

	createUsable = (): UsableComponent => {
		const { type } = this.usable;
		switch (type) {
			case UsableType.RecipeCard:
				return new RecipeCardUsable(this.usable);
			case UsableType.PhotoGallery:
				return new PhotoGalleryUsable(this.usable);
			default:
				throw new Error(`Unsupported type: ${type}`);
		}
	};
}

class RecipeCardUsable implements UsableComponent {
	recipeCard: RecipeCard;

	constructor(recipeCard: RecipeCard) {
		this.recipeCard = recipeCard;
	}

	swapOut = (dummyComponent: RegExp, post: string): string => {
		const { title, description, prepTime, cookTime, servings, ingredients, steps } =
			this.recipeCard;
		const recipeComponent = `<RecipeCard
    img="markdown-tutorial/irish-soda-bread.jpg"
    title="${title}"
    description="${description}"
    prepTime="{${prepTime}}"
    cookTime="{${cookTime}}"
    result="{${servings}}"
    ingredients="{[]}"
    steps="{[]}"
/>`;

		return post.replace(dummyComponent, recipeComponent);
	};
}

class PhotoGalleryUsable implements UsableComponent {
	photoGallery: PhotoGallery;

	constructor(photoGallery: PhotoGallery) {
		this.photoGallery = photoGallery;
	}

	swapOut = (dummyComponent: RegExp, post: string): string => {
		const galleryComponent = 'TODO implement this'; // TODO

		return post.replace(dummyComponent, galleryComponent);
	};
}

interface GetPostTemplateParams {
	title: string;
	description: string;
	categories: string[];
	coverImage: string;
	published: boolean;
	content: string;
}

export const getPostTemplate = ({
	title,
	description,
	categories,
	coverImage,
	published,
	content,
}: GetPostTemplateParams) => {
	const publishedDate = prettyDate();

	const postTemplate = `---
title: "${title}"
description: "${description}"
categories:
${categories.map((category) => `  - "${category}"\r`).join('')}
coverImage: "${coverImage}"
date: '${publishedDate}'
published: ${published}
---
<script> // usables

</script>

${content}`;

	return postTemplate;
};
