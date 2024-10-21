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
		fractionInfected,
	} from './constants';

	const overallData = generateOverallData();

	let selectedOverallData: HeatmapData = $state(overallData[overallData.length / 2 - 6]);
	let selectedParams = $derived(getParamsFromSelectedData(selectedOverallData));
	let simResults = $derived(
		simulatePopulationDynamics({
			percentLossOfPopulationCrisisThreshold: collapseThreshold,
			populationDeclinePerHighWave: exaggeratedMortality,
			populationDeclinePerNormalWave: baselineMortality,
			probOfAttenuation: selectedParams.pStableAttenuation,
			probOfHighMortalityWave: selectedParams.pExaggeratedMortality,
			wavesPerYear,
			fractionInfected,
			years: 100,
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
	<div class="chart-container overall-probabilities">
		<HeatMap
			data={overallData}
			title="Overall Chance of Attenuation Before Crisis"
			xLabel="Chance of Exaggerated Mortality/Wave"
			yLabel="Chance of Stable Attenuation"
			colorScheme={interpolateMagma}
			bind:selectedData={selectedOverallData}
		/>
	</div>
	<div class="chart-container monte-carlo-sim">
		<Histogram
			series={simData}
			title="Attenuation vs Crisis Times"
			xLabel="Years"
			yLabel="Frequency"
			xDomain={[0, 100]}
			yDomain={[0, 250]}
		/>
	</div>
</div>

<style lang="scss">
	.dashboard {
		--gap: 1%;
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);

		.chart-container {
			height: 40rem;

			&.overall-probabilities {
				flex: 1 1 calc(40% - var(--gap) * 0.5);
				min-width: 350px;
			}

			&.monte-carlo-sim {
				flex: 1 1 calc(60% - var(--gap) * 0.5);
			}
		}
	}
</style>
