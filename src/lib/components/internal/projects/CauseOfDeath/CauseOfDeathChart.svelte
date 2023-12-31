<script lang="ts">
	import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
	import { group, max } from 'd3-array';
	import { csv } from 'd3';
	import { schemeSet1 } from 'd3-scale-chromatic';

	import { onMount } from 'svelte';

	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';
	import Bar from './Bar.svelte';

	import type { BarData, MortalityData, MortalityDataHierarchical, Stage } from './constants';
	import { getBarData, parseMortalityData } from './logic';
	import Tooltip from './Tooltip.svelte';
	import { flip } from 'svelte/animate';

	let width = 400;
	let height = 400;
	const margin = {
		top: 20,
		right: 15,
		bottom: 20,
		left: 190,
	};

	let mortalityData: MortalityData[] = [];
	let mortalityDataHierarchical: MortalityDataHierarchical[] = [];

	onMount(async () => {
		mortalityData = await csv('/data/CovidMortality/MortalityType.csv', parseMortalityData);
	});

	$: {
		if (mortalityData.length > 0) {
			const groupedMortalityData = group(mortalityData, (d) => d.type);
			mortalityDataHierarchical = [...groupedMortalityData].map(([key, value]) => ({
				type: key,
				subTypes: value,
			}));
		}
	}

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;

	$: yDomain = differentiateSubtypes
		? mortalityDataHierarchical
				.reduce((acc: { name: string; quantity: number }[], cur) => {
					cur.subTypes.forEach(({ type, subType, year2020 }) =>
						acc.push({ name: subType || type, quantity: year2020 }),
					);
					return acc;
				}, [])
				.sort((a, b) => b.quantity - a.quantity)
				.map(({ name }) => name)
		: mortalityDataHierarchical.map((d) => d.type);

	$: yScale = scaleBand().domain(yDomain).range([0, innerHeight]).padding(0.2);

	$: maxDeaths = mortalityDataHierarchical.reduce((acc: number[], cur) => {
		const subTypeTotalDeath = cur.subTypes.reduce(
			(totalDeaths: number, subType) => (totalDeaths += subType.year2020),
			0,
		);
		acc.push(subTypeTotalDeath);

		return acc;
	}, []);

	$: xScale = scaleLinear()
		.domain([0, max(maxDeaths) as number])
		.range([0, innerWidth]);

	$: colorScale = scaleOrdinal<string, string>()
		.domain([
			...mortalityData.map((d) => {
				if (d.subType === 'Total') {
					return d.type;
				} else {
					return d.subType;
				}
			}),
		])
		.range(schemeSet1);

	let stage: Stage = 'initial';
	let differentiateColors = false;
	let differentiateSubtypes = false;

	$: bars = getBarData(
		mortalityDataHierarchical,
		xScale,
		yScale,
		colorScale,
		differentiateColors,
		differentiateSubtypes,
	);

	let hoveredData: BarData | null = null;

	const updateHoveredData = (data: BarData): void => {
		hoveredData = data;
	};

	$: console.log('bars', bars[0]);
</script>

<input type="checkbox" bind:checked={differentiateColors} />Colors
<input type="checkbox" bind:checked={differentiateSubtypes} /> Subtypes

{#if bars.length}
	<div bind:clientWidth={width} class="chart-container">
		<svg {width} {height} on:mouseleave={() => (hoveredData = null)} role="application">
			<g class="inner-chart" transform="translate({margin.left}, {margin.top})">
				<AxisX width={innerWidth} height={innerHeight} {xScale} />
				<AxisY width={innerWidth} {yScale} />
				{#each bars as data (data.data.year2020)}
					<Bar {data} {hoveredData} {updateHoveredData} {innerHeight} />
				{/each}
			</g>
		</svg>

		{#if false}
			<Tooltip data={hoveredData} {width} {yScale} />
		{/if}
	</div>
{/if}

<style lang="scss">
	:global(.tick text, .axis-title) {
		font-weight: 400;
		font-size: 12px;
		fill: hsla(212, 10%, 53%, 1);
	}

	.chart-container {
		position: relative;
	}
</style>
