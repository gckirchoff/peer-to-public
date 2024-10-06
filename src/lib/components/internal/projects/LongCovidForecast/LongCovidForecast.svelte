<script lang="ts">
	import { scaleLinear, scaleTime, extent, max } from 'd3';

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

	let width = 400;
	let height = 400;

	$: innerChartWidth = width - margin.left - margin.right;
	$: innerChartHeight = height - margin.top - margin.bottom;

	const xAccessor = (d: PopulationByYear) => d.year;
	const yAccessorTotalPopulation = (d: PopulationByYear) => d.populationStatus.totalPopulation;
	const yAccessorDisabledPopulation = (d: PopulationByYear) =>
		d.populationStatus.disabledPopulation;

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
	$: yScale = scaleLinear().domain([0, 360e6]).range([innerChartHeight, 0]);
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
		<input bind:value={longCovidDeathRate} type="range" min={1} max={30} step={0.1} />
	</label>
</div>
<div class="chart-container" bind:clientWidth={width} role="application">
	<svg {width} {height}>
		<g style="transform: translate({margin.left}px, {margin.top}px)">
			<AxisX {xScale} {innerChartWidth} {innerChartHeight} />
			<AxisY {yScale} {innerChartWidth} />
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

<pre>
	{`function forecastPopulationWithDisability({
		birthRate,
		deathRate,
		disabledDeathRate,
		initialPopulation,
		initialDisabledPopulation,
		infectionRate,
		disabilityRate,
		year,
	}: ForecastPopulationWithDisabilityArgs): PopulationStatus {
		let nonDisabledPopulation = initialPopulation - initialDisabledPopulation;
		let disabledPopulation = initialDisabledPopulation;
	
		const annualBirthRate = birthRate / 100;
		const annualDeathRate = deathRate / 100;
		const annualDisabledDeathRate = disabledDeathRate / 100;
		const annualInfectionRate = infectionRate / 100;
		const annualDisabilityRate = disabilityRate / 100;
	
		for (let i = 0; i < year; i++) {
			// Births and deaths in non-disabled population
			const births = nonDisabledPopulation * annualBirthRate + disabledPopulation * annualBirthRate;
			const nonDisabledDeaths = nonDisabledPopulation * annualDeathRate;
	
			// New infections and resulting disabilities
			const newInfections = nonDisabledPopulation * annualInfectionRate;
			const newDisabilities = Math.min(newInfections * annualDisabilityRate, nonDisabledPopulation);
	
			// Deaths in disabled population
			const disabledDeaths = disabledPopulation * annualDisabledDeathRate;
	
			// Update populations
			nonDisabledPopulation += births - nonDisabledDeaths - newDisabilities;
			disabledPopulation += newDisabilities - disabledDeaths;
		}
	
		const totalPopulation = nonDisabledPopulation + disabledPopulation;
		return { totalPopulation, disabledPopulation };
	}`}
</pre>

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
