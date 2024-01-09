<script lang="ts">
	import { csv } from 'd3';
	import { onMount } from 'svelte';

	import type { MortalityData } from './constants';
	import { parseMortalityData } from './logic';
	import ScrollyTelly from './ScrollyTelly/ScrollyTelly.svelte';
	import BarChart from './Chart/BarChart.svelte';

	let mortalityData: MortalityData[] = [];

	onMount(async () => {
		mortalityData = await csv('/data/CovidMortality/MortalityType.csv', parseMortalityData);
	});

	let currentStep = 0;
</script>

{#if mortalityData.length > 0}
	<ScrollyTelly
		bind:currentStep
		steps={3}
		scrollHeight="50vh"
	>
		<BarChart {mortalityData} {currentStep} />
	</ScrollyTelly>
{:else}
	<h2>Loading...</h2>
{/if}
