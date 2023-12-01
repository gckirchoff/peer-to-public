<script lang="ts">
	import { H5 } from '$lib/components/internal/typography';
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import { ensureTargetIsArray } from '$lib/utils/logic';
	import type { IngredientSection, Step } from './types';
	import Ingredients from './Ingredients/Ingredients.svelte';

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
	<div class="heading">
		<figure>
			<img src="/images{img}" alt={title} />
		</figure>
		<div class="recipe-info-container">
			<H5 style="color: var(--clr-surface-100);"><strong>{title}</strong></H5>
			<div class="info-items">
				<Body1 style="color: var(--clr-surface-100); margin-bottom: var(--spacing-16);"
					><strong>Prep Time:</strong> {prepTime}</Body1
				>
				<Body1 style="color: var(--clr-surface-100);  margin-bottom: var(--spacing-16);"
					><strong>Cook Time:</strong> {cookTime}</Body1
				>
				<Body1 style="color: var(--clr-surface-100); margin-bottom: var(--spacing-16);"
					><strong>Total Time:</strong> {totalTime}</Body1
				>
				<Body1 style="color: var(--clr-surface-100); margin-bottom: var(--spacing-16);"
					><strong>Yield:</strong> {result}</Body1
				>
			</div>
			{#if description}
				<div class="description-container">
					<Body1 style="color: var(--clr-surface-100);">{description}</Body1>
				</div>
			{/if}
		</div>
	</div>
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

		.heading {
			background-color: var(--clr-primary-500);
			color: var(--clr-surface-100);
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
			gap: var(--spacing-32);

			padding: calc((var(--image-dimension) * 0.5) + 1rem) var(--spacing-64) var(--spacing-16)
				var(--spacing-64);

			figure {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				height: var(--image-dimension);
				width: var(--image-dimension);
				overflow: hidden;
				border-radius: 50%;
				border: 8px solid var(--clr-primary-500);

				img {
					object-fit: cover;
					width: 100%;
					height: 100%;
				}
			}

			.recipe-info-container {
				text-align: center;
				display: flex;
				flex-direction: column;
				gap: var(--spacing-4);

				.description-container {
					padding-top: var(--spacing-32);
					border-top: 1px solid var(--clr-surface-500);
				}

				.info-items {
					display: flex;
					flex-wrap: wrap;
					column-gap: var(--spacing-16);
					justify-content: center;
				}
			}
		}

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
