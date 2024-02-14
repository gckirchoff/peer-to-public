<script lang="ts">
	import type { MediaIconType } from '$lib/types/config';
	import { Github, Twitter, Youtube } from '$lib/icons';

	export let type: MediaIconType;
</script>

{#if type === 'Github'}
	<Github />
{:else if type === 'Twitter'}
	<Twitter />
{:else if type === 'Youtube'}
	<Youtube />
{/if}
