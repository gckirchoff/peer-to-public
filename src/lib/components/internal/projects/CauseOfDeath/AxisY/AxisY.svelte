<script lang="ts">
	import type { ScaleBand } from 'd3-scale';
	import type { BarData, Stage } from '../constants';
	import { getBarName } from '../logic';

	export let yScale: ScaleBand<string>;
	export let bars: BarData[];
	export let stage: Stage;

	const decreasingDeaths = (a: BarData, b: BarData) => b.data.year2020 - a.data.year2020;
	const sortedBars = bars.toSorted?.(decreasingDeaths) ?? [...bars].sort(decreasingDeaths);

	$: yLabels = yScale.domain();
</script>

<g class="axis y">
	{#each yLabels as label, index}
		<g class="tick" transform="translate(0, {yScale(label)})">
			<text x={-10} y={0} text-anchor="end" dominant-baseline="middle"
				>{label} {' ' + (stage === 'flattened' ? getBarName(sortedBars[index]) : '')}
			</text>
		</g>
	{/each}
</g>
