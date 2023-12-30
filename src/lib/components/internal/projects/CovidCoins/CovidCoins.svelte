<script lang="ts">
	import { onMount } from 'svelte';
	import { csv } from 'd3';

	import Chart from './Chart/Chart.svelte';
	import type { HandleChangeEvent, Outcome, RiskItem, View } from './constants';
	import { dataFolder } from './constants';
	import {
		baselineOverTime,
		getCovidRow,
		processAgeItem,
		processMortalityItem,
		representProbabilityAsCoins,
	} from './logic';
	import Switch from '../../Switch.svelte';

	let data: RiskItem[] | null = null;

	let view: View = 'instance';
	let outlookWindow = 1;
	let vaccinated = false;
	let outcome: Outcome = 'mortality';
	let input: number = 40;

	let baselineMortality: RiskItem[];
	let mortalityByAge: RiskItem[];
	let mortalityByAgeCovid: RiskItem[];

	let baselineDisability: RiskItem[];
	let disabilityByReinfectionCovid: RiskItem[];

	let mortalityOutlookBaseline: RiskItem[];
	let disabilityOutlookBaseline: RiskItem[];

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

		mortalityOutlookBaseline = await csv(
			`${dataFolder}/mortalityOutlookBaseline.csv`,
			processMortalityItem,
		);

		disabilityOutlookBaseline = await csv(
			`${dataFolder}/disabilityOutlookBaseline.csv`,
			processMortalityItem,
		);

		data = [...baselineMortality, mortalityByAge[input], mortalityByAgeCovid[input]];
		hasMounted = true;
	});

	const handleOutlookWindowChange = (event: HandleChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement;
		const value = Number(target.value);
		const outOfRange = value < 1 || value > 100;
		if (isNaN(value) || outOfRange) {
			return;
		}
		outlookWindow = value;
	};

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
			} else if (view === 'outlook') {
				if (outcome === 'mortality') {
					const baselineData = baselineOverTime(mortalityOutlookBaseline, outlookWindow);

					const newCovidRow = getCovidRow(input, outlookWindow, vaccinated, mortalityByAgeCovid);

					data = [...baselineData, newCovidRow];
				} else if (outcome === 'disability') {
					const baselineData = baselineOverTime(disabilityOutlookBaseline, outlookWindow);

					const covidFrequencyPerYear = vaccinated ? 1 : 2;
					const covidRow = disabilityByReinfectionCovid[0];
					const pCovidDeath = covidRow.probability;
					const chanceOfDisability =
						1 - Math.pow(1 - pCovidDeath, covidFrequencyPerYear * outlookWindow);
					const covidDisabilityCoins = representProbabilityAsCoins(chanceOfDisability);
					const newCovidRow: RiskItem = {
						...covidRow,
						item: 'Office Worker During Pandemic',
						probability: chanceOfDisability,
						coins: covidDisabilityCoins,
						frequencyPerYear: covidFrequencyPerYear,
						frequencyPerYearDescriptor: `Assuming ${covidFrequencyPerYear} infection${
							covidFrequencyPerYear === 1 ? '' : 's'
						} per year due to not taking precautions`,
					};

					data = [...baselineData, newCovidRow];
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
	<select bind:value={view}>
		<option value="instance">from my next Infection</option>
		<option value="outlook">in the next</option>
	</select>
	{#if view === 'outlook'}
		<input
			on:input={handleOutlookWindowChange}
			value={outlookWindow}
			placeholder="years"
			type="number"
			min="1"
		/>
		<h3>year{outlookWindow === 1 ? '' : 's'}</h3>
	{/if}
</div>
<div class="inputs-container">
	{#if outcome === 'mortality'}
		<h3>if I am</h3>
		<input on:input={handleAgeInputChange} value={input} type="number" min="20" max="100" />
		<h3>years old</h3>
	{/if}
	{#if view === 'outlook'}
		<h3>if I get vaccinated every year</h3>
		<Switch bind:value={vaccinated} label="" />
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
