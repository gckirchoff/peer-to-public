export interface BarData {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	data: MortalityData;
	name: string;
}

export interface Label {
	x: number;
	y: number;
	text: string;
	textAnchor: 'start' | 'end';
}

type Modify<T, K> = Omit<T, keyof K> & K;

export type UnprocessedMortalityData = Modify<
	MortalityData,
	{
		percent: string;
		value: string;
	}
>;

export interface MortalityData {
	percent: number;
	source: string;
	category: string;
	type: string;
	value: number;
}

export type Stage = 'initial' | 'differentiated' | 'flattened';

export const stages: Stage[] = ['initial', 'differentiated', 'flattened'];

export const smallScreenWidth = 1150;
