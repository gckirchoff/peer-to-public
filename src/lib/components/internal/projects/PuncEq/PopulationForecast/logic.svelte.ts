import type { ScaleLinear } from 'd3';
import { sampleLogNormalIfr } from '../logic.svelte';
import type { Vector } from './constants';

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

interface AssessSystemFailuresProps {
	populationSims: PopulationSim[];
	windowSize?: number; // in years
	collapseThreshold?: number; // as fraction, e.g. 0.2 = 20% drop
}

interface SystemFailurePoint {
	year: number;
	population: number;
}

interface SimulatePopulationDynamicsProps {
	ifrMu: number;
	ifrSigma: number;
	numSimulations?: number;
	years?: number;
	wavesPerYear: number;
	fractionInfected: number;
	populationGrowthRate: number;
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
		}
	}

	return simulations;
};

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
