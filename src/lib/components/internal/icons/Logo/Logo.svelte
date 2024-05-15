<script lang="ts">
	import { theme } from '$lib/store';
	import LightModeLogo from './LightModeLogo/LightModeLogo.svelte';
	import DarkModeLogo from './DarkModeLogo/DarkModeLogo.svelte';
</script>

{#if $theme === 'light'}
	<LightModeLogo />
{:else}
	<DarkModeLogo />
{/if}
