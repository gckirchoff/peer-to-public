export const margin = {
	top: 25,
	left: 73,
	bottom: 45,
	right: 15,
};

export interface PopulationSizeArgs {
	initialPopulation: number;
	year: number;
	birthRate: number;
	deathRate: number;
}

export interface ForecastPopulationArgs extends Omit<PopulationSizeArgs, 'year'> {
	years: number;
}

export interface DisabledPopulationArgs {
	initialPopulation: number;
	infectionRate: number;
	longCovidRate: number;
	birthRate: number;
	deathRate: number;
	year: number;
}

export interface ForecastDisabledPopulationArgs extends Omit<DisabledPopulationArgs, 'year'> {
	years: number;
}

export interface Datum {
	year: number;
	population: number;
}

export interface ForecastPopulationWithDisabilityArgs {
	birthRate: number;
	deathRate: number;
	disabledDeathRate: number;
	recoveryRate: number;
	initialPopulation: number;
	initialDisabledPopulation: number;
	averageNumOfInfectionsPerPersonPerYear: number;
	chanceOfDisabilityPerInfection: number;
	year: number;
}

export interface ForecastPopulationWithDisabilityOverTimeArgs
	extends Omit<ForecastPopulationWithDisabilityArgs, 'year'> {
	years: number;
}

export interface PopulationStatus {
	totalPopulation: number;
	nonDisabledPopulation: number;
	disabledPopulation: number;
}

export interface PopulationByYear {
	year: number;
	populationStatus: PopulationStatus;
}
