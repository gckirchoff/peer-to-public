<script lang="ts">
	import type { Ingredient } from '../../types';
	import { nanoid } from 'nanoid';

	export let ingredient: Ingredient;
	export let scale: number;

	$: ({ quantity, unit = '', item, note } = ingredient);
	$: ingredientId = `${item}-${nanoid()}`;
</script>

<li class="ingredient-item">
	<input id={ingredientId} type="checkbox" class="ingredient-checkbox" />
	<label for={ingredientId} class="ingredient-label">
		{quantity ? quantity * scale : ''}
		{unit}
		{item}
		{#if note}
			<span class="recipe-note">{note}</span>
		{/if}
	</label>
	<span></span>
</li>

<style lang="scss">
	.ingredient-item {
		position: relative;
		margin-bottom: var(--spacing-8);

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
				color: var(--clr-primary-700);
				font-size: 1.7rem;
			}
		}
	}
</style>
