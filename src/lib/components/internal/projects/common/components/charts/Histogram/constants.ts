import type { Margin } from '../constants';

export interface Series {
	group: string;
	values: number[];
}

export interface HistogramProps {
	series: Series[];
	title: string;
	xLabel: string;
	yLabel: string;
	bucketNumber?: number;
	xDomain?: [number, number];
	yDomain?: [number, number];
	margin?: Partial<Margin>;
}

export const defaultMargin: Margin = {
	top: 10,
	right: 20,
	bottom: 45,
	left: 75,
};

export const bucketPadding = 5;
