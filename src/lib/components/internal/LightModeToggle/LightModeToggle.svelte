<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { FlyParams } from 'svelte/transition';

	import { theme, toggleTheme } from '$lib/store';
	import Sun from './icons/sun.svelte';
	import Moon from './icons/moon.svelte';

	const myFly: FlyParams = { y: 10 };
</script>

<button on:click={toggleTheme} aria-label="Toggle theme">
	{#if $theme === 'dark'}
		<div in:fly={myFly}>
			<Moon />
		</div>
	{:else}
		<div in:fly={myFly}>
			<Sun />
		</div>
	{/if}
</button>

<style>
	button {
		padding: 0;
		font-weight: inherit;
		background: none;
		border: none;
		box-shadow: none;
		overflow: hidden;
		width: 3rem;
		color: var(--clr-text-on-surface);
	}
	button > * {
		display: flex;
		gap: var(--size-2);
	}
</style>
