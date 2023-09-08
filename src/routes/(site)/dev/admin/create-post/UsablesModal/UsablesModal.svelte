<script lang="ts">
	import Modal from '$lib/components/internal/Modal/Modal.svelte';
	import { H4, H5 } from '$lib/components/internal/typography';
	import { UsableType } from './constants';

	export let open: boolean;

	let selectedUsable: UsableType;
</script>

<Modal {open}>
	<select bind:value={selectedUsable}>
		<option value={UsableType.RecipeCard}>Recipe Card</option>
		<option value={UsableType.PhotoGallery}>Photo Gallery</option>
	</select>
	{#if selectedUsable === UsableType.RecipeCard}
		<input placeholder="Recipe Title" type="text" />
		<input placeholder="Description" type="text" />
		<H5>Ingredients:</H5>
		<H5>Steps:</H5>
	{/if}
</Modal>
