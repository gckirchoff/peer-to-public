<script>
	import { navItems, siteConfig } from '$lib/config';
	import LightModeToggle from '../LightModeToggle/LightModeToggle.svelte';
	import H3 from '../typography/H3.svelte';
	import NavItem from './NavItem/NavItem.svelte';
</script>

<header>
	<nav>
		<a href="/" class="site-name">
			<H3>{siteConfig.title}</H3>
		</a>
		<ul>
			{#each navItems as { route, title } (route)}
				<NavItem href={route}>{title}</NavItem>
			{/each}
			<LightModeToggle />
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		padding: var(--spacing-24);
		background-color: var(--clr-surface-400);

		--flex-gap: var(--spacing-24);
		--row-gap: var(--spacing-8);

		nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: var(--flex-gap);
			row-gap: var(--row-gap);

			ul {
				display: flex;
				flex-wrap: wrap;
				gap: var(--flex-gap);
				row-gap: var(--row-gap);
				list-style: none;
			}
		}
	}
</style>
