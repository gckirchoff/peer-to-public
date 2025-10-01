<script lang="ts">
	import type { BarProps } from './constants';
	import { fadeAmount } from './constants';
	import { uid, LightenDarkenColor } from './logic';

	let {
		x,
		y,
		width,
		height,
		fill,
		radius = 5,
		gradient = false,
		animate = false,
		...rest
	}: BarProps = $props();

	const id = uid();

	let isPositive = $derived(height >= 0);
	let r = $derived(Math.min(radius, Math.abs(height) / 2));
	let path = $derived(
		isPositive
			? `
        M ${x}, ${y}
        v ${-height + r}
        a ${r},${r} 0 0 1 ${r},${-r}
        h ${width - 2 * r}
        a ${r},${r} 0 0 1 ${r},${r}
        v ${height - r}
    `
			: `
        M ${x}, ${y}
        v ${-height - r}
        a ${r},${r} 0 0 0 ${r},${r}
        h ${width - 2 * r}
        a ${r},${r} 0 0 0 ${r},${-r}
        v ${height + r}
    `
	);
</script>

<defs>
	<linearGradient id="gradient-{id}" x1="0%" y1="100%" x2="0%" y2="0%">
		<stop offset="0%" stop-color={fill} />
		<stop offset="100%" stop-color={LightenDarkenColor(fill ?? '', fadeAmount)} />
	</linearGradient>
</defs>

<path d={path} fill={gradient ? `url(#gradient-${id})` : fill} class:animate {...rest} />

<style>
	.animate {
		transition: all 500ms ease;
	}
</style>
