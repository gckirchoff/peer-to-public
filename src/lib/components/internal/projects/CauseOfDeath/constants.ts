export interface BarData {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	data: MortalityData;
	name: string;
}

type Modify<T, K> = Omit<T, keyof K> & K;

export type UnprocessedMortalityData = Modify<
	MortalityData,
	{
		percent: string;
		rank: string;
		year2020: string;
		year2021: string;
	}
>;

export interface MortalityData {
	percent: number;
	rank: number;
	source: string;
	subType: string;
	type: string;
	year2020: number;
	year2021: number;
}

export type Stage = 'initial' | 'differentiated' | 'flattened';

export const stages: Stage[] = ['initial', 'differentiated', 'flattened'];

export const infoBoxContent = [
	'Heart disease was the number one cause of death in 2020.',
	'But that is a category, while Covid is a single cause of death',
	'We should be comparing apples to apples - singular cause to singular cause - rather than comparing singular causes with categories',
];
