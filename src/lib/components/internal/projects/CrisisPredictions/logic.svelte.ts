import { roundTo } from '../util/math';
import {
	probabilitiesOfExaggeratedMortality,
	probabilitiesOfStabeleAttenuation,
} from './constants';

type HeatmapData = { x: string; y: string; value: number };

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

	const totalWavesUntilCollapse =
		fractionInfected === 0
			? Infinity
			: Math.log(populationToLoseToReachCollapse) / Math.log(1 - mortalityExpected);

	const overallProbOfAttenuatingBeforeCollapse =
		1 - Math.pow(1 - pStableAttenuation, totalWavesUntilCollapse);

	const yearsUntilCollapse = wavesPerYear === 0 ? Infinity : totalWavesUntilCollapse / wavesPerYear;

	return { overallProbOfAttenuatingBeforeCollapse, yearsUntilCollapse };
};

interface GenerateOverallDataProps {
	collapseThreshold: number;
	baselineMortality: number;
	exaggeratedMortality: number;
	fractionInfected: number;
	wavesPerYear: number;
}

export const generateOverallData = ({
	collapseThreshold,
	baselineMortality,
	exaggeratedMortality,
	fractionInfected,
	wavesPerYear,
}: GenerateOverallDataProps) => {
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
				value: overallProbOfAttenuatingBeforeCollapse * 100,
			});
		});
	});

	return heatmapData;
};

export const valueFormatter = (value: number) => `${roundTo(value, 1)}%`;

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

	const populationThatTriggersCrisis = 1 - percentLossOfPopulationCrisisThreshold;

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

				const crisis_occurred = population <= populationThatTriggersCrisis;
				if (crisis_occurred) {
					crisisTimes.push(year + wave / wavesPerYear);
					break;
				}
			}

			if (population <= populationThatTriggersCrisis || stable_attenuation) {
				break;
			}
		}
	}

	return { crisisTimes, attenuationTimes };
};

// function simPopulationDynamics({
// 	numSimulations = 1000,
// 	wavesPerYear,
// 	probOfHighMortalityWave,
// 	probOfAttenuation,
// 	populationDeclinePerNormalWave,
// 	populationDeclinePerHighWave,
// 	percentLossOfPopulationCrisisThreshold,
// }: SimulatePopulationDynamicsProps): [number, string] {
// 	let population = 1;
// 	let years = 0;

// 	while (population > percentLossOfPopulationCrisisThreshold) {
// 		years += 1 / wavesPerYear;

// 		if (Math.random() < probOfHighMortalityWave) {
// 			population *= 1 - populationDeclinePerHighWave;
// 		} else {
// 			population *= 1 - populationDeclinePerNormalWave;
// 		}
// 		if (Math.random() < probOfAttenuation) {
// 			return [years, 'attenuation'];
// 		}
// 	}

// 	return [years, 'extinction'];
// }

// export const simulatePopulationDynamicsV2 = (args: SimulatePopulationDynamicsProps) => {
// 	const crisisTimes: number[] = [];
// 	const attenuationTimes: number[] = [];

// 	const sims = args.numSimulations ?? 1000;

// 	for (let i = 0; i < sims; i++) {
// 		const [years, outcome] = simPopulationDynamics(args);
// 		if (outcome === 'extinction') {
// 			crisisTimes.push(years);
// 		} else {
// 			attenuationTimes.push(years);
// 		}
// 	}

// 	return { crisisTimes, attenuationTimes };
// };

export const getParamsFromSelectedData = (data: HeatmapData) => ({
	pStableAttenuation: Number(data.x.slice(0, -1)) / 100,
	pExaggeratedMortality: Number(data.y.slice(0, -1)) / 100,
});

export class UseAdvancedConfigurables {
	wavesPerYear = $state(1.5);
	baselineMortality = $state(0.002);
	exaggeratedMortality = $state(0.1);
	fractionInfected = $state(0.7);
	collapseThreshold = $state(0.4);

	constructor() {}
}
