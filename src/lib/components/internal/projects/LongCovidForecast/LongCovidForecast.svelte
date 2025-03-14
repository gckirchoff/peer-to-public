<script lang="ts">
	import { scaleLinear, scaleTime, extent, max, format } from 'd3';

	import { Body2 } from '../../typography';
	import Tooltip from '../../Tooltip/Tooltip.svelte';
	import AxisX from '../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../common/components/Line/Line.svelte';
	import { margin } from './constants';
	import type { PopulationByYear } from './constants';
	import { forecastPopulationWithDisabilityOverTime } from './logic';

	const initialPopulation = 330e6;
	let initialLongCovidPopulation = 0;
	let years = 10;

	let birthRate = 2.212;
	let deathRate = 0.727272727;
	let recoveryRate = $state(5);

	let longCovidDeathRate = $state(1);

	let infectionRate = $state(1.3);
	let longCovidRate = $state(0.1);

	let view = $state<'percent' | 'population'>('percent');

	let width = $state(400);
	let height = 400;

	let innerChartWidth = $derived(width - margin.left - margin.right);
	let innerChartHeight = $derived(height - margin.top - margin.bottom);

	const xAccessor = (d: PopulationByYear) => d.year;
	const yAccessorTotalPopulation = (d: PopulationByYear) => d.populationStatus.totalPopulation;
	let yAccessorDisabledPopulation = $derived(
		({ populationStatus: { disabledPopulation, totalPopulation } }: PopulationByYear) =>
			view === 'population' ? disabledPopulation : disabledPopulation / totalPopulation,
	);

	let yAxisFormatter = $derived((num: number): string =>
		view === 'population' ? format('.2s')(num).replace('G', 'B') : `${num * 100}%`,
	);

	let populationOverTime = $derived(
		forecastPopulationWithDisabilityOverTime({
			birthRate,
			deathRate,
			recoveryRate,
			disabledDeathRate: deathRate * longCovidDeathRate,
			initialPopulation,
			initialDisabledPopulation: initialLongCovidPopulation,
			averageNumOfInfectionsPerPersonPerYear: infectionRate,
			chanceOfDisabilityPerInfection: longCovidRate,
			years,
		}),
	);

	let xScale = $derived(scaleLinear().domain([0, years]).range([0, innerChartWidth]));

	let yDomain = $derived(view === 'population' ? [0, 360e6] : [0, 1]);
	let yScale = $derived(scaleLinear().domain(yDomain).range([innerChartHeight, 0]));
</script>

<div class="inputs-container">
	<select bind:value={view}>
		<option value="percent">Percent view</option>
		<option value="population">Population view</option>
	</select>
	<label class="range-input">
		<Body2>
			{infectionRate} Infections/year:
			<Tooltip>Average amount of infections per year in population</Tooltip>
		</Body2>
		<input bind:value={infectionRate} type="range" min={0} max={2} step={0.1} />
	</label>
	<label class="range-input">
		<Body2>
			{Math.round(longCovidRate * 100)}% LC Rate:
			<Tooltip>Chance of Long COVID per infection</Tooltip>
		</Body2>
		<input bind:value={longCovidRate} type="range" min={0} max={1} step={0.01} />
	</label>
	<label class="range-input">
		<Body2>
			{recoveryRate}% LC Recovery Rate:
			<Tooltip>Chance of recovery from Long COVID per year</Tooltip>
		</Body2>
		<input bind:value={recoveryRate} type="range" min={0} max={50} step={0.1} />
	</label>
	<label class="range-input">
		<Body2>
			{longCovidDeathRate} LC Mortality Hazard Ratio:
			<Tooltip>How likely those with Long COVID are to die compared to average</Tooltip>
		</Body2>
		<input bind:value={longCovidDeathRate} type="range" min={1} max={10} step={0.1} />
	</label>
</div>
<div class="chart-container" bind:clientWidth={width} role="application">
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartWidth} {innerChartHeight} label="Years" />
			<AxisY
				label={view === 'population' ? 'Population' : 'Percent with Long Covid'}
				{yScale}
				{innerChartWidth}
				formatter={yAxisFormatter}
			/>
			{#if view === 'population'}
				<Line
					type="area"
					data={populationOverTime}
					xAccessorScaled={(d) => xScale(xAccessor(d))}
					yAccessorScaled={(d) => yScale(yAccessorTotalPopulation(d))}
					y0AccessorScaled={innerChartHeight}
				/>
				<Line
					data={populationOverTime}
					xAccessorScaled={(d) => xScale(xAccessor(d))}
					yAccessorScaled={(d) => yScale(yAccessorTotalPopulation(d))}
				/>
			{/if}
			<Line
				type="area"
				data={populationOverTime}
				xAccessorScaled={(d) => xScale(xAccessor(d))}
				yAccessorScaled={(d) => yScale(yAccessorDisabledPopulation(d))}
				y0AccessorScaled={innerChartHeight}
				style="fill: orangered; opacity: 0.5;"
			/>
			<Line
				data={populationOverTime}
				xAccessorScaled={(d) => xScale(xAccessor(d))}
				yAccessorScaled={(d) => yScale(yAccessorDisabledPopulation(d))}
				style="stroke: red;"
			/>
		</g>
	</svg>
</div>

<style lang="scss">
	@use '/src/styles/mixins.scss';

	label {
		cursor: pointer;
		user-select: none;
		input {
			cursor: pointer;
		}
	}

	.inputs-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		row-gap: var(--spacing-8);
		column-gap: var(--spacing-16);
		margin-top: var(--spacing-8);
		margin-bottom: var(--spacing-32);

		@include mixins.respond('mobile') {
			margin-bottom: 0;
		}

		select {
			justify-self: center;
			width: 70%;
			grid-column: -2;
		}

		.range-input {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: var(--spacing-4);
			cursor: pointer;
		}
	}
</style>
