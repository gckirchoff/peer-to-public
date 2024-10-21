<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { easeCubicInOut } from 'd3';

	import type { RectangleProps } from './constants';

	let { x, y, width, height, ...rest }: RectangleProps = $props();

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
