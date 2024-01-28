<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scaleLinear, scaleBand } from 'd3';

	import type { Outcome, RiskItem, View } from '../constants';
	import Bar from './Bar/Bar.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import { sameOrder } from './logic';

	export let data: RiskItem[];
	export let outcome: Outcome;
	export let view: View;

	$: increasingProbability = (a: RiskItem, b: RiskItem) => a.probability - b.probability;
	$: usedData = data.toSorted?.(increasingProbability) ?? [...data].sort(increasingProbability);
	let prevUsedData: RiskItem[] = [];
	let barsSwappedPlaces: boolean;

	$: {
		barsSwappedPlaces = !sameOrder(usedData, prevUsedData);
		prevUsedData = usedData;
	}

	let width = 400;
	let height = 550;

	$: margin = {
		top: 60,
		left: 30,
		bottom: 100 + width * 0.05,
		right: 30,
	};

	let hoveredBar: RiskItem | null = null;

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;

	$: xScale = scaleBand()
		.domain(usedData.map((d) => d.item))
		.range([0, innerWidth])
		.padding(0.2);

	$: yScale = scaleLinear().domain([0, 20]).range([innerHeight, 0]).nice();
</script>

<div
	class="chart-container"
	bind:clientWidth={width}
	on:mouseleave={() => (hoveredBar = null)}
	role="application"
>
	<svg {width} {height} role="application">
		<g transform="translate({margin.left} {margin.top})">
			<AxisY {yScale} {width} />
			{#each usedData as d, columnIndex (`${d.item}-${outcome}`)}
				<g
					style="transform: translate({xScale(d.item)}px, {innerHeight}px);"
					animate:flip={{ duration: 800 }}
					on:mouseover={() => (hoveredBar = d)}
					on:focus={() => (hoveredBar = d)}
					tabindex="0"
					role="tab"
					aria-roledescription="bar"
				>
					<Bar {d} {xScale} {yScale} {columnIndex} {innerHeight} {outcome} {barsSwappedPlaces} />
				</g>
			{/each}
			<text class="axis-title" x={innerWidth} y={0} dy={-10} text-anchor="end"
				>Riskiness &rarr;</text
			>
		</g>
	</svg>
	{#if hoveredBar}
		<Tooltip data={hoveredBar} {xScale} {yScale} width={innerWidth} {outcome} {view} />
	{/if}
</div>

<style lang="scss">
	svg {
		background-color: white;
	}

	:global(.tick text) {
		font-weight: 400;
		font-size: 15px;
		fill: #747474;
	}
</style>
