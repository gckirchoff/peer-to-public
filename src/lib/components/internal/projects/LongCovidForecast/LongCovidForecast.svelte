<script lang="ts">
	import { scaleLinear, scaleTime, extent, max, format } from 'd3';

	import { Body2 } from '../../typography';
	import AxisX from '../common/components/AxisX/AxisX.svelte';
	import AxisY from '../common/components/AxisY/AxisY.svelte';
	import Line from '../common/components/Line/Line.svelte';
	import { margin } from './constants';
	import type { PopulationByYear } from './constants';
	import { forecastPopulationWithDisabilityOverTime } from './logic';

	const initialPopulation = 330e6;
	let initialLongCovidPopulation = 0;
	let years = 10;

	let birthRate = 2.212;
	let deathRate = 0.727272727;
	let longCovidDeathRate = 1;

	let infectionRate = 1.3;
	let longCovidRate = 0.1;

	let view: 'percent' | 'population' = 'population';

	let width = 400;
	let height = 400;

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	const xAccessor = (d: PopulationByYear) => d.year;
	const yAccessorTotalPopulation = (d: PopulationByYear) => d.populationStatus.totalPopulation;
	$: yAccessorDisabledPopulation = ({
		populationStatus: { disabledPopulation, totalPopulation },
	}: PopulationByYear) =>
		view === 'population' ? disabledPopulation : disabledPopulation / totalPopulation;

	$: yAxisFormatter = (num: number): string =>
		view === 'population' ? format('.2s')(num).replace('G', 'B') : `${num * 100}%`;

	$: populationOverTime = forecastPopulationWithDisabilityOverTime({
		birthRate,
		deathRate,
		disabledDeathRate: deathRate * longCovidDeathRate,
		initialPopulation,
		initialDisabledPopulation: initialLongCovidPopulation,
		averageNumOfInfectionsPerPersonPerYear: infectionRate,
		chanceOfDisabilityPerInfection: longCovidRate,
		years,
	});

	$: xScale = scaleLinear().domain([0, years]).range([0, innerChartWidth]);

	$: yDomain = view === 'population' ? [0, 360e6] : [0, 1];
	$: yScale = scaleLinear().domain(yDomain).range([innerChartHeight, 0]);
</script>

<div class="inputs-container">
	<label class="range-input">
		<Body2>
			{infectionRate} Covid infection rate:
		</Body2>
		<input bind:value={infectionRate} type="range" min={0} max={2} step={0.1} />
	</label>
	<label class="range-input">
		<Body2>
			{Math.round(longCovidRate * 100)}% Long Covid Rate:
		</Body2>
		<input bind:value={longCovidRate} type="range" min={0} max={1} step={0.01} />
	</label>
	<label class="range-input">
		<Body2>
			{longCovidDeathRate}X Long Covid Death Rate:
		</Body2>
		<input bind:value={longCovidDeathRate} type="range" min={1} max={50} step={0.1} />
	</label>
	<select bind:value={view}>
		<option value="population">Population</option>
		<option value="percent">Percent</option>
	</select>
</div>
<div class="chart-container" bind:clientWidth={width} role="application">
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartWidth} {innerChartHeight} />
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
	@import '/src/styles/mixins.scss';

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

		@include respond('mobile') {
			margin-bottom: 0;
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
