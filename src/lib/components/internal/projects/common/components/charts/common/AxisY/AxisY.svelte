<script lang="ts">
	import { format, timeFormat } from 'd3';
	import type { ScaleLinear, ScaleLogarithmic, ScaleTime, ScaleBand } from 'd3';

	type T = $$Generic;

	export let label: string;
	export let yScale:
		| ScaleLinear<T, number>
		| ScaleLogarithmic<T, number>
		| ScaleTime<T, number>
		| ScaleBand<string>;
	export let innerChartWidth: number;
	export let formatter: (tick: T) => string = (tick) => {
		if (typeof tick === 'number') {
			return format('')(tick);
		} else if (tick instanceof Date) {
			return timeFormat('%Y-%m-%d')(tick);
		} else {
			return String(tick);
		}
	};
	let yTicks: T[];
	$: yTicks = 'ticks' in yScale ? (yScale.ticks() as T[]) : (yScale.domain() as T[]);
</script>

<g class="axis y">
	{#each yTicks as tick, index}
		<g class="tick" transform="translate(0, {yScale(tick)})">
			<line x1={0} y1={0} y2={0} x2={innerChartWidth} stroke="#b1b1b1" />
			<text x={-45} y={0} dominant-baseline="middle">
				{formatter(tick)}
			</text>
		</g>
	{/each}
	<g style="transform: translate(-60px, {yScale.range()[0] * 0.5}px) rotate(-90deg);">
		<text text-anchor="middle">
			{label}
		</text>
	</g>
</g>

<style lang="scss">
	.tick {
		transition: all 500ms ease;
	}

	text {
		font-size: 1.4rem;
		font-family: var(--font-base);
		user-select: none;
		fill: var(--clr-text-on-surface-1000);
	}
</style>
