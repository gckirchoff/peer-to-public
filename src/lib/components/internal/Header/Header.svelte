<script>
	import { navItems, siteConfig } from '$lib/config';
	import LightModeToggle from '../LightModeToggle/LightModeToggle.svelte';
	import { H4 } from '../typography';
	import NavItem from './NavItem/NavItem.svelte';
</script>

<header>
	<nav>
		<a href="/" class="site-name">
			<H4>
				<div class="site-title">{siteConfig.title}</div>
			</H4>
		</a>
		<ul>
			{#each navItems as { route, title } (route)}
				<NavItem href={route}>
					<div class="nav-item">{title}</div>
				</NavItem>
			{/each}
			<LightModeToggle />
		</ul>
	</nav>
</header>

<style lang="scss">
	header {
		padding: var(--spacing-16) var(--spacing-24);
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

			.site-title {
				font-family: var(--font-base);
			}

			ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--flex-gap);
				row-gap: var(--row-gap);
				list-style: none;

				.nav-item {
					font-family: var(--font-base);
				}
			}
		}
	}
</style>
