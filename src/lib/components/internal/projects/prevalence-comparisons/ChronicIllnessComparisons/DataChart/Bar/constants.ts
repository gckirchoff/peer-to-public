import type { SVGAttributes } from 'svelte/elements';

export type BarProps = SVGAttributes<SVGPathElement> & {
	x: number;
	y: number;
	width: number;
	height: number;
	radius?: number;
	gradient?: boolean;
	animate?: boolean;
};

export const fadeAmount = 55;
