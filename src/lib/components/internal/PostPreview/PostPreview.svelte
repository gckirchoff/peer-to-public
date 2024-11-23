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
		<div class="card">
			<a href="/posts/{post.slug}">
				<div class="image-container">
					<img src="/images/postImages/{post.slug}/{post.coverImage}" alt={post.title} />
				</div>
			</a>
			<div class="info">
				<a href="/posts/{post.slug}">
					<div class="post-headings">
						<H4>
							{post.title}
						</H4>
						<SubTitle2>{simpleDate(new Date(post.date))}</SubTitle2>
						<Body1>{post.description}</Body1>
					</div>
				</a>
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
		</div>
	</article>
</li>

<style lang="scss">
	@use '/src/styles/mixins.scss';
	li {
		@include mixins.respond('mobile') {
			&:not(:last-child) {
				padding-bottom: var(--spacing-32);
				border-bottom: 1px solid var(--clr-surface-700);
			}
		}

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

			.post-headings {
				display: flex;
				flex-direction: column;
				gap: var(--spacing-4);
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
			@include mixins.respond('mobile') {
				grid-template-columns: 1fr;
			}
		}
	}
</style>
