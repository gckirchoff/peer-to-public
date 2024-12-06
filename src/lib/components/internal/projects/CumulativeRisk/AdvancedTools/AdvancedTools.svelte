<script lang="ts">
	import Accordion from '$lib/components/internal/Accordion/Accordion.svelte';
	import type { AdvancedToolsProps } from './constants';

	let { riskGrowthFactor = $bindable() }: AdvancedToolsProps = $props();
</script>

<Accordion title="Advanced Tools">
	<div class="advanced-tools-inside">
		<label>
			{riskGrowthFactor} risk growth/decay
			<input bind:value={riskGrowthFactor} type="range" min="0" max="2" step="0.1" />
		</label>
	</div>
</Accordion>

<style lang="scss">
	.advanced-tools-inside {
		padding: var(--spacing-8);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 400px));
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
