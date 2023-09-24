<script lang="ts">
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';

	import MultiSelect from '$lib/components/internal/MultiSelect/MultiSelect.svelte';
	import { H4 } from '$lib/components/internal/typography';
	import MarkdownEditor from '$lib/components/internal/MarkdownEditor/MarkdownEditor.svelte';
	import UsablesModal from '../../subcomponents/UsablesModal/UsablesModal.svelte';
	import type { Usable } from '../../subcomponents/UsablesModal/constants';
	import Button from '$lib/components/internal/Button/Button.svelte';
	import type { PostEditorBody } from './constants';

	export let handlePostAction: (body: PostEditorBody) => Promise<boolean>;
	export let allCategories: string[];

	export let title = '';
	export let description = '';
	export let categories: string[] = [];
	export let mdValue =
		'# Hi Everybody!\r## Hi Doctor Nik!\r> "You\'ve tried the best, now try the rest!"\r>\r>-Dr Nik\r\rDr Nik Riviera is a quack';
	export let slug: string | undefined = undefined;
	export let date: string | undefined = undefined;

	let formTitle = title;
	let formDescription = description;
	let formCategories = [...categories];
	let formMdValue = mdValue;

	let loaded = false;

	let usables: { [id: string]: Usable } = {};

	let openUsablesMenu = false;
	let errorText = '';

	const postContentLocalStorage = `markdown${slug ? `-${slug}` : ''}`;
	const usablesLocalStorage = `usables${slug ? `-${slug}` : ''}`;

	const handleSubmit = async (event: MouseEvent) => {
		event.preventDefault();
		try {
			if (!formTitle) {
				errorText = 'Must have a title';
				setTimeout(() => (errorText = ''), 5000);
				return;
			}
			if (!formDescription) {
				errorText = 'Must have a description';
				setTimeout(() => (errorText = ''), 5000);
				return;
			}
			if (!formCategories.length) {
				errorText = 'Must have at least one category';
				setTimeout(() => (errorText = ''), 5000);
				return;
			}

			const body: PostEditorBody = {
				title: formTitle,
				description: formDescription,
				categories: formCategories,
				content: formMdValue,
				usables,
				slug,
				date,
			};

			const success = await handlePostAction(body);

			if (!success) {
				errorText = 'Could not create post';
				return;
			}
			window.localStorage.removeItem(postContentLocalStorage);
			window.localStorage.removeItem(usablesLocalStorage);
		} catch (err) {
			errorText = 'Could not create post';
		}
		setTimeout(() => (errorText = ''), 5000);
	};

	const addUsable = (usable: Usable): void => {
		openUsablesMenu = false;
		usables = { ...usables, [usable.id]: usable };
		window.localStorage.setItem(usablesLocalStorage, JSON.stringify(usables));
		formMdValue += `\r[--Component type="${usable.type}" id="${usable.id}" --]`;
	};

	$: {
		if (browser) {
			if (loaded) {
				window.localStorage.setItem(postContentLocalStorage, formMdValue);
			} else {
				const storedMd = window.localStorage.getItem(postContentLocalStorage);
				if (storedMd) {
					formMdValue = storedMd;
				}
				const storedUsables = window.localStorage.getItem(usablesLocalStorage);
				if (storedUsables) {
					usables = JSON.parse(storedUsables);
				}

				loaded = true;
			}
		}
	}
</script>

<div class="post-meta-data-container">
	<input type="text" bind:value={formTitle} placeholder="Title" />
	<textarea bind:value={formDescription} placeholder="Description" />
	<div>
		<MultiSelect id="categories" bind:value={formCategories}>
			{#each allCategories as category}
				<option value={category}>{category}</option>
			{/each}
		</MultiSelect>
	</div>
	<Button on:click={() => (openUsablesMenu = true)} style="align-self: flex-end;">
		Add Component
	</Button>
	<MarkdownEditor bind:value={formMdValue} />

	<Button on:click={handleSubmit} style="align-self: flex-end;">Save</Button>
</div>

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
