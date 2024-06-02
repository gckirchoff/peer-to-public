<script lang="ts">
	import type { ScaleLinear } from 'd3';

	export let averageLifeSpan: number;
	export let middleHeight: number;
	export let shorterThanAverage: boolean;
	export let x: number;
	export let barWidth: number;
	export let xScale: ScaleLinear<number, number, never>;
	export let delta: string;

	$: deltaLineStart = shorterThanAverage ? x : xScale(averageLifeSpan);
	$: deltaLineEnd = shorterThanAverage ? xScale(averageLifeSpan) : x + barWidth;

	$: text = `${delta} years ${shorterThanAverage ? 'shorter' : 'longer'}`;
</script>

{#if delta !== '0'}
	<line
		x1={deltaLineStart}
		y1={middleHeight - 33}
		x2={deltaLineEnd}
		y2={middleHeight - 33}
		stroke-width="2px"
	/>
	<line
		x1={deltaLineStart}
		y1={middleHeight - 33}
		x2={deltaLineStart}
		y2={middleHeight - 25}
		stroke-width="2px"
	/>
	<line
		x1={deltaLineEnd}
		y1={middleHeight - 33}
		x2={deltaLineEnd}
		y2={middleHeight - 25}
		stroke-width="2px"
	/>
	<text x={(deltaLineStart + deltaLineEnd) * 0.5} y={-25} text-anchor="middle">
		{text}
	</text>
{/if}

<style lang="scss">
	text {
		fill: var(--clr-text-on-surface-500);
	}

	line {
		stroke: var(--clr-text-on-surface-500);
	}
</style>
