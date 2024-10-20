<script lang="ts">
	import { extent } from 'd3-array';
	import { scaleBand, scaleSequential } from 'd3-scale';
	import { interpolateInferno } from 'd3-scale-chromatic';

	import Tooltip from './Tooltip/Tooltip.svelte';
	import {
		defaultMargin,
		squarePadding,
		type Data,
		type Props,
		type TooltipData,
	} from './constants';
	import { xAccessor, yAccessor, valueAccessor } from './logic';
	import ColorLegend from './ColorLegend/ColorLegend.svelte';

	let { data, margin = {}, colorScheme = interpolateInferno }: Props = $props();

	let usedMargin = $derived({ ...defaultMargin, ...margin });

	let width = $state(0);
	let height = $state(0);

	let tooltipData: TooltipData | null = $state(null);

	const setTooltipData = (data: Data) => {
		const hoveredData: TooltipData = {
			xLabel: xAccessor(data),
			yLabel: yAccessor(data),
			xPosition: (xScale(xAccessor(data)) ?? 0) + xScale.bandwidth() + usedMargin.left,
			yPosition: (yScale(yAccessor(data)) ?? 0) + yScale.bandwidth() * 0.5 + usedMargin.top,
			value: Math.round(data.value * 100) / 100,
		};
		tooltipData = hoveredData;
	};

	const removeTooltipData = () => {
		tooltipData = null;
	};

	let allXGroups = $derived([...new Set(data.map(({ x }) => x))]);
	let allYGroups = $derived([...new Set(data.map(({ y }) => y))]);

	let chartWidth = $derived(width - usedMargin.left - usedMargin.right);
	let chartHeight = $derived(height - usedMargin.top - usedMargin.bottom);

	let xScale = $derived(
		scaleBand().domain(allXGroups).range([0, chartWidth]).padding(squarePadding),
	);
	let yScale = $derived(
		scaleBand().domain(allYGroups).range([chartHeight, 0]).padding(squarePadding),
	);
	let colorScale = $derived(
		scaleSequential()
			.interpolator(colorScheme)
			.domain(extent(data, (d) => d.value) as [number, number]),
	);
</script>

<div class="chart-container heatmap" bind:clientWidth={width} bind:clientHeight={height}>
	<svg
		{width}
		{height}
		onmouseleave={removeTooltipData}
		onblur={removeTooltipData}
		role="application"
	>
		<g style="transform: translate({usedMargin.left}px, {usedMargin.top}px);">
			{#each allXGroups as xLabel}
				<text
					x={(xScale(xLabel) ?? 0) + xScale.bandwidth() * 0.5}
					y={chartHeight + 20}
					text-anchor="middle"
					dominant-baseline="middle"
				>
					{xLabel}
				</text>
			{/each}
			{#each allYGroups as yLabel}
				<text
					x={-20}
					y={(yScale(yLabel) ?? 0) + yScale.bandwidth() * 0.5}
					text-anchor="end"
					dominant-baseline="middle"
				>
					{yLabel}
				</text>
			{/each}
			{#each data as d}
				<rect
					x={xScale(xAccessor(d))}
					y={yScale(yAccessor(d))}
					width={xScale.bandwidth()}
					height={yScale.bandwidth()}
					fill={colorScale(valueAccessor(d))}
					rx={3}
					stroke="#fff"
					stroke-width={1}
					onmouseenter={() => setTooltipData(d)}
					onfocus={() => setTooltipData(d)}
					role="figure"
				/>
			{/each}
		</g>
	</svg>
	<ColorLegend {colorScale} {chartWidth} {chartHeight} {tooltipData} />
	{#if tooltipData}
		<Tooltip {tooltipData} />
	{/if}
</div>

<style lang="scss">
	.chart-container {
		position: relative;
		height: 100%;

		svg {
			&:focus {
				outline: none;
			}

			rect {
				transform-origin: center;

				&:hover {
					box-shadow: var(--shadow-lg);
				}

				&:focus {
					outline: none;
				}
			}
		}
	}
</style>
