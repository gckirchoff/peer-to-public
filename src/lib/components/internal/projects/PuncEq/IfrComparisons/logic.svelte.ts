import jStat from 'jstat';
import { statisticalSignificanceThreshold } from './constants';
import { sampleLogNormalIfr } from '../logic.svelte';

/**
 * Performs Levene's test to assess the equality of variances between groups.
 * @param groups An array of arrays, each sub-array contains the samples from one group.
 * @returns The p-value from the ANOVA on the transformed data (Levene's test).
 */
export function leveneTest(groups: number[][]): number {
	// Step 1: Calculate the center (median) for each group
	const centers = groups.map((group) => jStat.median(group));

	// Step 2: Create new transformed groups with absolute deviations from center
	const transformedGroups = groups.map((group, i) => group.map((x) => Math.abs(x - centers[i])));

	// Step 3: Flatten the transformed values and make a group label array
	const allValues = transformedGroups.flat();
	const labels: number[] = [];

	transformedGroups.forEach((group, i) => {
		for (let j = 0; j < group.length; j++) {
			labels.push(i);
		}
	});

	// Step 4: Create group-wise arrays from the transformed data
	const groupedTransformed: number[][] = groups.map((_, i) =>
		allValues.filter((_, idx) => labels[idx] === i),
	);

	// Step 5: Perform a one-way ANOVA on the transformed data
	const grandMean = jStat.mean(allValues);
	const k = groupedTransformed.length;
	const N = allValues.length;

	// Between-group sum of squares (SSB)
	const ssBetween = groupedTransformed.reduce((sum, group) => {
		const mean = jStat.mean(group);
		return sum + group.length * Math.pow(mean - grandMean, 2);
	}, 0);

	// Within-group sum of squares (SSW)
	const ssWithin = groupedTransformed.reduce((sum, group) => {
		const mean = jStat.mean(group);
		return sum + group.reduce((s, x) => s + Math.pow(x - mean, 2), 0);
	}, 0);

	const dfBetween = k - 1;
	const dfWithin = N - k;

	const msBetween = ssBetween / dfBetween;
	const msWithin = ssWithin / dfWithin;

	const F = msBetween / msWithin;

	// Step 6: Get the p-value from F-distribution
	const pValue = 1 - jStat.centralF.cdf(F, dfBetween, dfWithin);

	return pValue;
}

interface SampleTest {
	mainIfrSample: number[];
	testIfrSample: number[];
}

interface GetMainAndTestSampleArgs {
	mu: number;
	sigma: number;
	testSigma: number;
	sampleSize: number;
}

const getMainAndTestSample = ({
	mu,
	sigma,
	testSigma,
	sampleSize,
}: GetMainAndTestSampleArgs): SampleTest => {
	let randomIfr = sampleLogNormalIfr(mu, sigma);
	let testRandomIfr = sampleLogNormalIfr(mu, testSigma);

	let mainIfrSample = new Array(sampleSize).fill(0).map(randomIfr);
	let testIfrSample = new Array(sampleSize).fill(0).map(testRandomIfr);

	return { mainIfrSample, testIfrSample };
};

export const getMainAndTestSamples = (
	args: GetMainAndTestSampleArgs,
	iterations = 100,
): SampleTest[] => {
	const results = [];
	for (let i = 0; i < iterations; i++) {
		results.push(getMainAndTestSample(args));
	}
	return results;
};

export const percentOfStatisticallySignificantLeveneTests = (tests: SampleTest[]) => {
	let significantTests = 0;
	tests.forEach(({ mainIfrSample, testIfrSample }) => {
		const pValue = leveneTest([mainIfrSample, testIfrSample]);
		if (pValue < statisticalSignificanceThreshold) {
			significantTests++;
		}
	});
	return significantTests / tests.length;
};

export function welchTTest(group1: number[], group2: number[]) {
	const n1 = group1.length;
	const n2 = group2.length;

	const mean1 = jStat.mean(group1);
	const mean2 = jStat.mean(group2);

	const s1 = jStat.variance(group1, true);
	const s2 = jStat.variance(group2, true);

	const se = Math.sqrt(s1 / n1 + s2 / n2);
	const t = (mean1 - mean2) / se;

	// Welch–Satterthwaite approximation for degrees of freedom
	const df =
		Math.pow(s1 / n1 + s2 / n2, 2) /
		(Math.pow(s1 / n1, 2) / (n1 - 1) + Math.pow(s2 / n2, 2) / (n2 - 1));

	const p = 2 * (1 - jStat.studentt.cdf(Math.abs(t), df));

	return { t, df, p };
}

export const logTransformedWelchTTest = (group1: number[], group2: number[]) => {
	const logGroup1 = group1.map((x) => Math.log(x));
	const logGroup2 = group2.map((x) => Math.log(x));
	return welchTTest(logGroup1, logGroup2);
};

export const percentOfStatisticallySignificantLogTransformedWelchTTest = (tests: SampleTest[]) => {
	let significantTests = 0;
	tests.forEach(({ mainIfrSample, testIfrSample }) => {
		const pValue = logTransformedWelchTTest(mainIfrSample, testIfrSample).p;
		if (pValue < statisticalSignificanceThreshold) {
			significantTests++;
		}
	});
	return significantTests / tests.length;
};
