<script lang="ts">
	import HeatMap from '../common/components/charts/HeatMap/HeatMap.svelte';
	import Histogram from '../common/components/charts/Histogram/Histogram.svelte';
	import AdvancedTools from './AdvancedTools/AdvancedTools.svelte';
	import {
		generateOverallData,
		getParamsFromSelectedData,
		simulatePopulationDynamics,
		UseAdvancedConfigurables,
	} from './logic.svelte';

	const advancedConfigurables = new UseAdvancedConfigurables();
	let selectedHeatmapIndex = $state<number>(54);

	let overallData = $derived(
		generateOverallData({
			collapseThreshold: advancedConfigurables.collapseThreshold,
			baselineMortality: advancedConfigurables.baselineMortality,
			exaggeratedMortality: advancedConfigurables.exaggeratedMortality,
			fractionInfected: advancedConfigurables.fractionInfected,
			wavesPerYear: advancedConfigurables.wavesPerYear,
		}),
	);

	let selectedParams = $derived(getParamsFromSelectedData(overallData[selectedHeatmapIndex]));
	let simResults = $derived(
		simulatePopulationDynamics({
			percentLossOfPopulationCrisisThreshold: advancedConfigurables.collapseThreshold,
			populationDeclinePerHighWave: advancedConfigurables.exaggeratedMortality,
			populationDeclinePerNormalWave: advancedConfigurables.baselineMortality,
			probOfAttenuation: selectedParams.pStableAttenuation,
			probOfHighMortalityWave: selectedParams.pExaggeratedMortality,
			wavesPerYear: advancedConfigurables.wavesPerYear,
			fractionInfected: advancedConfigurables.fractionInfected,
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

<div>
	<div class="dashboard">
		<div class="chart-container overall-probabilities">
			<HeatMap
				data={overallData}
				title="Overall Chance of Attenuation Before Crisis"
				xLabel="Chance of Exaggerated Mortality/Wave"
				yLabel="Chance of Stable Attenuation"
				bind:selectedIndex={selectedHeatmapIndex}
				valueDomain={[0, 100]}
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
	<AdvancedTools {advancedConfigurables} />
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
