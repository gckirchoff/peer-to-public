<script lang="ts">
	import Chart from '$lib/components/internal/projects/CumulativeRisk/Chart/Chart.svelte';
	import AdvancedTools from '$lib/components/internal/projects/CumulativeRisk/AdvancedTools/AdvancedTools.svelte';
	import Highlight from '$lib/components/internal/projects/CumulativeRisk/Highlight/Highlight.svelte';
	import { Body2 } from '$lib/components/internal/typography';

	let inputLongCovidPercent = $state(15);
	let infectionCount = $state(3);
	let riskGrowthFactor = $state(1);

	let longCovidChance = $derived(inputLongCovidPercent / 100);

	let chanceOfNotGettingLongCovid = $derived(1 - longCovidChance);
	let chanceOfNotGettingLongCovidAfterNInfections = $derived(
		Math.pow(chanceOfNotGettingLongCovid, infectionCount),
	);
	let cumulativeRiskOfLongCovid = $derived(1 - chanceOfNotGettingLongCovidAfterNInfections);
</script>

<label class="range-input">
	<Body2><Highlight>{inputLongCovidPercent}%</Highlight> Long Covid risk per infection:</Body2>
	<input bind:value={inputLongCovidPercent} type="range" min={0} max={100} step={0.1} />
</label>
<Chart {longCovidChance} {riskGrowthFactor} />
<AdvancedTools bind:riskGrowthFactor />

<style lang="scss">
	.range-input {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: var(--spacing-4);

		input {
			cursor: pointer;
		}
	}
</style>
