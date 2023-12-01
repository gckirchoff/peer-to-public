<script lang="ts">
	import { H5 } from '$lib/components/internal/typography';
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import { ensureTargetIsArray } from '$lib/utils/logic';
	import type { IngredientSection, Step } from './types';

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

	let scale = 1;
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
		<H5>Ingredients</H5>

		<label class="scale">
			Scale:
			<input bind:value={scale} type="number" />
		</label>

		<ul class="all-ingredients-container">
			{#each allFoodItems as { title, list }}
				<ul>
					<H5 style="font-size: 2rem;">{title}</H5>
					{#each list as { quantity, unit = '', item, note }}
						<li class="ingredient-item">
							<input id={item} type="checkbox" class="ingredient-checkbox" />
							<label for={item} class="ingredient-label">
								{quantity ? quantity * scale : ''}
								{unit}
								{item}
								{#if note}
									<span class="recipe-note">{note}</span>
								{/if}
							</label>
							<span></span>
						</li>
					{/each}
				</ul>
			{/each}
		</ul>
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

			.scale {
				position: absolute;
				top: 2rem;
				right: 1rem;
				display: flex;
				gap: var(--spacing-8);

				input {
					color: black;
					width: 60%;
				}
			}

			.all-ingredients-container {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
				gap: var(--spacing-16);
				padding: 0 0 var(--spacing-32) 0;

				label {
					font-size: 1.9rem;
				}

				.recipe-note {
					color: var(--clr-primary-400);
					font-size: 1.7rem;
				}
			}
			ul {
				list-style: none;
			}

			.ingredient-item {
				position: relative;
			}

			label {
				cursor: pointer;
				user-select: none;
			}
			.ingredient-checkbox {
				cursor: pointer;
				user-select: none;
				display: none;
			}

			.ingredient-label::before {
				content: '';
				display: inline-block;
				width: 2rem;
				height: 2rem;
				border: 2px solid var(--clr-primary-500);
				background-color: white;
				border-radius: var(--rounded-4);
				margin-right: 1rem;
				vertical-align: middle;
			}

			.ingredient-checkbox:checked + .ingredient-label::before {
				background-color: var(--clr-primary-500);
			}

			.ingredient-label::after {
				position: absolute;
				top: .2rem;
				left: .3rem;
				content: '✓';
				color: var(--clr-txt-neg);
				display: none;
			}

			.ingredient-checkbox:checked + .ingredient-label::after {
				display: block;
			}

			.instructions {
				font-size: 1rem;
				border-top: 1px solid var(--clr-primary-500);
				padding-top: var(--spacing-32);
			}
		}
	}
</style>
