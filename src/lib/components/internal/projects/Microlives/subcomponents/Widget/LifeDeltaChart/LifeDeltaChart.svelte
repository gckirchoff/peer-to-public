<script lang="ts">
	import { scaleLinear, format } from 'd3';

	import type { Microlife, Sex } from '../constants';
	import { margin } from './constants';
	import DeltaLine from './DeltaLine/DeltaLine.svelte';

	export let microlives: Microlife[];
	export let sex: Sex;

	const numberFormatter = (num: number) => format('.1f')(num).toString().replace('.0', '');
	const red = '#D41C1C';
	const green = '#1F971F';

	let width = 400;
	let height = 150;

	$: barHeight = height / 3.25;

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	const baseAge = 35;
	const baseMicrolivesLeft = 1000000;
	const dayInMicrolives = 48;
	const daysPerYear = 365;
	$: averageMicrolivesLeft =
		sex === 'female' ? baseMicrolivesLeft : (baseMicrolivesLeft / (dayInMicrolives + 4)) * 48;
	$: unitedStatesLifeExpectancy = baseAge + averageMicrolivesLeft / dayInMicrolives / daysPerYear;
	$: microlifeChangePerDay = microlives.reduce<number>((acc, { value }) => (acc += value * -1), 0);
	$: yearsLeft = averageMicrolivesLeft / (dayInMicrolives + microlifeChangePerDay) / daysPerYear;

	$: totalLifeExpectancy = baseAge + yearsLeft;

	$: shorterThanAverage = totalLifeExpectancy < unitedStatesLifeExpectancy;
	$: x = shorterThanAverage ? xScale(totalLifeExpectancy) : xScale(unitedStatesLifeExpectancy);
	$: barWidth = shorterThanAverage
		? xScale(unitedStatesLifeExpectancy) - xScale(totalLifeExpectancy)
		: xScale(totalLifeExpectancy) - xScale(unitedStatesLifeExpectancy);

	$: lifeExpectancyDelta = numberFormatter(
		Math.abs(totalLifeExpectancy - unitedStatesLifeExpectancy),
	);

	$: xScale = scaleLinear()
		.domain([0, Math.max(100, totalLifeExpectancy)])
		.range([0, innerChartWidth]);

	$: middleHeight = innerChartHeight / 2 - barHeight / 2;
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<rect
				y={middleHeight}
				width={xScale(unitedStatesLifeExpectancy)}
				height={barHeight}
				fill="grey"
			/>
			<rect
				{x}
				y={middleHeight}
				width={barWidth}
				height={barHeight}
				fill={shorterThanAverage ? red : green}
			/>
			<line
				x1={xScale(unitedStatesLifeExpectancy)}
				y1={middleHeight}
				x2={xScale(unitedStatesLifeExpectancy)}
				y2={middleHeight + barHeight}
				stroke="black"
				stroke-width="3px"
			/>
			<DeltaLine
				delta={lifeExpectancyDelta}
				averageLifeSpan={unitedStatesLifeExpectancy}
				{middleHeight}
				{shorterThanAverage}
				{x}
				{barWidth}
				{xScale}
			/>
			<text
				x={xScale(unitedStatesLifeExpectancy)}
				y={middleHeight}
				dy={-8}
				text-anchor={shorterThanAverage ? 'start' : 'end'}
				class="text-white"
			>
				{numberFormatter(unitedStatesLifeExpectancy)}
			</text>
			{#if lifeExpectancyDelta !== '0'}
				<text
					x={shorterThanAverage ? x : x + barWidth}
					y={middleHeight}
					dy={-8}
					text-anchor={shorterThanAverage ? 'end' : 'start'}
					fill={shorterThanAverage ? red : green}
				>
					{numberFormatter(totalLifeExpectancy)}
				</text>
			{/if}
			<line y2={innerChartHeight} stroke="black" stroke-width={2} />
			<line
				x2={innerChartWidth}
				y1={innerChartHeight}
				y2={innerChartHeight}
				stroke="black"
				stroke-width={2}
			/>
		</g>
	</svg>
</div>

<style>
	rect,
	line {
		transition: all 400ms ease;

		stroke: var(--clr-text-on-surface-500);
	}

	.text-white {
		fill: var(--clr-text-on-surface-500);
	}
</style>
