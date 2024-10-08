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
	import type { BarData, Label, MortalityData } from '../constants';
	import { smallScreenWidth, stages } from '../constants';
	import InfoBox from '../InfoBox/InfoBox.svelte';

	export let mortalityData: MortalityData[] = [];
	export let currentStep: number | undefined;

	let width = 400;
	let height = 600;
	let windowWidth = 1000;

	$: smallScreen = windowWidth < smallScreenWidth;

	$: margin = {
		top: 20,
		right: 15,
		bottom: 40,
		left: smallScreen ? 11 : 408,
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

	let bars: BarData[] = [];
	let labels: Label[] = [];
	$: barsAndLabels = getBarData(mortalityData, xScale, yScale, colorScale, stage);
	$: {
		bars = barsAndLabels.bars;
		labels = barsAndLabels.labels;
	}

	let hoveredData: BarData | null = null;

	const updateHoveredData = (data: BarData): void => {
		hoveredData = data;
	};

	$: {
		stage; // run block if stage changes
		hoveredData = null;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div bind:clientWidth={width} class="chart-container apples-to-apples">
	<svg {width} {height} on:mouseleave={() => (hoveredData = null)} role="application">
		<g class="inner-chart" transform="translate({margin.left}, {margin.top})">
			<AxisX width={innerWidth} height={innerHeight} {xScale} />
			<AxisY {yScale} {bars} {stage} />
			{#each bars as data (data.data.value)}
				<Bar {data} {stage} {hoveredData} {updateHoveredData} {innerHeight} />
			{/each}
			{#if smallScreen && stage === 'initial'}
				{#each labels as label (label.text)}
					<text
						style="fill: {label.textAnchor === 'start' ? 'black' : 'whitesmoke'};"
						x={label.x}
						y={label.y}
						dx={(label.textAnchor === 'start' ? 1 : -1) * 8}
						text-anchor={label.textAnchor}
						dominant-baseline="middle"
					>
						{label.text}
					</text>
				{/each}
			{/if}
		</g>
	</svg>

	<InfoBox {currentStep} />

	{#if hoveredData && stage === 'differentiated'}
		<Tooltip data={hoveredData} {width} {margin} />
	{/if}
</div>

<style lang="scss">
	:global(.apples-to-apples .tick text, .axis-title) {
		font-weight: 400;
		font-size: 2rem;
		fill: var(--clr-txt-500);
	}

	.chart-container {
		position: relative;
		width: 100%;
		position: relative;
	}
</style>
