<script lang="ts">
	import { scaleLinear } from 'd3';

	import AxisX from './AxisX/AxisX.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Line from './Line/Line.svelte';
	import { margin, maxInfectionCount, type InfectionCumulativeRisk } from './constants';
	import { getCumulativeRisks } from './logic';

	export let longCovidChance: number;

	const xAccessor = (d: InfectionCumulativeRisk) => d.infectionCount;
	const yAccessor = (d: InfectionCumulativeRisk) => d.risk * 100;

	let width = 400;
	let height = 400;

	const statsCanadaData = getCumulativeRisks(0.15);
	const cdcData = getCumulativeRisks(0.2);

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	$: xScale = scaleLinear().domain([0, maxInfectionCount]).range([0, innerChartWidth]);
	$: yScale = scaleLinear().domain([0, 100]).range([innerChartHeight, 0]);

	$: cumulativeRisks = getCumulativeRisks(longCovidChance);

	$: xAccessorScaled = (d: InfectionCumulativeRisk) => xScale(xAccessor(d));
	$: yAccessorScaled = (d: InfectionCumulativeRisk) => yScale(yAccessor(d));
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartHeight} />
			<AxisY {yScale} />
			<Line data={cdcData} {xAccessorScaled} {yAccessorScaled} />
			<Line data={statsCanadaData} {xAccessorScaled} {yAccessorScaled} />
			<Line data={cumulativeRisks} {xAccessorScaled} {yAccessorScaled} />
		</g>
	</svg>
</div>
