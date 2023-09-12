<script lang="ts">
	import { nanoid } from 'nanoid';

	import { H4, H5 } from '$lib/components/internal/typography';
	import { slugify } from '$lib/utils/logic';
	import type {
		Ingredient,
		IngredientSection,
		Step,
	} from '$lib/components/usables/RecipeCard/types';
	import { UsableType, type Usable } from '../constants';
	import IngredientsList from './IngredientsList/IngredientsList.svelte';
	import Button from '$lib/components/internal/Button/Button.svelte';

	export let handleSubmit: (usable: Usable) => void;

	let title = '';
	let img = '';
	let description = '';
	let ingredientSections: IngredientSection[] = [];
	let steps: Step[] = [];
	let prepTime: number;
	let cookTime: number;
	let servings: number;

	let newIngredientsSection = '';

	const createRecipeCard = () => {
		const id = `${slugify(title)}-${nanoid()}`;
		handleSubmit({
			type: UsableType.RecipeCard,
			id,
			title,
			img,
			description,
			ingredients: ingredientSections,
			steps,
			prepTime,
			cookTime,
			servings,
		});
	};

	const addIngredientsSection = () => {
		if (!newIngredientsSection) {
			return;
		}
		ingredientSections = [...ingredientSections, { title: newIngredientsSection, list: [] }];
		newIngredientsSection = '';
	};

	const addIngredient = (section: string, newIngredient: Ingredient) => {
		ingredientSections = ingredientSections.map((ingredientSection) => {
			if (ingredientSection.title !== section) {
				return ingredientSection;
			}
			return {
				...ingredientSection,
				list: [...ingredientSection.list, newIngredient],
			};
		});
	};
</script>

<div class="container">
	<input placeholder="Title" type="text" bind:value={title} />
	<input placeholder="Description" type="text" bind:value={description} />
	<input placeholder="Prep Time (mins)" type="number" bind:value={prepTime} />
	<input placeholder="Cook Time (mins)" type="number" bind:value={cookTime} />
	<input placeholder="Servings" type="number" bind:value={servings} />
	<form on:submit={addIngredientsSection}>
		<input placeholder="Ingredients Section" bind:value={newIngredientsSection} />
		<Button type="submit">Add Ingredients Section</Button>
	</form>
	{#each ingredientSections as ingredientsSection}
		<IngredientsList {ingredientsSection} onSubmit={addIngredient} />
	{/each}
	<H5>Steps:</H5>
	<Button on:click={createRecipeCard}>Add Recipe Card</Button>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}
</style>
