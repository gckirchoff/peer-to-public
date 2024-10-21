import type { interpolateInferno } from 'd3-scale-chromatic';

import type { Margin } from '../constants';

export interface HeatmapData {
	x: string;
	y: string;
	value: number;
}

export interface Props {
	data: HeatmapData[];
	margin?: Partial<Margin>;
	colorScheme?: typeof interpolateInferno;
	selectedData?: HeatmapData | null;
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

export const defaultMargin = { top: 10, left: 70, right: 100, bottom: 30 };
