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

	let newImage: FileList;
	let title = '';
	let description = '';
	let ingredientSections: IngredientSection[] = [];
	let steps: Step[] = [];
	let prepTime: number;
	let cookTime: number;
	let servings: number;

	let newIngredientsSection = '';
	let newStep = '';

	const createRecipeCard = async () => {
		const file = newImage?.[0];
		if (!file) {
			return;
		}

		const formData = new FormData();
		formData.append('file', file, file.name);
		await fetch('/api/v1/temp-images', {
			method: 'POST',
			body: formData,
		});

		const id = `${slugify(title)}-${nanoid()}`;

		handleSubmit({
			type: UsableType.RecipeCard,
			id,
			title,
			img: `/temp/${file.name}`,
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

	const addStep = () => {
		steps = [...steps, newStep];
		newStep = '';
	};
</script>

<div class="container">
	<input type="file" bind:files={newImage} />
	{#if newImage?.[0]}
		<img src={URL.createObjectURL(newImage?.[0])} alt={newImage?.[0].name} />
	{/if}
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
	<form on:submit={addStep}>
		<textarea placeholder="Add Step" bind:value={newStep} />
		<Button type="submit">Add Step</Button>
	</form>
	<ol class="steps-list">
		{#each steps as step}
			<li>
				{step}
			</li>
		{/each}
	</ol>

	<Button on:click={createRecipeCard}>Add Recipe Card</Button>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}

	.steps-list {
		padding-left: var(--spacing-24);
	}
</style>
