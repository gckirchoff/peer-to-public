<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { easeCubicInOut } from 'd3';

	import type { AnimatedRectangleProps } from './constants';

	let { x, y, width, height, ...rest }: AnimatedRectangleProps = $props();

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
		animated.set({
			x,
			y,
			width,
			height,
		});
	});
</script>

<rect x={$animated.x} y={$animated.y} width={$animated.width} height={$animated.height} {...rest} />
