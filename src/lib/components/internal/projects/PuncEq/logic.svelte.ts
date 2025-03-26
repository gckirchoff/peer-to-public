import { randomLogNormal } from 'd3';

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
	percentLossOfPopulationCrisisThreshold,
	fractionInfected,
	populationGrowthRate,
}: SimulatePopulationDynamicsProps): PopulationSim[] => {
	const randomIfr = randomLogNormal(ifrMu, ifrSigma);
	const simulations: PopulationSim[] = [];

	const populationThatTriggersCrisis = 1 - percentLossOfPopulationCrisisThreshold;
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

			const systemFailureOccured = populationSim.currentPopulation <= populationThatTriggersCrisis;
			if (systemFailureOccured) {
				populationSim.result = 'system failure';
				// break;
			}
		}
	}

	return simulations;
};

export class UseAdvancedConfigurables {
	wavesPerYear = $state(1.5);
	baselineMortality = $state(0.002);
	exaggeratedMortality = $state(0.1);
	fractionInfected = $state(0.7);
	collapseThreshold = $state(0.4);
	populationGrowthRate = $state(0.0);

	constructor() {}
}
