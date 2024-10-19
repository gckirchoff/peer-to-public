<script lang="ts">
	import Steps from './Steps/Steps.svelte';

	export let currentStep: number | undefined = 5;
	export let steps: number | string[];
	export let scrollHeight: string | number | undefined = undefined;
</script>

<section>
	<div class="sticky">
		<slot />
	</div>
	<Steps bind:currentStep {steps} {scrollHeight} />
</section>

<style lang="scss">
	section {
		position: relative;
		margin-bottom: var(--spacing-24);
	}

	.sticky {
		position: sticky;
		top: 5vh;
		z-index: 1;
		height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
