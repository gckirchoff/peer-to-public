<script lang="ts">
	import type { ScaleLinear } from 'd3-scale';

	export let width = 100;
	export let height = 100;
	export let xScale: ScaleLinear<number, number, never>;

	$: xTicks = xScale.ticks(10);
</script>

<g class="axis x" transform="translate(0, {height})">
	{#each xTicks as tick}
		<g class="tick" transform="translate( {xScale(tick)},0)">
			<line x1="0" y1="0" x2="0" y2="10" stroke="hsla(212, 10%, 53%, 1)" />
			<line class="y-line" x1="0" y1={-height} x2="0" y2="-20" />

			<text x="0" y="15" dy="15" dominant-baseline="middle" text-anchor={'middle'}
				>{tick / 100000}</text
			>
		</g>
	{/each}
	<text class="axis-title" y={-7} x={width} text-anchor="end">
		Number of deaths, hundreds of thousands →
	</text>
</g>

<style lang="scss">
	.axis-title {
		fill: var(--clr-surface-800);
		font-size: var(--font-18);
	}
	.tick {
		.y-line {
			stroke: var(--clr-surface-300);
		}
	}
</style>
