<script lang="ts">
	import Modal from '$lib/components/internal/Modal/Modal.svelte';
	import { H4, H5 } from '$lib/components/internal/typography';
	import UsableRecipeCard from './UsableRecipeCard/UsableRecipeCard.svelte';
	import { UsableType } from './constants';
	import type { Usable } from './constants';

	export let open: boolean;
	export let handleClose: () => void;
	export let handleSubmit: (usable: Usable) => void;

	let type: UsableType;
</script>

<Modal {open} {handleClose}>
	<select bind:value={type} class="type-select">
		<option value={UsableType.RecipeCard}>Recipe Card</option>
		<option value={UsableType.PhotoGallery}>Photo Gallery</option>
	</select>
	{#if type === UsableType.RecipeCard}
		<UsableRecipeCard {handleSubmit} />
	{:else if type === UsableType.PhotoGallery}
		<H4>TODO: Implement</H4>
	{/if}
</Modal>

<style lang="scss">
	.type-select {
		margin-bottom: var(--spacing-8);
	}
</style>
