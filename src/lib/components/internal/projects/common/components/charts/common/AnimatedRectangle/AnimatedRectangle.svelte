<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { fade, scale } from 'svelte/transition';
	import { easeCubicInOut } from 'd3';

	import type { AnimatedRectangleProps } from './constants';
	import { floorNum } from './logic.svelte';

	let { x, y, width, height, animationOptions, ...rest }: AnimatedRectangleProps = $props();

	let animated = tweened(
		{
			x,
			y,
			width: floorNum(width),
			height: floorNum(height),
		},
		{
			easing: easeCubicInOut,
			...animationOptions,
		},
	);

	let renders = $state(0);
	$effect(() => {
		// Hacky way to stop initial render
		// having everything fly in from top left.
		// Find a better way one day
		const flooredX = floorNum(x);
		const flooredY = floorNum(y);
		const flooredWidth = floorNum(width);
		const flooreHeight = floorNum(height);
		if (renders < 2) {
			animated.set(
				{
					x: flooredX,
					y: flooredY,
					width: flooredWidth,
					height: flooreHeight,
				},
				{
					duration: 0,
				},
			);
			renders++;
			return;
		}
		animated.set({
			x: flooredX,
			y: flooredY,
			width: flooredWidth,
			height: flooreHeight,
		});
	});
</script>

<rect
	x={$animated.x}
	y={$animated.y}
	width={$animated.width}
	height={$animated.height}
	transition:fade
	{...rest}
/>
