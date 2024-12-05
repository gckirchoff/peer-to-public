<script lang="ts">
	import { postsPerPage, siteConfig } from '$lib/config.js';
	import Pagination from '$lib/components/internal/Pagination/Pagination.svelte';
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import H6 from '$lib/components/internal/typography/H6.svelte';

	export let data;

	const { posts, page, totalPosts } = data;

	$: lowerBound = page * postsPerPage - (postsPerPage - 1) || 1;
	$: upperBound = Math.min(page * postsPerPage, totalPosts);
</script>

<svelte:head>
	<title>{siteConfig.author} | Posts page {page}</title>
	<meta data-key="description" name="description" content={siteConfig.description} />
	<!-- <meta property="og:image" content="{siteConfig.url}/images/site-image.png" /> -->
	<!-- <meta name="twitter:image" content="{siteConfig.url}/images/site-image.png" /> -->
</svelte:head>

<main tabindex="-1">
	<div class="posts-counter">
		{#if lowerBound === totalPosts}
			<H6>Post {totalPosts} of {totalPosts}</H6>
		{:else}
			<H6>Posts {lowerBound}–{upperBound} of {totalPosts}</H6>
		{/if}
	</div>
	<PostsList {posts} />
	<Pagination currentPage={page} {totalPosts} />
</main>

<style lang="scss">
	.posts-counter {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-16);
	}
</style>
