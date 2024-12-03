<script lang="ts">
	import { page } from '$app/stores';
	import { Body1 } from '../typography';

	export let href: string;

	$: isCurrentPage = $page.url.pathname.startsWith(href);
</script>

<li>
	<a {href} aria-current={isCurrentPage}>
		<span class:active={isCurrentPage}>
			<Body1>
				<slot />
			</Body1>
		</span>
	</a>
</li>

<style>
	.active {
		text-decoration: underline;
		color: var(--clr-primary-500);
	}
</style>
