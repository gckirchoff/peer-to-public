<script lang="ts">
	import type { Tag } from '$lib/types/post';
	import CategoryTag from '../CategoryTag/CategoryTag.svelte';
	import CategoryTagsList from '../CategoryTagsList/CategoryTagsList.svelte';
	import H4 from '../typography/H4.svelte';

	// import TagList from './tags/TagList.svelte'
	// import Tag from './tags/Tag.svelte'
	// import PostSearch from './PostSearch.svelte'

	export let popularPosts: Tag[];
	export let allCategories: string[];
</script>

<aside>
	{#if popularPosts.length}
		<H4><span class="sidebar-header">Popular posts</span></H4>
		<ul>
			{#each popularPosts as post}
				<li>
					<a href="/posts/{post.slug}">{post.title}</a>
				</li>
			{/each}
		</ul>
	{/if}

	<H4>
		<a href="/posts/category" class="sidebar-header"> Categories </a>
	</H4>
	<CategoryTagsList>
		{#each allCategories as category}
			<CategoryTag {category} />
		{/each}
	</CategoryTagsList>
</aside>

<style>
	aside {
		flex: 0 1 15%;
	}

	.sidebar-header {
		display: inline-block;
		margin-bottom: var(--spacing-16);
		text-decoration: underline;
		color: var(--clr-primary-500);
	}
</style>
