<script lang="ts">
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import H4 from '$lib/components/internal/typography/H4.svelte';
	import type { Ingredient } from './types';

	export let title: string;
	export let ingredients: Ingredient[];
	export let steps: string[];

	let scale = 1;
</script>

<article class="card">
	<H4>{title}</H4>

	<label class="scale">
		Scale:
		<input bind:value={scale} type="number" />
	</label>

	<ul>
		{#each ingredients as { item, quantity }}
			<li>
				<input id={item} type="checkbox" />
				<label for={item}>{quantity ? quantity * scale : ''} {item}</label>
			</li>
		{/each}
	</ul>
	<br />
	<ol>
		{#each steps as step}
			<li>
				<Body1>{step}</Body1>
			</li>
		{/each}
	</ol>
</article>

<style lang="scss">
	.card {
		background-color: var(--clr-surface-300);
		padding: var(--spacing-64);
		border-radius: var(--rounded-20);
		width: max-content;
	}
	.scale {
		display: flex;
		gap: var(--spacing-8);

		input {
			color: black;
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
