<script lang="ts">
	import { browser } from '$app/environment';

	import MultiSelect from '$lib/components/internal/MultiSelect/MultiSelect.svelte';
	import MarkdownEditor from './MarkdownEditor.svelte';

	export let data;

	const { allCategories } = data;

	let loaded = false;

	let title = '';
	let description = '';
	let categories: string[] = [];
	let mdValue = '# Hi Everybody!';

	const handleSubmit = async () => {
		await fetch('/api/posts', {});
	};

	$: {
		if (browser) {
			if (loaded) {
				window.localStorage.setItem('create-markdown', mdValue);
			} else {
				const storedMd = window.localStorage.getItem('create-markdown');
				if (storedMd) {
					mdValue = storedMd;
				}
				loaded = true;
			}
		}
	}
</script>

<form method="POST">
	<input type="text" bind:value={title} placeholder="Title" />
	<textarea bind:value={description} placeholder="Description" />
	<input type="text" placeholder="New Categories (comma separated: tag1,tag2)" />
	<div>
		<MultiSelect id="categories" bind:value={categories}>
			{#each allCategories as category}
				<option value={category}>{category}</option>
			{/each}
		</MultiSelect>
	</div>
	<MarkdownEditor bind:value={mdValue} />

	<button type="submit">Save</button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);

		input,
		textarea {
			align-self: flex-start;
			width: 50%;
		}

		button[type='submit'] {
			align-self: flex-end;
			background-color: var(--clr-primary-300);
			padding: var(--spacing-4) var(--spacing-8);
			border-radius: var(--rounded-4);

			&:hover {
				background-color: var(--clr-primary-400);
			}
		}
	}
</style>
