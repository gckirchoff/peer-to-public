export const baselineCancer = 2000000;

export const beginningOfPandemic = new Date('2020/12/31');

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

export type Mode = 'summed' | 'separate' | 'both';
