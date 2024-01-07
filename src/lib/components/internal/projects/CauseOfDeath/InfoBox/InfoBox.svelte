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
		left: 65%;
		max-width: 20vw;
		padding: 2rem;
		background-color: plum;
	}
</style>
