<script lang="ts">
	import MarkdownEditor from '$lib/components/internal/MarkdownEditor/MarkdownEditor.svelte';
	import MultiSelect from '$lib/components/internal/MultiSelect/MultiSelect.svelte';
	import { H4 } from '$lib/components/internal/typography';

	export let data;
	const { postContent, meta, allCategories } = data;

	let value = postContent;

	let title = meta.title;
	let description = meta.description;
	let categories: string[] = [...meta.categories];
	
</script>

<H4>Edit Post</H4>

<div class="post-meta-data-container">
	<input type="text" bind:value={title} placeholder="Title" />
	<textarea bind:value={description} placeholder="Description" />
	<div>
		<MultiSelect id="categories" bind:value={categories}>
			{#each allCategories as category}
				<option value={category}>{category}</option>
			{/each}
		</MultiSelect>
	</div>

	<MarkdownEditor bind:value />
</div>

<style lang="scss">
	.post-meta-data-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);

		input,
		textarea {
			align-self: flex-start;
			width: 50%;
		}
	}
</style>
