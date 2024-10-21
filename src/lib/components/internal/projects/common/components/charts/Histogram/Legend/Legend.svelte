<script lang="ts">
	import type { LegendProps } from './constants';

	let { colorScale, chartWidth, chartHeight }: LegendProps = $props();

	let groups = $derived(colorScale.domain());

	let textNodes: SVGTextElement[] = $state([]);

	let maxTextLength = $derived(
		textNodes.length ? Math.max(...textNodes.map((node) => node.getBoundingClientRect().width)) : 0,
	);

	let maxTextHeight = $derived(
		textNodes.length
			? Math.max(...textNodes.map((node) => node.getBoundingClientRect().height))
			: 0,
	);
</script>

<g style="transform: translate({chartWidth - maxTextLength - 20}px, {chartHeight * 0.1}px);">
	<rect
		x={-20}
		y={-maxTextHeight}
		width={maxTextLength + 40}
		height={groups.length * maxTextHeight * 1.05 + maxTextHeight}
		fill="white"
		opacity="0.4"
		stroke="black"
	/>
	{#each groups as group, i}
		<g style="transform: translate(0px, {maxTextHeight * 1.05 * i}px);">
			<circle r={5} fill={colorScale(group)} />
			<text dx={10} bind:this={textNodes[i]} dominant-baseline="middle">{group}</text>
		</g>
	{/each}
</g>

<style lang="scss">
	text {
		font-size: var(--font-14);
	}
</style>
