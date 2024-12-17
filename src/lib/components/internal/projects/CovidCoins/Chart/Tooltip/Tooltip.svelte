<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { ScaleBand, ScaleLinear } from 'd3';

	import type { Outcome, RiskItem, View } from '../../constants';

	export let data: RiskItem;
	export let xScale: ScaleBand<string>;
	export let yScale: ScaleLinear<number, number, never>;
	export let width: number;
	export let outcome: Outcome;
	export let view: View;

	const xNudge = 15;
	const yNudge = 15;

	let tooltipWidth = 0;

	$: x = xScale(data.item) ?? 0;
	$: y = yScale(data.coins);

	$: isOverflowingRight = x + tooltipWidth + xNudge > width;
	$: xPosition = isOverflowingRight ? x - tooltipWidth / 2 - xNudge : x + xNudge;
	$: yPosition = y + yNudge;

	$: outcomeText =
		outcome === 'mortality' ? 'death' : data.item === 'Covid-19' ? 'long covid' : 'injury';

	$: probability = Math.round(data.probability * 1000) / 10;
	$: tooltipTitle = `${data.item} - ${data.coins > 0 ? `${data.coins} coins` : `${probability}%`}`;

	$: tooltipProbability = (data.probability * 100).toFixed(4);
</script>

<div
	class="tooltip"
	style="left: {xPosition}px; top: {yPosition}px; --max-width: {width}px"
	role="tooltip"
	bind:clientWidth={tooltipWidth}
	in:fly={{ y: -20 }}
	out:fly={{ y: 20 }}
>
	<h1 class="item">{tooltipTitle}</h1>
	{#if view === 'instance'}
		<p class="frequency">{data.frequency}: {tooltipProbability}%</p>
		<a class="source" href={data.source} target="_blank">Source</a>
		<h3 class="tries-title">Can attempt:</h3>
		<h4>
			<span class="highlight">{Math.ceil(data.triesUntil50)}</span> times until a
			<span class="highlight">50%</span> chance of {outcomeText}
		</h4>
		<h4>
			<span class="highlight">{Math.ceil(data.triesUntil95)}</span> times until a
			<span class="highlight">95%</span> chance of {outcomeText}
		</h4>
	{:else}
		<p class="frequency">{data.frequencyPerYearDescriptor}</p>
		<p class="frequency">{tooltipProbability}%</p>
		<a class="source" href={data.source} target="_blank">Source</a>
	{/if}
</div>

<style lang="scss">
	.tooltip {
		position: absolute;
		background-color: white;
		max-width: min(50%, var(--max-width));
		padding: 8px 6px;
		box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
		border-radius: 3px;
		transition:
			top 300ms ease,
			left 300ms ease;

		.item {
			font-size: 2rem;
			font-weight: 600;
			width: 100%;
		}

		.frequency {
			font-size: 1.5rem;
			font-weight: 500;
		}

		.source {
			display: block;
			margin-bottom: 1rem;
		}

		.tries-title {
			font-size: 1.5rem;
			font-weight: 600;
		}

		.highlight {
			font-size: 80%;
			padding: 2px 4px;
			background-color: #ffef61;
			margin-left: 2px;
			display: inline-block;
			vertical-align: middle;
			border-radius: 3px;
			color: rgba(0, 0, 0, 0.7);
		}
	}
</style>
