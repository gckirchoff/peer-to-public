<script lang="ts">
	import Scrolly from './Scrolly/Scrolly.svelte';

	export let currentStep: number | undefined;
	export let steps: number | string[];
	export let scrollHeight: string | number = '90vh';

	$: renderedSteps = Array.isArray(steps) ? steps : (new Array(steps).fill('') as string[]);
	$: lastIndex = renderedSteps.length - 1;
</script>

<div class="steps">
	<Scrolly bind:value={currentStep}>
		{#each renderedSteps as step, i}
			<div
				class="step"
				class:active={currentStep === i}
				style="height: {i === lastIndex ? '120vh' : scrollHeight}"
			>
				{#if step}
					<div class="step-content">
						<p>{step}</p>
					</div>
				{/if}
			</div>
		{/each}
	</Scrolly>
</div>

<style>
	.steps {
		position: relative;
		z-index: 2;
		pointer-events: none;
	}

	.step {
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.3;
		transition: opacity 300ms ease;
	}

	.step.active {
		opacity: 1;
	}

	.step-content {
		background-color: white;
		border: 1px solid black;
		padding: 0.75rem 1rem;
		border-radius: 3px;
	}
</style>
