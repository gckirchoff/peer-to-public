<script lang="ts">
	import { dev } from '$app/environment';

	import type Post from '$lib/types/post';
	import { Body1, H4, SubTitle1, SubTitle2 } from '$lib/components/internal/typography';
	import CategoryTag from '../CategoryTag/CategoryTag.svelte';
	import CategoryTagsList from '../CategoryTagsList/CategoryTagsList.svelte';

	export let post: Post;
</script>

<li>
	<article>
		<a href="/posts/{post.slug}" class="card">
			<img src="/images/postImages/{post.coverImage}" alt={post.title} />
			<div class="info">
				<H4>
					{post.title}
				</H4>
				<CategoryTagsList>
					{#each post.categories as category}
						<CategoryTag {category} />
					{/each}
				</CategoryTagsList>
				<Body1>{post.description}</Body1>
				<SubTitle2>{post.date}</SubTitle2>
			</div>
			{#if dev}
				<div class="published-state {post.published ? 'published' : 'draft'}">
					<Body1>
						<span>
							{post.published ? 'Published' : 'Draft'}
						</span>
					</Body1>
				</div>
			{/if}
		</a>
	</article>
</li>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	.card {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: var(--spacing-32);
		position: relative;

		img {
			object-fit: cover;
			min-height: 100%;
			width: 100%;
		}

		.info {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-8);
		}

		.published-state {
			position: absolute;
			right: 0;
			padding: var(--spacing-4) var(--spacing-8);

			&.published {
				background-color: var(--clr-success-500);
			}

			&.draft {
				background-color: var(--clr-warning-500);
			}
		}

		@include respond('mobile') {
			grid-template-columns: 1fr;
		}
	}
</style>
