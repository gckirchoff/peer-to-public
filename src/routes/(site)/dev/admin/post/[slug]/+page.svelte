<script lang="ts">
	import { H4 } from '$lib/components/internal/typography';
	import PostEditor from '../subcomponents/PostEditor/PostEditor.svelte';
	import type { PostEditorBody } from '../subcomponents/PostEditor/constants.js';

	export let data;
	const { postContent, meta, allCategories } = data;

	const { title, description, categories, slug } = meta;

	const handleUpdatePost = async (body: PostEditorBody): Promise<boolean> => {
		try {
			const res = await fetch(`/api/posts/${slug}`, {
				method: 'PATCH',
				body: JSON.stringify(body),
			});
			const { status } = await res.json();
			return status === 'success';
		} catch (error) {
			return false;
		}
	};
</script>

<H4>Edit Post</H4>

<PostEditor
	handlePostAction={handleUpdatePost}
	{allCategories}
	{title}
	{description}
	{categories}
	{slug}
	mdValue={postContent}
/>
