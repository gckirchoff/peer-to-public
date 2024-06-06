<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { ScaleLinear } from 'd3';

	export let xScale: ScaleLinear<number, number, never>;
	export let innerChartHeight: number;
</script>

<g class="axis x" transform="translate(0, {innerChartHeight})">
	{#each xScale.ticks() as tick (tick)}
		<g class="tick" transform="translate({xScale(tick)} 0)" animate:flip={{ duration: 200 }}>
			<line x1={0} x2={0} y1={0} y2={6} stroke="hsla(212, 10%, 53%, 1)" />
			<text x={0} y={10} dy={10} text-anchor="middle">
				{tick}
			</text>
		</g>
	{/each}
</g>

<style lang="scss">
	line {
		stroke: var(--clr-text-on-surface-500);
		stroke-width: 1;
	}

	text {
		font-size: 1.4rem;
		font-family: var(--font-base);
		user-select: none;
		fill: var(--clr-text-on-surface-500);
	}
</style>
