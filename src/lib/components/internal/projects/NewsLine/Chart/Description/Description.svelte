<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import { Body1 } from '$lib/components/internal/typography';

	export let description: string;
</script>

<div class="description-container">
	{#key description}
		<div class="description" in:fly={{ y: 10, delay: 700 }} out:fade>
			<Body1>
				{description}
			</Body1>
		</div>
	{/key}
</div>

<style lang="scss">
	.description-container {
		grid-area: summary;

		.description {
			padding: var(--spacing-24);
		}
	}
</style>
