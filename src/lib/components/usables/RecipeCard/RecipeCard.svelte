<script lang="ts">
	import { H5, H6 } from '$lib/components/internal/typography';
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import H4 from '$lib/components/internal/typography/H4.svelte';
	import { ensureTargetIsArray } from '$lib/utils/logic';
	import type { Ingredients, Step } from './types';

	export let img: string;
	export let title: string;
	export let description = '';
	export let prepTime: number;
	export let cookTime: number;
	export let result: string;
	export let ingredients: Ingredients | Ingredients[];
	export let steps: Step[];

	const totalTime = prepTime + cookTime;
	const allFoodItems = ensureTargetIsArray(ingredients);

	let scale = 1;
</script>

<article class="card">
	<div class="heading">
		<figure>
			<img src="/images/postImages/{img}" alt={title} />
		</figure>
		<div class="recipe-info-container">
			<H5><strong>{title}</strong></H5>
			<div class="info-items">
				<Body1><strong>Prep Time:</strong> {prepTime}</Body1>
				<Body1><strong>Cook Time:</strong> {cookTime}</Body1>
			</div>
			<div class="info-items">
				<Body1><strong>Total Time:</strong> {totalTime}</Body1>
				<Body1><strong>Yield:</strong> {result}</Body1>
			</div>
			<hr />
			{#if description}
				<H6>Description</H6>
				<Body1>{description}</Body1>
			{/if}
		</div>
	</div>

	<H6>Ingredients</H6>

	<label class="scale">
		Scale:
		<input bind:value={scale} type="number" />
	</label>

	<ul class="all-ingredients-container">
		{#each allFoodItems as { title = '', list }}
			<li>
				<ul>
					<H5>{title}</H5>
					{#each list as { quantity, unit = '', item }}
						<li>
							<input id={item} type="checkbox" />
							<label for={item}>{quantity ? quantity * scale : ''} {unit} {item}</label>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
	<br />
	<ol>
		{#each steps as step}
			<li>
				<Body1>
					{#if typeof step === 'string'}
						{step}
					{:else}
						<strong>{step.emphasis}</strong>{step.description}
					{/if}
				</Body1>
			</li>
		{/each}
	</ol>
</article>

<style lang="scss">
	.card {
		background-color: var(--clr-surface-300);
		padding: var(--spacing-64);
		border-radius: var(--rounded-4);
		max-width: 100rem;

		.heading {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
			gap: var(--spacing-32);

			figure {
				height: 100%;

				img {
					height: 100%;
					object-fit: cover;
				}
			}

			.recipe-info-container {
				display: flex;
				flex-direction: column;
				gap: var(--spacing-4);

				.info-items {
					display: flex;
					flex-wrap: wrap;
					column-gap: var(--spacing-16);
				}
			}
		}

		.scale {
			display: flex;
			gap: var(--spacing-8);

			input {
				color: black;
			}
		}

		.all-ingredients-container {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
			gap: var(--spacing-16);
		}
	}

	ul {
		list-style: none;
	}

	input[type='checkbox'],
	label {
		cursor: pointer;
		user-select: none;
	}

	li::before {
		content: '';
		position: absolute;
	}
</style>
