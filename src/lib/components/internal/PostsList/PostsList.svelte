<script lang="ts">
	import type Post from '$lib/types/post';
	import PostPreview from '../PostPreview/PostPreview.svelte';

	export let posts: Post[];
</script>

<ul>
	{#each posts as post (post.title)}
		<PostPreview {post} />
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32)
	}
</style>
