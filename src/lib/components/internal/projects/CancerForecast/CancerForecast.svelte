<script lang="ts">
	import { extent, scaleLinear, scaleTime, line, max, curveNatural } from 'd3';

	import type { Distribution, PredictedCases, Mode } from './constants';
	import { baselineCancer, beginningOfPandemic } from './constants';
	import { getExtraCases, addYearsToDate, timeBetween, getCasesOnDate } from './logic';

	let hazardRatio = 1.5;
	let delay = 20;
	let dateOfPrevention = new Date('2025/05/12');
	let mode: Mode = 'both';

	let distributions: Distribution[] = [];
	let summedDistributions: PredictedCases[] = [];

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

		console.log('distributions', distributions);
	}

	const xAccessor = (d: PredictedCases) => d.date;
	const yAccessor = (d: PredictedCases) => d.cases;

	let width = 400;
	let height = 550;

	const margin = {
		top: 60,
		left: 30,
		bottom: 50,
		right: 30,
	};

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	$: xScale = scaleTime()
		.domain([beginningOfPandemic, new Date('2100/05/12')] as [Date, Date])
		.range([0, innerChartWidth])
		.nice();

	$: domain = (
		mode === 'separate'
			? [0, max(distributions[0].predictedCases, yAccessor)]
			: [0, max(summedDistributions, yAccessor)]
	) as [number, number];

	$: yScale = scaleLinear().domain(domain).range([innerChartHeight, 0]).nice();

	$: lineGenerator = line<PredictedCases>()
		.x((d) => xScale(xAccessor(d)))
		.y((d) => yScale(yAccessor(d)))
		.curve(curveNatural);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<svg {width} {height}>
		<g style:transform="translate({margin.left}px, {margin.top}px)">
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
			{#if mode === 'aggregate' || mode === 'both'}
				<path
					d={lineGenerator(summedDistributions)}
					stroke-width="2"
					fill="transparent"
					stroke="blue"
				/>
			{/if}
		</g>
	</svg>
</div>
