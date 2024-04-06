<script lang="ts">
	import type { ScaleBand, ScaleLinear } from 'd3';
	import { theme } from '$lib/store';

	type T = $$Generic;

	export let data: T;
	export let xScale: ScaleLinear<number, number, never>;
	export let yScale: ScaleBand<string>;
	export let xAccessor: (d: T) => number;
	export let label = '';

	$: isPositive = xAccessor(data) >= 0;
	$: x = isPositive ? xScale(0) : xScale(xAccessor(data));
	$: width = isPositive ? xScale(xAccessor(data)) - xScale(0) : xScale(0) - xScale(xAccessor(data));
	$: fill = $theme === 'light' ? 'black' : 'white';
</script>

<rect {x} y={0} {width} height={yScale.bandwidth()} {fill} />
<text
	x={xScale(0)}
	dx={5 * (isPositive ? -1 : 1)}
	y={yScale.bandwidth() / 2}
	text-anchor={isPositive ? 'end' : 'start'}
	dominant-baseline="middle"
	{fill}
>
	{label}
</text>

<style lang="scss">
	rect {
		transition: all 400ms ease;
	}
</style>
