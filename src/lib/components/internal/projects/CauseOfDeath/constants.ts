export interface BarData {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	data: MortalityData;
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

export interface MortalityDataHierarchical {
	type: string;
	subTypes: MortalityData[];
}

export type Stage = 'initial' | 'differentiated' | 'flattened';
