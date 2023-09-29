<script lang="ts">
	import { page } from '$app/stores';
	import { H6 } from '../../typography';

	export let href: string;

	$: isCurrentPage = $page.url.pathname.startsWith(href);
</script>

<li>
	<a {href} aria-current={isCurrentPage}>
		<span class:active={isCurrentPage}>
			<H6>
				<slot />
			</H6>
		</span>
	</a>
</li>

<style>
	.active {
		text-decoration: underline;
		color: var(--clr-primary-500);
	}
</style>
