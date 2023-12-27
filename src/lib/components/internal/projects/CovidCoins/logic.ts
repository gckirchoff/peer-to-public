import type { AgeMortality, UnprocessedAgeMortality, UnprocessedMortalityItem } from './constants';

export const processMortalityItem = (row: UnprocessedMortalityItem) => ({
	...row,
	coins: Math.round(+row.coins),
	isInstance: row.isInstance === 'TRUE',
	triesUntil50: +row.triesUntil50,
	triesUntil95: +row.triesUntil95,
});

export const processAgeItem = (row: UnprocessedAgeMortality): AgeMortality => ({
	...processMortalityItem(row),
	age: +row.age,
});
