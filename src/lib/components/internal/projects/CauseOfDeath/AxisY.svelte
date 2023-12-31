<script lang="ts">
	import type { ScaleBand } from 'd3-scale';

	export let width: number;
	export let yScale: ScaleBand<string>;
	$: yLabels = yScale.domain();
</script>

<g class="axis y">
	{#each yLabels as label, index}
		<g class="tick" transform="translate(0, {yScale(label)})">
			<text x={-10} y={0} text-anchor="end" dominant-baseline="middle">{label}</text>
		</g>
	{/each}
</g>
