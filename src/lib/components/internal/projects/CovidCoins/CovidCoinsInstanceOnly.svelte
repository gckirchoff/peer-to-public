<script lang="ts">
	import { onMount } from 'svelte';
	import { csv } from 'd3';

	import Chart from './Chart/Chart.svelte';
	import type { HandleChangeEvent, Outcome, RiskItem, View } from './constants';
	import { dataFolder } from './constants';
	import { processAgeItem, processMortalityItem } from './logic';

	let data: RiskItem[] | null = null;

	const view: View = 'instance';
	let outcome: Outcome = 'mortality';
	let input: number = 40;

	let baselineMortality: RiskItem[];
	let mortalityByAge: RiskItem[];
	let mortalityByAgeCovid: RiskItem[];

	let baselineDisability: RiskItem[];
	let disabilityByReinfectionCovid: RiskItem[];

	let hasMounted = false;

	onMount(async () => {
		baselineMortality = await csv(`${dataFolder}/micromortsBaseline.csv`, processMortalityItem);
		mortalityByAge = await csv(`${dataFolder}/mortalityByAge.csv`, processAgeItem);
		mortalityByAgeCovid = await csv(`${dataFolder}/mortalityByAgeCovid.csv`, processAgeItem);

		baselineDisability = await csv(`${dataFolder}/disabilityBaseline.csv`, processMortalityItem);
		disabilityByReinfectionCovid = await csv(
			`${dataFolder}/disabilityByReinfectionCovid.csv`,
			processMortalityItem,
		);

		data = [...baselineMortality, mortalityByAge[input], mortalityByAgeCovid[input]];
		hasMounted = true;
	});

	const handleAgeInputChange = (event: HandleChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		const value = Number(target.value);
		const outOfRange = value < 20 || value > 100;
		if (isNaN(value) || outOfRange) {
			return;
		}
		input = value;
	};

	$: {
		if (hasMounted) {
			if (view === 'instance') {
				if (outcome === 'mortality') {
					data = [...baselineMortality, mortalityByAge[input], mortalityByAgeCovid[input]];
				} else if (outcome === 'disability') {
					data = [...baselineDisability, disabilityByReinfectionCovid[0]];
				}
			}
		}
	}
</script>

<div class="inputs-container">
	<h3>What is the chance I get</h3>
	<select bind:value={outcome}>
		<option value="mortality">killed</option>
		<option value="disability">injured/Long Covid</option>
	</select>
	<h3>from my next Infection</h3>
</div>
<div class="inputs-container">
	{#if outcome === 'mortality'}
		<h3>if I am</h3>
		<input on:input={handleAgeInputChange} value={input} type="number" min="20" max="100" />
		<h3>years old</h3>
	{/if}
</div>

<div class="chart-container">
	{#if data}
		<Chart {data} {outcome} {view} />
	{:else}
		<h1>LOADING</h1>
	{/if}
</div>

<style>
	.inputs-container {
		display: flex;
		flex-wrap: wrap;
		row-gap: var(--spacing-8);
		column-gap: var(--spacing-16);
		margin-bottom: var(--spacing-16);
	}

	.chart-container {
		margin-bottom: var(--spacing-24);
	}
</style>
