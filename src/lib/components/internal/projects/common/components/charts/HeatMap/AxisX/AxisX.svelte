<script lang="ts">
	import type { AxisXProps } from './constants';

	let { label, xScale, chartHeight }: AxisXProps = $props();
</script>

{#each xScale.domain() as xLabel}
	<g
		style="transform: translate({(xScale(xLabel) ?? 0) + xScale.bandwidth() * 0.5}px, {chartHeight +
			20}px);"
	>
		<text class="tick-text x-tick-text" x={-8} text-anchor="start">
			{xLabel}
		</text>
	</g>
{/each}
<text class="axis-label" x={xScale.range()[1] * 0.5} y={chartHeight + 70} text-anchor="middle">
	{label}
</text>

<style lang="scss">
	.tick-text {
		font-size: var(--font-14);
		font-family: var(--font-base);
		user-select: none;
		fill: var(--clr-text-on-surface-1000);

		&.x-tick-text {
			transform: rotate(50deg);
			transform-origin: top left;
		}
	}

	.axis-label {
		font-size: 1.5rem;
		fill: var(--clr-text-on-surface-1000);
	}
</style>
