<script lang="ts">
	import type { Tag } from '$lib/types/post';
	import { Body1, H5 } from '$lib/components/internal/typography';
	import CategoryTagsList from '$lib/components/internal/CategoryTagsList/CategoryTagsList.svelte';
	import CategoryTag from '$lib/components/internal/CategoryTag/CategoryTag.svelte';

	export let featuredPosts: Tag[];
	export let allCategories: string[];
</script>

<aside>
	{#if featuredPosts.length}
		<div>
			<H5>
				<a href="/posts/category/featured" class="sidebar-header">Featured posts</a>
			</H5>
			<ul>
				{#each featuredPosts as post}
					<li>
						<a href="/posts/{post.slug}">
							<Body1>
								<div class="featured-post-item">
									{post.title}
								</div>
							</Body1>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div>
		<H5>
			<a href="/posts/category" class="sidebar-header"> Categories </a>
		</H5>
		<CategoryTagsList>
			{#each allCategories as category}
				<CategoryTag {category} />
			{/each}
		</CategoryTagsList>
	</div>
</aside>

<style>
	aside {
		flex: 0 1 15%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32);
		margin-bottom: var(--spacing-32);
	}

	.sidebar-header {
		display: inline-block;
		margin-bottom: var(--spacing-8);
		font-family: var(--font-sans);
		font-size: var(--font-16);
		text-transform: uppercase;
		color: var(--clr-primary-600);
	}

	ul {
		list-style: none;
	}

	.featured-post-item {
		font-family: var(--font-sans);
		font-size: var(--font-16);

	}
</style>
