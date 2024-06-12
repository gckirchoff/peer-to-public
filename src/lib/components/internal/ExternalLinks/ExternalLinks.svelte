<script lang="ts">
	import { Body1 } from '$lib/components/internal/typography';

	export let externalLink = '';
	export let internalLink = '';
</script>

<div class="links-container">
	{#if externalLink}
		<Body1><a href={externalLink}>Back to origin</a></Body1>
	{/if}
	{#if internalLink}
		<Body1><a href="/posts/{internalLink}">Full Post on Peer to Public</a></Body1>
	{/if}
</div>

<style lang="scss">
	.links-container {
		display: flex;
		column-gap: var(--spacing-24);
		margin-bottom: var(--spacing-16);
		flex-wrap: wrap;

		a {
			text-decoration: underline;
		}
	}
</style>
