<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { ScaleBand, ScaleLinear } from 'd3';

	import type { InfectionCumulativeRisk } from '../constants';
	import { roundTo } from '../../logic';

	export let data: InfectionCumulativeRisk;
	export let xAccessorScaled: (d: InfectionCumulativeRisk) => number;
	export let yAccessorScaled: (d: InfectionCumulativeRisk) => number;
	export let width: number;

	const xNudge = 15;
	const yNudge = 15;

	let tooltipWidth = 0;

	$: x = xAccessorScaled(data);
	$: y = yAccessorScaled(data);

	$: isOverflowingRight = x + tooltipWidth + xNudge > width;
	$: xPosition = isOverflowingRight ? x - tooltipWidth / 2 - xNudge : x + xNudge;
	$: yPosition = y + yNudge;
</script>

<div
	class="tooltip"
	style="left: {xPosition}px; top: {yPosition}px; --max-width: {width}px"
	bind:clientWidth={tooltipWidth}
	in:fly={{ y: -20 }}
	out:fly={{ y: 20 }}
>
	<h2 class="infection-count">{data.infectionCount} infections</h2>
	<h3 class="risk">{roundTo(data.risk * 100, 2)}% cumulative risk</h3>
</div>

<style lang="scss">
	.tooltip {
		position: absolute;
		background: var(--clr-surface-500);
		color: var(--clr-text-on-surface-500);
		max-width: min(50%, var(--max-width));
		padding: 8px 6px;
		box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
		border-radius: 3px;
		transition:
			top 300ms ease,
			left 300ms ease;
		pointer-events: none;
	}
</style>
