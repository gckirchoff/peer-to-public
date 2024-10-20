<script lang="ts">
	import HeatMap from '../common/components/charts/HeatMap/HeatMap.svelte';

	import { data } from './logic';
</script>

<div class="chart-container">
	<HeatMap {data} />
</div>

<style lang="scss">
	.chart-container {
		height: 400px;
	}
</style>
