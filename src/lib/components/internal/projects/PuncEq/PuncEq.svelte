<script lang="ts">
	import { fade } from 'svelte/transition';
	import { scaleLinear, max, extent, pointer, median, deviation } from 'd3';

	import { Body1, Body2, H5, H6 } from '../../typography';
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import type { Margin } from '../common/components/charts/constants';
	import { roundTo } from '../util/math';
	import BoxPlot from '../common/components/charts/BoxPlot/BoxPlot.svelte';
	import Histogram from '../common/components/charts/Histogram/Histogram.svelte';
	import AxisX from '../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../common/components/Line/Line.svelte';
	import AdvancedTools from './AdvancedTools/AdvancedTools.svelte';
	import { margin, statisticalSignificanceThreshold, type Vector } from './constants';
	import {
		UseAdvancedConfigurables,
		simulatePopulationDynamics,
		getCursorPositionInfo,
		assessSystemFailures,
		leveneTest,
		getMainAndTestSamples,
		percentOfStatisticallySignificantLeveneTests,
		percentOfStatisticallySignificantLogTransformedWelchTTest,
		logTransformedWelchTTest,
	} from './logic.svelte';
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
