<script>
	import Swatch from './Swatch.svelte';
	import { shades } from './constants';
</script>

<main>
	<div />
	{#each shades as shade}
		<h3 style="text-align: center;">{shade}</h3>
	{/each}
	<Swatch color="primary" />
	<Swatch color="secondary" />
	<Swatch color="tertiary" />
	<Swatch color="success" />
	<Swatch color="warning" />
	<Swatch color="error" />
	<Swatch color="surface" />
</main>

<style lang="scss">
	main {
		height: 100%;
		padding: var(--spacing-32);
		display: grid;
		grid-template-columns: repeat(12, 1fr);
        gap: var(--spacing-16);
	}
</style>
