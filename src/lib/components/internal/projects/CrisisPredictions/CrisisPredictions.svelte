<script lang="ts">
	import { interpolateMagma } from 'd3-scale-chromatic';

	import HeatMap from '../common/components/charts/HeatMap/HeatMap.svelte';
	import Histogram from '../common/components/charts/Histogram/Histogram.svelte';
	import type { HeatmapData } from '../common/components/charts/HeatMap/constants';
	import {
		generateOverallData,
		getParamsFromSelectedData,
		simulatePopulationDynamics,
		simulatePopulationDynamicsV2,
	} from './logic';
	import { Body1, H4 } from '../../typography';
	import {
		baselineMortality,
		collapseThreshold,
		exaggeratedMortality,
		wavesPerYear,
	} from './constants';

	const overallData = generateOverallData();

	let selectedOverallData: HeatmapData = $state(overallData[overallData.length / 2 - 6]);
	let year = $state(100);

	let selectedParams = $derived(getParamsFromSelectedData(selectedOverallData));

	let simResults = $derived(
		simulatePopulationDynamics({
			percentLossOfPopulationCrisisThreshold: collapseThreshold,
			populationDeclinePerHighWave: exaggeratedMortality,
			populationDeclinePerNormalWave: baselineMortality,
			probOfAttenuation: selectedParams.pStableAttenuation,
			probOfHighMortalityWave: selectedParams.pExaggeratedMortality,
			wavesPerYear,
			years: year,
		}),
	);

	let simData = $derived([
		{
			group: 'Attenuations',
			values: simResults.attenuationTimes,
		},
		{
			group: 'Crises',
			values: simResults.crisisTimes,
		},
	]);
</script>

<div class="dashboard">
	<div class="title">
		<H4>Hey</H4>
	</div>
	<div class="overall-probabilities-chart-container">
		<HeatMap
			data={overallData}
			colorScheme={interpolateMagma}
			bind:selectedData={selectedOverallData}
		/>
	</div>
	<div class="monte-carlo-sim">
		<Histogram series={simData} yLabel="Frequency" xDomain={[0, 100]} yDomain={[0, 250]} />
	</div>
</div>

<style lang="scss">
	.dashboard {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: auto 40rem;
		grid-template-areas:
			'. . title . .'
			'overall-heatmap overall-heatmap monte-carlo monte-carlo monte-carlo';
		.title {
			grid-area: title;
			text-align: center;
		}

		.overall-probabilities-chart-container {
			grid-area: overall-heatmap;
		}

		.monte-carlo-sim {
			grid-area: monte-carlo;
		}
	}
</style>
