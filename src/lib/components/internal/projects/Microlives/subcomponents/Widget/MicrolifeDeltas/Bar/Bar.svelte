<script lang="ts">
	import type { ScaleBand, ScaleLinear } from 'd3';

	type T = $$Generic;

	export let data: T;
	export let xScale: ScaleLinear<number, number, never>;
	export let yScale: ScaleBand<string>;
	export let xAccessor: (d: T) => number;
	export let yAccessor: (d: T) => string;
	export let label = '';

	$: isPositive = xAccessor(data) >= 0;
	$: x = isPositive ? xScale(0) : xScale(xAccessor(data));
	$: width = isPositive ? xScale(xAccessor(data)) - xScale(0) : xScale(0) - xScale(xAccessor(data));
</script>

<rect {x} y={yScale(yAccessor(data))} {width} height={yScale.bandwidth()} />
<text
	x={xScale(0)}
	dx={5 * (isPositive ? -1 : 1)}
	y={(yScale(yAccessor(data)) ?? 0) + yScale.bandwidth() / 2}
	text-anchor={isPositive ? 'end' : 'start'}
	dominant-baseline="middle"
	fill="white">{label}</text
>

<style lang="scss">
	rect {
		transition: all 400ms ease;
	}

	text {
		fill: black;
	}
</style>
