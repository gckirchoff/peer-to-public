<script lang="ts">
	import { nanoid } from 'nanoid';

	import { H4, H5 } from '$lib/components/internal/typography';
	import { UsableType, type Usable } from '../constants';
	import type { Ingredients, Step } from '$lib/components/usables/RecipeCard/types';

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
		const id = nanoid();
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
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}
</style>
