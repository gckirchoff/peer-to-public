<script lang="ts">
	import { scaleLinear } from 'd3';

	import AxisX from './AxisX/AxisX.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Line from './Line/Line.svelte';
	import { margin, maxInfectionCount, type InfectionCumulativeRisk } from './constants';
	import { getCumulativeRisks } from './logic';
	import Tooltip from './Tooltip/Tooltip.svelte';

	export let longCovidChance: number;

	const xAccessor = (d: InfectionCumulativeRisk) => d.infectionCount;
	const yAccessor = (d: InfectionCumulativeRisk) => d.risk * 100;

	let width = 400;
	let height = 400;

	const statsCanadaData = getCumulativeRisks(0.146);

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

<div class="chart-container" bind:clientWidth={width} role="application">
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartHeight} />
			<AxisY {yScale} />
			<Line data={statsCanadaData} {xAccessorScaled} {yAccessorScaled} style="stroke: #ED1C24;" />
			{#each statsCanadaData.slice(0, 4) as d}
				<circle
					cx={xAccessorScaled(d)}
					cy={yAccessorScaled(d)}
					fill="#ED1C24"
					r={4}
					on:mouseover={() => {
						updateHoveredData(d);
					}}
					on:focus={() => updateHoveredData(d)}
					on:mouseleave={() => updateHoveredData(null)}
					role="tooltip"
				/>
			{/each}
			<Line data={cumulativeRisks} {xAccessorScaled} {yAccessorScaled} />
			{#each cumulativeRisks as d}
				<circle
					cx={xAccessorScaled(d)}
					cy={yAccessorScaled(d)}
					fill="purple"
					r={4}
					on:mouseover={() => {
						updateHoveredData(d);
					}}
					on:focus={() => updateHoveredData(d)}
					on:mouseleave={() => updateHoveredData(null)}
					role="tooltip"
				/>
			{/each}
			<g
				style="transform: translate({xAccessorScaled(
					statsCanadaData.at(-1) ?? { infectionCount: maxInfectionCount, risk: 0.8 },
				) + 15}px, {yAccessorScaled(
					statsCanadaData.at(-1) ?? { infectionCount: maxInfectionCount, risk: 0.8 },
				) + 85}px);"
			>
				<text text-anchor="end" fill="#ED1C24">Forecast derived from</text>
				<text text-anchor="end" dy={16} fill="#ED1C24">Statistics Canada</text>
			</g>
		</g>
	</svg>
	{#if hoveredPoint}
		<Tooltip data={hoveredPoint} {xAccessorScaled} {yAccessorScaled} width={innerChartWidth} />
	{/if}
</div>

<style lang="scss">
	circle {
		transition: all 0.3s ease-out;
	}
</style>
