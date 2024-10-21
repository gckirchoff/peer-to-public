<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { easeCubicInOut } from 'd3';

	import type { AnimatedRectangleProps } from './constants';

	let { x, y, width, height, ...rest }: AnimatedRectangleProps = $props();

	let renders = $state(0);
	let animated = tweened(
		{
			x,
			y,
			width,
			height,
		},
		{
			easing: easeCubicInOut,
		},
	);

	$effect(() => {
		// Hacky way to stop initial render
		// having everything fly in from top left.
		// Find a better way one day
		if (renders < 2) {
			animated.set(
				{
					x,
					y,
					width,
					height,
				},
				{
					duration: 0,
				},
			);
			renders++;
			return;
		}
		animated.set({
			x,
			y,
			width,
			height,
		});
	});
</script>

<rect x={$animated.x} y={$animated.y} width={$animated.width} height={$animated.height} {...rest} />
