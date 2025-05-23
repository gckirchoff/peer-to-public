<script lang="ts">
	import IfrDistributions from './IfrDistributions/IfrDistributions.svelte';
	import PopulationForecast from './PopulationForecast/PopulationForecast.svelte';
	import IfrComparisons from './IfrComparisons/IfrComparisons.svelte';

	let medianIfr = $state(0.002);
	let sigma = $state(0.5);
	let testSigma = $state(0.5);
	let showAltSigmaForecast = $state(false);
</script>

<div class="punc-eq-container">
	<IfrDistributions bind:medianIfr bind:sigma bind:testSigma bind:showAltSigmaForecast />
	<PopulationForecast {medianIfr} {showAltSigmaForecast} {sigma} {testSigma} />
	{#if showAltSigmaForecast}
		<IfrComparisons {medianIfr} {sigma} {testSigma} />
	{/if}
</div>

<style lang="scss">
	.punc-eq-container {
		margin: var(--spacing-24) 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32);
	}
</style>
