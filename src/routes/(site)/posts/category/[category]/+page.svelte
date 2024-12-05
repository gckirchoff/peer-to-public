<script lang="ts">
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import H3 from '$lib/components/internal/typography/H3.svelte';
	import { capitalize } from '$lib/utils/logic';

	export let data;

	const category = data.category;
	const posts = data.posts;
</script>

<main>
	<H3 style="margin-bottom: var(--spacing-32);">
		Category: <b>{capitalize(category)}</b>
	</H3>

	<PostsList {posts} />
</main>
