import type { Ingredients, Step } from '$lib/components/usables/RecipeCard/types';

export enum UsableType {
	RecipeCard = 'recipe-card',
	PhotoGallery = 'photo-gallery',
}

interface BaseUsable {
	id: string;
	type: UsableType;
}

interface RecipeCard extends BaseUsable {
	type: UsableType.RecipeCard;
	title: string;
	img: string;
	description: string;
	prepTime: number;
	cookTime: number;
	servings: number;
	ingredients: Ingredients | Ingredients[];
	steps: Step[];
}

interface PhotoGallery extends BaseUsable {
	type: UsableType.PhotoGallery;
	columns: number;
	images: string[];
}

export type Usable = RecipeCard | PhotoGallery;
