<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import type { ScaleTime } from 'd3';

	export let xScale: ScaleTime<number, number, never>;
	export let dateFormatter: (date: Date) => string;
	export let height: number;

	$: xTicks = xScale.ticks(4);
</script>

<g class="axis x" transform="translate(0, {height})">
	{#each xTicks as tick, index (tick.getTime())}
		<g class="tick" transform="translate({xScale(tick)} 0)" animate:flip={{ duration: 200 }}>
			<line x1={0} x2={0} y1={0} y2={6} stroke="hsla(212, 10%, 53%, 1)" />
			<text x={0} y={10} dy={10} text-anchor="middle">
				{dateFormatter(tick)}
			</text>
		</g>
	{/each}
</g>

<style lang="scss">
	line {
		stroke: black;
		stroke-width: 1;
	}

	text {
		font-size: 1.4rem;
		font-family: var(--font-base);
		user-select: none;
		fill: #464646;
	}
</style>
