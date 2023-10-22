<script lang="ts">
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import H2 from '$lib/components/internal/typography/H2.svelte';
	import { capitalize } from '$lib/utils/logic';

	export let data;

	const category = data.category;
	const posts = data.posts;
</script>

<main>
	<H2 style="margin-bottom: var(--spacing-32);">
		Category: <b>{capitalize(category)}</b>
	</H2>

	<PostsList {posts} />
</main>
