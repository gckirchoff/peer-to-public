<script lang="ts">
	import { max, range, scaleLinear } from 'd3';

	import { Body2 } from '$lib/components/internal/typography';
	import Tooltip from '$lib/components/internal/Tooltip/Tooltip.svelte';
	import AxisX from '../../common/components/charts/common/AxisX/AxisX.svelte';
	import AxisY from '../../common/components/charts/common/AxisY/AxisY.svelte';
	import Line from '../../common/components/Line/Line.svelte';
	import type { Margin } from '../../common/components/charts/constants';
	import { medianToMu } from '../logic.svelte';
	import { logNormalPDF, xAccessor, yAccessor } from './logic.svelte';

	interface IfrDistributionProps {
		medianIfr: number;
		sigma: number;
		testSigma: number;
		showAltSigmaForecast: boolean;
		showShowAltSigmaForecastCheckbox?: boolean;
	}

	let {
		medianIfr = $bindable(),
		sigma = $bindable(),
		testSigma = $bindable(),
		showAltSigmaForecast = $bindable(),
		showShowAltSigmaForecastCheckbox = true,
	}: IfrDistributionProps = $props();

	const minimumMedianIfr = 0.001;
	const xValues = range(minimumMedianIfr, 1, 0.001);

	const margin: Margin = {
		top: 25,
		left: 73,
		bottom: 45,
		right: 15,
	};

	let ifrDistributionWidth = $state(400);
	let ifrDistributionHeight = $state(400);

	let ifrDistributionInnerChartWidth = $derived(ifrDistributionWidth - margin.left - margin.right);
	let innerChartHeight = $derived(ifrDistributionHeight - margin.top - margin.bottom);

	let mu = $derived(medianToMu(medianIfr));

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

	let xAccessorScaled = $derived((d: { x: number; y: number }) => xScale(xAccessor(d)));
	let yAccessorScaled = $derived((d: { x: number; y: number }) => yScale(yAccessor(d)));
</script>

<div class="ifr-distribution">
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
		{#if showShowAltSigmaForecastCheckbox}
			<label>
				<input type="checkbox" bind:checked={showAltSigmaForecast} /> Show alt sigma forecast
			</label>
		{/if}
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

<style lang="scss">
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
