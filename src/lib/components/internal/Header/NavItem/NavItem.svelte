<script lang="ts">
	import { page } from '$app/stores';
	import H5 from '../../typography/H5.svelte';

	export let href: string;

	$: isCurrentPage = $page.url.pathname.startsWith(href);
</script>

<li>
	<a {href} aria-current={isCurrentPage}>
		<span class:active={isCurrentPage}>
			<H5>
				<slot />
			</H5>
		</span>
	</a>
</li>

<style>
	a {
		font-size: var(--font-24);
	}

	.active {
		text-decoration: underline;
		color: var(--clr-primary-500);
	}
</style>
