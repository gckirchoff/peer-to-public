<script lang="ts">
	import { extent, scaleLinear, scaleTime, line, curveNatural, utcFormat } from 'd3';

	import AxisY from './AxisY/AxisY.svelte';
	import AxisX from './AxisX/AxisX.svelte';
	import Articles from './Articles/Articles.svelte';
	import Description from './Description/Description.svelte';
	import type { WastewaterReport } from '../constants';
	import { stoppingPoints } from './constants';

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
	let height = 50;

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

	$: linePercent = stoppingPoint.index / (data.length - 1);

	$: flooredInnerHeight = Math.max(innerHeight, 0);
	$: flooredInnerWidth = Math.max(innerWidth, 0);
</script>

<div class="viz">
	<Articles {stoppingPoint} />
	<Description description={stoppingPoint.description} />
	<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
		<svg {width} {height}>
			<g transform="translate({margin.left} {margin.top})">
				<AxisX {xScale} {dateFormatter} height={flooredInnerHeight} />
				<AxisY {yScale} width={flooredInnerWidth} />
				<mask id="line-mask">
					<rect x={0} y={0} width={flooredInnerWidth} height={flooredInnerHeight} fill="black" />
					<rect
						x={0}
						y={0}
						height={flooredInnerHeight}
						fill="white"
						class="curtain"
						style="width: {linePercent * 100}%"
					/>
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
		fill: #565656;
	}

	.viz {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 35rem 1fr 2fr;

		.curtain {
			transition: width 500ms 1500ms ease;
		}
	}
</style>
