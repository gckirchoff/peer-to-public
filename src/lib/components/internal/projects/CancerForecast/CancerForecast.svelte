<script lang="ts">
	import { extent, scaleLinear, scaleTime, line, max, curveNatural, format } from 'd3';

	import { Body1, Body2 } from '../../typography';
	import AxisX from './AxisX/AxisX.svelte';
	import AxisY from './AxisY/AxisY.svelte';
	import Line from './Line/Line.svelte';
	import Gradient from './Gradient/Gradient.svelte';
	import type { Distribution, PredictedCases, Mode, PreventionDeterminant } from './constants';
	import { baselineCancer, beginningOfPandemic, endOfChart } from './constants';
	import {
		getExtraCases,
		addYearsToDate,
		timeBetween,
		getCasesOnDate,
		getCasesUpToDate,
		getCumulativeCasesUpToDate,
		createPredictedCases,
		getDistributions,
		createSummedDistribution,
	} from './logic';

	const numberFormatter = (num: number): string => format('.2s')(num).replace('G', 'B');
	const extraCasesGradientId = 'extra-cases-gradient';
	const gradientColors = ['#72ade8', 'rgb(236, 232, 253)'];

	let preventionDeterminant: PreventionDeterminant = 'panic';
	let yearsFromNowToStartPrevention = 5;
	let hazardRatio = 1.5;
	let delay = 20;
	let mode: Mode = 'summed';

	let panicThreshold = 0.05;
	let panicPredictionPoint: PredictedCases | null = null;

	let distributions: Distribution[] = [];
	let summedDistributions: PredictedCases[] = [];

	$: dateOfPrevention = addYearsToDate(beginningOfPandemic, yearsFromNowToStartPrevention);
	$: standardDeviation = delay / 3;
	$: finalDateToMeasureTo = addYearsToDate(dateOfPrevention, delay + standardDeviation * 3);
	$: totalExtraCases = Math.floor(summedDistributions.reduce((acc, { cases }) => acc + cases, 0));
	$: casesThatHaveOccuredSoFar = getCumulativeCasesUpToDate(
		preventionDeterminant === 'date'
			? dateOfPrevention
			: panicPredictionPoint
				? panicPredictionPoint.date
				: endOfChart,
		summedDistributions,
	);
	$: casesYetToCome = totalExtraCases - casesThatHaveOccuredSoFar;

	$: {
		const extraCancer = getExtraCases(hazardRatio, baselineCancer);

		if (preventionDeterminant === 'date') {
			const newDistributions = getDistributions({
				beginningOfPandemic,
				dateOfPrevention,
				finalDateToMeasureTo,
				extraCases: extraCancer,
				delay,
				stdDeviation: standardDeviation,
			});
			distributions = newDistributions;

			const newSummedDistributions = createSummedDistribution({
				beginningOfPandemic,
				finalDateToMeasureTo,
				distributions: newDistributions,
			});
			summedDistributions = newSummedDistributions;
		} else {
			const fullScopeDate = addYearsToDate(endOfChart, 10);

			const allDistributions = getDistributions({
				beginningOfPandemic,
				dateOfPrevention: fullScopeDate,
				finalDateToMeasureTo: fullScopeDate,
				extraCases: extraCancer,
				delay,
				stdDeviation: standardDeviation,
			});

			const worstCaseSum = createSummedDistribution({
				beginningOfPandemic,
				finalDateToMeasureTo: fullScopeDate,
				distributions: allDistributions,
			});

			const panicExtraCasesAmount = baselineCancer * (1 + panicThreshold);
			const panicIndex = worstCaseSum.findIndex(
				({ cases }) => cases + baselineCancer > panicExtraCasesAmount,
			);

			const pointOfPanic = worstCaseSum[panicIndex];

			if (!pointOfPanic) {
				panicPredictionPoint = null;
				distributions = allDistributions;
				summedDistributions = worstCaseSum;
			} else {
				const panicDateToMeasureTo = addYearsToDate(
					pointOfPanic.date,
					delay + standardDeviation * 3,
				);

				const distributionsUntilPanic = getDistributions({
					beginningOfPandemic,
					dateOfPrevention: pointOfPanic.date,
					finalDateToMeasureTo: panicDateToMeasureTo,
					extraCases: extraCancer,
					delay,
					stdDeviation: standardDeviation,
				});

				const panicSummedDistributions = createSummedDistribution({
					beginningOfPandemic,
					finalDateToMeasureTo: panicDateToMeasureTo,
					distributions: distributionsUntilPanic,
				});

				panicPredictionPoint = pointOfPanic;
				distributions = distributionsUntilPanic;
				summedDistributions = panicSummedDistributions;
			}
		}
	}

	const xAccessor = (d: PredictedCases) => d.date;
	const yAccessor = (d: PredictedCases) => d.cases + baselineCancer;

	let width = 400;
	let height = 550;

	const margin = {
		top: 10,
		left: 45,
		bottom: 50,
		right: 30,
	};

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	$: xDomainEnd =
		preventionDeterminant === 'date'
			? finalDateToMeasureTo
			: panicPredictionPoint
				? addYearsToDate(panicPredictionPoint.date, delay + standardDeviation * 3)
				: endOfChart;

	$: xScale = scaleTime()
		.domain([beginningOfPandemic, xDomainEnd])
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
			: [0, Math.max(54000000, max(summedDistributions, yAccessor) as number)]
	) as [number, number];

	$: yScale = scaleLinear().domain(domain).range([innerChartHeight, 0]).nice();

	$: xAccessorScaled = (d: PredictedCases) => xScale(xAccessor(d));
	$: yAccessorScaled = (d: PredictedCases) => yScale(yAccessor(d));
	$: y0AccessorScaled = yScale(yScale.domain()[0]);

	$: lineGenerator = line<PredictedCases>()
		.x((d) => xScale(xAccessor(d)))
		.y((d) => yScale(yAccessor(d)))
		.curve(curveNatural);

	$: indexOfLastPointToRender = summedDistributions.findIndex(
		({ date }) => date >= xScale.domain()[1],
	);
	$: renderedSummedCases = summedDistributions.slice(0, indexOfLastPointToRender);

	let preventionStartInfoBox: SVGGElement | null = null;
	let preventionStartInfoBoxXPosition = 0;

	$: {
		if (preventionDeterminant === 'panic' && preventionStartInfoBox && panicPredictionPoint) {
			const { width: boxWidth } = preventionStartInfoBox.getBoundingClientRect();
			const xPosition = xScale(panicPredictionPoint.date);
			const isOverflowingRightBoundary = xPosition + boxWidth > innerChartWidth;
			preventionStartInfoBoxXPosition = isOverflowingRightBoundary
				? xPosition - boxWidth - 20
				: xPosition;
		}
	}

	$: panicThresholdYPosition = yScale(baselineCancer * (1 + panicThreshold));
</script>

<div>
	<div class="inputs-container">
		<label class="range-input">
			<div class="determinant-selector">
				{#if preventionDeterminant === 'date'}
					<Body2>
						{dateOfPrevention.toLocaleDateString()}
					</Body2>
				{:else}
					<Body2>{Math.round(panicThreshold * 100)}%</Body2>
				{/if}
				<select bind:value={preventionDeterminant}>
					<option value="panic">extra cases panic threshold</option>
					<option value="date">date of prevention</option>
				</select>
			</div>
			{#if preventionDeterminant === 'date'}
				<input bind:value={yearsFromNowToStartPrevention} type="range" min={0} max={30} step={1} />
			{:else}
				<input bind:value={panicThreshold} type="range" min={0} max={3} step={0.01} />
			{/if}
		</label>
		<label class="range-input">
			<Body2>
				{hazardRatio} Hazard Ratio:
			</Body2>
			<input bind:value={hazardRatio} type="range" min={1} max={10} step={0.1} />
		</label>
		<label class="range-input">
			<Body2>
				{delay} year delay:
			</Body2>
			<input bind:value={delay} type="range" min={5} max={50} step={1} />
		</label>
	</div>
	<div class="chart-container" bind:clientWidth={width}>
		<svg {width} {height}>
			<g style:transform="translate({margin.left}px, {margin.top}px)">
				<defs>
					<Gradient id={extraCasesGradientId} colors={gradientColors} x2="0" y2="100%" />
				</defs>
				<AxisX {xScale} width={innerChartWidth} height={innerChartHeight} />
				<AxisY {yScale} />
				<rect
					x={0}
					y={yScale(baselineCancer)}
					width={innerChartWidth}
					height={innerChartHeight - yScale(baselineCancer)}
					fill="rgba(232, 219, 12, 0.30)"
				/>
				<text
					x={innerChartWidth - 10}
					y={yScale(baselineCancer) + 20}
					text-anchor="end"
					class="baseline-text"
				>
					Baseline Cancer
				</text>
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
						data={renderedSummedCases}
						{xAccessorScaled}
						{yAccessorScaled}
						y0AccessorScaled={yScale(baselineCancer)}
						style="fill: url(#{extraCasesGradientId})"
					/>
					<Line
						data={renderedSummedCases}
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
				{#if preventionDeterminant === 'date'}
					<line
						x1={xScale(dateOfPrevention)}
						y1={15}
						x2={xScale(dateOfPrevention)}
						y2={yScale(baselineCancer)}
						stroke-width={2}
						stroke="red"
					/>
					<g style:transform="translate({xScale(dateOfPrevention)}px, 25px)">
						<text x={10} y={0} dominant-baseline="middle">
							{numberFormatter(casesThatHaveOccuredSoFar)} extra cases so far
						</text>
						<text x={10} y={25} dominant-baseline="middle">
							{numberFormatter(casesYetToCome)} extra cases to come
						</text>
						<text x={10} y={50} dominant-baseline="middle">
							{numberFormatter(totalExtraCases)} total extra cases
						</text>
					</g>
				{:else}
					<line
						x1={0}
						y1={panicThresholdYPosition}
						x2={innerChartWidth}
						y2={panicThresholdYPosition}
						stroke-width={2}
						stroke="red"
					/>
					{#if panicPredictionPoint}
						<line
							x1={xScale(panicPredictionPoint.date)}
							y1={Math.min(panicThresholdYPosition, 125)}
							x2={xScale(panicPredictionPoint.date)}
							y2={yScale(baselineCancer)}
							stroke-width={2}
							stroke="grey"
						/>
						<g
							style:transform="translate({preventionStartInfoBoxXPosition}px, 135px)"
							bind:this={preventionStartInfoBox}
						>
							<text x={10} y={0} dominant-baseline="middle">Prevention starts:</text>
							<text x={10} y={18} dominant-baseline="middle">
								{panicPredictionPoint.date.toLocaleDateString()}
							</text>
						</g>
					{/if}
					<g style:transform="translate(50px, 25px)">
						{#if panicPredictionPoint}
							<text x={10} y={0} dominant-baseline="middle">
								• {numberFormatter(casesThatHaveOccuredSoFar)} extra cases so far
							</text>
							<text x={10} y={25} dominant-baseline="middle">
								• {numberFormatter(casesYetToCome)} extra cases to come
							</text>
							<text x={10} y={50} dominant-baseline="middle">
								• {numberFormatter(totalExtraCases)} total extra cases
							</text>
						{:else}
							<text x={0} y={0} dominant-baseline="middle">
								We will have {numberFormatter(
									Math.floor(renderedSummedCases.reduce((acc, { cases }) => acc + cases, 0)),
								)} extra cases by {renderedSummedCases.at(-1)?.date.toLocaleDateString()}
							</text>
							{#if hazardRatio > 1}
								<text x={0} y={25}>This is the new normal</text>
							{/if}
						{/if}
					</g>
				{/if}
				{#if preventionDeterminant === 'panic'}
					<text
						x={innerChartWidth - 10}
						y={yScale(baselineCancer * (1 + panicThreshold)) - 10}
						text-anchor="end"
						class="baseline-text"
					>
						Panic Threshold
					</text>
				{/if}
			</g>
		</svg>
	</div>
</div>

<style lang="scss">
	:global(.tick text) {
		font-weight: 500;
		font-size: 15px;
		fill: #565656;
	}

	.inputs-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		margin-bottom: var(--spacing-8);
		row-gap: var(--spacing-8);

		.range-input {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: var(--spacing-4);

			.determinant-selector {
				display: flex;
				gap: var(--spacing-8);
			}
		}
	}

	.baseline-text {
		font-size: 1.2rem;
		fill: #464646;
	}
</style>
