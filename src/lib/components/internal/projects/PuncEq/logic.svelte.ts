import { randomLogNormal, type ScaleLinear } from 'd3';
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

const sampleLogNormalIfr = (mu: number, sigma: number): number => {
	const thing = randomLogNormal(mu, sigma)();
	return Math.exp(thing);
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
	const randomIfr = randomLogNormal(ifrMu, ifrSigma);
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

export const assessSystemFailures = ({
	populationSims,
	windowSize = 1,
	collapseThreshold = 0.2,
}: AssessSystemFailuresProps): number[][] => {
	return populationSims.map((populationSim) => {
		const data = populationSim.data;
		const systemFailureYears: number[] = [];

		for (let i = 0; i < data.length; i++) {
			const currentYear = data[i].year;
			const currentPop = data[i].population;

			// Find earliest year in window
			const startIdx = data.findIndex((d) => d.year >= currentYear - windowSize);
			if (startIdx >= 0 && startIdx < i) {
				const startPop = data[startIdx].population;
				const drop = (startPop - currentPop) / startPop;

				if (drop >= collapseThreshold) {
					systemFailureYears.push(currentYear);
				}
			}
		}

		return systemFailureYears;
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
