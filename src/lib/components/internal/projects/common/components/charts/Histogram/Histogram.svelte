<script lang="ts">
	import { bin, extent, scaleLinear, scaleOrdinal, schemeCategory10 } from 'd3';

	import AxisX from '../common/AxisX/AxisX.svelte';
	import AxisY from '../common/AxisY/AxisY.svelte';
	import AnimatedRectangle from '../common/AnimatedRectangle/AnimatedRectangle.svelte';
	import { defaultMargin, type HistogramProps, bucketPadding } from './constants';
	import Legend from './Legend/Legend.svelte';
	import { getYDomain } from './logic';

	let {
		series,
		title,
		yLabel,
		xLabel,
		bucketNumber = 30,
		xDomain,
		yDomain,
		margin,
		showPercentage = false,
	}: HistogramProps = $props();

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

	// let yScale1 = $derived(
	// 	scaleLinear()
	// 		.domain(yDomain ?? [0, Math.max(...bucketGenerator(allData).map((bucket) => bucket?.length))])
	// 		.range([chartHeight, 0]),
	// );

	let totalCount = $derived(allData.length);

	let yScale = $derived.by(() => {
		const allBuckets = series.map((group) => bucketGenerator(group.values));
		const maxBucketValue = Math.max(
			...allBuckets.flatMap((buckets) => buckets.map((bucket) => bucket?.length ?? 0)),
		);
		const maxPercent = maxBucketValue / totalCount;

		const domain = getYDomain({
			yDomain,
			showPercentage,
			maxBucketValue,
			maxPercent,
		});

		return scaleLinear().domain(domain).range([chartHeight, 0]);
	});

	let groupBuckets = $derived(
		series.map((group) => ({
			group: {
				...group,
				color: group.color ?? colorScale(group.group),
			},
			buckets: bucketGenerator(group.values),
		})),
	);

	let legendGroups = $derived(
		groupBuckets.map((group) => ({
			label: group.group.group,
			color: group.group.color ?? colorScale(group.group.group),
		})),
	);
</script>

<div class="chart-container histogram" bind:clientWidth={width} bind:clientHeight={height}>
	<svg {width} {height}>
		<g style="transform: translate({usedMargin.left}px, {usedMargin.top}px);">
			<text x={chartWidth * 0.5} y={-25} text-anchor="middle" dominant-baseline="middle"
				>{title}</text
			>
			<AxisX {xScale} innerChartWidth={chartWidth} innerChartHeight={chartHeight} label={xLabel} />
			<AxisY
				{yScale}
				innerChartWidth={chartWidth}
				label={yLabel}
				formatter={showPercentage ? (d) => `${(d * 100).toFixed(0)}%` : undefined}
			/>
			{#each groupBuckets as group}
				{#each group.buckets as bucket, i}
					{@const rawValue = showPercentage ? bucket.length / totalCount : bucket.length}
					{@const value = Math.max(0, rawValue)}
					{@const y = yScale(value)}
					{@const height = Math.max(0, chartHeight - y)}
					<AnimatedRectangle
						x={xScale(bucket.x0 as number) + bucketPadding * 0.5}
						{y}
						width={xScale(bucket.x1 as number) - xScale(bucket.x0 as number) - bucketPadding}
						{height}
						fill={group.group.color}
						stroke={group.group.color}
						stroke-width={2}
						opacity={0.8}
						animationOptions={{ delay: i * 10 }}
					/>
				{/each}
			{/each}
			<Legend groups={legendGroups} {chartWidth} {chartHeight} />
		</g>
	</svg>
</div>

<style lang="scss">
	.chart-container {
		position: relative;
		height: 100%;
	}
</style>
