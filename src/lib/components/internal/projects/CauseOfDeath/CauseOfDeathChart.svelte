<script lang="ts">
	import { csv } from 'd3';
	import { onMount } from 'svelte';

	import type { MortalityData } from './constants';
	import { parseMortalityData } from './logic';
	import ScrollyTelly from './ScrollyTelly/ScrollyTelly.svelte';
	import BarChart from './BarChart.svelte';

	let mortalityData: MortalityData[] = [];

	onMount(async () => {
		mortalityData = await csv('/data/CovidMortality/MortalityType.csv', parseMortalityData);
	});

	let currentStep = 0;
</script>

{#if mortalityData.length > 0}
	<ScrollyTelly
		bind:currentStep
		steps={[
			'Heart disease was the number one cause of death in 2020.',
			'But that is a category, while Covid is a single cause of death',
			'We should be comparing apples to apples - singular cause to singular cause - rather than comparing singular causes with categories',
		]}
	>
		<BarChart {mortalityData} {currentStep} />
	</ScrollyTelly>
{:else}
	<h2>Loading...</h2>
{/if}
