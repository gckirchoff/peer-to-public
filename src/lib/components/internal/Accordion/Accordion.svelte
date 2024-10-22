<script lang="ts">
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface AccordionProps {
		title: string;
		children: Snippet;
	}

	let { title, children }: AccordionProps = $props();
	let isOpen = $state(false);

	const toggle = () => (isOpen = !isOpen);
</script>

<div>
	<button class="flex" on:click={toggle} aria-expanded={isOpen}>
		<svg
			class="mr-1"
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
		>
		{title}
	</button>

	<div class="revealer ml-6 mb-4">
		{#key isOpen}
			<div class:hidden={!isOpen} transition:slide={{ duration: 300 }}>
				{@render children()}
			</div>
		{/key}
	</div>
</div>

<style>
	button {
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		margin: 0;
		padding-bottom: 0.5rem;
		padding-top: 0.5rem;
	}

	svg {
		flex-shrink: 0;
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}

	.revealer {
		margin: 0;
		margin-left: 1rem;
		color: #777;
	}
	.flex {
		display: flex;
	}
	.mr-1 {
		margin-right: 0.25rem;
	}
	.ml-6 {
		margin-left: 1.5rem;
	}
	.mb-4 {
		margin-bottom: 1rem;
	}
	.hidden {
		display: none;
	}
</style>
