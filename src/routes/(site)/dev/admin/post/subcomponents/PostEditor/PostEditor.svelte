<script lang="ts">
	import { browser } from '$app/environment';

	import { siteConfig } from '$lib/config';
	import MultiSelect from '$lib/components/internal/MultiSelect/MultiSelect.svelte';
	import MarkdownEditor from '$lib/components/internal/MarkdownEditor/MarkdownEditor.svelte';
	import UsablesModal from '../../subcomponents/UsablesModal/UsablesModal.svelte';
	import type { Usable } from '../../subcomponents/UsablesModal/constants';
	import Button from '$lib/components/internal/Button/Button.svelte';
	import type { PostEditorBody } from './constants';
	import Switch from '$lib/components/internal/Switch.svelte';
	import Snackbar from '$lib/components/internal/Snackbar/Snackbar.svelte';
	import type { PostEditorMetaData } from '$lib/types/post';
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import ConfirmationModal from '$lib/components/internal/ConfirmationModal/ConfirmationModal.svelte';

	export let handlePostAction: (body: FormData) => Promise<boolean>;
	export let allCategories: string[];
	export let allAuthors: string[];
	export let postMetaData: PostEditorMetaData = {
		title: '',
		description: '',
		categories: [],
		authors: [siteConfig.author],
		published: false,
		coverImage: undefined,
		slug: undefined,
		date: undefined,
	};

	export let mdValue =
		'# Example Header\r## Example Subtitle\r> "Block quote example"\r>\r>-Anonymous\r\rContent goes here...';

	let formTitle = postMetaData.title;
	let formDescription = postMetaData.description;
	let formCategories = [...postMetaData.categories];
	let formAuthors = [...(postMetaData.authors ?? [siteConfig.author])];
	let formMdValue = mdValue;
	let formPublished = postMetaData.published;
	let formCoverImage = postMetaData.coverImage;
	let newImage: FileList;

	let loaded = false;

	let usables: { [id: string]: Usable } = {};

	let openUsablesMenu = false;
	let errorText = '';
	let savedToLocalStorageText = '';

	const postContentLocalStorage = `markdown${postMetaData.slug ? `-${postMetaData.slug}` : ''}`;
	const usablesLocalStorage = `usables${postMetaData.slug ? `-${postMetaData.slug}` : ''}`;

	const clearLocalStorage = () => {
		window.localStorage.removeItem(postContentLocalStorage);
		window.localStorage.removeItem(usablesLocalStorage);
	};

	let discardChangesModalOpen = false;

	const handleResetChangesButtonClick = () => {
		discardChangesModalOpen = true;
	};

	const handleCloseDiscardChangesModal = () => {
		discardChangesModalOpen = false;
	};

	const confirmResetChanges = () => {
		clearLocalStorage();
		formMdValue = mdValue;
	};

	let localStorageTimer: number;
	const debouncedSetLocalStorage = (mdValue: string): void => {
		clearTimeout(localStorageTimer);
		localStorageTimer = setTimeout(() => {
			window.localStorage.setItem(postContentLocalStorage, mdValue);
			savedToLocalStorageText = 'Changes Saved';
		}, 3000);
	};

	const handleSubmit = async (event: MouseEvent) => {
		event.preventDefault();
		try {
			if (!formTitle) {
				errorText = 'Must have a title';
				return;
			}
			if (!formDescription) {
				errorText = 'Must have a description';
				return;
			}
			if (!formCategories.length) {
				errorText = 'Must have at least one category';
				return;
			}

			if (!formAuthors.length) {
				errorText = 'Must have at least one author';
				return;
			}

			const formData = new FormData();

			const file = newImage?.[0];
			if (file) {
				const fileName = file.name;
				formData.append('newImage', file, fileName);
			}

			const body: PostEditorBody = {
				title: formTitle,
				description: formDescription,
				categories: formCategories,
				published: formPublished,
				content: formMdValue,
				coverImage: formCoverImage,
				usables,
				slug: postMetaData.slug,
				date: postMetaData.date,
				authors: formAuthors,
			};

			formData.append('data', JSON.stringify(body));

			const success = await handlePostAction(formData);

			if (!success) {
				errorText = 'Could not create post';
				return;
			}
			clearLocalStorage();
		} catch (err) {
			errorText = 'Could not create post';
			console.warn(err);
		}
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
				debouncedSetLocalStorage(formMdValue);
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
	<Switch label="Published" bind:value={formPublished} />
	<label>
		<Body1>Cover Photo:</Body1>
		<input type="file" bind:files={newImage} />
	</label>
	<input type="text" bind:value={formTitle} placeholder="Title" />
	<textarea bind:value={formDescription} placeholder="Description"></textarea>
	<div>
		<MultiSelect id="categories" bind:value={formCategories}>
			{#each allCategories as category}
				<option value={category}>{category}</option>
			{/each}
		</MultiSelect>
	</div>
	<div>
		<MultiSelect id="authors" bind:value={formAuthors}>
			{#each allAuthors as author}
				<option value={author}>{author}</option>
			{/each}
		</MultiSelect>
	</div>
	<div class="buttons-container">
		<Button on:click={handleResetChangesButtonClick}>Reset Changes</Button>
		<Button on:click={() => (openUsablesMenu = true)}>Add Component</Button>
	</div>
	<MarkdownEditor bind:value={formMdValue} />

	<Button on:click={handleSubmit} style="align-self: flex-end;">Save</Button>
</div>

<UsablesModal
	open={openUsablesMenu}
	handleClose={() => (openUsablesMenu = false)}
	handleSubmit={addUsable}
/>

<ConfirmationModal
	message="Are you sure you want to discard changes?"
	open={discardChangesModalOpen}
	handleClose={handleCloseDiscardChangesModal}
	handleConfirm={confirmResetChanges}
/>

<Snackbar bind:value={errorText} variant="error" />
<Snackbar bind:value={savedToLocalStorageText} variant="success" duration={1000} />

<style lang="scss">
	.post-meta-data-container {
		max-width: 90vw;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);

		input,
		textarea {
			align-self: flex-start;
			width: 50%;
		}

		.buttons-container {
			display: flex;
			justify-content: flex-end;
			gap: var(--spacing-8);
		}
	}
</style>
