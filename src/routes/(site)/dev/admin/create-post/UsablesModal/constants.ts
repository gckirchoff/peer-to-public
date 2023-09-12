import type { IngredientSection, Step } from '$lib/components/usables/RecipeCard/types';

export enum UsableType {
	RecipeCard = 'recipe-card',
	PhotoGallery = 'photo-gallery',
}

interface BaseUsable {
	id: string;
	type: UsableType;
}

export interface RecipeCard extends BaseUsable {
	type: UsableType.RecipeCard;
	title: string;
	img: string;
	description: string;
	prepTime: number;
	cookTime: number;
	servings: number;
	ingredients: IngredientSection | IngredientSection[];
	steps: Step[];
}

export interface PhotoGallery extends BaseUsable {
	type: UsableType.PhotoGallery;
	columns: number;
	images: string[];
}

export type Usable = RecipeCard | PhotoGallery;
