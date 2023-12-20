<script lang="ts">
	import Button from '$lib/components/internal/Button/Button.svelte';
	import { H4 } from '$lib/components/internal/typography';
	import PostEditor from '../subcomponents/PostEditor/PostEditor.svelte';

	export let data;
	const { postContent, meta, allCategories } = data;
	const { slug } = meta;

	const handleUpdatePost = async (body: FormData): Promise<boolean> => {
		try {
			const res = await fetch(`/api/v1/posts/${slug}`, {
				method: 'PATCH',
				body,
			});
			const { status } = await res.json();
			return status === 'success';
		} catch (error) {
			return false;
		}
	};
</script>

<div class="edit-post-header">
	<H4>Edit Post</H4>
	<a href="/posts/{slug}" target="_blank">
		<Button>See Current Post</Button>
	</a>
</div>

<PostEditor
	handlePostAction={handleUpdatePost}
	{allCategories}
	mdValue={postContent}
	postMetaData={meta}
/>

<style lang="scss">
	.edit-post-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--spacing-16);
		margin-bottom: var(--spacing-16);
	}
</style>
