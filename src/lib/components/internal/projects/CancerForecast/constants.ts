export const baselineCancer = 2000000;

export const beginningOfPandemic = new Date('2020/01/01');

export interface PredictedCases {
	date: Date;
	cases: number;
}

export interface Distribution {
	start: Date;
	mean: Date;
	standardDeviation: number;
	predictedCases: PredictedCases[];
}

export type Mode = 'aggregate' | 'separate' | 'both';
