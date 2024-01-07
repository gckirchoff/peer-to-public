<script lang="ts">
	import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
	import { group, max } from 'd3-array';
	import { schemeSet1 } from 'd3-scale-chromatic';

	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import Bar from './Bar.svelte';
	import Tooltip from './Tooltip.svelte';

	import {
		getBarData,
		getDomainValuesForColorScale,
		getMaxDeathForEachCategory,
		getYValuesBySubType,
	} from './logic';
	import type { BarData, MortalityData } from './constants';
	import { stages } from './constants';
	import InfoBox from './InfoBox/InfoBox.svelte';

	let width = 400;
	let height = 600;
	const margin = {
		top: 20,
		right: 15,
		bottom: 20,
		left: 190,
	};

	export let mortalityData: MortalityData[] = [];
	export let currentStep: number | undefined;

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
		.range(schemeSet1);

	$: bars = getBarData(mortalityData, xScale, yScale, colorScale, stage);

	let hoveredData: BarData | null = null;

	const updateHoveredData = (data: BarData): void => {
		hoveredData = data;
	};
</script>

<div bind:clientWidth={width} class="chart-container">
	<svg {width} {height} on:mouseleave={() => (hoveredData = null)} role="application">
		<g class="inner-chart" transform="translate({margin.left}, {margin.top})">
			<AxisX width={innerWidth} height={innerHeight} {xScale} />
			<AxisY {yScale} />
			{#each bars as data (data.data.year2020)}
				<Bar {data} {stage} {hoveredData} {updateHoveredData} {innerHeight} />
			{/each}
		</g>
	</svg>

	<InfoBox {currentStep} />

	{#if false}
		<Tooltip data={hoveredData} {width} {yScale} />
	{/if}
</div>

<style lang="scss">
	:global(.tick text, .axis-title) {
		font-weight: 400;
		font-size: 12px;
		fill: var(--clr-txt);
	}

	.chart-container {
		position: relative;
		width: 100%;
		position: relative;
	}

	.info-box {
		position: absolute;
		top: 50%;
		left: 65%;
		max-width: 20vw;
		padding: 2rem;
		background-color: plum;
	}
</style>
