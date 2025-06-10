<script lang="ts">
	import Accordion from '$lib/components/internal/Accordion/Accordion.svelte';
	import { roundTo } from '../../util/math';
	import type { AdvancedToolsProps } from './constants';

	let { advancedConfigurables }: AdvancedToolsProps = $props();
</script>

<Accordion title="Advanced Tools">
	<div class="advanced-tools-inside">
		<label>
			{advancedConfigurables.wavesPerYear} waves per year
			<input
				bind:value={advancedConfigurables.wavesPerYear}
				type="range"
				min="0.25"
				max="3"
				step="0.25"
			/>
		</label>
		<label>
			{roundTo(advancedConfigurables.fractionInfected * 100, 2)}% Infected/wave
			<input
				bind:value={advancedConfigurables.fractionInfected}
				type="range"
				min="0"
				max="1"
				step="0.01"
			/>
		</label>
		<label>
			{roundTo(advancedConfigurables.populationGrowthRate * 100, 2)}% pop. growth rate
			<input
				bind:value={advancedConfigurables.populationGrowthRate}
				type="range"
				min="-0.03"
				max="0.03"
				step="0.0005"
			/>
		</label>
	</div>
</Accordion>

<style lang="scss">
	.advanced-tools-inside {
		padding: var(--spacing-8);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-24);

		label {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-4);
			cursor: pointer;
			user-select: none;

			input {
				cursor: pointer;
			}
		}
	}
</style>
