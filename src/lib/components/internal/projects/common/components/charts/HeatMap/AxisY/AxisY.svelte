<script lang="ts">
	import type { AxisYProps } from './constants';

	let { label, yScale }: AxisYProps = $props();
</script>

{#each yScale.domain() as yLabel}
	<text
		class="tick-text"
		x={-20}
		y={(yScale(yLabel) ?? 0) + yScale.bandwidth() * 0.5}
		text-anchor="end"
		dominant-baseline="middle"
	>
		{yLabel}
	</text>
{/each}
<text
	class="axis-label"
	style="transform: translate(-60px, {yScale.range()[0] * 0.5}px) rotate(-90deg);"
	text-anchor="middle"
>
	{label}
</text>

<style lang="scss">
	text {
		user-select: none;
	}

	.axis-label {
		font-size: 1.5rem;
		fill: var(--clr-text-on-surface-1000);
	}

	.tick-text {
		font-size: var(--font-14);
		font-family: var(--font-base);
		fill: var(--clr-text-on-surface-1000);
	}
</style>
