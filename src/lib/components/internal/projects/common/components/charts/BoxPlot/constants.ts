import type { Margin, Series } from '../constants';

export const defaultMargin: Margin = {
	top: 10,
	right: 20,
	bottom: 70,
	left: 75,
};

export interface BoxPlotProps {
	series: Series[];
	title?: string;
	yLabel: string;
	xLabel: string;
	margin?: typeof defaultMargin;
}
