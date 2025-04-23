<script lang="ts">
	import { scaleLinear, scaleLog, range, max, extent, pointer, leastIndex, bisector } from 'd3';

	import { Body2 } from '../../typography';
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import Histogram from '../common/components/charts/Histogram/Histogram.svelte';
	import AxisX from '../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../common/components/Line/Line.svelte';
	import AdvancedTools from './AdvancedTools/AdvancedTools.svelte';
	import { margin, type Vector } from './constants';
	import {
		logNormalPDF,
		UseAdvancedConfigurables,
		simulatePopulationDynamics,
		getXDataIndex,
		getCursorPositionInfo,
		assessSystemFailures,
	} from './logic.svelte';
	import LogNormalDistribution from './LogNormalDistribution/LogNormalDistribution.svelte';
	import type { Margin } from '../common/components/charts/constants';
	import { roundTo } from '../util/math';

	const minimumMedianIfr = 0.001;

	let medianIfr = $state(0.002);
	let sigma = $state(0.5);
	let xDomainMax = $state(0.2);
	const advancedConfigurables = new UseAdvancedConfigurables();

	let mu = $derived(Math.log(medianIfr));

	let width = $state(400);
	let height = $state(400);

	let innerChartWidth = $derived(width - margin.left - margin.right);
	let innerChartHeight = $derived(height - margin.top - margin.bottom);

	const xAccessor = (d: { x: number; y: number }) => d.x;
	const yAccessor = (d: { x: number; y: number }) => d.y;

	const xValues = range(minimumMedianIfr, 1, 0.001);
	let data = $derived(xValues.map((x) => ({ x, y: logNormalPDF(x, mu, sigma) })));

	let xScale = $derived(
		scaleLinear()
			.domain([minimumMedianIfr, 0.05] as [number, number])
			.range([0, innerChartWidth]),
	);

	let yScale = $derived(
		scaleLinear()
			.domain([0, max(data, yAccessor)] as [number, number])
			.range([innerChartHeight, 0]),
	);

	const xAccessorScaled = $derived((d: { x: number; y: number }) => xScale(xAccessor(d)));
	const yAccessorScaled = $derived((d: { x: number; y: number }) => yScale(yAccessor(d)));

	let simWidth = $state(400);
	let simHeight = $state(400);
	const simMargin: Margin = { top: 25, right: 25, bottom: 25, left: 75 };
	let simInnerChartWidth = $derived(width - margin.left - margin.right);
	let simInnerChartHeight = $derived(height - margin.top - margin.bottom);

	let populations = $derived(
		simulatePopulationDynamics({
			ifrMu: mu,
			ifrSigma: sigma,
			fractionInfected: advancedConfigurables.wavesPerYear,
			percentLossOfPopulationCrisisThreshold: advancedConfigurables.collapseThreshold,
			populationGrowthRate: advancedConfigurables.populationGrowthRate,
			wavesPerYear: advancedConfigurables.wavesPerYear,
			numSimulations: 10,
			years: 100,
		}),
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

	let allSystemFailures = $derived(systemFailures.flat());

	const allData = $derived(populations.flatMap((sim) => sim.data));

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

	let populationAtSelectedTime = $derived(selectedPositionInfo?.populationsAtSelectedTime ?? null);
	let selectedYear = $derived(
		selectedPositionInfo?.xValue ? roundTo(selectedPositionInfo.xValue, 2) : null,
	);
</script>

<AdvancedTools {advancedConfigurables} />
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
</div>
<div class="punc-eq-container">
	<div class="dashboard">
		<!-- <div class="chart-container">
			<LogNormalDistribution {mu} {sigma} xDomainMin={0.001} xDomainMax={0.1} />
		</div> -->
		<div
			class="chart-container"
			bind:clientWidth={width}
			bind:clientHeight={height}
			role="application"
		>
			<svg {width} {height}>
				<g style="transform: translate({margin.left}px, {margin.top}px)">
					<AxisX label="IFR" {innerChartWidth} {innerChartHeight} {xScale} />
					<AxisY label="density" {innerChartWidth} {yScale} />
					<Line {data} {xAccessorScaled} {yAccessorScaled} />
				</g>
			</svg>
		</div>
		<div class="inputs-container">
			<label class="range-input">
				<Body2>failure at: {Math.round(collapseThreshold * 100)}% pop. loss</Body2>
				<input type="range" bind:value={collapseThreshold} min="0.01" max="0.5" step="0.01" />
			</label>
			<label class="range-input">
				<Body2>within {windowSize} years</Body2>
				<input type="range" bind:value={windowSize} min="1" max="20" step="1" />
			</label>
			<label>
				<input type="checkbox" bind:checked={showSystemFailures} /> Show system failures
			</label>
		</div>
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
					{#each populations as population}
						<Line
							data={population.data}
							xAccessorScaled={simScaledX}
							yAccessorScaled={simScaledY}
							style="opacity: 0.6"
						/>
					{/each}
					{#if showSystemFailures}
						{#each allSystemFailures as systemFailurePoint}
							<circle
								cx={simXScale(systemFailurePoint.year)}
								cy={simYScale(systemFailurePoint.population)}
								r={2}
								fill="red"
								style="opacity: 0.8;"
							/>
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
		{#if populationAtSelectedTime && selectedYear !== null}
			<div class="chart-container" bind:clientWidth={width} role="application">
				<Histogram
					title="Population Distribution at Year {selectedYear}"
					xLabel="Population Size"
					yLabel="Frequency"
					series={[{ group: `Year ${selectedYear}`, values: populationAtSelectedTime }]}
					margin={{ top: 80 }}
					xDomain={populationsYExtent}
				/>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.punc-eq-container {
		margin: var(--spacing-24) 0;

		.dashboard {
			.chart-container {
				height: 40rem;
			}
		}
	}

	.inputs-container {
		display: flex;
		gap: var(--spacing-16);
	}
</style>
