<script lang="ts">
	import { fade } from 'svelte/transition';
	import {
		scaleLinear,
		scaleLog,
		range,
		max,
		extent,
		pointer,
		leastIndex,
		bisector,
		randomLogNormal,
		median,
		deviation,
	} from 'd3';

	import { Body1, Body2, H4, H5, H6 } from '../../typography';
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import type { Margin } from '../common/components/charts/constants';
	import { roundTo } from '../util/math';
	import BoxPlot from '../common/components/charts/BoxPlot/BoxPlot.svelte';
	import Histogram from '../common/components/charts/Histogram/Histogram.svelte';
	import AxisX from '../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../common/components/Line/Line.svelte';
	import AdvancedTools from './AdvancedTools/AdvancedTools.svelte';
	import { margin, statisticalSignificanceThreshold, type Vector } from './constants';
	import {
		logNormalPDF,
		UseAdvancedConfigurables,
		simulatePopulationDynamics,
		getXDataIndex,
		getCursorPositionInfo,
		assessSystemFailures,
		sampleLogNormalIfr,
		welchTTest,
		leveneTest,
		getMainAndTestSamples,
		percentOfStatisticallySignificantLeveneTests,
		percentOfStatisticallySignificantLogTransformedWelchTTest,
		logTransformedWelchTTest,
	} from './logic.svelte';
	import LogNormalDistribution from './LogNormalDistribution/LogNormalDistribution.svelte';

	const minimumMedianIfr = 0.001;

	let medianIfr = $state(0.002);
	let sigma = $state(0.5);
	let testSigma = $state(0.5);
	const advancedConfigurables = new UseAdvancedConfigurables();

	let mu = $derived(Math.log(medianIfr));

	let showAltSigmaForecast = $state(false);

	let ifrDistributionWidth = $state(400);
	let ifrDistributionHeight = $state(400);

	let ifrDistributionInnerChartWidth = $derived(ifrDistributionWidth - margin.left - margin.right);
	let innerChartHeight = $derived(ifrDistributionHeight - margin.top - margin.bottom);

	const xAccessor = (d: { x: number; y: number }) => d.x;
	const yAccessor = (d: { x: number; y: number }) => d.y;

	const xValues = range(minimumMedianIfr, 1, 0.001);
	let data = $derived(xValues.map((x) => ({ x, y: logNormalPDF(x, mu, sigma) })));
	let altSigmaData = $derived(xValues.map((x) => ({ x, y: logNormalPDF(x, mu, testSigma) })));

	let xScale = $derived(
		scaleLinear()
			.domain([minimumMedianIfr, 0.02] as [number, number])
			.range([0, ifrDistributionInnerChartWidth]),
	);

	let yDomain = $derived([
		0,
		max(showAltSigmaForecast ? data.concat(altSigmaData) : data, yAccessor),
	] as [number, number]);

	let yScale = $derived(scaleLinear().domain(yDomain).range([innerChartHeight, 0]));

	const xAccessorScaled = $derived((d: { x: number; y: number }) => xScale(xAccessor(d)));
	const yAccessorScaled = $derived((d: { x: number; y: number }) => yScale(yAccessor(d)));

	let simWidth = $state(400);
	let simHeight = $state(400);
	const simMargin: Margin = { top: 25, right: 25, bottom: 25, left: 75 };
	let simInnerChartWidth = $derived(simWidth - margin.left - margin.right);
	let simInnerChartHeight = $derived(simHeight - margin.top - margin.bottom);

	let populations = $derived(
		simulatePopulationDynamics({
			ifrMu: mu,
			ifrSigma: sigma,
			fractionInfected: advancedConfigurables.fractionInfected,
			populationGrowthRate: advancedConfigurables.populationGrowthRate,
			wavesPerYear: advancedConfigurables.wavesPerYear,
			numSimulations: 100,
			years: 100,
		}),
	);

	let altPopulations = $derived(
		showAltSigmaForecast
			? simulatePopulationDynamics({
					ifrMu: mu,
					ifrSigma: testSigma,
					fractionInfected: advancedConfigurables.fractionInfected,
					populationGrowthRate: advancedConfigurables.populationGrowthRate,
					wavesPerYear: advancedConfigurables.wavesPerYear,
					numSimulations: 100,
					years: 100,
				})
			: [],
	);

	let collapseThreshold = $state(0.2);
	let windowSize = $state(5);
	let showSystemFailures = $state(true);
	let systemFailures = $derived(
		assessSystemFailures({
			populationSims: populations,
			collapseThreshold,
			windowSize,
		}),
	);
	let altSystemFailures = $derived(
		assessSystemFailures({
			populationSims: altPopulations,
			collapseThreshold,
			windowSize,
		}),
	);

	let shouldDelayTransitions = $state(true);
	const handleRangeInputMouseDown = () => {
		shouldDelayTransitions = false;
	};
	const handleRangeInputMouseUp = () => {
		shouldDelayTransitions = true;
	};

	let allSystemFailures = $derived(systemFailures.slice(0, 10).flat());

	const allData = $derived(populations.concat(altPopulations).flatMap((sim) => sim.data));

	const xExtent = $derived(extent(allData, (d) => d.year) as [number, number]);
	const yMax = $derived(max(allData, (d) => d.population) as number);
	const populationsYExtent = $derived([0, yMax] as [number, number]);

	const simXScale = $derived(scaleLinear().domain(xExtent).range([0, simInnerChartWidth]));
	const simYScale = $derived(
		scaleLinear().domain(populationsYExtent).range([simInnerChartHeight, 0]),
	);

	const simXAccessor = (d: { year: number; population: number }) => d.year;
	const simYAccessor = (d: { year: number; population: number }) => d.population;

	const simScaledX = (d: { year: number; population: number }) => simXScale(simXAccessor(d));
	const simScaledY = (d: { year: number; population: number }) => simYScale(simYAccessor(d));

	let hoverSimCursorPosition = $state<Vector | null>(null);
	let selectedSimCursorPosition = $state<Vector | null>(null);

	const onSimPointerMove = (
		event: PointerEvent & {
			currentTarget: EventTarget & SVGRectElement;
		},
	) => {
		const mousePosition = pointer(event);
		hoverSimCursorPosition = {
			x: mousePosition[0],
			y: mousePosition[1],
		};
	};

	const onPointerLeave = () => {
		hoverSimCursorPosition = null;
	};

	const setSelectedXValue = () => {
		selectedSimCursorPosition = hoverSimCursorPosition;
	};

	let timeStep = 1 / advancedConfigurables.wavesPerYear;

	let hoverPositionInfo = $derived(
		getCursorPositionInfo({ timeStep, cursorPosition: hoverSimCursorPosition, simXScale }),
	);

	let selectedPositionInfo = $derived(
		getCursorPositionInfo({
			timeStep,
			cursorPosition: selectedSimCursorPosition,
			simXScale,
			populations,
		}),
	);

	let altSelectedPositionInfo = $derived(
		showAltSigmaForecast
			? getCursorPositionInfo({
					timeStep,
					cursorPosition: selectedSimCursorPosition,
					simXScale,
					populations: altPopulations,
				})
			: null,
	);

	let sampleSize = $state(10);

	let sampleTests = $derived(getMainAndTestSamples({ mu, sigma, testSigma, sampleSize }));

	let histogramWidth = $state(400);
	let populationAtSelectedTime = $derived(selectedPositionInfo?.populationsAtSelectedTime ?? null);
	let altPopulationAtSelectedTime = $derived(
		altSelectedPositionInfo?.populationsAtSelectedTime ?? null,
	);
	let selectedYear = $derived(
		selectedPositionInfo?.xValue ? roundTo(selectedPositionInfo.xValue, 2) : null,
	);
</script>

<div class="punc-eq-container">
	<div class="ifr-distribution">
		<!-- <div class="chart-container">
			<LogNormalDistribution {mu} {sigma} xDomainMin={0.001} xDomainMax={0.1} />
			</div> -->
		<div class="inputs-container">
			<label class="range-input">
				<Body2>
					{medianIfr} median IFR:
					<Tooltip>Average amount of infections per year in population</Tooltip>
				</Body2>
				<input bind:value={medianIfr} type="range" min={minimumMedianIfr} max={0.05} step={0.001} />
			</label>
			<label class="range-input">
				<Body2>
					{sigma} sigma:
					<Tooltip>Chance of Long COVID per infection</Tooltip>
				</Body2>
				<input bind:value={sigma} type="range" min={0.001} max={5} step={0.001} />
			</label>
			{#if showAltSigmaForecast}
				<label class="range-input">
					<Body2>
						{testSigma} alt sigma:
						<Tooltip>
							Take a sample of points using this sigma and the selected {medianIfr} median IFR
						</Tooltip>
					</Body2>
					<input bind:value={testSigma} type="range" min={0.001} max={5} step={0.001} />
				</label>
			{/if}
			<label>
				<input type="checkbox" bind:checked={showAltSigmaForecast} /> Show alt sigma forecast
			</label>
		</div>
		<div
			class="chart-container"
			bind:clientWidth={ifrDistributionWidth}
			bind:clientHeight={ifrDistributionHeight}
			role="application"
		>
			<svg width={ifrDistributionWidth} height={ifrDistributionHeight}>
				<g style="transform: translate({margin.left}px, {margin.top}px)">
					<AxisX
						label="IFR"
						innerChartWidth={ifrDistributionInnerChartWidth}
						{innerChartHeight}
						{xScale}
					/>
					<AxisY label="density" innerChartWidth={ifrDistributionInnerChartWidth} {yScale} />
					<Line {data} {xAccessorScaled} {yAccessorScaled} />
					{#if showAltSigmaForecast}
						<Line
							data={altSigmaData}
							{xAccessorScaled}
							{yAccessorScaled}
							style="stroke: var(--clr-secondary-800);"
						/>
					{/if}
				</g>
			</svg>
		</div>
	</div>
	<div>
		<div class="inputs-container system-failure-inputs">
			<label class="range-input">
				<Body2>failure at: {Math.round(collapseThreshold * 100)}% pop. loss</Body2>
				<input
					type="range"
					bind:value={collapseThreshold}
					min="0.01"
					max="0.5"
					step="0.01"
					onmousedown={handleRangeInputMouseDown}
					onmouseup={handleRangeInputMouseUp}
				/>
			</label>
			<label class="range-input">
				<Body2>within {windowSize} years</Body2>
				<input
					type="range"
					bind:value={windowSize}
					min="1"
					max="20"
					step="1"
					onmousedown={handleRangeInputMouseDown}
					onmouseup={handleRangeInputMouseUp}
				/>
			</label>
			<label>
				<input type="checkbox" bind:checked={showSystemFailures} /> Show system failures
			</label>
		</div>

		<div class="population-forecast-dashboard">
			<div class="population-sims">
				<div class="chart-container" bind:clientWidth={simWidth} bind:clientHeight={simHeight}>
					<svg width={simWidth} height={simHeight}>
						<g style="transform: translate({simMargin.left}px, {simMargin.top}px)">
							<AxisX
								label="Time (years)"
								innerChartWidth={simInnerChartWidth}
								innerChartHeight={simInnerChartHeight}
								xScale={simXScale}
							/>
							<AxisY label="Population" innerChartWidth={simInnerChartWidth} yScale={simYScale} />
							{#each populations.slice(0, 10) as population}
								<Line
									data={population.data}
									xAccessorScaled={simScaledX}
									yAccessorScaled={simScaledY}
									style="opacity: 0.6"
								/>
							{/each}
							{#if showAltSigmaForecast}
								{#each altPopulations.slice(0, 10) as population}
									<Line
										data={population.data}
										xAccessorScaled={simScaledX}
										yAccessorScaled={simScaledY}
										style="opacity: 0.6; stroke: var(--clr-secondary-800);"
									/>
								{/each}
							{/if}
							{#if showSystemFailures}
								{#each systemFailures.slice(0, 10) as systemFailureSet}
									{#each systemFailureSet as systemFailurePoint (`${systemFailurePoint.year}-${systemFailurePoint.population}`)}
										<circle
											cx={simXScale(systemFailurePoint.year)}
											cy={simYScale(systemFailurePoint.population)}
											r={2}
											fill="red"
											style="opacity: 0.8;"
											in:fade={{ delay: shouldDelayTransitions ? 200 : 0, duration: 125 }}
										/>
									{/each}
								{/each}
							{/if}
							{#if showSystemFailures && showAltSigmaForecast}
								{#each altSystemFailures.slice(0, 10) as systemFailureSet}
									{#each systemFailureSet as systemFailurePoint (`${systemFailurePoint.year}-${systemFailurePoint.population}`)}
										<circle
											cx={simXScale(systemFailurePoint.year)}
											cy={simYScale(systemFailurePoint.population)}
											r={2}
											fill="DarkOrange"
											style="opacity: 0.8;"
											in:fade={{ delay: shouldDelayTransitions ? 200 : 0, duration: 125 }}
										/>
									{/each}
								{/each}
							{/if}
							{#if hoverPositionInfo}
								<line
									x1={hoverPositionInfo.xPosition}
									x2={hoverPositionInfo.xPosition}
									y1={0}
									y2={innerChartHeight}
									stroke-width={1}
									stroke="grey"
								/>
							{/if}
							{#if selectedPositionInfo}
								<line
									x1={selectedPositionInfo.xPosition}
									x2={selectedPositionInfo.xPosition}
									y1={0}
									y2={innerChartHeight}
									stroke-width={1}
									stroke="black"
								/>
							{/if}
							<rect
								width={simInnerChartWidth}
								height={simInnerChartHeight}
								onpointermove={onSimPointerMove}
								onpointerleave={onPointerLeave}
								onclick={setSelectedXValue}
								onkeydown={() => undefined}
								role="presentation"
								fill="transparent"
							/>
						</g>
					</svg>
				</div>
			</div>
			<div class="chart-container" bind:clientWidth={histogramWidth} role="application">
				<Histogram
					title="Population Distribution at Year {selectedYear}"
					xLabel="Population Size"
					yLabel="Frequency"
					series={[
						{
							group: selectedYear ? `Year ${selectedYear}` : 'Select year',
							values: populationAtSelectedTime ?? [],
							color: '#9980fa',
						},
						...(showAltSigmaForecast && altPopulationAtSelectedTime
							? [
									{
										group: 'Alt population',
										values: altPopulationAtSelectedTime,
										color: 'var(--clr-secondary-800)',
									},
								]
							: []),
					]}
					xDomain={populationsYExtent}
					yDomain={[0, 1]}
					showPercentage
				/>
			</div>
		</div>
		<AdvancedTools {advancedConfigurables} />
	</div>
	{#if showAltSigmaForecast}
		<div class="box-plot-container">
			<div class="sample-tests-summaries">
				<div class="summary">
					<H5>Levene's test of equality of variances:</H5>
					<H6>
						<span style="text-decoration: underline;">
							{roundTo(percentOfStatisticallySignificantLeveneTests(sampleTests) * 100, 2)}%
						</span>
						p {'<'}
						{statisticalSignificanceThreshold}
					</H6>
				</div>
				<div class="summary">
					<H5>Welch 2 tailed t test on log transformed data:</H5>
					<H6>
						<span style="text-decoration: underline;">
							{roundTo(percentOfStatisticallySignificantLogTransformedWelchTTest(sampleTests), 2)}%
						</span>
						p {'<'}
						{statisticalSignificanceThreshold}
					</H6>
				</div>
			</div>
			<div class="above-boxplots-decorators">
				<div class="inputs-container">
					<label class="range-input">
						<Body2>
							{sampleSize} samples:
							<Tooltip>
								Take a sample of points using this sigma and the selected {medianIfr} median IFR
							</Tooltip>
						</Body2>
						<input bind:value={sampleSize} type="range" min={5} max={100} step={5} />
					</label>
				</div>
				<Body1>Showing 5 out of 100 tests</Body1>
			</div>
			<table border="1" cellpadding="8" cellspacing="0" style="width: 100%;">
				<thead>
					<tr>
						<th>Chart</th>
						<th>Main median</th>
						<th>Main SD</th>
						<th>Alt median</th>
						<th>Alt SD</th>
						<th>Log Transformed<br />Welch T Test <br /> P Value</th>
						<th>Levene Test<br /> P Value</th>
					</tr>
				</thead>
				<tbody>
					{#each sampleTests.slice(0, 5) as { mainIfrSample, testIfrSample }}
						{@const levenePValue = leveneTest([mainIfrSample, testIfrSample])}
						{@const tTestPValue = logTransformedWelchTTest(mainIfrSample, testIfrSample).p}
						<tr>
							<td style="height: 22rem;">
								<BoxPlot
									title="Sample test"
									xLabel="Group"
									yLabel="IFR"
									series={[
										{ group: 'Main population', values: mainIfrSample, color: '#9980fa' },
										{
											group: 'Alt population',
											values: testIfrSample,
											color: 'var(--clr-secondary-800)',
										},
									]}
								/>
							</td>
							<td>{roundTo(median(mainIfrSample) ?? 0, 4)}</td>
							<td>{roundTo(deviation(mainIfrSample) ?? 0, 4)}</td>
							<td>{roundTo(median(testIfrSample) ?? 0, 4)}</td>
							<td>{roundTo(deviation(testIfrSample) ?? 0, 4)}</td>
							<td>
								<span
									style="color: {tTestPValue < statisticalSignificanceThreshold ? 'green' : 'red'};"
								>
									{roundTo(tTestPValue, 3)}
								</span>
							</td>
							<td>
								<span
									style="color: {levenePValue < statisticalSignificanceThreshold
										? 'green'
										: 'red'};"
								>
									{roundTo(levenePValue, 3)}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style lang="scss">
	.punc-eq-container {
		margin: var(--spacing-24) 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32);

		.population-forecast-dashboard {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));

			.ifr-distribution {
				// flex: 1 1 calc(40% - var(--gap) * 0.5);
				// min-width: 350px;
			}

			.population-sims {
				// flex: 1 1 calc(60% - var(--gap) * 0.5);
			}
		}
		.chart-container {
			height: 36vh;
		}
	}

	.inputs-container {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-16);
	}

	.sample-tests-summaries {
		padding: var(--spacing-4) var(--spacing-16);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--spacing-16);
		margin-bottom: var(--spacing-16);

		.summary {
			flex: 1 1 auto;
			text-align: center;
		}
	}

	.above-boxplots-decorators {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	td {
		text-align: center;
		padding: var(--spacing-4);
	}
</style>
