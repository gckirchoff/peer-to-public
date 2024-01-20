<script lang="ts">
	import { onMount } from 'svelte';
	import { csv } from 'd3';

	import ScrollyTelly from './ScrollyTelly/ScrollyTelly.svelte';
	import Chart from './Chart/Chart.svelte';
	import type { WastewaterReport } from './constants';
	import { stoppingPoints } from './constants';
	import { parseRow } from './logic';

	let data: WastewaterReport[] | null = null;
	onMount(async () => {
		data = await csv('/data/NewsLine/data.csv', parseRow);
	});

	let currentStep = 0;
</script>

{#if data}
	<ScrollyTelly bind:currentStep steps={stoppingPoints.length} scrollHeight="50vh">
		<Chart {data} {currentStep} />
	</ScrollyTelly>
{:else}
	<p>Loading...</p>
{/if}
