<script lang="ts">
	import { interpolateMagma } from 'd3-scale-chromatic';

	import HeatMap from '../common/components/charts/HeatMap/HeatMap.svelte';
	import { data, generateOverallData } from './logic';

	const overallData = generateOverallData();
</script>

<div class="chart-container">
	<HeatMap data={overallData} colorScheme={interpolateMagma} />
</div>

<style lang="scss">
	.chart-container {
		height: 400px;
	}
</style>
