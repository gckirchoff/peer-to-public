<script lang="ts">
	import { flip } from 'svelte/animate';
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

	$: sortedMicrolives = [...microlives].sort((a, b) => {
		const absA = Math.abs(a.value);
		const absB = Math.abs(b.value);
		if (absA === absB) {
			return b.name > a.name ? 1 : -1;
		}
		return absA - absB;
	});

	$: yScale = scaleBand()
		.domain(sortedMicrolives.map(yAccessor))
		.range([innerChartHeight, 0])
		.padding(0.2);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartHeight} />
			{#each microlives as microlifeDelta (microlifeDelta.name)}
				<g
					style="transform: translate(0, {yScale(yAccessor(microlifeDelta))}px)"
					animate:flip={{ duration: 800 }}
				>
					<Bar
						data={microlifeDelta}
						{xScale}
						{yScale}
						{xAccessor}
						{yAccessor}
						label={microlifeDelta.name}
					/>
				</g>
			{/each}
		</g>
	</svg>
</div>
