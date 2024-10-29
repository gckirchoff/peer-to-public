<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { ScaleLinear } from 'd3';

	export let yScale: ScaleLinear<number, number, never>;
	export let width: number;
	export let height: number;
	export let label = '';

	$: yTicks = yScale.ticks(6);
</script>

<g class="axis y">
	{#if label}
		<g style="transform: translate(-60px, {height / 2}px) rotate(-90deg)">
			<text class="label" text-anchor="middle">
				{label}
			</text>
		</g>
	{/if}
	{#each yTicks as tick, index (tick)}
		<g
			class="tick"
			style="transform: translate(0px, {yScale(tick)}px);"
			animate:flip={{ duration: 200 }}
		>
			<line x1={0} y1={0} y2={0} x2={width} stroke="#b1b1b1" />
			<text x={-5} y={0} text-anchor="end" dominant-baseline="middle">
				{tick}
			</text>
		</g>
	{/each}
</g>

<style lang="scss">
	.label {
		font-size: 16px;
	}

	.tick {
		transition: all 200ms ease;
	}
</style>
