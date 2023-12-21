<script lang="ts">
	import { ensureTargetIsArray } from '$lib/utils/logic';
	import type { IngredientSection, Step } from './types';
	import Ingredients from './Ingredients/Ingredients.svelte';
	import Heading from './Heading/Heading.svelte';
	import Instructions from './Instructions/Instructions.svelte';

	export let img: string;
	export let title: string;
	export let description = '';
	export let prepTime: number;
	export let cookTime: number;
	export let result: number;
	export let ingredients: IngredientSection | IngredientSection[];
	export let steps: Step[];

	const allFoodItems = ensureTargetIsArray(ingredients);
</script>

<article class="card">
	<Heading {img} {title} {description} {prepTime} {cookTime} {result} />
	<div class="recipe-instructions">
		<Ingredients {allFoodItems} />
		<Instructions {steps} />
	</div>
</article>

<style lang="scss">
	.card {
		grid-column: content-start;
		--image-dimension: 25rem;
		border: 1px solid var(--clr-primary-500);
		background-color: var(--clr-surface-300);
		border-radius: var(--rounded-4);
		margin-top: calc((var(--image-dimension) * 0.5) + 3rem);
		margin-bottom: var(--spacing-24);
		position: relative;

		.recipe-instructions {
			padding: var(--spacing-32) var(--spacing-64);
			position: relative;
		}
	}
</style>
