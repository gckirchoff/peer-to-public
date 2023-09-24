<script lang="ts">
	import { postsPerPage } from '$lib/config';
	import H3 from '../typography/H3.svelte';

	export let currentPage: number;
	export let totalPosts: number;

	let pagesAvailable: number;
	$: pagesAvailable = Math.ceil(totalPosts / postsPerPage);

	const isCurrentPage = (page: number): boolean => page === currentPage;
</script>

{#key currentPage}
	{#if pagesAvailable > 1}
		<nav aria-label="Pagination navigation">
			<H3>Go to page:</H3>
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
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		gap: var(--spacing-8);
		list-style: none;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--font-16);
		font-weight: bold;
		transition: background 0.1s;

		&:hover {
			background: var(--clr-secondary-500);
		}

		&[aria-current='true'] {
			background: var(--clr-tertiary-500);
			color: var(--clr-txt);
		}
	}
</style>
