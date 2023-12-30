import type {
	AgeMortality,
	RiskItem,
	UnprocessedAgeMortality,
	UnprocessedMortalityItem,
} from './constants';

export const processMortalityItem = (row: UnprocessedMortalityItem): RiskItem => ({
	...row,
	coins: Math.round(+row.coins),
	isInstance: row.isInstance === 'TRUE',
	triesUntil50: +row.triesUntil50,
	triesUntil95: +row.triesUntil95,
	prognostic: row.prognostic === 'TRUE',
	frequencyPerYear: Number(row.frequencyPerYear),
	probability: Number(row.probability),
});

export const processAgeItem = (row: UnprocessedAgeMortality): AgeMortality => ({
	...processMortalityItem(row),
	age: +row.age,
});

export const representProbabilityAsCoins = (p: number): number =>
	Math.round(Math.log10(p) / Math.log10(0.5));

export const baselineOverTime = (
	baselineMortality: RiskItem[],
	outlookWindow: number,
): RiskItem[] => {
	return baselineMortality
		.filter((row) => row.prognostic)
		.map((row) => {
			const { frequencyPerYear, probability } = row;
			const chanceOfOccuringAtLeastOnceOverWindow =
				1 - Math.pow(1 - probability, (frequencyPerYear as number) * outlookWindow);
			const coins = representProbabilityAsCoins(chanceOfOccuringAtLeastOnceOverWindow);

			return {
				...row,
				coins,
				probability: chanceOfOccuringAtLeastOnceOverWindow,
			};
		});
};

type CalculateIncrementingRiskRet = { atLeastOneAdverseOutcome: number; coins: number };

export const calculateIncrementingRisk = (
	startingAge: number,
	outlookWindow: number,
	frequencyPerYear: number,
	riskItemsByAge: RiskItem[],
): CalculateIncrementingRiskRet => {
	let pOverallSafeOutcome = 1;
	for (let i = startingAge; i < startingAge + outlookWindow; i++) {
		const row = riskItemsByAge[Math.min(i, 100)];
		const pAdverseOutcome = row.probability;
		const pNoAdverseOutcomes = Math.pow(1 - pAdverseOutcome, frequencyPerYear);
		pOverallSafeOutcome *= pNoAdverseOutcomes;
	}
	const atLeastOneAdverseOutcome = 1 - pOverallSafeOutcome;
	const coins = representProbabilityAsCoins(atLeastOneAdverseOutcome);

	return { atLeastOneAdverseOutcome, coins };
};

export const getCovidRow = (
	age: number,
	outlookWindow: number,
	vaccinated: boolean,
	mortalityByAgeCovid: RiskItem[],
): RiskItem => {
	const covidFrequencyPerYear = vaccinated ? 1 : 2;
	const { atLeastOneAdverseOutcome: pAdverseCovidOutcome, coins: covidCoins } =
		calculateIncrementingRisk(age, outlookWindow, covidFrequencyPerYear, mortalityByAgeCovid);

	const newCovidRow: RiskItem = {
		...mortalityByAgeCovid[age],
		item: 'Office Worker During Panemic',
		probability: pAdverseCovidOutcome,
		coins: covidCoins,
		frequencyPerYear: covidFrequencyPerYear,
		frequencyPerYearDescriptor: `Assuming ${covidFrequencyPerYear} infection${
			covidFrequencyPerYear === 1 ? '' : 's'
		} per year due to not taking precautions`,
	};
	return newCovidRow;
};
