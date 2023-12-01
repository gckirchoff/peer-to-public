<script lang="ts">
	import { Body1 } from '$lib/components/internal/typography';
	import type { Step } from '../types';

	export let steps: Step[];
</script>

<div class="instructions">
	<h5>Instructions</h5>
	<ol>
		{#each steps as step}
			<li>
				<Body1 style="font-size: 2rem; line-height: 2.6rem; margin-bottom: var(--spacing-16)">
					{#if typeof step === 'string'}
						{step}
					{:else}
						<strong>{step.emphasis}</strong>{step.description}
					{/if}
				</Body1>
			</li>
		{/each}
	</ol>
</div>

<style lang="scss">
	.instructions {
		font-size: 1rem;
		border-top: 1px solid var(--clr-primary-500);
		padding-top: var(--spacing-32);

		// TODO .prose css conflict
		li {
			font-size: 2rem;
		}
	}
</style>
