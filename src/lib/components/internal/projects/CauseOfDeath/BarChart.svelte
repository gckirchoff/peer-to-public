<script lang="ts">
	import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
	import { group, max } from 'd3-array';
	import { schemeSet1 } from 'd3-scale-chromatic';

	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import Bar from './Bar.svelte';

	import type { BarData, MortalityData, Stage } from './constants';
	import {
		getBarData,
		getDomainValuesForColorScale,
		getMaxDeathForEachCategory,
		getYValuesBySubType,
	} from './logic';
	import Tooltip from './Tooltip.svelte';

	let width = 400;
	let height = 400;
	const margin = {
		top: 20,
		right: 15,
		bottom: 20,
		left: 190,
	};

	export let mortalityData: MortalityData[] = [];

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;
	let stage: Stage = 'initial';

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

<select bind:value={stage}>
	<option value="initial">Initial</option>
	<option value="differentiated">Differentiated</option>
	<option value="flattened">Flattened</option>
</select>

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

	{#if false}
		<Tooltip data={hoveredData} {width} {yScale} />
	{/if}
</div>

<style lang="scss">
	:global(.tick text, .axis-title) {
		font-weight: 400;
		font-size: 12px;
		fill: hsla(212, 10%, 53%, 1);
	}

	.chart-container {
		position: relative;
	}
</style>
