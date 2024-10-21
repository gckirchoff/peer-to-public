import { roundTo } from '../util/math';
import {
	baselineMortality,
	collapseThreshold,
	exaggeratedMortality,
	fractionInfected,
	probabilitiesOfExaggeratedMortality,
	probabilitiesOfStabeleAttenuation,
	wavesPerYear,
} from './constants';

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

interface SimulatePopulationDynamicsProps {
	numSimulations?: number;
	years: number;
	wavesPerYear: number;
	probOfHighMortalityWave: number;
	probOfAttenuation: number;
	populationDeclinePerNormalWave: number;
	populationDeclinePerHighWave: number;
	percentLossOfPopulationCrisisThreshold: number;
	fractionInfected: number;
}

export const simulatePopulationDynamics = ({
	numSimulations = 1000,
	years,
	wavesPerYear,
	probOfHighMortalityWave,
	probOfAttenuation,
	populationDeclinePerNormalWave,
	populationDeclinePerHighWave,
	percentLossOfPopulationCrisisThreshold,
	fractionInfected,
}: SimulatePopulationDynamicsProps): {
	crisisTimes: number[];
	attenuationTimes: number[];
} => {
	const crisisTimes: number[] = [];
	const attenuationTimes: number[] = [];

	for (let sim = 0; sim < numSimulations; sim++) {
		let population = 1.0;
		let stable_attenuation = false;

		for (let year = 0; year < years; year++) {
			for (let wave = 0; wave < wavesPerYear; wave++) {
				const has_attenuated = Math.random() < probOfAttenuation;
				if (has_attenuated) {
					stable_attenuation = true;
					attenuationTimes.push(year);
					break;
				}

				const is_high_mortality_wave =
					Math.random() < probOfHighMortalityWave && !stable_attenuation;
				if (is_high_mortality_wave) {
					population *= 1 - populationDeclinePerHighWave * fractionInfected;
				} else {
					population *= 1 - populationDeclinePerNormalWave * fractionInfected;
				}

				const crisis_occurred = population <= percentLossOfPopulationCrisisThreshold;
				if (crisis_occurred) {
					crisisTimes.push(year + wave / wavesPerYear);
					break;
				}
			}

			if (population <= percentLossOfPopulationCrisisThreshold || stable_attenuation) {
				break;
			}
		}
	}

	return { crisisTimes, attenuationTimes };
};

function simPopulationDynamics({
	numSimulations = 1000,
	wavesPerYear,
	probOfHighMortalityWave,
	probOfAttenuation,
	populationDeclinePerNormalWave,
	populationDeclinePerHighWave,
	percentLossOfPopulationCrisisThreshold,
}: SimulatePopulationDynamicsProps): [number, string] {
	let population = 1;
	let years = 0;

	while (population > percentLossOfPopulationCrisisThreshold) {
		years += 1 / wavesPerYear;

		if (Math.random() < probOfHighMortalityWave) {
			population *= 1 - populationDeclinePerHighWave;
		} else {
			population *= 1 - populationDeclinePerNormalWave;
		}
		if (Math.random() < probOfAttenuation) {
			return [years, 'attenuation'];
		}
	}

	return [years, 'extinction'];
}

export const simulatePopulationDynamicsV2 = (args: SimulatePopulationDynamicsProps) => {
	const crisisTimes: number[] = [];
	const attenuationTimes: number[] = [];

	const sims = args.numSimulations ?? 1000;

	for (let i = 0; i < sims; i++) {
		const [years, outcome] = simPopulationDynamics(args);
		if (outcome === 'extinction') {
			crisisTimes.push(years);
		} else {
			attenuationTimes.push(years);
		}
	}

	return { crisisTimes, attenuationTimes };
};

export const getParamsFromSelectedData = (data: HeatmapData) => ({
	pStableAttenuation: Number(data.x.slice(0, -1)) / 100,
	pExaggeratedMortality: Number(data.y.slice(0, -1)) / 100,
});
