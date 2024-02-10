export const baselineCancer = 18000000;

export const beginningOfPandemic = new Date('2020/12/31');

export const endOfChart = new Date('2090/05/12');

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

export type PreventionDeterminant = 'date' | 'panic';

export type Mode = 'summed' | 'separate' | 'both';
