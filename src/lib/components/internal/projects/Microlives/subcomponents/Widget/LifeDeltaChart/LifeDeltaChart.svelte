<script lang="ts">
	import { scaleLinear } from 'd3';

	import type { Microlife } from '../constants';
	import { margin } from './constants';

	export let microlives: Microlife[];

	let width = 400;
	let height = 100;

	$: barHeight = height / 2.75;

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	const baseAge = 35;
	const unitedStatesLifeExpectancy = 78.54;
	const averageMicrolivesLeft = 1000000;
	const dayInMicrolives = 48;
	const daysPerYear = 365;
	$: microlifeChangePerDay = microlives.reduce<number>((acc, { value }) => (acc += value * -1), 0);
	$: yearsLeft = averageMicrolivesLeft / (dayInMicrolives + microlifeChangePerDay) / daysPerYear;
	$: totalLifeExpectancy = baseAge + yearsLeft;
	$: console.log('yearsLeft', yearsLeft);
	$: console.log('total', yearsLeft + 35);

	$: xScale = scaleLinear().domain([0, 100]).range([0, innerChartWidth]);

	$: middleHeight = innerChartHeight / 2 - barHeight / 2;

	$: shorterThanAverage = totalLifeExpectancy < unitedStatesLifeExpectancy;
	$: x = shorterThanAverage ? xScale(totalLifeExpectancy) : xScale(unitedStatesLifeExpectancy);
	$: barWidth = shorterThanAverage
		? xScale(unitedStatesLifeExpectancy) - xScale(totalLifeExpectancy)
		: xScale(totalLifeExpectancy) - xScale(unitedStatesLifeExpectancy);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<line y2={innerChartHeight} stroke="black" stroke-width={2} />
			<line
				x2={innerChartWidth}
				y1={innerChartHeight}
				y2={innerChartHeight}
				stroke="black"
				stroke-width={2}
			/>
			<rect
				y={middleHeight}
				width={xScale(unitedStatesLifeExpectancy)}
				height={barHeight}
				fill="grey"
			/>
			<rect {x} y={middleHeight} width={barWidth} height={barHeight} fill="red" />
			<text x={xScale(unitedStatesLifeExpectancy)} y={10} text-anchor="middle">
				{unitedStatesLifeExpectancy.toFixed(1)}
			</text>
			<text
				x={shorterThanAverage ? x : x + barWidth}
				dx={shorterThanAverage ? -5 : 5}
				y={middleHeight + 0.5 * barHeight}
				text-anchor={shorterThanAverage ? 'end' : 'start'}
				dominant-baseline="middle"
				fill="green"
			>
				{totalLifeExpectancy.toFixed(1)}
			</text>
		</g>
	</svg>
</div>
