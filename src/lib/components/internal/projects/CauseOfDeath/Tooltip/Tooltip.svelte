<script lang="ts">
	import type { BarData } from '../constants';
	import { fly } from 'svelte/transition';

	export let data: BarData;
	export let width: number;

	const xNudge = data.width * 0.5;
	const yNudge = data.height * 1.5;

	let tooltipWidth: number;

	$: x = data.x;
	$: y = data.y;
	$: xPosition = x + tooltipWidth > width ? x - tooltipWidth - xNudge : x + xNudge;
	$: yPosition = y + yNudge;
</script>

<div
	class="tooltip"
	role="tooltip"
	style="position: absolute; top: {yPosition}px; left: {xPosition}px"
	in:fly={{ y: -10 }}
	out:fly={{ y: 10 }}
	bind:clientWidth={tooltipWidth}
>
	<h1>{data.data.category || data.data.type}</h1>
	<h2><span>{data.data.value.toLocaleString()} deaths</span></h2>
</div>

<style lang="scss">
	.tooltip {
		padding: 8px 6px;
		background: var(--clr-surface-500);
		box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
		border-radius: 3px;
		pointer-events: none;
		transition:
			top 300ms ease,
			left 300ms ease;
	}

	h1 {
		font-size: 1.8rem;
		font-weight: 500;
		margin-bottom: 6px;
		width: 100%;
		color: var(--clr-text-on-surface-500);
	}

	h2 {
		font-weight: 500;
		text-transform: uppercase;
	}
	
	span {
		font-size: 1rem;
		background: var(--clr-surface-600);
		font-size: 80%;
		margin-left: 2px;
		padding: 2px 4px;
		display: inline-block;
		vertical-align: bottom;
		border-radius: 3px;
		color: var(--clr-text-on-surface-500);
	}
</style>
