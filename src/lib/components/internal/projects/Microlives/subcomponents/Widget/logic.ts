import { scaleLinear } from 'd3';

import type { Microlife, Sex } from './constants';

const pre20MinScale = scaleLinear().domain([0, 20]).range([0, 2]);
const post20MinScale = scaleLinear().domain([0, 40]).range([0, 1]);

const getPerExerciseMicrolivesAddition = (minutesPerExerciseSession: number, sex: Sex): number => {
	if (minutesPerExerciseSession <= 20) {
		return pre20MinScale(minutesPerExerciseSession);
	}
	return (
		2 + post20MinScale(Math.min(minutesPerExerciseSession - 20, 40)) * (sex === 'male' ? 1 : 0.5)
	);
};

const daysPerWeek = 7;

export const microlivesFromExercise = (
	exerciseSessionsPerWeek: number,
	minutesPerExerciseSession: number,
	sex: Sex,
): number => {
	const microlifeChangePerSession = getPerExerciseMicrolivesAddition(
		minutesPerExerciseSession,
		sex,
	);
	return (microlifeChangePerSession * exerciseSessionsPerWeek) / daysPerWeek;
};

const microlivesFromAlcohol = (
	drinksPerSession: number,
	drinkingSessionsPerWeek: number,
	sex: Sex,
): number => {
	if (drinkingSessionsPerWeek === 0 || drinksPerSession === 0) {
		return 0;
	}
	const drinksAfterFirst = drinksPerSession - 1;
	const microlivesPerDay =
		((1 + drinksAfterFirst * (sex === 'male' ? 0.5 : 1) * -1) * drinkingSessionsPerWeek) /
		daysPerWeek;
	return microlivesPerDay;
};

type GetMicroLifeChangesArgs = {
	hoursSedentaryPerDay: number;
	exerciseSessionsPerWeek: number;
	minutesPerExerciseSession: number;
	sex: Sex;
	servingsRedMeat: number;
	servingsVeg: number;
	cigarettesPerDay: number;
	bmi: number;
	drinksPerSession: number;
	drinkingSessionsPerWeek: number;
	receivesYearlyCovidVaccine: boolean;
	preventsCovidInfection: boolean;
};

export const getMicrolifeChanges = ({
	hoursSedentaryPerDay,
	exerciseSessionsPerWeek,
	minutesPerExerciseSession,
	sex,
	servingsRedMeat,
	servingsVeg,
	cigarettesPerDay,
	bmi,
	drinksPerSession,
	drinkingSessionsPerWeek,
	receivesYearlyCovidVaccine,
	preventsCovidInfection,
}: GetMicroLifeChangesArgs): Microlife[] => [
	{
		name: 'Sex',
		value: sex === 'male' ? -4 : 0,
	},
	{
		name: 'Being Overweight',
		value: bmi - 22.5 > 0 ? ((bmi - 22.5) / 5) * -1 : 0,
	},
	{
		name: 'Being Sedentary',
		value: (hoursSedentaryPerDay / 2) * -1,
	},
	{
		name: 'Exercising',
		value: microlivesFromExercise(exerciseSessionsPerWeek, minutesPerExerciseSession, sex),
	},
	{
		name: 'Consuming Meat',
		value: servingsRedMeat * -1,
	},
	{
		name: 'Consuming Fruit/Veg',
		value: (servingsVeg / 5) * (sex === 'male' ? 4 : 3),
	},
	{
		name: 'Smoking',
		value: (cigarettesPerDay / 2) * -1, // https://understandinguncertainty.org/microlives doll and peto
	},
	{
		name: 'Drinking Alcohol',
		value: microlivesFromAlcohol(drinksPerSession, drinkingSessionsPerWeek, sex),
	},
	{
		name: 'Getting Covid',
		value: preventsCovidInfection ? 0 : receivesYearlyCovidVaccine ? -3.66 : -5.98,
	},
];
