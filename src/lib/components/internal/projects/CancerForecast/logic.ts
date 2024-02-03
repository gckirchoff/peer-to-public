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
const pdf = (differenceFromMean: number, stdDeviation: number) => {
	return (
		(1 / (stdDeviation * Math.sqrt(2 * Math.PI))) *
		Math.exp(-0.5 * Math.pow(differenceFromMean / stdDeviation, 2))
	);
};

export const getCasesOnDate = (
	date: Date,
	mean: Date,
	stdDeviation: number,
	totalCases: number,
): number => {
	const daysDifference = yearsBetween(date, mean);
	const probabilityDensity = pdf(daysDifference, stdDeviation);
	const estimatedCases = totalCases * probabilityDensity;
	return estimatedCases;
};

export const addYearsToDate = (date: Date, years: number): Date => {
	const futureDate = new Date(date.getTime());
	futureDate.setFullYear(futureDate.getFullYear() + years);
	return futureDate;
};
