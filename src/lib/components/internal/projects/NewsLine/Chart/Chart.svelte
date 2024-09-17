<script lang="ts">
	import { onMount } from 'svelte';
	import { max, extent, scaleLinear, scaleTime, line, curveNatural, utcFormat, brushX } from 'd3';

	import AxisY from './AxisY/AxisY.svelte';
	import AxisX from './AxisX/AxisX.svelte';
	import Articles from './Articles/Articles.svelte';
	import Description from './Description/Description.svelte';
	import type { WastewaterReport } from '../constants';
	import { stoppingPoints } from '../constants';
	import Line from '../../common/components/Line/Line.svelte';
	import { fade } from 'svelte/transition';

	const margin = {
		top: 25,
		right: 25,
		bottom: 20,
		left: 75,
	};

	export let data: WastewaterReport[];
	export let currentStep: number | undefined;

	const xAccessor = (d: WastewaterReport) => {
		const [month, day, year] = d.date.split('-');
		const formattedDate = `${year}/${month}/${day}`;
		return new Date(formattedDate);
	};
	const yAccessor = (d: WastewaterReport) => d.value;
	const dateFormatter = utcFormat('%b %Y');

	let width = 400;
	let height = 50;

	$: innerWidth = width - margin.left - margin.right;
	$: innerHeight = height - margin.top - margin.bottom;

	$: stoppingPoint = stoppingPoints[currentStep ?? 0];
	$: console.log('stoppingPoint', stoppingPoint);
	$: dataIndex = stoppingPoint.index;
	$: dataWindow = data.slice(Math.max(dataIndex - 4, 0), dataIndex);

	$: console.log('dataIndex', data[dataIndex]);

	$: xScale = scaleTime()
		.domain(extent(dataWindow, xAccessor) as [Date, Date])
		.range([0, innerWidth]);

	$: yScale = scaleLinear()
		.domain([0, (max(data, yAccessor) + max(dataWindow, yAccessor)) / 2] as [number, number])
		.range([innerHeight, 0]);

	$: xAccessorScaled = (d: WastewaterReport) => xScale(xAccessor(d));
	$: yAccessorScaled = (d: WastewaterReport) => yScale(yAccessor(d));

	$: path = line<WastewaterReport>()
		.x((d) => xScale(xAccessor(d)))
		.y((d) => yScale(yAccessor(d)))
		.curve(curveNatural)(data);

	$: linePercent = stoppingPoint.index / (data.length - 1);

	$: flooredInnerHeight = Math.max(innerHeight, 0);
	$: flooredInnerWidth = Math.max(innerWidth, 0);
</script>

<div class="viz news-line">
	<div class="chart-container" bind:clientWidth={width} bind:clientHeight={height}>
		<svg {width} {height}>
			<g style="transform: translate({margin.left}px, {margin.top}px);">
				<AxisX {xScale} {dateFormatter} height={flooredInnerHeight} />
				<AxisY
					{yScale}
					width={flooredInnerWidth}
					height={flooredInnerHeight}
					label="Concentration (copies/mL)"
				/>
				<mask id="line-mask">
					<rect x={0} y={0} width={flooredInnerWidth} height={flooredInnerHeight} fill="black" />
					<rect
						x={0}
						y={0}
						width={flooredInnerWidth}
						height={flooredInnerHeight}
						fill="white"
						class="curtain"
					/>
				</mask>
				<Line
					{data}
					{xAccessorScaled}
					{yAccessorScaled}
					style="stroke: var(--clr-primary-600); mask-image: url(#line-mask);"
				/>
				{#key currentStep}
					<g in:fade={{ delay: 500 }}>
						<circle
							class="pulse"
							cx={xScale(xAccessor(dataWindow.at(-1)))}
							cy={yScale(yAccessor(dataWindow.at(-1)))}
						/>
						<circle
							cx={xScale(xAccessor(dataWindow.at(-1)))}
							cy={yScale(yAccessor(dataWindow.at(-1)))}
							r={5}
						/>
					</g>
				{/key}
			</g>
		</svg>
	</div>
	<Articles {stoppingPoint} />
	<Description description={stoppingPoint.description} />
</div>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	:global(.news-line .tick text) {
		font-weight: 400;
		font-size: 15px;
		fill: #565656;
	}

	.viz {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 20rem 20rem 1fr;
		grid-template-areas:
			'chart article-top'
			'chart article-bottom'
			'summary summary';
		gap: var(--spacing-8);

		.chart-container {
			grid-area: chart;

			.curtain {
				transition: width 500ms 1500ms ease;
			}
		}

		circle {
			fill: var(--clr-primary-500);
			// transition: 1000ms ease;
		}

		.pulse {
			r: 20px;
			animation: pulse 2s infinite;
			transform-origin: center center;
		}

		@keyframes pulse {
			0% {
				r: 0;
				opacity: 1;
			}
			100% {
				r: 17px;
				opacity: 0;
			}
		}
	}
</style>
