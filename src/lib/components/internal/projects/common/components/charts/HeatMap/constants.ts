import type { interpolateInferno } from 'd3-scale-chromatic';

import type { Margin } from '../constants';

export interface HeatmapData {
	x: string;
	y: string;
	value: number;
}

export interface Props {
	data: HeatmapData[];
	title: string;
	xLabel: string;
	yLabel: string;
	margin?: Partial<Margin>;
	colorScheme?: typeof interpolateInferno;
	selectedData?: HeatmapData | null;
	valueDomain?: [number, number];
}

export interface TooltipData {
	id: string;
	xLabel: string;
	yLabel: string;
	xPosition: number;
	yPosition: number;
	value: number;
}

export const squarePadding = 0.075;
export const squareHoverScale = 0.2;

export const defaultMargin = { top: 25, left: 75, right: 100, bottom: 75 };
