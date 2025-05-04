import { randomLogNormal, type ScaleLinear } from 'd3';
import jStat from 'jstat';

import type { Vector } from './constants';

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

interface SimulatePopulationDynamicsProps {
	ifrMu: number;
	ifrSigma: number;
	numSimulations?: number;
	years?: number;
	wavesPerYear: number;
	percentLossOfPopulationCrisisThreshold: number;
	fractionInfected: number;
	populationGrowthRate: number;
}

class PopulationSim {
	currentPopulation = 1;
	data: { year: number; population: number }[] = [];
	result: 'stable' | 'system failure' = 'stable';

	constructor() {
		this.data.push({ year: 0, population: this.currentPopulation });
	}

	logPopulation = (year: number) => {
		this.data.push({ year, population: this.currentPopulation });
	};
}

export const simulatePopulationDynamics = ({
	ifrMu,
	ifrSigma,
	numSimulations = 1000,
	years = 100,
	wavesPerYear,
	fractionInfected,
	populationGrowthRate,
}: SimulatePopulationDynamicsProps): PopulationSim[] => {
	const randomIfr = sampleLogNormalIfr(ifrMu, ifrSigma);
	const simulations: PopulationSim[] = [];

	const populationChangeFromGrowthPerWave = 1 + populationGrowthRate / wavesPerYear;

	for (let sim = 0; sim < numSimulations; sim++) {
		const populationSim = new PopulationSim();
		simulations.push(populationSim);
		let time = 0;
		populationSim.logPopulation(time);

		while (time < years) {
			if (wavesPerYear === 0) {
				break;
			}
			time += 1 / wavesPerYear;
			populationSim.currentPopulation *= populationChangeFromGrowthPerWave;

			const ifr = randomIfr();
			populationSim.currentPopulation *= Math.max(1 - fractionInfected * ifr, 0);

			populationSim.logPopulation(time);

			const systemFailureOccured = false;
			if (systemFailureOccured) {
				populationSim.result = 'system failure';
				// break;
			}
		}
	}

	return simulations;
};

type YearRange = { start: number; end: number };

function groupContiguousYears(
	years: number[],
	gapThreshold = 0.5, // how close years must be to count as "contiguous"
): YearRange[] {
	if (years.length === 0) return [];

	const sorted = [...years].sort((a, b) => a - b);
	const ranges: YearRange[] = [];

	let start = sorted[0];
	let prev = sorted[0];

	for (let i = 1; i < sorted.length; i++) {
		const year = sorted[i];
		if (year - prev <= gapThreshold) {
			// extend current range
			prev = year;
		} else {
			// end current range and start a new one
			ranges.push({ start, end: prev });
			start = year;
			prev = year;
		}
	}

	// add the last range
	ranges.push({ start, end: prev });

	return ranges;
}

interface AssessSystemFailuresProps {
	populationSims: PopulationSim[];
	windowSize?: number; // in years
	collapseThreshold?: number; // as fraction, e.g. 0.2 = 20% drop
}

interface SystemFailurePoint {
	year: number;
	population: number;
}

export const assessSystemFailures = ({
	populationSims,
	windowSize = 1,
	collapseThreshold = 0.2,
}: AssessSystemFailuresProps): SystemFailurePoint[][] => {
	return populationSims.map((populationSim) => {
		const data = populationSim.data;
		const systemFailurePoints: SystemFailurePoint[] = [];

		for (let i = 0; i < data.length; i++) {
			const currentYear = data[i].year;
			const currentPop = data[i].population;

			for (let j = i - 1; j >= 0; j--) {
				const previousYear = data[j].year;
				const previousPop = data[j].population;

				const hasGonePastWindow = previousYear < currentYear - windowSize;
				if (hasGonePastWindow) {
					break;
				}

				const drop = (previousPop - currentPop) / previousPop;

				if (drop >= collapseThreshold) {
					systemFailurePoints.push({ year: currentYear, population: currentPop });
					break;
				}
			}
		}

		return systemFailurePoints;
	});
};

interface GetXDataIndexArgs {
	timeStep: number;
	cursorPosition: Vector | null;
	simXScale: ScaleLinear<number, number, never>;
}

export const getXDataIndex = ({ timeStep, cursorPosition, simXScale }: GetXDataIndexArgs) => {
	if (!cursorPosition) {
		return null;
	}
	const hoveredYear = simXScale.invert(cursorPosition.x);
	return Math.round(hoveredYear / timeStep);
};

interface GetXPositionArgs {
	timeStep: number;
	cursorPosition: Vector | null;
	simXScale: ScaleLinear<number, number, never>;
	populations?: PopulationSim[];
}

interface GetXPositionRet {
	xPosition: number;
	xValue: number;
	populationsAtSelectedTime: number[] | null;
}

export const getCursorPositionInfo = ({
	timeStep,
	cursorPosition,
	simXScale,
	populations,
}: GetXPositionArgs): GetXPositionRet | null => {
	if (!cursorPosition) {
		return null;
	}
	const hoveredYear = simXScale.invert(cursorPosition.x);
	const dataXIndex = Math.round(hoveredYear / timeStep);
	const xValue = dataXIndex * timeStep;
	const xPosition = simXScale(xValue);
	const populationsAtSelectedTime =
		populations?.map((population) => population.data[dataXIndex]?.population ?? 0) ?? null;
	return { xPosition, xValue, populationsAtSelectedTime };
};

export class UseAdvancedConfigurables {
	wavesPerYear = $state(1.5);
	baselineMortality = $state(0.002);
	exaggeratedMortality = $state(0.1);
	fractionInfected = $state(0.7);
	collapseThreshold = $state(0.4);
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
