export const dataFolder = '/data/covidCoins';

type Modify<T, K> = Omit<T, keyof K> & K;

export interface RiskItem {
	item: string;
	coins: number;
	triesUntil50: number;
	triesUntil95: number;
	frequency: string;
	isInstance: boolean;
	source: string;
}

export type UnprocessedMortalityItem = Modify<
	RiskItem,
	{
		coins: string;
		triesUntil50: string;
		triesUntil95: string;
		isInstance: string;
	}
>;

export interface AgeMortality extends RiskItem {
	age: number;
}

export type UnprocessedAgeMortality = UnprocessedMortalityItem & {
	age: string;
};

export type HandleChangeEvent<T extends HTMLElement> = Event & {
	currentTarget: EventTarget & T;
};

export type Outcome = 'mortality' | 'disability';
