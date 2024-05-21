<script lang="ts">
	import { H3, H5 } from '$lib/components/internal/typography';
	import { capitalize } from '$lib/utils/logic.js';

	export let data;

	const { categoriesWithCounts } = data;
</script>

<H3><div class="heading">Categories</div></H3>

<ul class="card">
	{#each categoriesWithCounts as category}
		<li>
			<a href="/posts/category/{category.title}">
				<div class="image-container">
					<img src="/images/postImages/{category.recentImage}" alt={category.title} />
				</div>
				<H5>
					{capitalize(category.title)} ({category.count} post{category.count > 1 ? 's' : ''})
				</H5>
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	@import '/src/styles/mixins.scss';

	.heading {
		margin-bottom: var(--spacing-32);
	}
	.card {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
		gap: var(--spacing-32);

		li {
			list-style: none;
			text-align: center;
		}
	}

	.image-container {
		display: block;
		width: 100%;
		height: 26rem;
		margin-bottom: var(--spacing-8)
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
