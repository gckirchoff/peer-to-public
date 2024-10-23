<script lang="ts">
	import { extent } from 'd3-array';
	import { scaleBand, scaleSequential } from 'd3-scale';
	import { interpolateMagma } from 'd3-scale-chromatic';

	import AxisX from './AxisX/AxisX.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Tooltip from './Tooltip/Tooltip.svelte';
	import ColorLegend from './ColorLegend/ColorLegend.svelte';
	import {
		defaultMargin,
		squareHoverScale,
		squarePadding,
		type HeatmapData,
		type Props,
		type TooltipData,
	} from './constants';
	import { xAccessor, yAccessor, valueAccessor } from './logic';

	let {
		data,
		title,
		xLabel,
		yLabel,
		margin = {},
		colorScheme = interpolateMagma,
		selectedIndex = $bindable(),
		valueDomain,
	}: Props = $props();

	let width = $state(0);
	let height = $state(0);

	let selectedData = $derived(selectedIndex ? data[selectedIndex] : null);

	let usedMargin = $derived({ ...defaultMargin, ...margin });

	const extractInfoFromSelection = (data: HeatmapData): TooltipData => ({
		id: `${xAccessor(data)}-${yAccessor(data)}`,
		xLabel: xAccessor(data),
		yLabel: yAccessor(data),
		xPosition: (xScale(xAccessor(data)) ?? 0) + xScale.bandwidth() + usedMargin.left,
		yPosition: (yScale(yAccessor(data)) ?? 0) + yScale.bandwidth() * 0.5 + usedMargin.top,
		value: Math.round(data.value * 100) / 100,
	});

	let tooltipData: TooltipData | null = $state(null);

	const setTooltipData = (data: HeatmapData) => {
		const hoveredData = extractInfoFromSelection(data);
		tooltipData = hoveredData;
	};

	const removeTooltipData = () => {
		tooltipData = null;
	};

	const equalsHoveredData = (d: HeatmapData): boolean =>
		`${xAccessor(d)}-${yAccessor(d)}` === tooltipData?.id;

	const setSelectedIndex = (index: number) => {
		if (selectedIndex === undefined) {
			return;
		}
		selectedIndex = index;
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
			.domain(valueDomain ?? (extent(data, (d) => d.value) as [number, number])),
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
			<text
				class="title"
				x={chartWidth * 0.5}
				y={-15}
				text-anchor="middle"
				dominant-baseline="middle">{title}</text
			>
			<AxisX label={xLabel} {xScale} {chartHeight} />
			<AxisY label={yLabel} {yScale} />
			{#each data as d, i}
				<rect
					x={xScale(xAccessor(d))}
					y={yScale(yAccessor(d))}
					width={xScale.bandwidth()}
					height={yScale.bandwidth()}
					fill={colorScale(valueAccessor(d))}
					opacity={tooltipData && !equalsHoveredData(d) ? 0.8 : 1}
					rx={3}
					stroke="var(--clr-txt-300)"
					stroke-width={1}
					onclick={() => setSelectedIndex(i)}
					onkeydown={(e) => {
						if (e.key !== 'Enter') return;
						e.preventDefault();
						setSelectedIndex(i);
					}}
					onmouseenter={() => setTooltipData(d)}
					onfocus={() => setTooltipData(d)}
					role="presentation"
				/>
			{/each}
			{#if selectedData}
				<rect
					x={(xScale(xAccessor(selectedData)) ?? 0) - xScale.bandwidth() * squareHoverScale * 0.5}
					y={(yScale(yAccessor(selectedData)) ?? 0) - yScale.bandwidth() * squareHoverScale * 0.5}
					width={xScale.bandwidth() + xScale.bandwidth() * squareHoverScale}
					height={yScale.bandwidth() + yScale.bandwidth() * squareHoverScale}
					fill={colorScale(valueAccessor(selectedData))}
					rx={3}
					stroke="#000"
					stroke-width={2}
					onmouseenter={() => setTooltipData(selectedData as HeatmapData)}
					onfocus={() => setTooltipData(selectedData as HeatmapData)}
					role="presentation"
				/>
			{/if}
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
				cursor: pointer;

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
