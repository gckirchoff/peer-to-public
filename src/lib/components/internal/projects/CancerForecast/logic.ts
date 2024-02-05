import type { PredictedCases } from './constants';

export const getExtraCases = (hazardRatio: number, baseline: number): number =>
	baseline * (hazardRatio - 1);

export const timeBetween = (earlier: Date, later: Date): number =>
	later.getTime() - earlier.getTime();

const daysBetween = (earlier: Date, later: Date): number =>
	timeBetween(earlier, later) / (1000 * 60 * 60 * 24);

const yearsBetween = (earlier: Date, later: Date): number =>
	timeBetween(earlier, later) / (1000 * 60 * 60 * 24 * 365.25);

/**
 * Probability Density Function
 */
const pdf = (differenceFromMean: number, stdDeviation: number): number => {
	return (
		(1 / (stdDeviation * Math.sqrt(2 * Math.PI))) *
		Math.exp(-0.5 * Math.pow(differenceFromMean / stdDeviation, 2))
	);
};

/**
 * error function approximation
 */
const erf = (z: number): number => {
	// constants
	const a1 = 0.254829592;
	const a2 = -0.284496736;
	const a3 = 1.421413741;
	const a4 = -1.453152027;
	const a5 = 1.061405429;
	const p = 0.3275911;

	// Save the sign of z
	const sign = z < 0 ? -1 : 1;
	const absX = Math.abs(z);

	// A&S formula 7.1.26
	const t = 1.0 / (1.0 + p * absX);
	const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

	return sign * y;
};

/** Cumulative Density Function (CDF) for standard normal distribution */
const standardNormalCDF = (z: number): number => {
	return 0.5 * (1 + erf(z / Math.sqrt(2)));
};

export const getCasesOnDate = (
	date: Date,
	mean: Date,
	stdDeviation: number,
	totalCases: number,
): number => {
	const daysDifference = yearsBetween(date, mean);
	const probabilityDensity = pdf(daysDifference, stdDeviation);
	const estimatedCases = probabilityDensity * totalCases;
	return estimatedCases;
};

export const getCasesUpToDate = (
	date: Date,
	mean: Date,
	stdDeviation: number,
	totalCases: number,
): number => {
	const daysDifference = yearsBetween(date, mean);
	const zScore = daysDifference / stdDeviation;
	const proportionOfCasesUntilDate = standardNormalCDF(zScore);
	const estimatedCases = proportionOfCasesUntilDate * totalCases;
	return estimatedCases;
};

export const getCumulativeCasesUpToDate = (
	targetDate: Date,
	dateEstimates: PredictedCases[],
): number => {
	const index = dateEstimates.findIndex(({ date }) => date.getTime() === targetDate.getTime());
	if (!index) {
		return 0;
	}

	let total = 0;
	for (let i = 0; i < index; i++) {
		total += dateEstimates[i].cases;
	}
	return total;
};

export const addYearsToDate = (date: Date, years: number): Date => {
	const futureDate = new Date(date.getTime());
	futureDate.setFullYear(futureDate.getFullYear() + years);
	return futureDate;
};
