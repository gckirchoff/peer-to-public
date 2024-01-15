<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let description: string;
</script>

<div class="description-container">
	{#key description}
		<div class="description" in:fly={{ y: 10, delay: 1200 }} out:fade>
			{description}
		</div>
	{/key}
</div>

<style lang="scss">
	.description-container {
		position: relative;

		.description {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: var(--spacing-16);
			width: clamp(40rem, 50vw, 75rem);
			background-color: var(--clr-secondary-100);
			border-radius: var(--rounded-4);
			max-height: 100%;
			overflow-y: auto;
		}
	}
</style>
