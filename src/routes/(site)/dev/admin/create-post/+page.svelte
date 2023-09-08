<script lang="ts">
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';

	import MultiSelect from '$lib/components/internal/MultiSelect/MultiSelect.svelte';
	import { H4 } from '$lib/components/internal/typography';
	import type { PostReqPostBody, PostReqResponse } from '../../../../api/posts/types';
	import MarkdownEditor from './MarkdownEditor.svelte';
	import UsablesModal from './UsablesModal/UsablesModal.svelte';
	import type { Usable } from './UsablesModal/constants';

	export let data;

	const { allCategories } = data;

	let loaded = false;

	let title = '';
	let description = '';
	let categories: string[] = [];
	let mdValue = '# Hi Everybody!\r## Hi Doctor Nik!\r> Dr Nik Riviera\r\rDr Nik Riviera is a quack';
	let usables: Usable[] = [];

	let openUsablesMenu = false;
	let errorText = '';

	const handleSubmit = async (
		event: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		event.preventDefault();
		try {
			if (!title) {
				errorText = 'Must have a title';
				setTimeout(() => (errorText = ''), 5000);
				return;
			}
			if (!description) {
				errorText = 'Must have a description';
				setTimeout(() => (errorText = ''), 5000);
				return;
			}
			if (!categories.length) {
				errorText = 'Must have at least one category';
				setTimeout(() => (errorText = ''), 5000);
				return;
			}

			const body: PostReqPostBody = {
				title,
				description,
				categories,
				content: mdValue,
			};
			const res = await fetch('/api/posts', {
				method: 'POST',
				body: JSON.stringify(body),
			});
			const { status } = (await res.json()) as PostReqResponse;
			if (status !== 'success') {
				errorText = 'Could not create post';
			}
			window.localStorage.removeItem('create-markdown');
		} catch (err) {
			errorText = 'Could not create post';
		}
		setTimeout(() => (errorText = ''), 5000);
	};

	const addUsable = (usable: Usable): void => {
		usables = [...usables, usable];
		mdValue += `<--Component type="${usable.type}" id="${usable.id}" -->`;
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

<form>
	<input type="text" bind:value={title} placeholder="Title" />
	<textarea bind:value={description} placeholder="Description" />
	<div>
		<MultiSelect id="categories" bind:value={categories}>
			{#each allCategories as category}
				<option value={category}>{category}</option>
			{/each}
		</MultiSelect>
	</div>
	<button class="open-usables" on:click={() => (openUsablesMenu = true)}>Add Component</button>
	<MarkdownEditor bind:value={mdValue} />

	<button type="submit" on:click={handleSubmit}>Save</button>
</form>

<UsablesModal
	open={openUsablesMenu}
	handleClose={() => (openUsablesMenu = false)}
	handleSubmit={addUsable}
/>

{#if errorText}
	<span class="error-text" transition:fly={{ duration: 200, y: 5 }}>
		<H4>{errorText}</H4>
	</span>
{/if}

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

		button[type='submit'],
		.open-usables {
			align-self: flex-end;
			background-color: var(--clr-primary-300);
			padding: var(--spacing-4) var(--spacing-8);
			border-radius: var(--rounded-4);

			&:hover {
				background-color: var(--clr-primary-400);
			}
		}
	}

	.error-text {
		position: absolute;
		top: 10%;
		left: 50%;
		translate: -50% 0;
		display: inline-block;
		background-color: var(--clr-error-500);
		padding: var(--spacing-8) var(--spacing-16);
		:global(h4) {
			color: var(--clr-txt-neg);
		}
	}
</style>
