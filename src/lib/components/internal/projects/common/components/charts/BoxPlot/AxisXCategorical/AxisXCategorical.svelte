<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { ScaleBand } from 'd3';

	type AxisXCategoricalProps = {
		xScale: ScaleBand<string>;
		label: string;
		innerChartWidth: number;
		innerChartHeight: number;
	};

	let { xScale, label, innerChartWidth, innerChartHeight }: AxisXCategoricalProps = $props();

	let ticks = $derived(xScale.domain());
</script>

<g class="axis x" transform="translate(0, {innerChartHeight + 15})">
	<line x2={innerChartWidth} stroke-width={1.5} />
	{#each ticks as tick, i (tick)}
		<g class="tick" transform="translate({(xScale(tick) ?? 0) + xScale.bandwidth() * 0.5} 0)">
			<line x1={0} x2={0} y1={0} y2={6} stroke="hsla(212, 10%, 53%, 1)" />
			<text x={0} y={10} dy={10} text-anchor="middle">
				{tick}
			</text>
		</g>
	{/each}
	<text x={innerChartWidth * 0.5} y={45} text-anchor="middle">{label}</text>
</g>

<style lang="scss">
	line {
		stroke: var(--clr-text-on-surface-1000);
	}

	text {
		font-size: 1.4rem;
		font-family: var(--font-base);
		user-select: none;
		fill: var(--clr-text-on-surface-1000);
	}
</style>
