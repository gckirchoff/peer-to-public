<script lang="ts">
	import { dev } from '$app/environment';

	import type Post from '$lib/types/post';
	import { simpleDate } from '$lib/utils/logic';
	import { Body1, H4, SubTitle2 } from '$lib/components/internal/typography';
	import CategoryTag from '../CategoryTag/CategoryTag.svelte';
	import CategoryTagsList from '../CategoryTagsList/CategoryTagsList.svelte';

	export let post: Post;
</script>

<li>
	<article>
		<a href="/posts/{post.slug}" class="card">
			<div class="image-container">
				<img src="/images/postImages/{post.slug}/{post.coverImage}" alt={post.title} />
			</div>
			<div class="info">
				<H4>
					{post.title}
				</H4>
				<SubTitle2>{simpleDate(new Date(post.date))}</SubTitle2>
				<Body1>{post.description}</Body1>
				<CategoryTagsList>
					{#each post.categories as category}
						<CategoryTag {category} />
					{/each}
				</CategoryTagsList>
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
		grid-template-columns: 2fr 3fr;
		gap: var(--spacing-32);
		position: relative;

		.image-container {
			height: 28rem;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
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
