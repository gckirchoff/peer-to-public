<script lang="ts">
	import { nanoid } from 'nanoid';

	import { H4, H5 } from '$lib/components/internal/typography';
	import { slugify } from '$lib/utils/logic';
	import type { Ingredients, Step } from '$lib/components/usables/RecipeCard/types';
	import { UsableType, type Usable } from '../constants';

	export let handleSubmit: (usable: Usable) => void;

	let title = '';
	let img = '';
	let description = '';
	let ingredients: Ingredients[] = [];
	let steps: Step[] = [];
	let prepTime: number;
	let cookTime: number;
	let servings: number;

	const createRecipeCard = () => {
		const id = `${slugify(title)}-${nanoid()}`;
		handleSubmit({
			type: UsableType.RecipeCard,
			id,
			title,
			img,
			description,
			ingredients,
			steps,
			prepTime,
			cookTime,
			servings,
		});
	};
</script>

<div class="container">
	<input placeholder="Title" type="text" bind:value={title} />
	<input placeholder="Description" type="text" bind:value={description} />
	<input placeholder="Prep Time (mins)" type="number" bind:value={prepTime} />
	<input placeholder="Cook Time (mins)" type="number" bind:value={cookTime} />
	<input placeholder="Servings" type="number" bind:value={servings} />
	<H5>Ingredients:</H5>
	<H5>Steps:</H5>
	<button on:click={createRecipeCard}>Add Recipe Card</button>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}
	button {
		background-color: var(--clr-primary-300);
		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);

		&:hover {
			background-color: var(--clr-primary-400);
		}
	}
</style>
