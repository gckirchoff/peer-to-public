<script lang="ts">
	import { interpolateMagma } from 'd3-scale-chromatic';

	import HeatMap from '../common/components/charts/HeatMap/HeatMap.svelte';
	import { data, generateOverallData } from './logic';
	import { Body1, H4 } from '../../typography';

	const overallData = generateOverallData();
</script>

<div class="dashboard">
	<div class="title">
		<H4>Hey</H4>
	</div>
	<div class="overall-probabilities-chart-container">
		<HeatMap data={overallData} colorScheme={interpolateMagma} />
	</div>
	<div class="time-window-chart-container">
		<HeatMap data={overallData} colorScheme={interpolateMagma} />
	</div>
	<div class="monte-carlo-sim">
		<HeatMap data={overallData} colorScheme={interpolateMagma} />
	</div>
</div>

<style lang="scss">
	.dashboard {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: auto 40rem 20rem 20rem;
		grid-template-areas:
			'. . title . .'
			'. overall-heatmap overall-heatmap overall-heatmap .'
			'time-heatmap time-heatmap monte-carlo monte-carlo monte-carlo'
			'time-heatmap time-heatmap scrubber scrubber scrubber';

		.title {
			grid-area: title;
			text-align: center;
		}

		.overall-probabilities-chart-container {
			grid-area: overall-heatmap;
		}

		.time-window-chart-container {
			grid-area: time-heatmap;
		}

		.monte-carlo-sim {
			grid-area: monte-carlo;
		}
	}
</style>
