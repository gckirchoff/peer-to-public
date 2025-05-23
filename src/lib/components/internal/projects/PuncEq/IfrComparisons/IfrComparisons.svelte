<script lang="ts">
	import { deviation, median } from 'd3';
	import { Body1, Body2, H5, H6 } from '$lib/components/internal/typography';
	import Tooltip from '$lib/components/internal/Tooltip/Tooltip.svelte';
	import { roundTo } from '../../util/math';
	import BoxPlot from '../../common/components/charts/BoxPlot/BoxPlot.svelte';
	import { medianToMu } from '../logic.svelte';
	import { statisticalSignificanceThreshold } from './constants';
	import {
		getMainAndTestSamples,
		leveneTest,
		logTransformedWelchTTest,
		percentOfStatisticallySignificantLeveneTests,
		percentOfStatisticallySignificantLogTransformedWelchTTest,
	} from './logic.svelte';

	interface IfrComparisonsProps {
		medianIfr: number;
		sigma: number;
		testSigma: number;
	}

	let { medianIfr, sigma, testSigma }: IfrComparisonsProps = $props();
	let mu = $derived(medianToMu(medianIfr));

	let sampleSize = $state(10);

	let sampleTests = $derived(getMainAndTestSamples({ mu, sigma, testSigma, sampleSize }));
</script>

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
							style="color: {levenePValue < statisticalSignificanceThreshold ? 'green' : 'red'};"
						>
							{roundTo(levenePValue, 3)}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
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
