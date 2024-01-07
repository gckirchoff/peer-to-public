<script lang="ts">
	import { csv } from 'd3';
	import { onMount } from 'svelte';

	import type { MortalityData } from './constants';
	import { parseMortalityData } from './logic';
	import BarChart from './BarChart.svelte';

	let mortalityData: MortalityData[] = [];

	onMount(async () => {
		mortalityData = await csv('/data/CovidMortality/MortalityType.csv', parseMortalityData);
	});
</script>

{#if mortalityData.length > 0}
	<BarChart {mortalityData} />
{:else}
	<h2>Loading...</h2>
{/if}
