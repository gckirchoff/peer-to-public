import type Post from '$lib/types/post';
import { escapeString } from '$lib/utils/logic';
import { UsableType } from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import type {
	Usable,
	RecipeCard,
	PhotoGallery,
} from '../../../(site)/dev/admin/post/subcomponents/UsablesModal/constants';
import type {
	ComponentBuilder,
	DeriveDatesArgs,
	DeriveDatesRet,
	GetPostTemplateParams,
} from './constants';
import { defaultScript, scriptContentMatcher, hasDefaultScriptMatcher } from './constants';

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

export const parseScripts = (content: string): string => {
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

const frontMatterArray = (arr: string[]): string =>
	`[ ${arr.map((item) => `"${item}"`).join(', ')} ]`;

const deriveDates = ({ currentPostMeta, published }: DeriveDatesArgs): DeriveDatesRet => {
	const now = new Date().toString();
	const freshPostDates = {
		publishedDate: now,
		updateDate: null,
	};

	const creatingNewPost = !currentPostMeta;
	if (creatingNewPost) {
		return freshPostDates;
	}

	const switchingToPublished = published && !currentPostMeta.published;
	if (switchingToPublished) {
		return freshPostDates;
	}

	return {
		publishedDate: currentPostMeta.date,
		updateDate: now,
	};
};

export const getPostTemplate = ({
	title,
	description,
	categories,
	authors,
	coverImage,
	published,
	content,
	currentPostMeta,
}: GetPostTemplateParams) => {
	const { publishedDate, updateDate } = deriveDates({ currentPostMeta, published });
	const parsedContent = parseScripts(content);

	const postTemplate = `---
title: "${escapeString(title)}"
description: "${escapeString(description)}"
categories: ${frontMatterArray(categories)}
authors: ${frontMatterArray(authors)}
coverImage: "${coverImage}"
date: '${publishedDate}'
published: ${published}
${updateDate ? `updated: '${updateDate}'` : ''}
---
${parsedContent}`;

	return postTemplate;
};
