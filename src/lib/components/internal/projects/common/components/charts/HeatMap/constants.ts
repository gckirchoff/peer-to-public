import type { interpolateInferno } from 'd3-scale-chromatic';

export interface Data {
	x: string;
	y: string;
	value: number;
}

export interface Margin {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface Props {
	data: Data[];
	margin?: Partial<Margin>;
	colorScheme?: typeof interpolateInferno;
}

export interface TooltipData {
	xLabel: string;
	yLabel: string;
	xPosition: number;
	yPosition: number;
	value: number;
}

export const squarePadding = 0.075;

export const defaultMargin = { top: 10, left: 70, right: 100, bottom: 30 };
