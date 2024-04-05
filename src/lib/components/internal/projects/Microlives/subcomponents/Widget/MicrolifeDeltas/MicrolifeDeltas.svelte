<script lang="ts">
	import { scaleLinear, scaleBand, extent, max } from 'd3';

	import type { Microlife } from '../constants';
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

	$: yScale = scaleBand().domain(microlives.map(yAccessor)).range([innerChartHeight, 0]);

	$: positiveDeltas = microlives.filter((d) => xAccessor(d) >= 0);
	$: negativeDeltas = microlives.filter((d) => xAccessor(d) < 0);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			{#each negativeDeltas as bar}
				<rect
					x={xScale(xAccessor(bar))}
					y={yScale(yAccessor(bar))}
					width={xScale(0) - xScale(xAccessor(bar))}
					height={yScale.bandwidth()}
					fill="red"
				/>
				<text x={xScale(xAccessor(bar))} y={yScale(yAccessor(bar))} fill="white">{bar.name}</text>
			{/each}
			{#each positiveDeltas as bar}
				<rect
					x={xScale(0)}
					y={yScale(yAccessor(bar))}
					width={xScale(xAccessor(bar)) - xScale(0)}
					height={yScale.bandwidth()}
					fill="blue"
				/>
				<text x={xScale(0)} y={yScale(yAccessor(bar))} fill="white">{bar.name}</text>
			{/each}
		</g>
	</svg>
</div>

<style lang="scss">
	rect {
		transition: all 500ms ease;
	}
</style>