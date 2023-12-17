<script lang="ts">
	import type { PostReqResponse } from '../../../../api/v1/posts/constants';
	import PostEditor from './subcomponents/PostEditor/PostEditor.svelte';
	import type { PostEditorBody } from './subcomponents/PostEditor/constants';

	export let data;

	const { allCategories } = data;

	const handleCreatePost = async (body: FormData): Promise<boolean> => {
		try {
			const res = await fetch('/api/v1/posts', {
				method: 'POST',
				body,
			});
			const { status } = (await res.json()) as PostReqResponse;
			return status === 'success';
		} catch (error) {
			return false;
		}
	};
</script>

<PostEditor handlePostAction={handleCreatePost} {allCategories} />
