<script lang="ts">
	import { H5 } from '$lib/components/internal/typography';
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import { ensureTargetIsArray } from '$lib/utils/logic';
	import type { IngredientSection, Step } from './types';
	import Ingredients from './Ingredients/Ingredients.svelte';
	import Heading from './Heading/Heading.svelte';

	export let img: string;
	export let title: string;
	export let description = '';
	export let prepTime: number;
	export let cookTime: number;
	export let result: string;
	export let ingredients: IngredientSection | IngredientSection[];
	export let steps: Step[];

	const totalTime = prepTime + cookTime;
	const allFoodItems = ensureTargetIsArray(ingredients);
</script>

<article class="card">
	<Heading {img} {title} {description} {prepTime} {cookTime} {result} />
	<div class="recipe-instructions">
		<Ingredients {allFoodItems} />
		<div class="instructions">
			<h5>Instructions</h5>
			<ol>
				{#each steps as step}
					<li style="font-size: 2rem;">
						<Body1 style="font-size: 2rem; line-height: 2.6rem; margin-bottom: var(--spacing-16)">
							{#if typeof step === 'string'}
								{step}
							{:else}
								<strong>{step.emphasis}</strong>{step.description}
							{/if}
						</Body1>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</article>

<style lang="scss">
	.card {
		--image-dimension: 25rem;
		border: 1px solid var(--clr-primary-500);
		background-color: var(--clr-surface-300);
		border-radius: var(--rounded-4);
		max-width: 100rem;
		margin-top: calc((var(--image-dimension) * 0.5) + 3rem);
		position: relative;

		.recipe-instructions {
			padding: var(--spacing-32) var(--spacing-64);
			position: relative;

			.instructions {
				font-size: 1rem;
				border-top: 1px solid var(--clr-primary-500);
				padding-top: var(--spacing-32);
			}
		}
	}
</style>
