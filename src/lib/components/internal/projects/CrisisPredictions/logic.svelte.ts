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
	populationGrowthRate,
}: {
	pExaggeratedMortality: number;
	exaggeratedMortality: number;
	pStableAttenuation: number;
	collapseThreshold: number;
	fractionInfected: number;
	baselineMortality: number;
	wavesPerYear: number;
	populationGrowthRate: number;
}) => {
	const mortalityExpected =
		fractionInfected *
		((1 - pExaggeratedMortality) * baselineMortality +
			pExaggeratedMortality * exaggeratedMortality);

	const populationChangeFromDiseasePerWave = mortalityExpected * -1;
	const populationChangeFromGrowthPerWave = populationGrowthRate / wavesPerYear;
	const effectivePopulationChangePerWave =
		populationChangeFromDiseasePerWave + populationChangeFromGrowthPerWave;

	if (effectivePopulationChangePerWave >= 0) {
		return { overallProbOfAttenuatingBeforeCollapse: 1, yearsUntilCollapse: Infinity };
	}

	const populationToLoseToReachCollapse = 1 - collapseThreshold;

	const totalWavesUntilCollapse =
		fractionInfected === 0
			? Infinity
			: Math.log(populationToLoseToReachCollapse) / Math.log(1 + effectivePopulationChangePerWave);

	const overallProbOfAttenuatingBeforeCollapse =
		wavesPerYear === 0 ? 1 : 1 - Math.pow(1 - pStableAttenuation, totalWavesUntilCollapse);

	const yearsUntilCollapse = wavesPerYear === 0 ? Infinity : totalWavesUntilCollapse / wavesPerYear;

	return { overallProbOfAttenuatingBeforeCollapse, yearsUntilCollapse };
};

interface GenerateOverallDataProps {
	collapseThreshold: number;
	baselineMortality: number;
	exaggeratedMortality: number;
	fractionInfected: number;
	wavesPerYear: number;
	populationGrowthRate: number;
}

export const generateOverallData = ({
	collapseThreshold,
	baselineMortality,
	exaggeratedMortality,
	fractionInfected,
	wavesPerYear,
	populationGrowthRate,
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
				populationGrowthRate,
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
	normalWaveIfr: number;
	highWaveIfr: number;
	percentLossOfPopulationCrisisThreshold: number;
	fractionInfected: number;
	populationGrowthRate: number;
}

export const simulatePopulationDynamics = ({
	numSimulations = 1000,
	years,
	wavesPerYear,
	probOfHighMortalityWave,
	probOfAttenuation,
	normalWaveIfr,
	highWaveIfr,
	percentLossOfPopulationCrisisThreshold,
	fractionInfected,
	populationGrowthRate,
}: SimulatePopulationDynamicsProps): {
	crisisTimes: number[];
	attenuationTimes: number[];
} => {
	const crisisTimes: number[] = [];
	const attenuationTimes: number[] = [];

	const populationThatTriggersCrisis = 1 - percentLossOfPopulationCrisisThreshold;
	const populationChangeFromGrowthPerWave = 1 + populationGrowthRate / wavesPerYear;

	for (let sim = 0; sim < numSimulations; sim++) {
		let population = 1.0;
		let time = 0;

		while (time < years) {
			// if no waves ever happen, then we assume it has attenuated immediately
			if (wavesPerYear === 0) {
				attenuationTimes.push(time);
				break;
			}
			time += 1 / wavesPerYear;
			population *= populationChangeFromGrowthPerWave;

			const hasAttenuated = Math.random() < probOfAttenuation;
			if (hasAttenuated) {
				attenuationTimes.push(time);
				break;
			}

			const isHighMortalityWave = Math.random() < probOfHighMortalityWave;
			const ifr = isHighMortalityWave ? highWaveIfr : normalWaveIfr;
			population *= 1 - fractionInfected * ifr;

			const crisisOccured = population <= populationThatTriggersCrisis;
			if (crisisOccured) {
				crisisTimes.push(time);
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
	populationGrowthRate = $state(0.0);

	constructor() {}
}
