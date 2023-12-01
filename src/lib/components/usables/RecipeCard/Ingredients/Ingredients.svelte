<script lang="ts">
	import { H5 } from '$lib/components/internal/typography';
	import type { IngredientSection } from '../types';

	export let allFoodItems: IngredientSection[];

	let scale = 1;
</script>

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

<style lang="scss">
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

		.ingredient-item {
			position: relative;

			.ingredient-label {
				font-size: 1.9rem;
				cursor: pointer;
				user-select: none;

				&::before {
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

				&::after {
					position: absolute;
					top: 0.2rem;
					left: 0.3rem;
					content: '✓';
					color: var(--clr-txt-neg);
					display: none;
				}

				.recipe-note {
					color: var(--clr-primary-400);
					font-size: 1.7rem;
				}
			}
		}

		.ingredient-checkbox {
			cursor: pointer;
			user-select: none;
			display: none;

			&:checked + .ingredient-label {
				&::before {
					background-color: var(--clr-primary-500);
				}

				&::after {
					display: block;
				}
			}
		}
	}

	ul {
		list-style: none;
	}
</style>
