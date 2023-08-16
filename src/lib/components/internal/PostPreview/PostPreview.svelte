<script lang="ts">
	import type Post from '$lib/types/post';
	import { H4, SubTitle1, SubTitle2 } from '$lib/components/internal/typography';
	import CategoryTag from '../CategoryTag/CategoryTag.svelte';
	import CategoryTagsList from '../CategoryTagsList/CategoryTagsList.svelte';

	export let post: Post;
</script>

<li>
	<article>
		<a href="/posts/{post.slug}" class="card">
			<img src="/images/postImages/{post.coverImage}" alt={post.title} />
			<div>
				<H4>
					{post.title}
				</H4>
				<CategoryTagsList>
					{#each post.categories as category}
						<CategoryTag {category} />
					{/each}
				</CategoryTagsList>
				<SubTitle1>{post.description}</SubTitle1>
				<SubTitle2>{post.date}</SubTitle2>
			</div>
		</a>
	</article>
</li>

<style lang="scss">
	.card {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: var(--spacing-32);

		img {
			object-fit: cover;
			min-height: 100%;
			width: 100%;
		}
	}
</style>
