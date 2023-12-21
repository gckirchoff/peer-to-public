<script lang="ts">
	import { H5, H6 } from '$lib/components/internal/typography';
	import type { IngredientSection } from '../types';
	import IngredientItem from './IngredientItem/IngredientItem.svelte';

	export let allFoodItems: IngredientSection[];

	let scale = 1;
</script>

<div class="top-row">
	<H5>Ingredients</H5>

	<label class="scale">
		Scale:
		<input bind:value={scale} type="number" />
	</label>
</div>

<ul class="all-ingredients-container">
	{#each allFoodItems as { title, list }}
		<ul>
			<H6 style="margin-bottom: var(--spacing-8);">{title}</H6>
			{#each list as ingredient}
				<IngredientItem {ingredient} {scale} />
			{/each}
		</ul>
	{/each}
</ul>

<style lang="scss">
	.top-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-16);

		.scale {
			display: flex;
			gap: var(--spacing-8);

			input {
				color: black;
				width: 60%;
			}
		}
	}

	.all-ingredients-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: var(--spacing-16);
		padding: 0 0 var(--spacing-32) 0;
	}

	ul {
		list-style: none;
	}
</style>
