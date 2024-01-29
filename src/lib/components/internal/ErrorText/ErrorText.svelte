<script lang="ts">
	import { fly } from 'svelte/transition';
	import { H4 } from '../typography';

	export let value = '';
	export let duration = 5000;

	$: setTimeout(() => {
		value = '';
	}, duration);
</script>

{#if value}
	<span class="error-text" transition:fly={{ duration: 200, y: 5 }}>
		<H4>{value}</H4>
	</span>
{/if}

<style lang="scss">
	.error-text {
		position: absolute;
		top: 10%;
		left: 50%;
		translate: -50% 0;
		display: inline-block;
		background-color: var(--clr-error-500);
		padding: var(--spacing-8) var(--spacing-16);
		:global(h4) {
			color: var(--clr-txt-neg);
		}
	}
</style>
