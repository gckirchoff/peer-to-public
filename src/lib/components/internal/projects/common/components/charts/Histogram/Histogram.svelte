<script lang="ts">
	import { bin, extent, scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3';

	import AxisX from '../../AxisX/AxisX.svelte';
	import AxisY from '../../AxisY/AxisY.svelte';
	import Rectangle from './Rectangle/Rectangle.svelte';
	import { defaultMargin, type HistogramProps, bucketPadding } from './constants';

	let { series, yLabel, bucketNumber = 15, xDomain, yDomain, margin }: HistogramProps = $props();

	let width = $state(0);
	let height = $state(0);

	let usedMargin = $derived({ ...defaultMargin, ...margin });

	let chartWidth = $derived(width - usedMargin.left - usedMargin.right);
	let chartHeight = $derived(height - usedMargin.top - usedMargin.bottom);

	let allGroups = $derived(series.map((series) => series.group));
	let allData = $derived([...series.map((d) => d.values)].flat());

	let colorScale = $derived(scaleOrdinal<string>().domain(allGroups).range(schemeCategory10));

	let xScale = $derived(
		scaleLinear()
			.domain(xDomain ?? (extent(allData) as [number, number]))
			.range([0, chartWidth]),
	);

	let bucketGenerator = $derived(
		bin()
			.value((d) => d)
			.domain(xScale.domain() as [number, number])
			.thresholds(() => {
				return xScale.ticks(bucketNumber);
				// more exact way
				// const [min, max] = xScale.domain();
				// const step = (max - min) / bucketNumber;
				// return Array.from({ length: bucketNumber + 1 }, (_, i) => min + i * step);
			}),
	);

	let yScale = $derived(
		scaleLinear()
			.domain(yDomain ?? [0, Math.max(...bucketGenerator(allData).map((bucket) => bucket?.length))])
			.range([chartHeight, 0]),
	);

	let groupBuckets = $derived(
		series.map((group) => ({
			group,
			buckets: bucketGenerator(group.values),
		})),
	);
</script>

<div class="chart-container histogram" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		<g style="transform: translate({usedMargin.left}px, {usedMargin.top}px);">
			<AxisX {xScale} innerChartWidth={chartWidth} innerChartHeight={chartHeight} />
			<AxisY {yScale} innerChartWidth={chartWidth} label={yLabel} />
			{#each groupBuckets as group}
				{#each group.buckets as bucket}
					<Rectangle
						x={xScale(bucket.x0 as number) + bucketPadding * 0.5}
						y={yScale(bucket.length)}
						width={xScale(bucket.x1 as number) - xScale(bucket.x0 as number) - bucketPadding}
						height={chartHeight - yScale(bucket.length)}
						fill="{colorScale(group.group.group)}E8"
						stroke={colorScale(group.group.group)}
						stroke-width={2}
						opacity={0.7}
					/>
				{/each}
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
