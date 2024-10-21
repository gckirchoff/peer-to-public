<script lang="ts">
	import { scaleLinear } from 'd3';

	import type { ColorLegendProps } from './constants';
	import HoverTriangle from './HoverTriangle/HoverTriangle.svelte';

	let { colorScale, chartWidth, chartHeight, tooltipData }: ColorLegendProps = $props();

	let width = $derived(chartWidth * 0.1);
	const height = $derived(chartHeight * 0.5);

	let canvas: HTMLCanvasElement;

	let yScale = $derived(scaleLinear().domain(colorScale.domain()).range([height, 0]));

	let ticks = $derived(yScale.ticks(4));

	$effect(() => {
		const context = canvas?.getContext('2d');

		if (!context) {
			return;
		}

		for (let i = 0; i < height; i++) {
			const value = yScale.invert(i);
			context.fillStyle = colorScale(value);
			context.fillRect(0, i, width, 1);
		}
	});
</script>

<div
	class="legend-container"
	style="top: {chartHeight * 0.5 - height * 0.5}px; left: {chartWidth + 90}px;"
>
	<canvas bind:this={canvas} {width} {height}></canvas>
	<svg {width} {height}>
		{#each ticks as tick}
			<g style="transform: translate(0, {yScale(tick)}px);">
				<line x1={0} x2={width * 1.3} y1={0} y2={0} stroke-width={1} stroke="black" />
				<text dx={(width * 1.3) + 4} text-anchor="start" dominant-baseline="middle">{tick}</text>
			</g>
		{/each}
		{#if tooltipData}
			<HoverTriangle {yScale} {tooltipData} />
		{/if}
	</svg>
</div>

<style lang="scss">
	.legend-container {
		position: absolute;

		svg {
			position: absolute;
			top: 0;
			left: 0;
			overflow: visible;
		}
	}
</style>
