import { scaleLinear } from 'd3';

import type { Sex } from './constants';

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
