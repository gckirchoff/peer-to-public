<script lang="ts">
	import type { IngredientSection, Step } from '$lib/components/usables/RecipeCard/types';
	import RecipeCard from '$lib/components/usables/RecipeCard/RecipeCard.svelte';

	const ingredients: IngredientSection[] = [
		{
			title: 'Salmon',
			list: [
				{ quantity: 2.25, unit: 'teaspoons', item: 'yeast' },
				{ quantity: 1, item: 'pepper' },
				{ quantity: 0.5, item: 'red onion', note: ', sliced' },
				{ item: 'Extra Virgin Olive Oil' },
				{ quantity: 0.25, unit: 'cup', item: 'wheat flour' },
				{ quantity: 1, unit: 'pound', item: 'pound' },
			],
		},
		{
			title: 'Sauce',
			list: [
				{ quantity: 0.33, unit: 'cup', item: 'whole milk' },
				{ quantity: 2.25, unit: 'teaspoons', item: 'yeast' },
				{ quantity: 0.5, unit: 'cup', item: 'yogurt' },
			],
		},
	];

	const steps: Step[] = [
		{ emphasis: 'Prepare the sauce:', description: 'Whisk the milk, yeast, and yogurt in a bowl.' },
		'Prepare a sheet pan lined with a large piece of foil (should be large enough to fold over salmon). Brush the top of the foil with extra virgin olive oil.',
		{
			emphasis: 'Prepare the salmon:',
			description:
				'Now, pat salmon dry and season well on both sides with kosher salt. Place it on the foiled sheetpan. Top with lemon garlic sauce (make sure to spread the sauce evenly.)',
		},
		'Fold foil over the salmon (seam-side up). Bake for 15 to 20 minutes until salmon is almost completely cooked through at the thickest part (cooking time will vary based on the thickness of your fish. If your salmon is thinner, check several minutes early to ensure your salmon does not overcook. If your piece is very thick, 1 ½ or more inches, it may take a bit longer.)',
		{
			emphasis: 'Bake:',
			description:
				' Carefully remove from oven and open foil to uncover the top of the salmon. Place under the broiler briefly, about 3 minutes or so. Watch closely as it broils to make sure it doesn’t overcook and the garlic does not burn).',
		},
	];
</script>

<main>
	<RecipeCard
		img="/postImages/salmon-recipe/salmon.jpg"
		title="Mediterranean Baked Salmon"
		description="This Lemon Garlic Salmon Recipe makes tender, perfectly flaky baked salmon while lemon garlic sauce with olive oil hits all the right flavor notes. It's Mediterranean Diet friendly and gluten free."
		prepTime={15}
		cookTime={30}
		result={2}
		{ingredients}
		{steps}
	/>
</main>

<style>
	main {
		padding: var(--spacing-32);
	}
</style>
