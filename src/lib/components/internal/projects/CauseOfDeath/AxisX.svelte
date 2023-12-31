<script lang="ts">
	import type { ScaleLinear } from "d3-scale";
	import type { DataItem } from "./constants";

	export let width = 100;
	export let height = 100;
	export let xScale: ScaleLinear<number, number, never>;

	$: xTicks = xScale.ticks(10);

</script>

<g class="axis x" transform="translate(0, {height})">
	<text class="axis-title" y={-9} x={width} text-anchor="end">Number of deaths → </text>
	{#each xTicks as tick}
		<g class="tick" transform="translate( {xScale(tick)},0)">
			<line x1="0" y1="0" x2="0" y2="6" stroke="hsla(212, 10%, 53%, 1)" />
			<text
				x="0"
				y="6"
				dy="9"
				dominant-baseline="middle"
				text-anchor={'middle'}>{tick}</text
			>
		</g>
	{/each}
</g>
