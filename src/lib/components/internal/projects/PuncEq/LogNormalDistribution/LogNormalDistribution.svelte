<script lang="ts">
	import { scaleLinear, scaleLog, range, max, xml } from 'd3';

	import type { Margin } from '../../common/components/charts/constants';
	import AxisX from '../../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../../common/components/Line/Line.svelte';
	import { logNormalPDF } from '../logic.svelte';

	type Props = {
		mu: number;
		sigma: number;
		xDomainMin?: number;
		xDomainMax?: number;
		margin?: Partial<Margin>;
	};

	const defaultMargin: Margin = {
		top: 25,
		left: 75,
		bottom: 45,
		right: 15,
	};

	let { mu, sigma, margin = {}, xDomainMin, xDomainMax }: Props = $props();

	let width = $state(400);
	let height = $state(400);

	let usedMargin = $derived({ ...defaultMargin, ...margin });
	let innerChartWidth = $derived(width - usedMargin.left - usedMargin.right);
	let innerChartHeight = $derived(height - usedMargin.top - usedMargin.bottom);

	const xAccessor = (d: { x: number; y: number }) => d.x;
	const yAccessor = (d: { x: number; y: number }) => d.y;

	let xDomain = $derived.by(() => {
		const calculatedXMin = Math.exp(mu - 2 * sigma);
		const calculatedXMax = Math.exp(mu + 2 * sigma);
		const xMin = xDomainMin ? Math.max(calculatedXMin, xDomainMin) : calculatedXMin;
		const xMax = xDomainMax ? Math.min(calculatedXMax, xDomainMax) : calculatedXMax;
		return [xMin, xMax];
	});

	let data = $derived.by(() => {
		const [xMin, xMax] = xDomain;
		const numPoints = 500;
		const step = (xMax - xMin) / (numPoints - 1);
		const xValues = range(xMin, xMax, step);
		const data = xValues.map((x) => ({ x, y: logNormalPDF(x, mu, sigma) }));
		return data;
	});

	let xScale = $derived(scaleLinear().domain(xDomain).range([0, innerChartWidth]));

	let yScale = $derived(
		scaleLinear()
			.domain([0, max(data, yAccessor)] as [number, number])
			.range([innerChartHeight, 0]),
	);

	const xAccessorScaled = $derived((d: { x: number; y: number }) => xScale(xAccessor(d)));
	const yAccessorScaled = $derived((d: { x: number; y: number }) => yScale(yAccessor(d)));
</script>

<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height} role="application">
	<svg {width} {height}>
		<g style="transform: translate({usedMargin.left}px, {usedMargin.top}px)">
			<AxisX label="IFR" {innerChartWidth} {innerChartHeight} {xScale} />
			<AxisY label="density" {innerChartWidth} {yScale} />
			<Line {data} {xAccessorScaled} {yAccessorScaled} />
		</g>
	</svg>
</div>

<style lang="scss">
	.chart-container {
		// position: relative;
		height: 100%;
	}
</style>
