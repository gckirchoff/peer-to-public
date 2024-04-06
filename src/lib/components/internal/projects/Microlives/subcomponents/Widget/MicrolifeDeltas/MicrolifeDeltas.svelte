<script lang="ts">
	import { scaleLinear, scaleBand, max } from 'd3';

	import type { Microlife } from '../constants';
	import AxisX from './AxisX/AxisX.svelte';
	import Bar from './Bar/Bar.svelte';
	import { margin } from './constants';

	export let microlives: Microlife[];
	export let xAccessor: (d: Microlife) => number;
	export let yAccessor: (d: Microlife) => string;

	let width = 400;
	let height = 400;

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	$: absMaxXValue = max(microlives, (d) => Math.abs(xAccessor(d))) as number;
	$: xScale = scaleLinear()
		.domain([-absMaxXValue, absMaxXValue])
		.range([0, innerChartWidth])
		.nice();

	$: yScale = scaleBand()
		.domain(microlives.map(yAccessor))
		.range([innerChartHeight, 0])
		.padding(0.2);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartHeight} />
			{#each microlives as microlifeDelta}
				<Bar
					data={microlifeDelta}
					{xScale}
					{yScale}
					{xAccessor}
					{yAccessor}
					label={microlifeDelta.name}
				/>
			{/each}
		</g>
	</svg>
</div>
