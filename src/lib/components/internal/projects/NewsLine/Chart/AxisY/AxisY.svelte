<script lang="ts">
	import type { ScaleLinear } from 'd3';

	export let yScale: ScaleLinear<number, number, never>;
	export let width: number;

	let yTicks = yScale.ticks(6);
</script>

<g class="axis y">
	{#each yTicks as tick, index}
		<g class="tick" transform="translate(0, {yScale(tick)})">
			<line x1={0} y1={0} y2={0} x2={width} stroke="#b1b1b1" />
			<text x={-5} y={0} text-anchor="end" dominant-baseline="middle">
				{tick}
			</text>
		</g>
	{/each}
</g>
