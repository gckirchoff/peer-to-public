<script lang="ts">
	import { run, createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import * as d3 from 'd3';

	type T = $$Generic;

	interface Props {
		type?: 'line' | 'area';
		data?: T[];
		xAccessorScaled: (d: T) => number;
		yAccessorScaled: (d: T) => number;
		y0AccessorScaled?: number | ((d: T) => number);
		interpolation?: any;
		style?: string;
	}

	let {
		type = 'line',
		data = [],
		xAccessorScaled,
		yAccessorScaled,
		y0AccessorScaled = 0,
		interpolation = d3.curveMonotoneX,
		style = '',
	}: Props = $props();

	let lineGenerator = $derived.by(() =>
		type === 'line'
			? d3.line<T>().x(xAccessorScaled).y(yAccessorScaled).curve(interpolation)
			: d3
					.area<T>()
					.x(xAccessorScaled)
					.y0(y0AccessorScaled as (d: T) => number)
					.y1(yAccessorScaled)
					.curve(interpolation),
	);

	let line = $derived(lineGenerator(data));
</script>

<path
	class={`Line Line--type-${type}`}
	d={line}
	{style}
	onmouseover={bubble('mouseover')}
	onmouseleave={bubble('mouseleave')}
	onfocus={bubble('focus')}
	onblur={bubble('blur')}
	role="figure"
	aria-roledescription="area"
/>

<style>
	.Line {
		transition: all 0.3s ease-out;
		outline: none;
	}

	.Line--type-line {
		fill: none;
		stroke: #9980fa;
		stroke-width: 3px;
		stroke-linecap: round;
	}

	.Line--type-area {
		fill: rgba(152, 128, 250, 0.185);
		stroke-width: 0;
	}
</style>
