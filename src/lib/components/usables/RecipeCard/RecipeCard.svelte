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
						<li>
							<input id={item} type="checkbox" />
							<label for={item}>
								{quantity ? quantity * scale : ''}
								{unit}
								{item}
								{note && ` ${note}`}
							</label>
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
		border: 1px solid var(--clr-primary-500);
		background-color: var(--clr-surface-300);
		border-radius: var(--rounded-4);
		max-width: 100rem;
		margin-top: 160px;

		position: relative;

		.heading {
			background-color: var(--clr-primary-500);
			color: var(--clr-surface-100);
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
			gap: var(--spacing-32);

			padding: 130px var(--spacing-64) var(--spacing-16) var(--spacing-64);

			figure {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				height: 250px;
				width: 250px;
				overflow: hidden;
				border-radius: 50%;
				border: 8px solid var(--clr-primary-500);

				img {
					object-fit: cover;
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
			}
			ul {
				list-style: none;
			}

			label {
				cursor: pointer;
				user-select: none;
			}
			input[type='checkbox'] {
				cursor: pointer;
				user-select: none;
				display: none;
			}

			ul li::before {
				content: '';
				display: inline-block;
				width: 20px;
				height: 20px;
				border: 2px solid #007bff;
				background-color: white;
				border-radius: 3px;
				margin-right: 10px;
				vertical-align: middle;
			}

			.instructions {
				font-size: 1rem;
				border-top: 1px solid var(--clr-primary-500);
				padding-top: var(--spacing-32);
			}
		}
	}
</style>
