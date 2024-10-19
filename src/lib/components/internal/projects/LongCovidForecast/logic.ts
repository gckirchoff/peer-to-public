import { addYearsToDate } from '../common/util/time';
import type {
	Datum,
	DisabledPopulationArgs,
	ForecastDisabledPopulationArgs,
	ForecastPopulationArgs,
	ForecastPopulationWithDisabilityArgs,
	ForecastPopulationWithDisabilityOverTimeArgs,
	PopulationByYear,
	PopulationSizeArgs,
	PopulationStatus,
} from './constants';

export const getPopulationSize = ({
	year,
	initialPopulation,
	birthRate,
	deathRate,
}: PopulationSizeArgs): number =>
	initialPopulation * Math.pow(Math.E, (birthRate - deathRate) * year);

export const forecastPopulation = ({
	years,
	initialPopulation,
	birthRate,
	deathRate,
}: ForecastPopulationArgs): Datum[] => {
	const data: Datum[] = [];
	for (let i = 0; i < years + 1; i++) {
		const population = getPopulationSize({ year: i, initialPopulation, birthRate, deathRate });
		data.push({
			year: i,
			population,
		});
	}
	return data;
};

export const getDisabledPopulation = ({
	year,
	initialPopulation,
	birthRate,
	deathRate,
	infectionRate,
	longCovidRate,
}: DisabledPopulationArgs): number => {
	const growthFactor = Math.exp((birthRate - deathRate) * year);
	return (
		((infectionRate * longCovidRate * initialPopulation) / (birthRate - deathRate)) *
		(growthFactor - 1)
	);
};

export const forecastDisabledPopulation = ({
	years,
	initialPopulation,
	birthRate,
	deathRate,
	infectionRate,
	longCovidRate,
}: ForecastDisabledPopulationArgs): Datum[] => {
	const data: Datum[] = [];
	for (let i = 0; i < years + 1; i++) {
		const population = getDisabledPopulation({
			year: i,
			initialPopulation,
			birthRate,
			deathRate,
			infectionRate,
			longCovidRate,
		});
		data.push({
			year: i,
			population,
		});
	}
	return data;
};

export function forecastPopulationWithDisability({
	birthRate,
	deathRate,
	disabledDeathRate,
	initialPopulation,
	initialDisabledPopulation,
	averageNumOfInfectionsPerPersonPerYear,
	chanceOfDisabilityPerInfection,
	year,
}: ForecastPopulationWithDisabilityArgs): { totalPopulation: number; disabledPopulation: number } {
	let generalPopulation = initialPopulation;
	let disabledPopulation = initialDisabledPopulation;

	const annualBirthRate = birthRate / 100;
	const annualDeathRate = deathRate / 100;
	const annualDisabledDeathRate = disabledDeathRate / 100;
	const annualDisabilityRate = chanceOfDisabilityPerInfection / 100;

	for (let i = 0; i < year; i++) {
		// Births and deaths in general population
		const births = generalPopulation * annualBirthRate;
		const generalDeaths = generalPopulation * annualDeathRate;

		// New infections and resulting disabilities
		const newInfections = generalPopulation * averageNumOfInfectionsPerPersonPerYear;
		const newDisabilities = newInfections * annualDisabilityRate;

		// Deaths in disabled population
		const disabledDeaths = disabledPopulation * annualDisabledDeathRate;

		// Update populations
		generalPopulation += births - generalDeaths - newDisabilities;
		disabledPopulation += newDisabilities - disabledDeaths;
	}

	const totalPopulation = generalPopulation + disabledPopulation;
	return { totalPopulation, disabledPopulation };
}

const breakdownNumber = (num: number): number[] =>
	Array(Math.floor(num))
		.fill(1)
		.concat(num % 1 || []);

export function forecastPopulationWithDisabilityV2({
	birthRate,
	deathRate,
	disabledDeathRate,
	initialPopulation,
	initialDisabledPopulation,
	averageNumOfInfectionsPerPersonPerYear,
	chanceOfDisabilityPerInfection,
	year,
}: ForecastPopulationWithDisabilityArgs): PopulationStatus {
	let nonDisabledPopulation = initialPopulation - initialDisabledPopulation;
	let disabledPopulation = initialDisabledPopulation;

	const annualBirthRate = birthRate / 100;
	const annualDeathRate = deathRate / 100;
	const annualDisabledDeathRate = disabledDeathRate / 100;

	const proportionsInfectedThroughYear = breakdownNumber(averageNumOfInfectionsPerPersonPerYear);

	for (let i = 0; i < year; i++) {
		// Births
		const births = (nonDisabledPopulation + disabledPopulation) * annualBirthRate;
		nonDisabledPopulation += births;

		// Deaths
		const nonDisabledDeaths = nonDisabledPopulation * annualDeathRate;
		const disabledDeaths = disabledPopulation * annualDisabledDeathRate;
		nonDisabledPopulation = Math.max(nonDisabledPopulation - nonDisabledDeaths, 0);
		disabledPopulation = Math.max(disabledPopulation - disabledDeaths, 0);

		// Disabilities
		proportionsInfectedThroughYear.forEach((proportionInfected) => {
			const newDisabilities =
				nonDisabledPopulation * proportionInfected * chanceOfDisabilityPerInfection;
			nonDisabledPopulation -= newDisabilities;
			disabledPopulation += newDisabilities;
		});

		// const chanceOfDisabilityPerPerson =
		// 	averageNumOfInfectionsPerPersonPerYear > 1
		// 		? 1 - Math.pow(1 - chanceOfDisabilityPerInfection, averageNumOfInfectionsPerPersonPerYear)
		// 		: chanceOfDisabilityPerInfection * averageNumOfInfectionsPerPersonPerYear;

		// const newDisabilities = nonDisabledPopulation * chanceOfDisabilityPerPerson;
		// nonDisabledPopulation -= newDisabilities;
		// disabledPopulation += newDisabilities;
	}

	const totalPopulation = nonDisabledPopulation + disabledPopulation;
	return { totalPopulation, nonDisabledPopulation, disabledPopulation };
}

export const forecastPopulationWithDisabilityOverTime = ({
	birthRate,
	deathRate,
	disabledDeathRate,
	initialPopulation,
	initialDisabledPopulation,
	averageNumOfInfectionsPerPersonPerYear,
	chanceOfDisabilityPerInfection,
	years,
}: ForecastPopulationWithDisabilityOverTimeArgs): PopulationByYear[] => {
	const data: PopulationByYear[] = [];
	for (let i = 0; i < years + 1; i++) {
		const populationStatus = forecastPopulationWithDisabilityV2({
			birthRate,
			deathRate,
			disabledDeathRate,
			initialPopulation,
			initialDisabledPopulation,
			averageNumOfInfectionsPerPersonPerYear,
			chanceOfDisabilityPerInfection,
			year: i,
		});
		data.push({
			year: i,
			populationStatus,
		});
	}
	return data;
};
