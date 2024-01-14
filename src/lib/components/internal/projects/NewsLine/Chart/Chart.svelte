<script lang="ts">
	import { spring } from 'svelte/motion';
	import { extent, scaleLinear, scaleTime, line, curveNatural, utcFormat } from 'd3';

	import AxisY from './AxisY/AxisY.svelte';
	import AxisX from './AxisX/AxisX.svelte';
	import type { WastewaterReport } from '../constants';
	import { stoppingPoints } from './constants';
	import Article from './Article/Article.svelte';

	const margin = {
		top: 25,
		right: 25,
		bottom: 20,
		left: 40,
	};

	export let data: WastewaterReport[];
	export let currentStep: number | undefined;

	const xAccessor = (d: WastewaterReport) => new Date(d.date);
	const yAccessor = (d: WastewaterReport) => d.value;
	const dateFormatter = utcFormat('%b %Y');

	let width = 400;
	let height = 1;

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;

	$: xScale = scaleTime()
		.domain(extent(data, xAccessor) as [Date, Date])
		.range([0, innerWidth]);

	$: yScale = scaleLinear()
		.domain(extent(data, yAccessor) as [number, number])
		.range([innerHeight, 0]);

	$: path = line<WastewaterReport>()
		.x((d) => xScale(xAccessor(d)))
		.y((d) => yScale(yAccessor(d)))
		.curve(curveNatural)(data);

	$: stoppingPoint = stoppingPoints[currentStep ?? 0];

	let linePercent = spring(0, {
		stiffness: 0.08,
		damping: 0.8,
	});

	$: $linePercent = stoppingPoint.index / (data.length - 1);
</script>

<div class="viz">
	<div class="headlines-container">
		<Article article={stoppingPoint.science} />
		<Article article={stoppingPoint.media} />
	</div>
	<div class="description">{stoppingPoint.description}</div>
	<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
		<svg {width} {height}>
			<g transform="translate({margin.left} {margin.top})">
				<AxisX {xScale} {dateFormatter} height={innerHeight} />
				<AxisY {yScale} width={innerWidth} />
				<mask id="line-mask">
					<rect x={0} y={0} width={innerWidth} height={innerHeight} fill="black" />
					<rect x={0} y={0} width={innerWidth * $linePercent} height={innerHeight} fill="white" />
				</mask>
				<path d={path} fill="none" stroke="steelblue" stroke-width="2" mask="url(#line-mask)" />
			</g>
		</svg>
	</div>
</div>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	:global(.tick text) {
		font-weight: 400;
		font-size: 15px;
		fill: #747474;
	}

	.viz {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2fr 1fr 2fr;

		@include respond('mobile') {
			grid-template-rows: 2fr 1fr 1fr;
		}

		.headlines-container {
			// align-self: flex-start;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
		}

		.description {
			padding: var(--spacing-16);
			max-width: 72rem;
			align-self: flex-start;
			justify-self: center;
			background-color: var(--clr-surface-600);
			border-radius: var(--rounded-4);
		}
	}
</style>
