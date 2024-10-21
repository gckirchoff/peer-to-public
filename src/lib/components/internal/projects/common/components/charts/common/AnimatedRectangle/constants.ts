import type { TweenedOptions } from 'svelte/motion';

export interface AnimatedRectangleProps {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	fill?: string;
	stroke?: string;
	'stroke-width'?: number;
	opacity?: number;
	animationOptions?: TweenedOptions<{
		x: number | undefined;
		y: number | undefined;
		width: number | undefined;
		height: number | undefined;
	}>;
}
