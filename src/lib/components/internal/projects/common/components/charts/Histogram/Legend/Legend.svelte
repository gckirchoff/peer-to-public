<script lang="ts">
	import type { LegendProps } from './constants';

	let { colorScale, chartWidth, chartHeight }: LegendProps = $props();

	let groups = $derived(colorScale.domain());

	let textNodes: SVGTextElement[] = $state([]);

	let maxTextLength = $state(0);
	let maxTextHeight = $state(0);

	$effect(() => {
		if (textNodes.length && textNodes.every(Boolean)) {
			maxTextLength = Math.max(...textNodes.map((node) => node.getBoundingClientRect().width));
			maxTextHeight = Math.max(...textNodes.map((node) => node.getBoundingClientRect().height));
		}
		// dependecies
		groups;
	});
</script>

<g style="transform: translate({chartWidth - maxTextLength - 20}px, {chartHeight * 0.1}px);">
	<rect
		x={-20}
		y={-maxTextHeight}
		width={maxTextLength + 40}
		height={groups.length * maxTextHeight * 1.05 + maxTextHeight}
		fill="var(--clr-txt-neg-500)"
		opacity="0.4"
		stroke="var(--clr-txt-500)"
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
