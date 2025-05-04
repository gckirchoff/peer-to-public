<script lang="ts">
	import { draw, fade } from 'svelte/transition';
	import { scaleBand, scaleLinear, extent, scaleOrdinal, schemeCategory10, quantile } from 'd3';

	import AxisY from '../common/AxisY/AxisY.svelte';
	import type { BoxPlotProps } from './constants';
	import { defaultMargin } from './constants';
	import AxisXCategorical from './AxisXCategorical/AxisXCategorical.svelte';

	let { series, title, yLabel, xLabel, margin }: BoxPlotProps = $props();

	let width = $state(0);
	let height = $state(0);

	let usedMargin = $derived({ ...defaultMargin, ...margin });
	let chartWidth = $derived(width - usedMargin.left - usedMargin.right);
	let chartHeight = $derived(height - usedMargin.top - usedMargin.bottom);

	let allGroups = $derived(series.map((d) => d.group));
	let allValues = $derived(series.flatMap((d) => d.values));
	let colorScale = $derived(scaleOrdinal<string>().domain(allGroups).range(schemeCategory10));

	let xScale = $derived(scaleBand().domain(allGroups).range([0, chartWidth]).padding(0.4));

	let yScale = $derived(
		scaleLinear()
			.domain(extent(allValues) as [number, number])
			.range([chartHeight, 0]),
	);

	function computeBoxStats(values: number[]) {
		values.sort((a, b) => a - b);
		const q1 = quantile(values, 0.25)!;
		const median = quantile(values, 0.5)!;
		const q3 = quantile(values, 0.75)!;
		const iqr = q3 - q1;
		const min = Math.max(Math.min(...values), q1 - 1.5 * iqr);
		const max = Math.min(Math.max(...values), q3 + 1.5 * iqr);
		return { q1, median, q3, min, max };
	}

	let show = $state(false);
	$effect(() => {
		show = true;
	});
</script>

<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		<g style="transform: translate({usedMargin.left}px,{usedMargin.top}px)">
			<text x={chartWidth * 0.5} y={-25} text-anchor="middle" dominant-baseline="middle"
				>{title}</text
			>
			<AxisXCategorical
				{xScale}
				innerChartWidth={chartWidth}
				innerChartHeight={chartHeight}
				label={xLabel}
			/>
			<AxisY {yScale} innerChartWidth={chartWidth} label={yLabel} />
			{#each series as { group, values }}
				{@const stats = computeBoxStats(values)}
				{#if show}
					<g style="transform: translate({xScale(group)}px,0px)">
						<!-- Whiskers -->

						<line
							x1={xScale.bandwidth() * 0.5}
							x2={xScale.bandwidth() * 0.5}
							y1={yScale(stats.min)}
							y2={yScale(stats.max)}
							stroke={colorScale(group)}
							transition:draw
						/>
						<line
							x1={xScale.bandwidth() * 0.5 - 10}
							x2={xScale.bandwidth() * 0.5 + 10}
							y1={yScale(stats.min)}
							y2={yScale(stats.min)}
							stroke={colorScale(group)}
							stroke-width={2}
							transition:fade={{ delay: 450 }}
						/>
						<line
							x1={xScale.bandwidth() * 0.5 - 10}
							x2={xScale.bandwidth() * 0.5 + 10}
							y1={yScale(stats.max)}
							y2={yScale(stats.max)}
							stroke={colorScale(group)}
							stroke-width={2}
							transition:fade={{ delay: 450 }}
						/>

						<!-- Box -->
						<rect
							x={0}
							y={yScale(stats.q3)}
							width={Math.max(xScale.bandwidth(), 0)}
							height={Math.max(yScale(stats.q1) - yScale(stats.q3), 0)}
							fill="{colorScale(group)}AA"
							stroke={colorScale(group)}
							transition:fade
						/>

						<!-- Median -->
						<line
							x1={0}
							x2={xScale.bandwidth()}
							y1={yScale(stats.median)}
							y2={yScale(stats.median)}
							stroke="black"
							stroke-width={1}
							transition:draw
						/>
					</g>
				{/if}
			{/each}
		</g>
	</svg>
</div>

<style lang="scss">
	.chart-container {
		position: relative;
		height: 100%;
	}
</style>
