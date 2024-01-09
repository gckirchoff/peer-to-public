<script lang="ts">
	import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
	import { max } from 'd3-array';
	import { schemeCategory10 } from 'd3-scale-chromatic';

	import AxisX from '../AxisX/AxisX.svelte';
	import AxisY from '../AxisY/AxisY.svelte';
	import Bar from '../Bar/Bar.svelte';
	import Tooltip from '../Tooltip/Tooltip.svelte';

	import {
		getBarData,
		getDomainValuesForColorScale,
		getMaxDeathForEachCategory,
		getYValuesBySubType,
	} from '../logic';
	import type { BarData, MortalityData } from '../constants';
	import { smallScreen, stages } from '../constants';
	import InfoBox from '../InfoBox/InfoBox.svelte';

	export let mortalityData: MortalityData[] = [];
	export let currentStep: number | undefined;

	let width = 400;
	let height = 600;
	let windowWidth = 1000;

	$: margin = {
		top: 20,
		right: 15,
		bottom: 40,
		left: windowWidth < smallScreen ? 0 : 370,
	};

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;
	$: stage = stages[currentStep ?? 0];

	$: yDomain =
		stage === 'flattened'
			? getYValuesBySubType(mortalityData)
			: new Set(mortalityData.map((disease) => disease.type));

	$: yScale = scaleBand().domain(yDomain).range([0, innerHeight]).padding(0.2);

	$: xScale = scaleLinear()
		.domain([0, max(getMaxDeathForEachCategory(mortalityData)) as number])
		.range([0, innerWidth]);

	$: colorScale = scaleOrdinal<string, string>()
		.domain([...getDomainValuesForColorScale(mortalityData)])
		.range(schemeCategory10);

	$: bars = getBarData(mortalityData, xScale, yScale, colorScale, stage);

	let hoveredData: BarData | null = null;

	const updateHoveredData = (data: BarData): void => {
		hoveredData = data;
	};

	$: {
		stage; // if stage changes
		hoveredData = null;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div bind:clientWidth={width} class="chart-container">
	<svg {width} {height} on:mouseleave={() => (hoveredData = null)} role="application">
		<g class="inner-chart" transform="translate({margin.left}, {margin.top})">
			<AxisX width={innerWidth} height={innerHeight} {xScale} />
			<AxisY {yScale} {bars} {stage} />
			{#each bars as data (data.data.year2020)}
				<Bar {data} {stage} {hoveredData} {updateHoveredData} {innerHeight} />
			{/each}
		</g>
	</svg>

	<InfoBox {currentStep} />

	{#if hoveredData && (stage === 'differentiated' || (stage === 'flattened' && smallScreen))}
		<Tooltip data={hoveredData} {width} />
	{/if}
</div>

<style lang="scss">
	:global(.tick text, .axis-title) {
		font-weight: 400;
		font-size: 2rem;
		fill: var(--clr-txt);
	}

	.chart-container {
		position: relative;
		width: 100%;
		position: relative;
	}
</style>
