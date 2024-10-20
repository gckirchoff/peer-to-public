import { roundTo } from '../util/math';

const nCol = 10;
const nRow = 5;

const alphabet = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

type HeatmapData = { x: string; y: string; value: number };

let data: HeatmapData[] = [];

for (let x = 0; x < nCol; x++) {
	for (let y = 0; y < nRow; y++) {
		data.push({
			x: alphabet[x],
			y: alphabet[y],
			value: Math.random() * 40,
		});
	}
}

export { data };

const calcProbOfAttenuationBeforeCollapse = ({
	pExaggeratedMortality,
	exaggeratedMortality,
	pStableAttenuation,
	collapseThreshold,
	fractionInfected,
	baselineMortality,
	wavesPerYear,
}: {
	pExaggeratedMortality: number;
	exaggeratedMortality: number;
	pStableAttenuation: number;
	collapseThreshold: number;
	fractionInfected: number;
	baselineMortality: number;
	wavesPerYear: number;
}) => {
	const mortalityExpected =
		fractionInfected *
		((1 - pExaggeratedMortality) * baselineMortality +
			pExaggeratedMortality * exaggeratedMortality);

	const populationToLoseToReachCollapse = 1 - collapseThreshold;

	const totalWaesUntilCollapse =
		Math.log(populationToLoseToReachCollapse) / Math.log(1 - mortalityExpected);

	const overallProbOfAttenuatingBeforeCollapse =
		1 - Math.pow(1 - pStableAttenuation, totalWaesUntilCollapse);

	const years = totalWaesUntilCollapse / wavesPerYear;

	return { overallProbOfAttenuatingBeforeCollapse, years };
};

const wavesPerYear = 1.5;
const baselineMortality = 0.002;
const exaggeratedMortality = 0.1;
const fractionInfected = 0.7;
const collapseThreshold = 0.4;

const probabilitiesOfExaggeratedMortality = [
	0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1,
];
const probabilitiesOfStabeleAttenuation = [
	0.0025, 0.005, 0.0075, 0.01, 0.0125, 0.015, 0.0175, 0.02, 0.025, 0.025,
];

export const generateOverallData = () => {
	const heatmapData: HeatmapData[] = [];
	probabilitiesOfExaggeratedMortality.forEach((pExaggeratedMortality) => {
		probabilitiesOfStabeleAttenuation.forEach((pStableAttenuation) => {
			const { overallProbOfAttenuatingBeforeCollapse } = calcProbOfAttenuationBeforeCollapse({
				pExaggeratedMortality,
				baselineMortality,
				collapseThreshold,
				exaggeratedMortality,
				fractionInfected,
				pStableAttenuation,
				wavesPerYear,
			});

			heatmapData.push({
				x: `${roundTo(pStableAttenuation * 100, 2)}%`,
				y: `${roundTo(pExaggeratedMortality * 100, 2)}%`,
				value: Math.round(overallProbOfAttenuatingBeforeCollapse * 100),
			});
		});
	});

	return heatmapData;
};
