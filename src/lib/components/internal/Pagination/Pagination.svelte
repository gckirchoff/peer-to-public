<script lang="ts">
	import { postsPerPage } from '$lib/config';
	import H6 from '../typography/H6.svelte';

	export let currentPage: number;
	export let totalPosts: number;

	let pagesAvailable: number;
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage);

	const isCurrentPage = (page: number): boolean => page === currentPage;
</script>

{#key currentPage}
	{#if pagesAvailable > 1}
		<nav aria-label="Pagination navigation">
			<H6>Go to page:</H6>
			<ul>
				{#each Array.from({ length: pagesAvailable }, (_, i) => i + 1) as page}
					<li>
						<a href="/posts/page/{page}" aria-current={isCurrentPage(page)}>
							{page}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
{/key}

<style lang="scss">
	nav {
		margin-top: var(--spacing-16);
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: var(--spacing-16);
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-8);
		list-style: none;
	}

	a {
		width: var(--font-16);
		font-weight: bold;
		transition: all 0.5s;
		padding: var(--spacing-4) var(--spacing-8);
		color: var(--clr-text-on-surface-500);
		border: 2px solid transparent;
		border-radius: var(--rounded-4);

		&:hover {
			border-color: var(--clr-primary-500);
		}

		&[aria-current='true'] {
			border-color: var(--clr-primary-500);
			background: var(--clr-primary-500);
			color: var(--clr-text-on-primary);
		}
	}
</style>
