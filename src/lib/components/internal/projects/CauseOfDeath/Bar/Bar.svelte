<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { BarData, Stage } from '../constants';

	export let data: BarData;
	export let stage: Stage;

	export let hoveredData: BarData | null;
	export let updateHoveredData: (data: BarData) => void;
	export let innerHeight: number;
</script>

<rect
	on:mouseover={() => {
		updateHoveredData(data);
	}}
	on:focus={() => updateHoveredData(data)}
	role="tooltip"
	height={data.height}
	width={Math.max(data.width, 0)}
	x={data.x}
	y={data.y}
	fill={data.color}
	stroke={data.color}
/>

{#if hoveredData?.data.value === data?.data.value && stage === 'flattened'}
	<g transition:fade={{ duration: 200 }}>
		<line
			x1={data.x + data.width}
			y1={data.y}
			x2={data.x + data.width}
			y2={innerHeight}
			stroke={data.color}
			stroke-width="2"
		/>
		<text
			x={data.x + data.width}
			y={data.y}
			dx={10}
			dy={data.height / 2 + 5}
			dominant-baseline="middle"
			style="fill: var(--clr-txt-500);"
		>
			{data.data.value.toLocaleString()} deaths
		</text>
	</g>
{/if}

<style lang="scss">
	rect {
		transition: all 500ms ease;
	}
</style>
