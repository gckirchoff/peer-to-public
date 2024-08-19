<script lang="ts">
	import { scaleLinear } from 'd3';

	import AxisX from './AxisX/AxisX.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Line from './Line/Line.svelte';
	import { maxInfectionCount, smallScreen, type InfectionCumulativeRisk } from './constants';
	import { getCumulativeRisks } from './logic';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import { roundTo } from '../logic';

	export let longCovidChance: number;

	const xAccessor = (d: InfectionCumulativeRisk) => d.infectionCount;
	const yAccessor = (d: InfectionCumulativeRisk) => d.risk * 100;

	let windowWidth = 1000;
	let width = 400;
	let height = 400;

	const statsCanadaPredictedRisk = 0.14;
	const statsCanadaData = getCumulativeRisks(statsCanadaPredictedRisk);

	$: isSmallScreen = windowWidth < smallScreen;

	$: margin = {
		top: 15,
		left: 73,
		bottom: 45,
		right: isSmallScreen ? 10 : 180,
	};

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	$: xScale = scaleLinear().domain([0, maxInfectionCount]).range([0, innerChartWidth]);
	$: yScale = scaleLinear().domain([0, 100]).range([innerChartHeight, 0]);

	$: cumulativeRisks = getCumulativeRisks(longCovidChance);

	$: xAccessorScaled = (d: InfectionCumulativeRisk) => xScale(xAccessor(d));
	$: yAccessorScaled = (d: InfectionCumulativeRisk) => yScale(yAccessor(d));

	let hoveredPoint: InfectionCumulativeRisk | null = null;

	const updateHoveredData = (d: InfectionCumulativeRisk | null) => {
		hoveredPoint = d;
	};
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="chart-container" bind:clientWidth={width} role="application">
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartWidth} {innerChartHeight} />
			<AxisY {yScale} {innerChartWidth} />
			<!-- <Line data={statsCanadaData} {xAccessorScaled} {yAccessorScaled} /> -->
			<Line data={cumulativeRisks} {xAccessorScaled} {yAccessorScaled} style="stroke: #ED1C24;" />
			{#each cumulativeRisks as d}
				<circle
					cx={xAccessorScaled(d)}
					cy={yAccessorScaled(d)}
					fill="transparent"
					r={20}
					on:mouseover={() => {
						updateHoveredData(d);
					}}
					on:focus={() => updateHoveredData(d)}
					on:mouseleave={() => updateHoveredData(null)}
					role="tooltip"
				/>
			{/each}
			{#each cumulativeRisks as d}
				<circle
					class="filled-circle"
					cx={xAccessorScaled(d)}
					cy={yAccessorScaled(d)}
					fill="#ED1C24"
					r={4}
				/>
			{/each}
			{#each [0, 14.6, 25.4, 37.9] as d, i}
				<circle class="filled-circle" cx={xScale(i)} cy={yScale(d)} fill="#7a40f7" r={6} />
			{/each}
			<g
				style="transform: translate({width - 232}px, {isSmallScreen && longCovidChance > 0.21
					? height - 145
					: 20}px);"
			>
				<text class="legend-header">Stats Canada Data</text>
				<g style="transform: translate(0, 20px);">
					<circle cx={-1} fill="#7a40f7" r={4} />
					<text dx={7} dominant-baseline="middle" class="legend-text"> Observed Risk </text>
				</g>
				<g style="transform: translate(0, 40px)">
					<line x1={-6} x2={4} stroke="#ED1C24" stroke-width="2" />
					<text dx={7} dominant-baseline="middle" class="legend-text">
						predicted risk ({roundTo(longCovidChance * 100, 2)}%)
					</text>
				</g>
			</g>
		</g>
	</svg>
	{#if hoveredPoint}
		<Tooltip data={hoveredPoint} {xAccessorScaled} {yAccessorScaled} width={innerChartWidth} />
	{/if}
</div>

<style lang="scss">
	:global(text) {
		pointer-events: none;
		user-select: none;
	}

	:global(.tick text) {
		font-weight: 500;
		font-size: 15px;
		fill: var(--clr-text-on-surface-900);
		user-select: none;
	}

	.chart-container {
		margin-top: var(--spacing-16);
	}

	circle {
		transition: all 0.3s ease-out;
	}

	.filled-circle {
		pointer-events: none;
	}

	.legend-header {
		font-size: 17px;
		text-decoration: underline;
		fill: var(--clr-text-on-surface-1000);
	}

	.legend-text {
		font-size: 16px;
		fill: var(--clr-text-on-surface-1000);
	}
</style>
