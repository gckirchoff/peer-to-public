<script lang="ts">
	import { fade } from 'svelte/transition';

	import { infoBoxContent } from './constants';

	export let currentStep: number | undefined;

	$: infoBoxText = infoBoxContent[currentStep ?? 0];
</script>

{#key infoBoxText}
	<div class="info-box" in:fade={{ delay: 700 }} out:fade>
		<p>{infoBoxContent[currentStep ?? 0]}</p>
	</div>
{/key}

<style lang="scss">
	.info-box {
		position: absolute;
		top: 50%;
		right: 0;
		max-width: 40%;
		box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
		border-radius: 0.5rem;
		pointer-events: none;
		
		padding: 2rem;
		border-radius: 1rem;
		background-color: white;

		
		font-size: 1.8rem;
	}
</style>
