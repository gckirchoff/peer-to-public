<script lang="ts">
	import { fade } from 'svelte/transition';
	import { extent, max, pointer, scaleLinear } from 'd3';

	import { Body2 } from '$lib/components/internal/typography';
	import type { Margin } from '../../common/components/charts/constants';
	import AxisX from '../../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../../common/components/Line/Line.svelte';
	import { medianToMu, type UseAdvancedConfigurables } from '../logic.svelte';
	import {
		assessSystemFailures,
		getCursorPositionInfo,
		simulatePopulationDynamics,
	} from './logic.svelte';
	import type { Vector } from '../constants';
	import Histogram from '../../common/components/charts/Histogram/Histogram.svelte';
	import { roundTo } from '../../util/math';
	import AdvancedTools from '../AdvancedTools/AdvancedTools.svelte';

	interface PopulationForecastProps {
		medianIfr: number;
		sigma: number;
		testSigma: number;
		showAltSigmaForecast: boolean;
		advancedConfigurables: UseAdvancedConfigurables;
	}

	let {
		medianIfr,
		sigma,
		testSigma,
		showAltSigmaForecast,
		advancedConfigurables,
	}: PopulationForecastProps = $props();

	let simWidth = $state(400);
	let simHeight = $state(400);
	const simMargin: Margin = { top: 25, right: 25, bottom: 25, left: 75 };
	let simInnerChartWidth = $derived(simWidth - simMargin.left - simMargin.right);
	let simInnerChartHeight = $derived(simHeight - simMargin.top - simMargin.bottom);

	let histogramWidth = $state(400);

	let collapseThreshold = $state(0.2);

	let windowSize = $state(5);
	let showSystemFailures = $state(true);

	let mu = $derived(medianToMu(medianIfr));

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

	let timeStep = $derived(1 / advancedConfigurables.wavesPerYear);

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

	let shouldDelayTransitions = $state(true);
	const handleRangeInputMouseDown = () => {
		shouldDelayTransitions = false;
	};
	const handleRangeInputMouseUp = () => {
		shouldDelayTransitions = true;
	};

	let populationAtSelectedTime = $derived(selectedPositionInfo?.populationsAtSelectedTime ?? null);
	let altPopulationAtSelectedTime = $derived(
		altSelectedPositionInfo?.populationsAtSelectedTime ?? null,
	);

	let selectedYear = $derived(
		selectedPositionInfo?.xValue ? roundTo(selectedPositionInfo.xValue, 2) : null,
	);
</script>

<div>
	<div class="inputs-container">
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
								y2={simInnerChartHeight}
								stroke-width={1}
								stroke="grey"
							/>
						{/if}
						{#if selectedPositionInfo}
							<line
								x1={selectedPositionInfo.xPosition}
								x2={selectedPositionInfo.xPosition}
								y1={0}
								y2={simInnerChartHeight}
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

<style lang="scss">
	.population-forecast-dashboard {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	}

	.chart-container {
		height: 36vh;
	}

	.inputs-container {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-16);
		align-items: center;
	}
</style>
