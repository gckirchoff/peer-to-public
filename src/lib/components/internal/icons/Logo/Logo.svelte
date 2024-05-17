<script lang="ts">
	import { theme } from '$lib/store';
	import type { Theme } from '$lib/store';
	import LightModeLogo from './LightModeLogo/LightModeLogo.svelte';
	import DarkModeLogo from './DarkModeLogo/DarkModeLogo.svelte';

	export let mode: Theme | undefined = undefined;
</script>

{#if mode === undefined}
	{#if $theme === 'light'}
		<LightModeLogo />
	{:else}
		<DarkModeLogo />
	{/if}
{:else if mode === 'light'}
	<LightModeLogo />
{:else}
	<DarkModeLogo />
{/if}
