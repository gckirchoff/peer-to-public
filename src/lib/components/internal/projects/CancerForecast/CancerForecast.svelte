<script lang="ts">
	import { extent, scaleLinear, scaleTime, line, max, curveNatural, format } from 'd3';

	import AxisX from './AxisX/AxisX.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Line from './Line/Line.svelte';
	import Gradient from './Gradient/Gradient.svelte';
	import type { Distribution, PredictedCases, Mode } from './constants';
	import { baselineCancer, beginningOfPandemic } from './constants';
	import { getExtraCases, addYearsToDate, timeBetween, getCasesOnDate } from './logic';

	const extraCasesGradientId = 'extra-cases-gradient';
	const gradientColors = ['#72ade8', 'rgb(236, 232, 253)'];

	let yearsFromNowToStartPrevention = 5;
	let hazardRatio = 1.5;
	let delay = 20;
	let mode: Mode = 'summed';

	let distributions: Distribution[] = [];
	let summedDistributions: PredictedCases[] = [];

	$: dateOfPrevention = addYearsToDate(beginningOfPandemic, yearsFromNowToStartPrevention);
	$: standardDeviation = delay / 3;
	$: finalDateToMeasureTo = addYearsToDate(dateOfPrevention, delay + standardDeviation * 3);

	$: {
		const extraCancer = getExtraCases(hazardRatio, baselineCancer);
		const yearsDifference = dateOfPrevention.getFullYear() - beginningOfPandemic.getFullYear();
		const newDistributions: Distribution[] = [];
		for (let i = 0; i <= yearsDifference; i++) {
			const yearOfInfections = beginningOfPandemic.getFullYear() + i;
			const infectionsBinDate =
				i === yearsDifference ? dateOfPrevention : new Date(yearOfInfections, 11, 31);
			const futureMeanIncidenceDate = addYearsToDate(infectionsBinDate, delay);

			const casesOnDates: PredictedCases[] = [];
			const yearsUntilEndOfMeasuring =
				finalDateToMeasureTo.getFullYear() - infectionsBinDate.getFullYear();
			for (let i = 0; i <= yearsUntilEndOfMeasuring; i++) {
				const yearOfCaseOnset = infectionsBinDate.getFullYear() + i;
				const delayedOnsetBin =
					i === yearsUntilEndOfMeasuring ? finalDateToMeasureTo : new Date(yearOfCaseOnset, 11, 31);
				const cancerCasesOnDate = getCasesOnDate(
					delayedOnsetBin,
					futureMeanIncidenceDate,
					standardDeviation,
					extraCancer,
				);
				casesOnDates.push({ date: delayedOnsetBin, cases: cancerCasesOnDate });
			}

			const distribution: Distribution = {
				start: infectionsBinDate,
				mean: futureMeanIncidenceDate,
				predictedCases: casesOnDates,
				standardDeviation,
			};

			newDistributions.push(distribution);
		}
		distributions = newDistributions;

		const newSummedDistributions: PredictedCases[] = [];
		const yearsOfEntireChart =
			finalDateToMeasureTo.getFullYear() - beginningOfPandemic.getFullYear();
		for (let i = 0; i <= yearsOfEntireChart; i++) {
			const yearOfCurrentDate = beginningOfPandemic.getFullYear() + i;
			const currentDate =
				i === yearsOfEntireChart ? finalDateToMeasureTo : new Date(yearOfCurrentDate, 11, 31);

			const totalCases = newDistributions.reduce((acc: number, distribution) => {
				const predictedCases = distribution.predictedCases.find(
					({ date }) => date.getTime() === currentDate.getTime(),
				);
				acc += predictedCases?.cases ?? 0;
				return acc;
			}, 0);

			newSummedDistributions.push({ date: currentDate, cases: totalCases });
		}
		summedDistributions = newSummedDistributions;
	}

	const xAccessor = (d: PredictedCases) => d.date;
	const yAccessor = (d: PredictedCases) => d.cases + baselineCancer;

	let width = 400;
	let height = 550;

	const margin = {
		top: 60,
		left: 45,
		bottom: 50,
		right: 30,
	};

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	$: xScale = scaleTime()
		.domain([beginningOfPandemic, new Date('2100/05/12')] as [Date, Date])
		.range([0, innerChartWidth])
		.nice();

	// $: domain = (
	// 	mode === 'separate'
	// 		? [0, max(distributions[0].predictedCases, yAccessor)]
	// 		: [0, max(summedDistributions, yAccessor)]
	// ) as [number, number];

	$: domain = (
		mode === 'separate'
			? [0, max(distributions[0].predictedCases, yAccessor)]
			: [0, Math.max(6000000, max(summedDistributions, yAccessor) as number)]
	) as [number, number];

	$: yScale = scaleLinear().domain(domain).range([innerChartHeight, 0]).nice();

	$: xAccessorScaled = (d: PredictedCases) => xScale(xAccessor(d));
	$: yAccessorScaled = (d: PredictedCases) => yScale(yAccessor(d));
	$: y0AccessorScaled = yScale(yScale.domain()[0]);

	$: lineGenerator = line<PredictedCases>()
		.x((d) => xScale(xAccessor(d)))
		.y((d) => yScale(yAccessor(d)))
		.curve(curveNatural);
</script>

<div>
	<label>
		{hazardRatio} Hazard Ratio:
		<input bind:value={hazardRatio} type="range" min={1} max={3} step={0.1} />
	</label>
	<label>
		{delay} year delay: <input bind:value={delay} type="range" min={5} max={50} step={1} />
	</label>
	<label>
		Start prevention on {dateOfPrevention.toLocaleDateString()}:
		<input bind:value={yearsFromNowToStartPrevention} type="range" min={0} max={15} step={1} />
	</label>
	<p>
		{format('.2s')(Math.floor(summedDistributions.reduce((acc, { cases }) => acc + cases, 0)))} extra
		cases
	</p>
</div>
<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style:transform="translate({margin.left}px, {margin.top}px)">
			<defs>
				<Gradient id={extraCasesGradientId} colors={gradientColors} x2="0" y2="100%" />
			</defs>
			<AxisX {xScale} height={innerChartHeight} />
			<AxisY {yScale} />
			<rect
				x={0}
				y={yScale(baselineCancer)}
				width={innerChartWidth}
				height={innerChartHeight - yScale(baselineCancer)}
				fill="rgba(232, 219, 12, 0.30)"
			/>
			<line
				x2={innerChartWidth}
				y1={yScale(baselineCancer)}
				y2={yScale(baselineCancer)}
				stroke="#FFA500"
				stroke-width={1}
			/>
			{#if mode === 'summed' || mode === 'both'}
				<!-- <path
					d={lineGenerator(summedDistributions)}
					stroke-width="2"
					fill="transparent"
					stroke="blue"
				/> -->
				<Line
					type="area"
					data={summedDistributions}
					{xAccessorScaled}
					{yAccessorScaled}
					y0AccessorScaled={yScale(baselineCancer)}
					style="fill: url(#{extraCasesGradientId})"
				/>
				<Line
					data={summedDistributions}
					{xAccessorScaled}
					{yAccessorScaled}
					style="stroke: #67a4e0;"
				/>
			{/if}
			{#if mode === 'separate' || mode === 'both'}
				{#each distributions as distribution}
					<path
						d={lineGenerator(distribution.predictedCases)}
						stroke-width="2"
						fill="transparent"
						stroke="blue"
					/>
				{/each}
			{/if}
			<line
				x1={xScale(dateOfPrevention)}
				y1={15}
				x2={xScale(dateOfPrevention)}
				y2={yScale(baselineCancer)}
				stroke-width={2}
				stroke="red"
			/>
		</g>
	</svg>
</div>

<style lang="scss">
	:global(.tick text) {
		font-weight: 500;
		font-size: 15px;
		fill: #565656;
	}
</style>
