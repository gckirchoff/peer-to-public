<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { Variant } from '$lib/types/styles';
	import { H4 } from '../typography';

	export let value = '';
	export let variant: Variant = 'primary';
	/**
	 * miliseconds until snackbar hides
	 */
	export let duration = 5000;

	let timeoutId: number;
	$: {
		if (value) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				value = '';
			}, duration);
		}
	}

	$: style = `--background-color: var(--clr-${variant}-500); --color: var(--clr-text-on-${variant});`;
</script>

{#if value}
	<div class="error-text" {style} transition:fly={{ duration: 200, y: 5 }}>
		<H4>{value}</H4>
	</div>
{/if}

<style lang="scss">
	.error-text {
		position: fixed;
		z-index: 100;
		top: 5%;
		left: 50%;
		translate: -50% 0;
		display: inline-block;
		background-color: var(--background-color);
		color: var(--color);
		padding: var(--spacing-8) var(--spacing-16);
		:global(h4) {
			color: var(--clr-txt-neg);
		}
	}
</style>
