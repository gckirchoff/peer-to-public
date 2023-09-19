<script lang="ts">
	import type { Tag } from '$lib/types/post';
	import { Body1, H5 } from '$lib/components/internal/typography';
	import CategoryTagsList from '$lib/components/internal/CategoryTagsList/CategoryTagsList.svelte';
	import CategoryTag from '$lib/components/internal/CategoryTag/CategoryTag.svelte';

	export let popularPosts: Tag[];
	export let allCategories: string[];
</script>

<aside>
	{#if popularPosts.length}
		<div>
			<H5>
				<a href="/posts/category/popular" class="sidebar-header">Popular posts</a>
			</H5>
			<ul>
				{#each popularPosts as post}
					<li>
						<a href="/posts/{post.slug}">
							<Body1>
								{post.title}
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
		text-decoration: underline;
		color: var(--clr-primary-600);
	}

	ul {
		list-style: none;
	}
</style>
