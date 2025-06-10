import { randomLogNormal } from 'd3';
import jStat from 'jstat';


export const logNormalPDF = (x: number, mu: number, sigma: number) => {
	if (x <= 0) {
		return 0;
	}
	return (
		(1 / (x * sigma * Math.sqrt(2 * Math.PI))) *
		Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma))
	);
};

export const sampleLogNormalIfr = (mu: number, sigma: number): (() => number) => {
	const randLogNormal = randomLogNormal(mu, sigma);
	return () => Math.min(randLogNormal(), 1);
};

export class UseAdvancedConfigurables {
	wavesPerYear = $state(1.5);
	baselineMortality = $state(0.002);
	exaggeratedMortality = $state(0.1);
	fractionInfected = $state(0.7);
	populationGrowthRate = $state(0.0085);

	constructor() {}
}

export function twoSampleTTest(group1: number[], group2: number[]) {
	const n1 = group1.length;
	const n2 = group2.length;

	const mean1 = jStat.mean(group1);
	const mean2 = jStat.mean(group2);

	const s1 = jStat.variance(group1, true);
	const s2 = jStat.variance(group2, true);

	// Pooled standard deviation
	const pooledVar = ((n1 - 1) * s1 + (n2 - 1) * s2) / (n1 + n2 - 2);
	const t = (mean1 - mean2) / Math.sqrt(pooledVar * (1 / n1 + 1 / n2));
	const df = n1 + n2 - 2;
	const p = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df)); // two-tailed

	return { t, df, p };
}

export const medianToMu = (median: number): number => Math.log(median);
